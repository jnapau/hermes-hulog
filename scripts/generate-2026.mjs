import { writeFileSync } from 'node:fs';
import { units, households } from './curriculum-2026.mjs';
import { cyberMessages } from './cyber-messages.mjs';

const courses = [101,102,103,103,104,104,105,105,106,107,108,108];
const tiers = ['Cash Management','Cash Management','Cash Management','Cash Management','Emergency & Savings','Emergency & Savings','Debt Management','Debt Management','Accumulation & Net Worth','Protection & Insurance','Crisis Resilience','Crisis Resilience'];
const questions = [];
const lower = text => text.charAt(0).toLowerCase() + text.slice(1);
// Rotate the position of the right answer, without randomizing reproducible seeds.
function choices(good, bad, other, rotation) {
  const values = [good,bad,other];
  const rotated = values.map((_, i) => values[(i + rotation) % 3]);
  return {options:rotated.map((v,i) => ({key:'ABC'[i],text:v[0],textFilipino:v[1]})),answer:'ABC'[rotated.indexOf(good)]};
}
for (let day = 0; day < 365; day++) {
  const date = new Date(Date.UTC(2026,0,day+1));
  const scheduledDate = date.toISOString().slice(0,10);
  const month = date.getUTCMonth();
  const dom = date.getUTCDate();
  const paydaySpecial = dom === 15 || dom === 30;
  const progression = month < 3 ? 'foundational' : month < 8 ? 'intermediate' : 'advanced';
  for (let s = 0; s < 3; s++) {
    const unit = units[month * 10 + (dom * 3 + s) % 10];
    const home = households[(dom + s * 11 + month * 7) % households.length];
    const extra = households[(dom + s * 11 + month * 7 + 9) % households.length];
    const q = {id:`H2026-${scheduledDate.slice(5)}-${s+1}`,scheduledDate,slot:s+1,course:courses[month],tier:tiers[month],difficulty:['easy','medium','challenge'][s],progression,paydaySpecial,communityStats:{correctPct:0,sampleSize:0}};
    if (s === 0) {
      const positive = (day % 2) === 0;
      Object.assign(q, {kind:'binary',format:'Tama o Mali?',prompt:`${home.scene}. ${positive ? unit.claim : `The suggested plan is to ${lower(unit.bad)}`}. Is this sound advice?`,promptFilipino:`${home.sceneFilipino}. ${positive ? unit.claimFilipino : `Ang mungkahi: ${lower(unit.badFilipino)}`}. Tama o mali?`,answer:positive ? 'TAMA' : 'MALI',answerLabel:positive ? 'Tama · True' : 'Mali · False',why:`${unit.reason}. In this case, ${home.constraint}.`,whyFilipino:`${positive ? 'Tama ang prinsipyo.' : 'Hindi ligtas ang mungkahi.'} ${unit.goodFilipino}; ${home.constraintFilipino}.`,hakbang:`${unit.action}. Para sa panimulang pagsusuri: ${lower(home.action)}.`});
    } else if (s === 1) {
      Object.assign(q,{kind:'choice',format:"Ano'ng Gagawin Mo?",prompt:`${home.scene}. A relative proposes: “${unit.bad}.” Which response protects the plan?`,promptFilipino:`${home.sceneFilipino}. Mungkahi ng kamag-anak: “${unit.badFilipino}.” Ano ang mas maingat na tugon?`,...choices([unit.good,unit.goodFilipino],[unit.bad,unit.badFilipino],[`Make no plan until extra income arrives`,`Huwag munang magplano hangga't walang dagdag-kita`],(day + s)%3),answerLabel:unit.goodFilipino,why:`${home.scene}: ${home.constraint}. ${unit.reason}, so the practical response is to ${lower(unit.good)}.`,whyFilipino:`${unit.goodFilipino}. Sa sitwasyong ito, ${home.constraintFilipino}; hindi sapat na sundin lang ang mungkahi.`,hakbang:`${home.action}. Pagkatapos, ${lower(unit.action)}.`});
    } else {
      const enConstraint = month < 3 ? 'Only one essential can be funded today' : month < 8 ? 'A bill is due before any extra income is confirmed' : `There is also another pressure: ${lower(extra.scene)}`;
      const tlConstraint = month < 3 ? 'Isa lang sa mga kailangan ang kayang pondohan ngayon' : month < 8 ? 'May due na bayarin bago ang anumang kumpirmadong dagdag-kita' : `May dagdag na suliranin: ${lower(extra.sceneFilipino)}`;
      Object.assign(q,{kind:'choice',format:month >= 8 ? 'Isang Hakbang · Household Challenge' : "Ano'ng Gagawin Mo?",prompt:`${home.scene}. ${enConstraint}. Someone suggests: “${unit.bad}.” Which plan keeps the household on track?`,promptFilipino:`${home.sceneFilipino}. ${tlConstraint}. May nagmungkahi: “${unit.badFilipino}.” Aling plano ang makatutulong?`,...choices([`${unit.good}; protect the next essential payment`,`${unit.goodFilipino}; protektahan ang susunod na mahalagang bayad`],[`${unit.good}, but use all essential reserves to do it`,`${unit.goodFilipino}, pero ubusin ang nakalaang pera sa kailangan`],[`${unit.bad}; rely on unconfirmed income later`,`${unit.badFilipino}; umasa sa di-tiyak na kita sa susunod`],(day+s)%3),answerLabel:`${unit.goodFilipino} + protektadong pangunahing bayarin`,why:`${unit.reason}. Because ${home.constraint}, the plan must preserve essentials${month >= 8 ? ` while recognizing that ${extra.constraint}` : ' without counting unconfirmed income'}.`,whyFilipino:`${unit.goodFilipino}, habang nakalaan ang pera sa kailangan. ${home.constraintFilipino}${month >= 8 ? `; ${extra.constraintFilipino}` : '; hindi pa hawak ang inaasahang dagdag-kita'}.`,hakbang:`${unit.action}. Sa household challenge na ito: ${lower(home.action)}${month >= 8 ? `; ${lower(extra.action)}` : '; itakda ang susunod na petsa ng pagsusuri'}.`});
    }
    if (month === 9 && s === 0 && !paydaySpecial) {
      const [message,messageFilipino,answer,reason,reasonFilipino] = cyberMessages[dom-1];
      Object.assign(q,{format:'Scam o Legit?',prompt:`${home.scene}. ${message} Judge this specific request or verification step.`,promptFilipino:`${home.sceneFilipino}. ${messageFilipino} Scam o legit ang mismong hinihingi o hakbang?`,answer,answerLabel:answer === 'SCAM' ? 'Scam · Stop and verify independently' : 'Legit · Safe verification step',why:`${reason} For this household, ${home.constraint}.`,whyFilipino:`${reasonFilipino} Tandaan: ${home.constraintFilipino}.`,hakbang:`${answer === 'SCAM' ? 'Iwasan ang hinihinging transfer o pagbibigay ng lihim at kumpirmahin sa opisyal na channel' : 'Panatilihin ang hiwalay na pag-check sa opisyal na app o dokumento'}. ${home.action}.`});
    }
    if (paydaySpecial) {
      const cash = 9000 + month*500;
      const bills = 5000 + month*200;
      const reserve = 1000;
      if (s === 0) {
        Object.assign(q,{prompt:`Sweldo Hulog Special. ${home.scene}. Payday advice: “Spend the whole net pay first; plan obligations later. ${unit.bad}.” Tama o Mali?`,promptFilipino:`Sweldo Hulog Special. ${home.sceneFilipino}. Payo: “Gastusin muna ang buong netong sweldo; saka maglaan sa obligasyon. ${unit.badFilipino}.” Tama o mali?`,answer:'MALI',answerLabel:'Mali · Maglaan muna bago gumastos',why:`Payday allocation must protect commitments before discretionary spending because ${home.constraint}. This month’s lens: ${lower(unit.claim)}.`,whyFilipino:`Maglaan muna sa kailangan: ${home.constraintFilipino}. Kaugnay nito: ${lower(unit.claimFilipino)}.`,hakbang:`Bago galawin ang bagong sweldo: ${lower(home.action)}. ${unit.action}.`});
      } else if (s === 1) {
        Object.assign(q,{format:'Alin ang Puwedeng Gastusin?',prompt:`Sweldo Hulog Special. ${home.scene}. From ₱${cash} net pay, ₱${bills} is committed and ₱${reserve} protects savings. How much is unassigned before you ${lower(unit.good)}?`,promptFilipino:`Sweldo Hulog Special. ${home.sceneFilipino}. Sa ₱${cash} netong sweldo, ₱${bills} ang bayarin at ₱${reserve} ang protektadong ipon. Magkano ang wala pang nakalaang gamit bago ${lower(unit.goodFilipino)}?`,...choices([`₱${cash-bills-reserve}`,`₱${cash-bills-reserve}`],[`₱${cash-bills}`,`₱${cash-bills}`],[`₱${cash}`,`₱${cash}`],day%3),answerLabel:`₱${cash-bills-reserve} · matapos ang bayarin at reserba`,why:`₱${cash} − ₱${bills} − ₱${reserve} = ₱${cash-bills-reserve}. For this household, ${home.constraint}; the reserve is already assigned, not extra spending money. ${unit.reason}.`,whyFilipino:`₱${cash} − ₱${bills} − ₱${reserve} = ₱${cash-bills-reserve}. Tandaan: ${home.constraintFilipino}; may nakalaang gamit na ang reserba. ${unit.goodFilipino}.`,hakbang:`Kuwentahin ang sariling Safe-to-Spend sa cut-off na ito. ${home.action}. ${unit.action}.`});
      } else {
        Object.assign(q,{prompt:`Sweldo Hulog Special. ${home.scene}. A payday shopping offer competes with the next essential bill. ${month >= 8 ? extra.scene + '.' : 'No extra income is confirmed.'} Which allocation is sustainable?`,promptFilipino:`Sweldo Hulog Special. ${home.sceneFilipino}. Katapat ng payday sale ang susunod na mahalagang bayarin. ${month >= 8 ? extra.sceneFilipino + '.' : 'Wala pang kumpirmadong dagdag-kita.'} Anong hati ang kayang panindigan?`,...choices([`Reserve essentials, then ${lower(unit.good)}`,`Ireserba ang kailangan, saka ${lower(unit.goodFilipino)}`],[`Shop first and use the emergency fund for bills`,`Mamili muna at gamitin ang emergency fund sa bayarin`],[`Commit all pay to a goal and borrow for essentials`,`Ilaan lahat sa layunin at mangutang para sa kailangan`],(day+1)%3),answerLabel:`Unahin ang kailangan; ${lower(unit.goodFilipino)}`,why:`${home.constraint.charAt(0).toUpperCase()+home.constraint.slice(1)}. ${unit.reason}. A payday allocation must survive the next due date${month >= 8 ? `, including the risk that ${extra.constraint}` : ' without another promised payment'}.`,whyFilipino:`Dapat protektado ang susunod na bayarin: ${home.constraintFilipino}. Pagkatapos, ${lower(unit.goodFilipino)}${month >= 8 ? `; isaalang-alang din na ${extra.constraintFilipino}` : ', nang hindi umaasa sa di-tiyak na kita'}.`,hakbang:`Gumawa ng hati bago mamili ngayong sweldo: ${lower(unit.action)}. ${home.action}${month >= 8 ? `; ${lower(extra.action)}` : '; markahan ang susunod na due date'}.`});
      }
    }
    questions.push(q);
  }
}

