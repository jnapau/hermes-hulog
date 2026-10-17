import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";
import { build } from "esbuild";
const db = new PGlite();
console.log("Checking migrations and calendar…");
await db.exec(
  `create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb,raw_app_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema public,auth to anon,authenticated,service_role;grant execute on function auth.uid() to anon,authenticated,service_role;`,
);
for (const file of readdirSync(
  new URL("../supabase/migrations/", import.meta.url),
)
  .filter((f) => f.endsWith(".sql"))
  .sort()) {
  if (file.endsWith('_alkansya_economy.sql')) {
    await db.exec(`insert into auth.users(id,raw_user_meta_data) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','{"username":"upgrade_fixture"}');
      insert into collection_items values('farm-kalabaw','farm-life',false,0),('sagisag-kalabaw','national-symbols',false,1);
      insert into user_collections(user_id,item_id,category) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','farm-kalabaw','farm-life');
      update profiles set coins=37,progress='{"plays":{},"restTokens":2,"ginto":5}' where username='upgrade_fixture';`);
  }
  await db.exec(
    readFileSync(
      new URL("../supabase/migrations/" + file, import.meta.url),
      "utf8",
    ),
  );
  if (file.endsWith('_alkansya_economy.sql')) {
    const upgraded = (await db.query("select coins,progress from profiles where username='upgrade_fixture'")).rows[0];
    assert.equal(upgraded.coins,37,'upgrade preserves spendable savings');
    assert.equal(upgraded.progress.restTokens,2,'upgrade preserves shields');
    assert.equal(upgraded.progress.alkansyaCoins,0,'upgrade never duplicates legacy rewards');
    assert.equal((await db.query("select item_id from user_collections where item_id='sagisag-kalabaw'")).rows.length,1,'duplicate ownership maps to canonical item');
    assert.equal((await db.query("select active from collection_items where id='farm-kalabaw'")).rows[0].active,false);
    await db.exec("delete from auth.users where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';delete from collection_items where id='farm-kalabaw';");
  }
}
const seed = JSON.parse(
  readFileSync(new URL("../supabase/seed-data.json", import.meta.url), "utf8"),
);
const compiled = await build({
  entryPoints: ["src/lib/dailyQuestions.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { selectDailyQuestions } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString("base64")}`
);
assert.equal(seed.questions.length, 1095);
const curriculumMilestones = [
  ['2026-10-16', 101, 'foundational'],
  ['2026-11-16', 102, 'foundational'],
  ['2026-12-16', 103, 'foundational'],
  ['2027-01-01', 103, 'foundational'],
  ['2027-01-16', 103, 'intermediate'],
  ['2027-02-16', 104, 'intermediate'],
  ['2027-03-16', 104, 'intermediate'],
  ['2027-04-16', 105, 'intermediate'],
  ['2027-05-16', 105, 'intermediate'],
  ['2027-06-16', 106, 'advanced'],
  ['2027-07-16', 107, 'advanced'],
  ['2027-08-16', 108, 'advanced'],
  ['2027-09-16', 108, 'advanced'],
  ['2027-10-15', 108, 'advanced'],
];
for (const [date, course, progression] of curriculumMilestones) {
  const cards = seed.questions.filter(q => q.scheduled_date === date);
  assert.equal(cards.length, 3, `three curriculum cards on ${date}`);
  for (const { payload } of cards) {
    assert.equal(payload.course, course, `curriculum course on ${date}`);
    assert.equal(payload.progression, progression, `curriculum level on ${date}`);
  }
}
const progressionRank = { foundational: 0, intermediate: 1, advanced: 2 };
const chronological = [...seed.questions].sort((a,b) => a.scheduled_date.localeCompare(b.scheduled_date) || a.slot - b.slot);
for (let i = 1; i < chronological.length; i++) {
  assert.ok(chronological[i].payload.course >= chronological[i-1].payload.course, 'curriculum courses never reset');
  assert.ok(progressionRank[chronological[i].payload.progression] >= progressionRank[chronological[i-1].payload.progression], 'curriculum levels never regress');
}
const catalogSize = seed.collection_items.length;
assert.equal(catalogSize, 58);
for (const key of ["id", "nameEnglish", "nameFilipino"]) {
  const source = await build({
    entryPoints: ["src/data/collectibles.ts"],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
  });
  const { COLLECTIBLES } = await import(
    "data:text/javascript;base64," +
      Buffer.from(source.outputFiles[0].text).toString("base64")
  );
  assert.equal(
    new Set(COLLECTIBLES.map((c) => c[key])).size,
    catalogSize,
    "unique catalog " + key,
  );
  assert.equal(new Set(COLLECTIBLES.map((c) => c.kind)).size, 7);
}
for (const q of seed.questions) {
  assert.ok(q.payload.prompt.split(/\s+/).length <= 24);
  assert.ok(q.payload.why.includes("Rule of thumb:"));
  assert.ok(q.payload.whyFilipino.includes("Tip ng Araw:"));
  assert.ok(q.payload.hakbangEnglish);
  for (const o of q.payload.options || []) {
    assert.ok(o.text.split(/\s+/).length <= 8);
    assert.ok(o.textFilipino.split(/\s+/).length <= 8);
  }
}
console.log("Seeding question fixtures…");
for (const q of seed.questions)
  await db.query(
    "insert into questions values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      q.id,
      q.text,
      q.choices,
      q.correct_answer,
      q.explanation,
      q.category,
      q.scheduled_date,
      q.recurring_day,
      q.slot,
      q.payload,
    ],
  );
console.log("Checking complete calendar…");
const calendar = (
  await db.query(
    "select d::date::text as play_day,x.id,x.slot from generate_series('2026-10-16'::date,'2027-10-15'::date,'1 day') d cross join lateral daily_question_ids(d::date) x order by d,x.slot",
  )
).rows;
assert.equal(calendar.length, 1095);
assert.equal(
  new Set(calendar.map((c) => c.id)).size,
  1095,
  "no repeats in 2026-10-16..2027-10-15",
);
for (let i = 0; i < 365; i++) {
  const date = new Date(Date.UTC(2026, 9, 16 + i)).toISOString().slice(0, 10);
  const selected = selectDailyQuestions(
    seed.questions.map((q) => q.payload),
    date,
  );
  assert.deepEqual(
    selected.map((q) => q.id),
    calendar.filter((c) => c.play_day === date).map((c) => c.id),
    "2026–2027 client/server agreement " + date,
  );
  assert.deepEqual(
    selected.map((q) => q.difficulty),
    ["easy", "medium", "challenge"],
  );
  assert.equal(selected[0].kind, "binary");
  const dom = Number(date.slice(8));
  if (dom === 15 || dom === 30)
    assert.ok(
      selected.every((q) => q.paydaySpecial),
      "all payday slots use allocation",
    );
}
for (const i of seed.collection_items)
  await db.query(
    "insert into collection_items(id,category,wearable,reward_order,price,financial_role) values($1,$2,$3,$4,$5,$6) on conflict(id) do update set price=excluded.price,financial_role=excluded.financial_role",
    [i.id, i.category, i.wearable, i.reward_order, i.price, i.financial_role],
  );
console.log("Checking permissions and economy…");
const player = "11111111-1111-4111-8111-111111111111",
  admin = "22222222-2222-4222-8222-222222222222",
  other = "33333333-3333-4333-8333-333333333333";
for (const [id, username] of [
  [player, "player_one"],
  [admin, "admin_one"],
  [other, "player_two"],
])
  await db.query("insert into auth.users values($1,$2)", [id, { username }]);
await assert.rejects(
  () =>
    db.query("insert into auth.users(id,raw_user_meta_data) values($1,$2)", [
      "44444444-4444-4444-8444-444444444444",
      { username: "hermeshulog" },
    ]),
  /reserved/,
);
// Mirror Auth's INSERT-before-app_metadata sequence used by admin.createUser.
await db.query("insert into auth.users(id,raw_user_meta_data) values($1,$2)", [
  "55555555-5555-4555-8555-555555555555",
  { username: "seed_regression" },
]);
assert.equal(
  (
    await db.query(
      "select is_admin from profiles where username='seed_regression'",
    )
  ).rows[0].is_admin,
  false,
);
await db.query("update auth.users set raw_app_meta_data='{}' where id=$1", [
  "55555555-5555-4555-8555-555555555555",
]);
// Remove only this in-memory fixture so existing row-count assertions stay precise.
await db.query("delete from auth.users where id=$1", [
  "55555555-5555-4555-8555-555555555555",
]);
await db.query("update profiles set is_admin=true where id=$1", [admin]);
assert.equal(
  (await db.query("select * from user_collections where user_id=$1", [admin]))
    .rows.length,
  catalogSize,
  "trusted admin promotion unlocks entire catalog",
);
async function asUser(id) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
  await db.exec("set role authenticated");
}
async function rejected(fn, pattern) {
  await assert.rejects(fn, pattern);
}
await asUser(player);
assert.equal(
  (await db.query("select * from profiles")).rows.length,
  1,
  "player sees only own profile",
);
await rejected(
  () => db.query("update profiles set is_admin=true where id=$1", [player]),
  /permission denied/,
);
await rejected(
  () => db.query("select set_admin($1,true)", [other]),
  /Administrator access required/,
);
await rejected(
  () =>
    db.query(
      "insert into user_collections(user_id,item_id,category) values($1,$2,$3)",
      [player, seed.collection_items[0].id, "ph-money"],
    ),
  /permission denied/,
);
await rejected(
  () =>
    db.query("select equip_item($1)", [
      seed.collection_items.find((i) => i.wearable).id,
    ]),
  /Unlock this wearable/,
);
await rejected(
  () =>
    db
      .query(
        'select save_progress(\'{"plays":{},"coins":99999,"is_admin":true,"ginto":9999,"basag":{"fake":"x"}}\')',
      )
      .then((r) => {
        assert.equal(r.rows[0].save_progress.ginto, 0);
        throw new Error("verified spoof ignored");
      }),
  /verified spoof ignored/,
);
const date = (
  await db.query("select (now() at time zone 'Asia/Manila')::date::text d")
).rows[0].d;
for (let offset = 0; offset < 31; offset++) {
  const checkDate = new Date(
    Date.parse(date + "T00:00:00Z") + offset * 86400000,
  )
    .toISOString()
    .slice(0, 10);
  const client = selectDailyQuestions(
    seed.questions.map((q) => ({ ...q.payload, slot: q.slot })),
    checkDate,
  ).map((q) => q.id);
  const server = (
    await db.query("select id from daily_question_ids($1) order by slot", [
      checkDate,
    ])
  ).rows.map((q) => q.id);
  assert.deepEqual(
    client,
    server,
    "client/server rotation match for " + checkDate,
  );
}
const cards = (
  await db.query(
    "select q.* from daily_question_ids($1) x join questions q on x.id=q.id order by x.slot",
    [date],
  )
).rows;
assert.equal(cards.length, 3);
for (const q of cards) {
  const choice =
    q.payload.kind === "sort"
      ? JSON.stringify(
          Object.fromEntries(q.payload.items.map((i) => [i.key, i.answer])),
        )
      : q.correct_answer;
  const result = await db.query("select submit_answer($1,$2) correct", [
    q.id,
    choice,
  ]);
  assert.equal(result.rows[0].correct, true);
}
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  3,
);
assert.equal(
  (await db.query("select coins from profiles")).rows[0].coins,
  0,
  "daily coins stay banked",
);
await db.query("select submit_answer($1,$2)", [
  cards[0].id,
  cards[0].correct_answer,
]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  3,
  "replay cannot award twice",
);
const progress = (
  await db.query("select save_progress($1) p", [
    {
      plays: { [date]: { results: [false, false, false], barya: 999 } },
      ginto: 9999,
    },
  ])
).rows[0].p;
assert.equal(progress.plays[date].barya, 3, "server computes results");
assert.equal(progress.ginto, 0, "gold cannot be forged");
assert.equal(progress.alkansyaCoins, 4, "perfect bonus adds exactly one");
await db.query("select save_progress($1)", [
  { plays: { [date]: { results: [true, true, true] } } },
]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  4,
  "perfect replay is idempotent",
);
await db.query("select save_progress($1)", [
  { plays: { [date]: { hakbang: true } } },
]);
await db.query("select save_progress($1)", [
  { plays: { [date]: { hakbang: true } } },
]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress.ginto,
  5,
  "micro-action reward is idempotent",
);
await asUser(admin);
assert.equal((await db.query("select * from profiles")).rows.length, 3);
for (let round = 0; round < 3; round++) {
  for (const q of cards) {
    const res = await db.query("select submit_answer($1,$2) correct", [
      q.id,
      q.correct_answer,
    ]);
    assert.equal(res.rows[0].correct, true, "admin answer evaluates correctly");
  }
}
assert.equal(
  (await db.query("select * from user_answers where user_id=$1", [admin])).rows
    .length,
  0,
  "admin answers are never recorded in user_answers",
);
const adminSaved = (
  await db.query("select save_progress($1) p", [
    { plays: { [date]: { results: [true, true, true], hakbang: true } } },
  ])
).rows[0].p;
assert.equal(
  adminSaved.plays[date],
  undefined,
  "admin daily play is never locked out",
);
await db.query("select set_admin($1,true)", [other]);
await db.query("select set_admin($1,true)", [other]);
assert.equal(
  (await db.query("select * from user_collections where user_id=$1", [other]))
    .rows.length,
  catalogSize,
  "RPC promotion unlocks all items idempotently",
);
await db.query("select equip_item($1)", [
  seed.collection_items.find((i) => i.wearable).id,
]);
await rejected(
  () =>
    db.query("select equip_item($1)", [
      seed.collection_items.find((i) => !i.wearable).id,
    ]),
  /Unlock this wearable/,
);
await db.query("select set_admin($1,false)", [other]);
await rejected(
  () => db.query("select set_admin($1,false)", [admin]),
  /another administrator/,
);
// Admin entitlement still permits equip when a legacy ownership row is missing.
await db.exec("reset role");
const adminWearable = seed.collection_items.find((i) => i.wearable);
await db.query("delete from user_collections where user_id=$1 and item_id=$2", [
  admin,
  adminWearable.id,
]);
await asUser(admin);
await db.query("select equip_item($1)", [adminWearable.id]);
const override = {
  ...seed.questions[0],
  id: "override",
  scheduled_date: date,
  slot: 1,
};
await db.query(
  "update questions set scheduled_date=null where scheduled_date=$1 and slot=1",
  [date],
);
await db.query("insert into questions values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [
  override.id,
  override.text,
  override.choices,
  override.correct_answer,
  override.explanation,
  override.category,
  date,
  null,
  1,
  override.payload,
]);
assert.equal(
  (await db.query("select id from daily_question_ids($1) where slot=1", [date]))
    .rows[0].id,
  "override",
  "date override takes priority",
);
// Freeze only the payout function's clock, leaving production SQL untouched.
await db.exec("reset role");
const originalOpen = (
  await db.query(
    "select pg_get_functiondef('public.open_alkansya()'::regprocedure) definition",
  )
).rows[0].definition;
await db.exec(
  originalOpen.replaceAll("now()", "'2026-10-18T04:00:00Z'::timestamptz"),
);
await asUser(player);
await db.query("select save_progress($1)", [
  { basag: { "2026-10-12": "forged-item" } },
]);
assert.equal(
  (await db.query("select * from user_collections")).rows.length,
  0,
  "old Sunday request grants nothing",
);
// Need a completed Sunday even when the bank has savings.
await db.exec("reset role");
await db.query("update profiles set progress=$1 where id=$2", [
  { plays: {}, cashouts: {}, alkansyaCoins: 63 },
  player,
]);
await asUser(player);
await rejected(() => db.query("select open_alkansya()"), /Complete Sunday/);
await db.exec("reset role");
await db.query("update profiles set progress=$1 where id=$2", [
  {
    plays: {
      "2026-10-18": { results: [true, true, true], barya: 3, hakbang: true },
    },
    cashouts: {},
    alkansyaCoins: 63,
    restTokens: 0,
  },
  player,
]);
const assets = seed.collection_items.filter(
  (i) => i.financial_role === "Asset",
);
for (const asset of assets.slice(0, 8))
  await db.query(
    "insert into user_collections(user_id,item_id,category) values($1,$2,$3)",
    [player, asset.id, asset.category],
  );
