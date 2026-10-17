-- Server-owned administrator entitlement. No client write access is added.
create or replace function public.equip_item(p_item text) returns void
language plpgsql security definer set search_path = public as $$
begin
 if auth.uid() is null then raise exception 'Sign in first'; end if;
 if p_item is not null and not exists (
   select 1 from public.collection_items i where i.id=p_item and i.wearable
   and (public.is_admin() or exists (
     select 1 from public.user_collections c where c.user_id=auth.uid() and c.item_id=i.id
   ))
 ) then raise exception 'Unlock this wearable first'; end if;
 update public.profiles set equipped_outfit=p_item where id=auth.uid();
end; $$;

create or replace function public.set_admin(p_user uuid,p_admin boolean) returns void
language plpgsql security definer set search_path = public as $$
begin
 perform pg_advisory_xact_lock(71026);
 if not public.is_admin() then raise exception 'Administrator access required'; end if;
 if p_user=auth.uid() then raise exception 'Ask another administrator to change your own role'; end if;
 update public.profiles set is_admin=p_admin where id=p_user;
 if not found then raise exception 'User not found'; end if;
 if p_admin then
   insert into public.user_collections(user_id,item_id,category)
   select p_user,id,category from public.collection_items on conflict(user_id,item_id) do nothing;
 end if;
end; $$;

-- Covers server-side bootstrap and any other trusted promotion path as well.
create function public.unlock_admin_collection() returns trigger
language plpgsql security definer set search_path = public as $$
begin
 if new.is_admin then
   insert into public.user_collections(user_id,item_id,category)
   select new.id,id,category from public.collection_items on conflict(user_id,item_id) do nothing;
 end if;
 return new;
end; $$;
create trigger admin_collection_entitlement after insert or update of is_admin on public.profiles
for each row execute function public.unlock_admin_collection();

-- Future catalog additions also belong to all existing administrators.
create function public.unlock_catalog_item_for_admins() returns trigger
language plpgsql security definer set search_path = public as $$
begin
 insert into public.user_collections(user_id,item_id,category)
 select id,new.id,new.category from public.profiles where is_admin
 on conflict(user_id,item_id) do nothing;
 return new;
end; $$;
create trigger admin_new_catalog_item after insert on public.collection_items
for each row execute function public.unlock_catalog_item_for_admins();

insert into public.user_collections(user_id,item_id,category)
select p.id,i.id,i.category from public.profiles p cross join public.collection_items i
where p.is_admin on conflict(user_id,item_id) do nothing;

revoke all on function public.unlock_admin_collection(),public.unlock_catalog_item_for_admins() from public,anon,authenticated;
revoke all on function public.equip_item(text),public.set_admin(uuid,boolean) from public,anon;
grant execute on function public.equip_item(text),public.set_admin(uuid,boolean) to authenticated;
