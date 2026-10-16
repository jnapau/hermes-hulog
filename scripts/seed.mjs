// Run server-side only after applying migrations. Never use VITE_ for service credentials.
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, HULOG_ADMIN_PASSWORD } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !HULOG_ADMIN_PASSWORD) throw new Error('Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and HULOG_ADMIN_PASSWORD in your server environment.');
const db=createClient(SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
const seed=JSON.parse(readFileSync(new URL('../supabase/seed-data.json',import.meta.url),'utf8'));
for(const table of ['questions','collection_items']) {
 const {error}=await db.from(table).upsert(seed[table],{onConflict:'id',ignoreDuplicates:true});if(error)throw error;
}
const email='hermeshulog@players.hulog.internal';
let admin;
for(let page=1;;page++) {const {data,error}=await db.auth.admin.listUsers({page,perPage:1000});if(error)throw error;admin=data.users.find(u=>u.email===email);if(admin||data.users.length<1000)break;}
if(admin && !admin.app_metadata?.hulog_seed) throw new Error('Reserved admin identity exists without a bootstrap marker. Verify ownership before promoting it.');
if(!admin){const {data,error}=await db.auth.admin.createUser({email,password:HULOG_ADMIN_PASSWORD,email_confirm:true,user_metadata:{username:'hermeshulog'},app_metadata:{hulog_seed:true}});if(error)throw error;admin=data.user;}
const {error}=await db.from('profiles').update({is_admin:true}).eq('id',admin.id);if(error)throw error;
console.log('Curriculum, collections, and hermeshulog administrator verified.');