await asUser(player);
const receipt = (await db.query("select open_alkansya() r")).rows[0].r;
assert.deepEqual(
  receipt,
  { saved: 63, passive: 6, total: 69 },
  "asset bonus caps at six",
);
await db.query("select open_alkansya()");
assert.equal(
  (await db.query("select coins from profiles")).rows[0].coins,
  69,
  "Sunday replay cannot pay twice",
);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  0,
);
assert.equal(
  (await db.query("select * from user_collections")).rows.length,
  8,
  "payout never grants collectibles",
);
await rejected(
  () => db.query("select purchase_item($1)", ["fake-item"]),
  /unavailable/,
);
const pricey = seed.collection_items.find((i) => i.price === 80);
await rejected(
  () => db.query("select purchase_item($1)", [pricey.id]),
  /Save more Wallet/,
);
const cheap = seed.collection_items.find(
  (i) => i.price === 15 && i.financial_role === "Want",
);
await db.query("select save_progress($1)", [
  { targetGoal: cheap.id, alkansyaCoins: 99999, restTokens: 999 },
]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress.targetGoal,
  cheap.id,
);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  0,
  "cannot forge bank",
);
await db.query("select purchase_item($1)", [cheap.id]);
await db.query("select purchase_item($1)", [cheap.id]);
assert.equal(
  (await db.query("select coins from profiles")).rows[0].coins,
  54,
  "purchase deducts once",
);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress.targetGoal,
  null,
  "purchased goal clears",
);
// Three heritage reserves grant one shield, independently of forged settings.
await db.exec("reset role");
await db.query("update profiles set coins=1000 where id=$1", [player]);
await asUser(player);
for (const item of seed.collection_items
  .filter((i) => i.financial_role === "Reserve")
  .slice(0, 6))
  await db.query("select purchase_item($1)", [item.id]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress.restTokens,
  2,
);
// A late Sunday action stays banked for the next payout, never lost or paid twice.
await db.exec("reset role");
const originalSave = (
  await db.query(
    "select pg_get_functiondef('public.save_progress(jsonb)'::regprocedure) definition",
  )
).rows[0].definition;
await db.exec(
  originalSave.replaceAll("now()", "'2026-10-18T04:00:00Z'::timestamptz"),
);
await db.query(
  "update profiles set progress=jsonb_set(progress,'{plays,2026-10-18,hakbang}','false') where id=$1",
  [player],
);
await asUser(player);
await db.query("select save_progress($1)", [
  { plays: { "2026-10-18": { hakbang: true } } },
]);
await db.query("select save_progress($1)", [
  { plays: { "2026-10-18": { hakbang: true } } },
]);
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  5,
);
await db.query("select open_alkansya()");
assert.equal(
  (await db.query("select progress from profiles")).rows[0].progress
    .alkansyaCoins,
  5,
);
// Monday rejects collection, even with saved coins.
await db.exec("reset role");
await db.exec(
  originalOpen.replaceAll("now()", "'2026-10-19T04:00:00Z'::timestamptz"),
);
await asUser(player);
await rejected(() => db.query("select open_alkansya()"), /Complete Sunday/);

