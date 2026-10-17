-- Wallet is spendable; daily earnings remain in the bank until Sunday.
-- Definer RPCs are required because clients have no direct profile/collection write policy.
-- Every economy RPC authenticates, locks only auth.uid() and ignores client reward amounts.
-- New RPCs revoke PUBLIC/anon execution; existing RLS remains enabled on every table.
-- Existing wallet balances and legitimate legacy ownership are preserved.
alter table public.collection_items drop constraint if exists collection_items_reward_order_key;
alter table public.collection_items add column price integer not null default 30 check(price in (15,30,50,80));
alter table public.collection_items add column financial_role text not null default 'Want' check(financial_role in ('Asset','Reserve','Want'));
alter table public.collection_items add column active boolean not null default true;
insert into public.collection_items(id,category,wearable,reward_order,price,financial_role) values
('salapi-piloncitos','ph-money',false,0,80,'Reserve'),
('sagisag-sampaguita','national-symbols',false,1,15,'Reserve'),
('antigo-kawayang-alkansya','ancient-things',false,2,15,'Reserve'),
('farm-araro','farm-life',false,3,15,'Asset'),
('damit-barot-saya','national-costumes',true,4,30,'Want'),
('aswang-tikbalang','aswang-monsters',true,5,50,'Want'),
('merienda-halo-halo','merienda',false,6,30,'Want'),
('salapi-1-piso-1903','ph-money',false,7,30,'Reserve'),
('sagisag-narra','national-symbols',false,8,30,'Reserve'),
('antigo-palayok','ancient-things',false,9,15,'Reserve'),
('farm-bilao','farm-life',false,10,15,'Asset'),
('damit-barong-tagalog','national-costumes',true,11,30,'Want'),
('aswang-manananggal','aswang-monsters',true,12,80,'Want'),
('merienda-taho','merienda',false,13,15,'Want'),
('salapi-emergency-notes-1942','ph-money',false,14,50,'Reserve'),
('sagisag-agila','national-symbols',false,15,80,'Reserve'),
('antigo-manunggul-jar','ancient-things',false,16,80,'Reserve'),
('farm-itak','farm-life',false,17,15,'Asset'),
('damit-terno','national-costumes',true,18,50,'Want'),
('aswang-kapre','aswang-monsters',true,19,30,'Want'),
('merienda-bibingka','merienda',false,20,30,'Want'),
('salapi-cbp-english-1949','ph-money',false,21,15,'Reserve'),
('sagisag-anahaw','national-symbols',false,22,15,'Reserve'),
('antigo-maitum-pottery','ancient-things',false,23,50,'Reserve'),
('farm-karit','farm-life',false,24,15,'Asset'),
('damit-tboli','national-costumes',true,25,50,'Want'),
('aswang-bakunawa','aswang-monsters',true,26,80,'Want'),
('merienda-sorbetes','merienda',false,27,50,'Want'),
('salapi-pilipino-1969','ph-money',false,28,15,'Reserve'),
('sagisag-arnis','national-symbols',false,29,30,'Reserve'),
('antigo-gintong-tara','ancient-things',false,30,80,'Reserve'),
('farm-dulos','farm-life',false,31,15,'Asset'),
('damit-inaul','national-costumes',true,32,30,'Want'),
('aswang-sirena','aswang-monsters',true,33,30,'Want'),
('merienda-pandesal','merienda',false,34,15,'Want'),
('salapi-bagong-lipunan-1973','ph-money',false,35,15,'Reserve'),
('sagisag-kalabaw','national-symbols',false,36,15,'Reserve'),
('antigo-balangay','ancient-things',false,37,50,'Reserve'),
('farm-kabyawan','farm-life',false,38,30,'Asset'),
('damit-yakan','national-costumes',true,39,30,'Want'),
('aswang-diwata','aswang-monsters',true,40,50,'Want'),
('merienda-turon','merienda',false,41,15,'Want'),
('salapi-ngc-2010','ph-money',false,42,30,'Reserve'),
('sagisag-mangga','national-symbols',false,43,15,'Reserve'),
('antigo-lantaka','ancient-things',false,44,30,'Reserve'),
('farm-bangko','farm-life',false,45,15,'Asset'),
('damit-salakot-kimona','national-costumes',true,46,15,'Want'),
('aswang-nuno','aswang-monsters',true,47,15,'Want'),
('salapi-polymer-2022','ph-money',false,48,80,'Reserve'),
('sagisag-bahay-kubo','national-symbols',false,49,50,'Reserve'),
('antigo-sungka','ancient-things',false,50,15,'Reserve'),
('farm-bayong','farm-life',false,51,15,'Asset'),
('damit-kalinga','national-costumes',true,52,50,'Want'),
('aswang-tiyanak','aswang-monsters',true,53,30,'Want'),
('antigo-laguna-copperplate','ancient-things',false,54,50,'Reserve'),
('farm-basnig','farm-life',false,55,30,'Asset'),
('damit-katipunero','national-costumes',true,56,15,'Want'),
('farm-habihan','farm-life',false,57,50,'Asset')
on conflict(id) do update set category=excluded.category,wearable=excluded.wearable,reward_order=excluded.reward_order,price=excluded.price,financial_role=excluded.financial_role,active=true;
-- Retire placeholder duplicates; map prior ownership without charging again.
do $$ declare old_id text; new_id text; begin
 for old_id,new_id in select * from (values ('farm-kalabaw','sagisag-kalabaw'),('farm-mangga','sagisag-mangga'),('money-spanish-peso','salapi-1-piso-1903')) m(old_id,new_id) loop
  insert into public.user_collections(user_id,item_id,category) select c.user_id,new_id,i.category from public.user_collections c join public.collection_items i on i.id=new_id where c.item_id=old_id on conflict(user_id,item_id) do nothing;
  update public.profiles set equipped_outfit=new_id where equipped_outfit=old_id;
 end loop;
