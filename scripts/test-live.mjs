// Creates one disposable QA account, validates the live flows, then removes it.
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
const url=process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const publicKey=process.env.VITE_SUPABASE_ANON_KEY;
const secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url || !publicKey || !secret || !process.env.HULOG_ADMIN_PASSWORD) throw new Error('Supply public configuration and server-only test credentials.');
const client=key=>createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
const server=client(secret), player=client(publicKey), admin=client(publicKey);
const name='qa_'+randomUUID().replaceAll('-','').slice(0,16);
const password=randomUUID()+'!';
let userId;
let secondUserId;
const check=({data,error})=>{if(error)throw new Error(error.message);return data;};
try {
  const signed=check(await player.auth.signUp({email:`${name}@players.hulog.internal`,password,options:{data:{username:name}}}));
  userId=signed.user?.id;
  assert.ok(userId && signed.session,'signup returns a session without email verification');
  const profile=check(await player.from('profiles').select('*').single());
  assert.equal(profile.is_admin,false);
  await player.from('profiles').update({is_admin:true}).eq('id',userId);
  assert.equal(check(await player.from('profiles').select('is_admin').single()).is_admin,false,'players cannot self-promote');
  assert.ok((await player.rpc('set_admin',{p_user:userId,p_admin:true})).error,'role RPC rejects players');
  const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Manila',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const ids=check(await player.rpc('daily_question_ids',{p_date:date}));
  assert.equal(ids.length,3);
  assert.deepEqual(ids.map(q=>q.id),['H-D001-1','H-D001-2','H-D001-3'],'new player starts on Day 1');
  const cards=check(await player.from('questions').select('*').in('id',ids.map(q=>q.id)));
  for(const card of cards) {
    const choice=card.payload.kind==='sort' ? JSON.stringify(Object.fromEntries(card.payload.items.map(i=>[i.key,i.answer]))) : card.correct_answer;
    assert.equal(check(await player.rpc('submit_answer',{p_question:card.id,p_choice:choice})),true);
    assert.equal(check(await player.rpc('submit_answer',{p_question:card.id,p_choice:choice})),true);
  }
  assert.equal(check(await player.from('profiles').select('coins').single()).coins,0,'daily earnings stay banked');
  assert.equal(check(await player.from('profiles').select('progress').single()).progress.alkansyaCoins,3,'replayed answers do not award extra coins');
  const progress=check(await player.rpc('save_progress',{p_progress:{plays:{[date]:{results:[false,false,false],barya:999}},ginto:999}}));
  assert.equal(progress.plays[date].barya,3);
  assert.equal(progress.ginto,0);
  assert.equal(progress.alkansyaCoins,4,'perfect bonus is banked once');
  assert.deepEqual(check(await player.rpc('daily_question_ids',{p_date:date})).map(q=>q.id),ids.map(q=>q.id),'saving never shifts today');
  for(const gap of [1,3,30]){
    const later=new Date(Date.parse(date+'T00:00:00Z')+gap*86400000).toISOString().slice(0,10);
    assert.deepEqual(check(await player.rpc('daily_question_ids',{p_date:later})).map(q=>q.id),['H-D002-1','H-D002-2','H-D002-3'],'skipping days resumes at Day 2');
  }
  const second=client(publicKey),secondName='qa_'+randomUUID().replaceAll('-','').slice(0,16);
  const secondSigned=check(await second.auth.signUp({email:secondName+'@players.hulog.internal',password:randomUUID()+'!',options:{data:{username:secondName}}}));
  secondUserId=secondSigned.user?.id;
  assert.ok(secondUserId&&secondSigned.session);
  assert.deepEqual(check(await second.rpc('daily_question_ids',{p_date:date})).map(q=>q.id),['H-D001-1','H-D001-2','H-D001-3'],'second player stays on Day 1 while first player advances');
  await second.auth.signOut();
  check(await player.rpc('save_progress',{p_progress:{plays:{[date]:{hakbang:true}}}}));
  check(await player.rpc('save_progress',{p_progress:{plays:{[date]:{hakbang:true}}}}));
  assert.equal(check(await player.from('profiles').select('progress').single()).progress.alkansyaCoins,9,'action is banked once');
  const returning=client(publicKey);
  check(await returning.auth.signInWithPassword({email:`${name}@players.hulog.internal`,password}));
  assert.equal(check(await returning.from('profiles').select('*').single()).progress.plays[date].barya,3,'progress restores in a fresh session');
  const wearable=check(await player.from('collection_items').select('id').eq('wearable',true).limit(1))[0];
  assert.ok((await player.rpc('equip_item',{p_item:wearable.id})).error,'locked outfits cannot be equipped');
  check(await admin.auth.signInWithPassword({email:'hermeshulog@players.hulog.internal',password:process.env.HULOG_ADMIN_PASSWORD}));
  assert.equal(check(await admin.from('profiles').select('is_admin').eq('username','hermeshulog').single()).is_admin,true);
  const adminBefore=check(await admin.from('profiles').select('*').eq('username','hermeshulog').single());
  assert.equal(adminBefore.coins,0);assert.equal(adminBefore.streak,0);
  const adminIds=check(await admin.rpc('daily_question_ids',{p_date:date}));
  const adminCards=check(await admin.from('questions').select('*').in('id',adminIds.map(q=>q.id)));
  for(let round=0;round<2;round++)for(const card of adminCards){
    assert.equal(check(await admin.rpc('submit_answer',{p_question:card.id,p_choice:card.correct_answer})),true);
  }
  check(await admin.rpc('save_progress',{p_progress:{plays:{[date]:{results:[true,true,true],hakbang:true}},alkansyaCoins:999,bestStreak:999}}));
  const adminAfter=check(await admin.from('profiles').select('*').eq('id',adminBefore.id).single());
  assert.equal(adminAfter.coins,0);assert.equal(adminAfter.streak,0);
  assert.equal(adminAfter.progress.alkansyaCoins,0);assert.equal(adminAfter.progress.bestStreak,0);
  assert.deepEqual(adminAfter.progress.plays,adminBefore.progress.plays,'admin practice never records daily completion');
  assert.ok((await admin.rpc('open_alkansya')).error,'admin weekly payouts are blocked');
  check(await admin.rpc('set_admin',{p_user:userId,p_admin:true}));
  assert.equal(check(await player.from('profiles').select('is_admin').eq('id',userId).single()).is_admin,true);
  check(await admin.rpc('set_admin',{p_user:userId,p_admin:false}));
  assert.equal(check(await player.from('profiles').select('*')).length,1,'demotion restores profile isolation immediately');
  await player.auth.signOut(); await returning.auth.signOut(); await admin.auth.signOut();
  console.log('Live checks passed: independent player sequences, skipped-day continuity, stable daily cards, immediate signup, role isolation, scoring, replay protection, restored progress, locked wearables, and admin promote/demote.');
} finally {
  for(const id of [userId,secondUserId].filter(Boolean)) {
    const {error}=await server.auth.admin.deleteUser(id);
    if(error)throw new Error('QA cleanup failed; inspect the disposable test account.');
    console.log('Disposable QA account and its progress removed.');
  }
}