// Equip validation and anonymous access remain part of the economy contract.
await db.exec("reset role");
const wearable = seed.collection_items.find((i) => i.wearable);
await db.query(
  "insert into user_collections(user_id,item_id,category) values($1,$2,$3) on conflict do nothing",
  [player, wearable.id, wearable.category],
);
await asUser(player);
await db.query("select equip_item($1)", [wearable.id]);
assert.equal(
  (await db.query("select equipped_outfit from profiles")).rows[0]
    .equipped_outfit,
  wearable.id,
);
await db.query("select equip_item(null)");
assert.equal(
  (await db.query("select equipped_outfit from profiles")).rows[0]
    .equipped_outfit,
  null,
);
await db.exec("reset role");
await db.query("select set_config('request.jwt.claim.sub','',false)");
await db.exec("set role anon");
await rejected(() => db.query("select * from profiles"), /permission denied/);
await rejected(() => db.query("select open_alkansya()"), /permission denied/);
await rejected(
  () => db.query("select purchase_item($1)", ["x"]),
  /permission denied/,
);
await rejected(
  () => db.query("select submit_answer($1,$2)", [cards[0].id, "SCAM"]),
  /permission denied/,
);
await db.close();
console.log(
  "Database checks passed: 365-day scheduling, RLS isolation, server scoring, perfect bonus, bank/wallet separation, Sunday eligibility and replay, capped asset bonus, purchases, goals, reserve shields, late actions, equip protection, anonymous denial.",
);
