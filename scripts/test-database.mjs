import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const db=new PGlite();
await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb,raw_app_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema public,auth to anon,authenticated,service_role;grant execute on function auth.uid() to anon,authenticated,service_role;`);
await db.exec(readFileSync(new URL('../supabase/migrations/202610160001_hulog.sql',import.meta.url),'utf8'));
const seed=JSON.parse(readFileSync(new URL('../supabase/seed-data.json',import.meta.url),'utf8'));
const compiled = await build({entryPoints:['src/lib/dailyQuestions.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {selectDailyQuestions} = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
for(const q of seed.questions) await db.query('insert into questions values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[q.id,q.text,q.choices,q.correct_answer,q.explanation,q.category,null,null,q.slot,q.payload]);
for(const i of seed.collection_items)await db.query('insert into collection_items values($1,$2,$3,$4)',[i.id,i.category,i.wearable,i.reward_order]);
const player='11111111-1111-4111-8111-111111111111',admin='22222222-2222-4222-8222-222222222222',other='33333333-3333-4333-8333-333333333333';
for(const [id,username] of [[player,'player_one'],[admin,'admin_one'],[other,'player_two']]) await db.query('insert into auth.users values($1,$2)',[id,{username}]);
await assert.rejects(() => db.query('insert into auth.users(id,raw_user_meta_data) values($1,$2)',['44444444-4444-4444-8444-444444444444',{username:'hermeshulog'}]),/reserved/);
await db.query('update profiles set is_admin=true where id=$1',[admin]);
async function asUser(id){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);await db.exec('set role authenticated');}
async function rejected(fn,pattern){await assert.rejects(fn,pattern);}
await asUser(player);
assert.equal((await db.query('select * from profiles')).rows.length,1,'player sees only own profile');
await rejected(()=>db.query('update profiles set is_admin=true where id=$1',[player]),/permission denied/);
await rejected(()=>db.query('select set_admin($1,true)',[other]),/Administrator access required/);
await rejected(()=>db.query('insert into user_collections(user_id,item_id,category) values($1,$2,$3)',[player,seed.collection_items[0].id,'ph-money']),/permission denied/);
await rejected(()=>db.query('select equip_item($1)',[seed.collection_items.find(i=>i.wearable).id]),/Unlock this wearable/);
await rejected(()=>db.query("select save_progress('{\"plays\":{},\"coins\":99999,\"is_admin\":true,\"ginto\":9999,\"basag\":{\"fake\":\"x\"}}')").then(r=>{assert.equal(r.rows[0].save_progress.ginto,0);throw new Error('verified spoof ignored');}),/verified spoof ignored/);
const date=(await db.query("select (now() at time zone 'Asia/Manila')::date::text d")).rows[0].d;
for(let offset=0;offset<31;offset++) {
 const checkDate=new Date(Date.parse(date+'T00:00:00Z')+offset*86400000).toISOString().slice(0,10);
 const client=selectDailyQuestions(seed.questions.map(q=>({...q.payload,slot:q.slot})),checkDate).map(q=>q.id);
 const server=(await db.query('select id from daily_question_ids($1) order by slot',[checkDate])).rows.map(q=>q.id);
 assert.deepEqual(client,server,'client/server rotation match for '+checkDate);
}
const cards=(await db.query('select q.* from daily_question_ids($1) x join questions q on x.id=q.id order by x.slot',[date])).rows;
assert.equal(cards.length,3);
for(const q of cards){const choice=q.payload.kind==='sort'?JSON.stringify(Object.fromEntries(q.payload.items.map(i=>[i.key,i.answer]))):q.correct_answer;const result=await db.query('select submit_answer($1,$2) correct',[q.id,choice]);assert.equal(result.rows[0].correct,true);}
assert.equal((await db.query('select coins from profiles')).rows[0].coins,3);
await db.query('select submit_answer($1,$2)',[cards[0].id,cards[0].correct_answer]);
assert.equal((await db.query('select coins from profiles')).rows[0].coins,3,'replay cannot award twice');
const progress=(await db.query('select save_progress($1) p',[{plays:{[date]:{results:[false,false,false],barya:999}},ginto:9999}])).rows[0].p;
assert.equal(progress.plays[date].barya,3,'server computes results');assert.equal(progress.ginto,0,'gold cannot be forged');
await db.query('select save_progress($1)',[{plays:{[date]:{hakbang:true}}}]);await db.query('select save_progress($1)',[{plays:{[date]:{hakbang:true}}}]);
assert.equal((await db.query('select progress from profiles')).rows[0].progress.ginto,5,'micro-action reward is idempotent');
await asUser(admin);assert.equal((await db.query('select * from profiles')).rows.length,3);
await db.query('select set_admin($1,true)',[other]);await db.query('select set_admin($1,false)',[other]);await rejected(()=>db.query('select set_admin($1,false)',[admin]),/another administrator/);
const override={...seed.questions[0],id:'override',scheduled_date:date,slot:1};
await db.query('insert into questions values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[override.id,override.text,override.choices,override.correct_answer,override.explanation,override.category,date,null,1,override.payload]);
assert.equal((await db.query('select id from daily_question_ids($1) where slot=1',[date])).rows[0].id,'override','date override takes priority');
// Verify the time-dependent Sunday branch with an injected clock in this test database only.
await db.exec('reset role');
const originalSave=(await db.query("select pg_get_functiondef('public.save_progress(jsonb)'::regprocedure) definition")).rows[0].definition;
await db.exec(originalSave.replaceAll('now()', "'2026-10-18T04:00:00Z'::timestamptz"));
await db.query('update profiles set progress=$1 where id=$2',[{plays:{'2026-10-18':{results:[true,true,true],barya:3,hakbang:false}},basag:{},ginto:0},other]);
await asUser(other);
await db.query('select save_progress($1)',[{basag:{'2026-10-12':'forged-item'}}]);
await db.query('select save_progress($1)',[{basag:{'2026-10-12':'forged-item'}}]);
const unlocked=(await db.query('select * from user_collections')).rows;
assert.equal(unlocked.length,1,'Sunday replay grants one reward only');
assert.equal(unlocked[0].item_id,seed.collection_items[0].id,'reward comes from server catalog, not client request');
await db.exec('reset role');
const wearable=seed.collection_items.find(i=>i.wearable);
await db.query('insert into user_collections(user_id,item_id,category) values($1,$2,$3)',[other,wearable.id,wearable.category]);
await asUser(other);await db.query('select equip_item($1)',[wearable.id]);
assert.equal((await db.query('select equipped_outfit from profiles')).rows[0].equipped_outfit,wearable.id);
await db.query('select equip_item(null)');assert.equal((await db.query('select equipped_outfit from profiles')).rows[0].equipped_outfit,null);
await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub','',false)");await db.exec('set role anon');
await rejected(()=>db.query('select * from profiles'),/permission denied/);await rejected(()=>db.query('select submit_answer($1,$2)',[cards[0].id,'SCAM']),/permission denied/);
await db.close();console.log('Database checks passed: RLS isolation, role changes, unlock/equip protection, server scoring, replay prevention, reward idempotency, date override, anonymous denial.');
