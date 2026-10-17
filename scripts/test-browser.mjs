const { chromium } = await import(
  process.env.HULOG_PLAYWRIGHT_MODULE || "playwright"
);
import { readFileSync, mkdirSync } from "node:fs";
import assert from "node:assert/strict";
const seed = JSON.parse(readFileSync("supabase/seed-data.json", "utf8"));
const out = "artifacts/qa";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.HULOG_BROWSER_PATH ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});
const today = "2026-10-18",
  user = {
    id: "11111111-1111-4111-8111-111111111111",
    aud: "authenticated",
    role: "authenticated",
    email: "qa@players.hulog.internal",
    app_metadata: {},
    user_metadata: { username: "qa_player" },
    created_at: "2026-01-01T00:00:00Z",
  };
const baseProgress = {
  plays: {},
  basag: {},
  cashouts: {},
  alkansyaCoins: 18,
  restTokens: 1,
  restDays: [],
  ginto: 0,
  bestStreak: 0,
  sound: false,
  targetGoal: "damit-inaul",
};
const errors = [];
async function session(viewport, admin = false) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(
    ({ user }) => {
      localStorage.setItem(
        "sb-edyyjnpudcwgbthxuikl-auth-token",
        JSON.stringify({
          access_token:
            "eyJhbGciOiJIUzI1NiJ9." +
            btoa(
              JSON.stringify({
                sub: user.id,
                exp: 2100000000,
                role: "authenticated",
              }),
            ) +
            ".test",
          refresh_token: "test-token",
          expires_at: 2100000000,
          expires_in: 99999999,
          token_type: "bearer",
          user,
        }),
      );
    },
    { user },
  );
  let profile = {
      id: user.id,
      username: "qa_player",
      is_admin: admin,
      coins: 100,
      streak: 4,
      equipped_outfit: "damit-terno",
      created_at: user.created_at,
      progress: structuredClone(baseProgress),
    },
    owned = ["damit-terno", "farm-araro"],
    answers = [];
  if (admin)
    answers = Array.from({ length: 36 }, (_, i) => {
      const q = seed.questions[(i * 31) % seed.questions.length];
      return {
        id: `log-${i}`,
        user_id: user.id,
        question_id: q.id,
        user_choice: q.correct_answer,
        is_correct: i % 4 !== 0,
        play_date: `2026-10-${String(7 + (i % 12)).padStart(2, "0")}`,
        answered_at: "2026-10-18T00:00:00Z",
      };
    });
  await ctx.route(
    "https://edyyjnpudcwgbthxuikl.supabase.co/**",
    async (route) => {
      const req = route.request(),
        url = new URL(req.url()),
        body = req.postDataJSON() || {};
      let data = [];
      if (url.pathname.includes("/auth/")) data = { user };
      else if (url.pathname.endsWith("/questions")) {
        const from = Number(url.searchParams.get("offset") || 0),
          limit = Number(url.searchParams.get("limit") || 500);
        data = seed.questions.slice(from, from + limit);
      } else if (url.pathname.endsWith("/profiles"))
        data = url.searchParams.has("id") ? profile : [profile];
      else if (url.pathname.endsWith("/user_collections"))
        data = owned.map((item_id, i) => ({
          id: `own-${i}`,
          item_id,
          user_id: user.id,
          category: seed.collection_items.find((c) => c.id === item_id)
            ?.category,
        }));
      else if (url.pathname.endsWith("/user_answers")) data = answers;
      else if (url.pathname.endsWith("/submit_answer")) {
        const q = seed.questions.find((q) => q.id === body.p_question);
        const correct = q.correct_answer === body.p_choice;
        if (!answers.some((a) => a.question_id === q.id)) {
          answers.push({
            id: q.id,
            user_id: user.id,
            question_id: q.id,
            user_choice: body.p_choice,
            is_correct: correct,
            play_date: today,
            answered_at: new Date().toISOString(),
          });
          profile.progress.alkansyaCoins += Number(correct);
        }
        data = correct;
      } else if (url.pathname.endsWith("/save_progress")) {
        const p = body.p_progress;
        if (p.plays?.[today] && !profile.progress.plays[today]) {
          profile.progress.plays[today] = {
            results: [true, true, true],
            barya: 3,
            hakbang: false,
            at: new Date().toISOString(),
          };
          profile.progress.alkansyaCoins++;
        }
        if (
          p.plays?.[today]?.hakbang &&
          !profile.progress.plays[today].hakbang
        ) {
          profile.progress.plays[today].hakbang = true;
          profile.progress.alkansyaCoins += 5;
        }
        if ("targetGoal" in p) profile.progress.targetGoal = p.targetGoal;
        data = profile.progress;
      } else if (url.pathname.endsWith("/purchase_item")) {
        const item = seed.collection_items.find((c) => c.id === body.p_item);
        if (!owned.includes(item.id)) {
          owned.push(item.id);
          profile.coins -= item.price;
        }
        data = null;
      } else if (url.pathname.endsWith("/equip_item")) {
        profile.equipped_outfit = body.p_item;
        data = null;
      } else if (url.pathname.endsWith("/open_alkansya")) {
        data = {
          saved: profile.progress.alkansyaCoins,
          passive: 1,
          total: profile.progress.alkansyaCoins + 1,
        };
        profile.coins += data.total;
        profile.progress.alkansyaCoins = 0;
        profile.progress.cashouts["2026-10-12"] = data;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(data),
        headers: { "access-control-allow-origin": "*" },
      });
    },
  );
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date("2026-10-18T04:00:00Z"));
  page.on("pageerror", (e) => {
    errors.push(e.message);
    console.error("Browser runtime:", e.message);
  });
  return { ctx, page, getProfile: () => profile };
}
try {
  for (const [label, viewport] of [
    ["mobile", { width: 390, height: 844 }],
    ["desktop", { width: 1280, height: 900 }],
  ]) {
    const { ctx, page, getProfile } = await session(viewport);
    await page.goto("http://127.0.0.1:5173/");
    await page
      .getByRole("heading", { name: "One small drop. A stronger tomorrow." })
      .waitFor();
    await page.locator(".hestia-stage img").evaluate((img) => img.decode());
    await page.screenshot({ path: `${out}/${label}-home.png`, fullPage: true });
    await page.goto("http://127.0.0.1:5173/koleksyon");
    await page
      .getByRole("heading", { name: "Aparador", exact: true })
      .waitFor();
    assert.equal(await page.locator(".curio").count(), 58);
    assert.equal(await page.locator(".aparador-tier").count(), 7);
    await page.screenshot({
      path: `${out}/${label}-collection.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Merienda", exact: true }).click();
    await page.locator(".curio").first().click();
    await page.getByRole("dialog").waitFor();
    await page.screenshot({ path: `${out}/${label}-detail.png` });
    await page.getByRole("button", { name: "Pin as my savings goal" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Savings goal updated." })
      .waitFor();
    await page.getByRole("button", { name: /Buy for/ }).click();
    await page.getByText("In your collection", { exact: true }).waitFor();
    assert.equal(getProfile().coins, 70);
    await page.getByRole("button", { name: "Close details" }).click();
    await page.goto("http://127.0.0.1:5173/play");
    await page.locator(".play-question h1").waitFor();
    const heading = await page.locator(".play-question h1").textContent();
    assert.equal(
      heading,
      seed.questions.find((q) => q.sequence_day === 1 && q.slot === 1)
        .payload.prompt,
    );
    await page.screenshot({ path: `${out}/${label}-play.png`, fullPage: true });
    for (let slot = 1; slot <= 3; slot++) {
      const q = seed.questions.find(
        (q) => q.sequence_day === 1 && q.slot === slot,
      ).payload;
      const index =
        q.kind === "binary"
          ? (q.format === "Scam o Legit?"
              ? ["SCAM", "LEGIT"]
              : ["TAMA", "MALI"]
            ).indexOf(q.answer)
          : q.options.findIndex((o) => o.key === q.answer);
      await page.locator(".play-answers button").nth(index).click();
      if (slot === 1)
        await page.screenshot({
          path: `${out}/${label}-feedback.png`,
          fullPage: true,
        });
      await page
        .getByRole("button", {
          name: slot < 3 ? "Next Card →" : "Save drop & view results →",
        })
        .click();
    }
    await page
      .getByText("Perfect Hulog · +1 bonus coin!", { exact: true })
      .waitFor();
    await page
      .getByRole("button", { name: "I completed this step · +5 coins" })
      .click();
    await page
      .getByText("5 coins saved in your Alkansya", { exact: true })
      .waitFor();
    await page.screenshot({
      path: `${out}/${label}-complete.png`,
      fullPage: true,
    });
    await page.getByRole("link", { name: "Back to My Alkansya" }).click();
    await page.getByRole("button", { name: /Open Alkansya/ }).click();
    await page.getByRole("heading", { name: "+28 Wallet coins!" }).waitFor();
    await page.screenshot({ path: `${out}/${label}-payout.png` });
    await ctx.close();
    const a = await session(viewport, true);
    await a.page.goto('http://127.0.0.1:5173/admin/questions');
    await a.page.getByRole('heading',{name:'365-day learning curriculum'}).waitFor();
    await a.page.getByRole('heading',{name:'Day #1 · FRP 101 · foundational'}).waitFor();
    await a.page.getByRole('button',{name:'Day 365',exact:true}).click();
    await a.page.getByRole('heading',{name:'Day #365 · FRP 108 · advanced'}).waitFor();
    await a.page.screenshot({path:out+'/'+label+'-sequence-curriculum.png',fullPage:true});
    assert.equal(await a.page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'sequence viewer fits viewport');
    await a.page.goto("http://127.0.0.1:5173/admin");
    await a.page
      .getByRole("heading", { name: "Daily activity & accuracy" })
      .waitFor();
    await a.page.screenshot({
      path: `${out}/${label}-analytics.png`,
      fullPage: true,
    });
    await a.ctx.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    "Browser checks passed at 390px and 1280px: 58 illustrations, seven shelves, purchase, pin, English-primary quiz, 3/3 bonus, action step, Sunday payout, analytics, no runtime errors.",
  );
} finally {
  await browser.close();
}