end; $$;
update public.collection_items set active=false where id not in ('salapi-piloncitos','sagisag-sampaguita','antigo-kawayang-alkansya','farm-araro','damit-barot-saya','aswang-tikbalang','merienda-halo-halo','salapi-1-piso-1903','sagisag-narra','antigo-palayok','farm-bilao','damit-barong-tagalog','aswang-manananggal','merienda-taho','salapi-emergency-notes-1942','sagisag-agila','antigo-manunggul-jar','farm-itak','damit-terno','aswang-kapre','merienda-bibingka','salapi-cbp-english-1949','sagisag-anahaw','antigo-maitum-pottery','farm-karit','damit-tboli','aswang-bakunawa','merienda-sorbetes','salapi-pilipino-1969','sagisag-arnis','antigo-gintong-tara','farm-dulos','damit-inaul','aswang-sirena','merienda-pandesal','salapi-bagong-lipunan-1973','sagisag-kalabaw','antigo-balangay','farm-kabyawan','damit-yakan','aswang-diwata','merienda-turon','salapi-ngc-2010','sagisag-mangga','antigo-lantaka','farm-bangko','damit-salakot-kimona','aswang-nuno','salapi-polymer-2022','sagisag-bahay-kubo','antigo-sungka','farm-bayong','damit-kalinga','aswang-tiyanak','antigo-laguna-copperplate','farm-basnig','damit-katipunero','farm-habihan');
update public.profiles set progress=progress || jsonb_build_object('alkansyaCoins',coalesce((progress->>'alkansyaCoins')::integer,0),'cashouts',coalesce(progress->'cashouts','{}'::jsonb),'reserveMilestones',(select count(*)/3 from public.user_collections c join public.collection_items i on i.id=c.item_id where c.user_id=profiles.id and i.active and i.financial_role='Reserve'));
create or replace function public.submit_answer(p_question text,p_choice text) returns boolean language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Asia/Manila')::date; q public.questions; correct boolean; existing boolean; mapping jsonb;
begin
 if auth.uid() is null then raise exception 'Sign in to play'; end if;
 perform 1 from public.profiles where id=auth.uid() for update;
 select is_correct into existing from public.user_answers where user_id=auth.uid() and question_id=p_question and play_date=d;
 if found then return existing; end if;
 if not exists(select 1 from public.daily_question_ids(d) x where x.id=p_question) then raise exception 'This card is not scheduled for today'; end if;
 if exists(select 1 from public.profiles where id=auth.uid() and progress->'plays' ? d::text) then raise exception 'Daily drop already completed'; end if;
 select * into strict q from public.questions where id=p_question;
 if q.payload->>'kind'='sort' then
   mapping := p_choice::jsonb;
   correct := jsonb_typeof(mapping)='object' and not exists(select 1 from jsonb_array_elements(q.payload->'items') i where mapping->>(i->>'key') is distinct from i->>'answer');
 else
   if q.payload->'options' is not null and not exists(select 1 from jsonb_array_elements(q.payload->'options') o where o->>'key'=p_choice) then raise exception 'Invalid choice'; end if;
   correct := p_choice=q.correct_answer;
 end if;
 insert into public.user_answers(user_id,question_id,user_choice,is_correct,play_date) values(auth.uid(),p_question,p_choice,coalesce(correct,false),d);
 update public.profiles set progress=jsonb_set(progress,'{alkansyaCoins}',to_jsonb(coalesce((progress->>'alkansyaCoins')::integer,0)+case when correct then 1 else 0 end)) where id=auth.uid();
 return coalesce(correct,false);