// Distinctness compares content, not just IDs/dates. Numbers are erased so merely
// changing peso values or dates cannot satisfy these checks.
const normalize = s => s.normalize('NFKC').toLowerCase().replace(/[\d,.₱]+/g,'#').replace(/\s+/g,' ').trim();
for (const field of ['id','prompt','promptFilipino','why','whyFilipino','hakbang']) {
  const seen = new Map();
  for (const q of questions) {
    const value = field === 'id' ? q[field] : normalize(q[field]);
    if (seen.has(value)) throw new Error(`Repeated ${field}: ${q.id} and ${seen.get(value)}`);
    seen.set(value,q.id);
  }
}
if (questions.length !== 1095 || units.length !== 120) throw new Error('Incomplete 2026 curriculum');
// Small typed chunks avoid TypeScript's enormous-array union inference limit.
const chunks = Array.from({length:Math.ceil(questions.length/30)},(_,i)=>`const batch${i}: Question[] = ${JSON.stringify(questions.slice(i*30,(i+1)*30),null,2)};`).join('\n');
const source = `/** Generated by scripts/generate-2026.mjs. Edit the bilingual teaching units in scripts/curriculum-2026.mjs. */\nimport type { FinancialTier, Question } from './types';\n${chunks}\nexport const QUESTIONS: Question[] = [${Array.from({length:Math.ceil(questions.length/30)},(_,i)=>`...batch${i}`).join(',')}];\nexport const QUESTION_BY_ID: Record<string,Question> = Object.fromEntries(QUESTIONS.map(q => [q.id,q]));\nexport const isBossCard = (q:Question) => q.course === 108 && q.slot === 3;\nexport const ALL_FORMATS = [...new Set(QUESTIONS.map(q => q.format))].sort();\nexport const ALL_TIERS: FinancialTier[] = ${JSON.stringify([...new Set(tiers)])};\n`;
writeFileSync(new URL('../src/data/questions.ts',import.meta.url),source);
console.log('Generated 1,095 bilingual cases, 365 balanced daily drops, and 23 payday specials.');
