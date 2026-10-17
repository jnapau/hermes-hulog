import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {units} from './curriculum-2026.mjs';
import {cyberMessages} from './cyber-messages.mjs';
const questions=JSON.parse(readFileSync('supabase/seed-data.json','utf8')).questions.map(row=>row.payload);
const words=text=>text.trim().split(/\s+/).length;
assert.equal(questions.length,1095);
for(const q of questions){
 const day=q.sequenceDay-1, s=q.slot-1, stage=Math.min(11,Math.floor(day*12/365));
 const unit=units[stage*10+((day*3+s)%10)];
 assert.ok(words(q.prompt)>=10 && words(q.prompt)<=20,`${q.id}: prompt length`);
 assert.ok(!/Choose wisely:|Protect tomorrow:|Wait for extra income/.test(JSON.stringify(q)),q.id);
 assert.ok(q.hakbang && q.hakbangEnglish && q.whyFilipino,q.id);
 if(q.options){
  assert.equal(new Set(q.options.map(o=>o.text)).size,3,q.id);
  assert.equal(new Set(q.options.map(o=>o.textFilipino)).size,3,q.id);
  assert.equal(q.options.find(o=>o.key===q.answer)?.text,q.answerLabel,q.id);
  for(const o of q.options){
   if(/^₱\d+$/.test(o.text))continue; // Explicitly requested numeric payday answers.
   assert.ok(words(o.text)>=3&&words(o.text)<=8,`${q.id}: ${o.text}`);
   assert.ok(words(o.textFilipino)>=3&&words(o.textFilipino)<=8,`${q.id}: ${o.textFilipino}`);
  }
 }
 if(q.paydaySpecial){
  assert.equal(q.sequenceDay%15,0);
  if(s===1){
   const cash=9000+stage*500,bills=5000+stage*200,reserve=1000+stage*100;
   assert.deepEqual(q.options.map(o=>o.text).sort(),[cash-bills-reserve,cash-bills,cash-reserve].map(v=>`₱${v}`).sort());
   assert.equal(q.answerLabel,`₱${cash-bills-reserve}`);
   assert.match(q.hakbangEnglish,/Subtract bills/);
  }else if(s===2){assert.match(q.prompt,/payday budget/);assert.match(q.hakbangEnglish,/bill money and savings/);}
 }else if(q.format==='Scam o Legit?'){
  const message=cyberMessages[Math.floor(day/4)%cyberMessages.length];
  assert.equal(q.hakbangEnglish,message[5]);assert.equal(q.hakbang,message[6]);
 }else{
  assert.ok(q.whyFilipino.startsWith(unit.reasonFilipino));
  assert.equal(q.hakbang,unit.action+'.');
  if(s>0){
   assert.ok(q.prompt.startsWith(unit.scenario));
   assert.deepEqual(q.options.map(o=>o.text).sort(),[unit.good,unit.bad,unit.other].sort());
  }else assert.equal(q.prompt,day%2===0?unit.claim:unit.falseClaim);
 }
}
mkdirSync('artifacts',{recursive:true});
const review=questions.filter(q=>q.sequenceDay<=5||q.sequenceDay===15).map(q=>
 `${q.id} · FRP ${q.course} · ${q.format}\n${q.prompt}\n${q.promptFilipino}\n${q.options?.map(o=>`${o.key}: ${o.text} / ${o.textFilipino}`).join('\n')||q.answer}\nAnswer: ${q.answerLabel}\n${q.why}\n${q.whyFilipino}\nNext: ${q.hakbangEnglish}\n${q.hakbang}\n`).join('\n');
writeFileSync('artifacts/question-content-review.txt',review);
console.log('Question checks passed: 1,095 coherent cards, 10–20 word prompts, distinct relevant choices, all payday amounts, scam/payday action steps, and translated unit explanations.');