end; $$;


create or replace function public.save_progress(p_progress jsonb) returns jsonb language plpgsql security definer set search_path = public as $$
declare p public.profiles; d date := (now() at time zone 'Asia/Manila')::date; result jsonb; scores jsonb; n integer; score integer; wk date; chain integer:=0; cursor_day date; gaps integer:=0; missed integer; last_day date; tokens integer;
begin
 if auth.uid() is null then raise exception 'Sign in to save'; end if;
 select * into strict p from public.profiles where id=auth.uid() for update;
 result := '{"plays":{},"basag":{},"cashouts":{},"alkansyaCoins":0,"ginto":0,"restTokens":0,"restDays":[],"bestStreak":0}'::jsonb || p.progress;
 wk:=d-((extract(dow from d)::integer+6)%7);
 if (p_progress->'plays' ? d::text) and not (result->'plays' ? d::text) then
  select count(*),jsonb_agg(a.is_correct order by x.slot),count(*) filter(where a.is_correct) into n,scores,score from public.daily_question_ids(d) x join public.user_answers a on a.question_id=x.id and a.user_id=auth.uid() and a.play_date=d;
  if n<>3 then raise exception 'Complete all three scheduled cards before saving'; end if;
  select max(k::date) into last_day from jsonb_object_keys(result->'plays') k;
  missed:=d-last_day-1; tokens:=coalesce((result->>'restTokens')::integer,0);
  if missed>=2 and tokens>=missed-1 then
   for n in 2..missed loop result:=jsonb_set(result,'{restDays}',(result->'restDays')||to_jsonb((d-n)::text)); end loop;
   result:=jsonb_set(result,'{restTokens}',to_jsonb(tokens-missed+1));
  end if;
  result:=jsonb_set(result,array['plays',d::text],jsonb_build_object('results',scores,'barya',score,'perfectBonus',case when score=3 then 1 else 0 end,'hakbang',false,'at',now()));
  if score=3 then result:=jsonb_set(result,'{alkansyaCoins}',to_jsonb((result->>'alkansyaCoins')::integer+1)); end if;
  select count(*) into n from jsonb_object_keys(result->'plays') k where k::date between wk and wk+6;
  if n=5 then result:=jsonb_set(result,'{restTokens}',to_jsonb(least(3,(result->>'restTokens')::integer+1))); end if;
 end if;
 if coalesce((p_progress->'plays'->d::text->>'hakbang')::boolean,false) and result->'plays' ? d::text and not coalesce((result->'plays'->d::text->>'hakbang')::boolean,false) then
  result:=jsonb_set(result,array['plays',d::text,'hakbang'],'true');
  result:=jsonb_set(result,'{alkansyaCoins}',to_jsonb((result->>'alkansyaCoins')::integer+5));
  result:=jsonb_set(result,'{ginto}',to_jsonb((result->>'ginto')::integer+5));
 end if;
 -- Settings and a valid, still-locked catalog goal are the only client-owned fields.
 result:=result||jsonb_build_object('sound',coalesce((p_progress->>'sound')::boolean,true),'checkinTime',left(coalesce(p_progress->>'checkinTime','07:15'),5),'ritual',left(coalesce(p_progress->>'ritual','make coffee'),120));
 if p_progress ? 'targetGoal' then
  if p_progress->>'targetGoal' is null then result:=result||'{"targetGoal":null}'::jsonb;
  elsif exists(select 1 from public.collection_items i where i.id=p_progress->>'targetGoal' and i.active and not exists(select 1 from public.user_collections c where c.user_id=auth.uid() and c.item_id=i.id)) then result:=result||jsonb_build_object('targetGoal',p_progress->>'targetGoal'); end if;
 end if;
 cursor_day:=d;
 if not(result->'plays' ? cursor_day::text) then cursor_day:=cursor_day-1; end if;
 if not(result->'plays' ? cursor_day::text) and not(result->'restDays' ? cursor_day::text) then cursor_day:=cursor_day-1; end if;
 for n in 1..1100 loop
  if result->'plays' ? cursor_day::text or result->'restDays' ? cursor_day::text then
   if result->'plays' ? cursor_day::text then chain:=chain+1; end if; gaps:=0;
  else gaps:=gaps+1;exit when gaps>=2;end if;
  cursor_day:=cursor_day-1;
 end loop;
 result:=jsonb_set(result,'{bestStreak}',to_jsonb(greatest(chain,(result->>'bestStreak')::integer)));
 update public.profiles set progress=result,streak=chain where id=auth.uid();
 return result;
end; $$;

create function public.open_alkansya() returns jsonb language plpgsql security definer set search_path = public as $$
declare p public.profiles; d date:=(now() at time zone 'Asia/Manila')::date; wk text; receipt jsonb; saved integer; passive integer;
begin
 if auth.uid() is null then raise exception 'Sign in to collect'; end if;
 select * into strict p from public.profiles where id=auth.uid() for update;
 if extract(dow from d)<>0 or not(coalesce(p.progress->'plays','{}'::jsonb) ? d::text) then raise exception 'Complete Sunday’s drop before opening the Alkansya'; end if;
 wk:=(d-6)::text;
 if coalesce(p.progress->'cashouts','{}'::jsonb) ? wk then return p.progress->'cashouts'->wk; end if;
 select least(6,count(*)) into passive from public.user_collections c join public.collection_items i on i.id=c.item_id where c.user_id=auth.uid() and i.active and i.financial_role='Asset';
 saved:=coalesce((p.progress->>'alkansyaCoins')::integer,0);
 receipt:=jsonb_build_object('saved',saved,'passive',passive,'total',saved+passive);
 update public.profiles set coins=coins+saved+passive,progress=jsonb_set(jsonb_set(p.progress,'{alkansyaCoins}','0'),'{cashouts}',coalesce(p.progress->'cashouts','{}'::jsonb)||jsonb_build_object(wk,receipt)) where id=auth.uid();
 return receipt;
end; $$;

create function public.purchase_item(p_item text) returns void language plpgsql security definer set search_path = public as $$
declare p public.profiles; item public.collection_items; reserves integer; milestone integer; result jsonb;
begin
 if auth.uid() is null then raise exception 'Sign in to shop'; end if;
 select * into strict p from public.profiles where id=auth.uid() for update;
 select * into item from public.collection_items where id=p_item and active;
 if not found then raise exception 'This treasure is unavailable'; end if;
 if exists(select 1 from public.user_collections where user_id=auth.uid() and item_id=p_item) then return; end if;
 if p.coins<item.price then raise exception 'Save more Wallet coins before buying this treasure'; end if;
 insert into public.user_collections(user_id,item_id,category) values(auth.uid(),item.id,item.category);
 result:=p.progress;
 if result->>'targetGoal'=p_item then result:=result||'{"targetGoal":null}'::jsonb; end if;
 if item.financial_role='Reserve' then
  select count(*) into reserves from public.user_collections c join public.collection_items i on i.id=c.item_id where c.user_id=auth.uid() and i.active and i.financial_role='Reserve';
  milestone:=reserves/3;
  if milestone>coalesce((result->>'reserveMilestones')::integer,0) then
   result:=result||jsonb_build_object('restTokens',least(3,coalesce((result->>'restTokens')::integer,0)+1),'reserveMilestones',milestone);
  end if;
 end if;
 update public.profiles set coins=coins-item.price,progress=result where id=auth.uid();
end; $$;
revoke all on function public.open_alkansya(),public.purchase_item(text) from public,anon;
grant execute on function public.open_alkansya(),public.purchase_item(text) to authenticated;
