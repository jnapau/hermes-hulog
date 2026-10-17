import { writeFileSync } from "node:fs";
import { units, households } from "./curriculum-2026.mjs";
import { cyberMessages } from "./cyber-messages.mjs";
const courses = [101, 102, 103, 103, 104, 104, 105, 105, 106, 107, 108, 108];
const tiers = [
  "Cash Management",
  "Cash Management",
  "Cash Management",
  "Cash Management",
  "Emergency & Savings",
  "Emergency & Savings",
  "Debt Management",
  "Debt Management",
  "Accumulation & Net Worth",
  "Protection & Insurance",
  "Crisis Resilience",
  "Crisis Resilience",
];
const questions = [];
const lower = (s) => s[0].toLowerCase() + s.slice(1);
function choices(good, bad, rotation) {
  const values = [
    good,
    bad,
    ["Wait for extra income", "Hintayin ang dagdag-kita"],
  ];
  const rotated = values.map((_, i) => values[(i + rotation) % 3]);
  return {
    options: rotated.map((v, i) => ({
      key: "ABC"[i],
      text: v[0],
      textFilipino: v[1],
    })),
    answer: "ABC"[rotated.indexOf(good)],
  };
}
for (let day = 0; day < 365; day++) {
  const stage = Math.min(11, Math.floor((day * 12) / 365));
  for (let s = 0; s < 3; s++) {
    const unit = units[stage * 10 + ((day * 3 + s) % 10)],
      home = households[(day + s * 11 + stage * 7) % households.length],
      positive = day % 2 === 0;
    const q = {
      id: `H-D${String(day + 1).padStart(3, '0')}-${s + 1}`,
      sequenceDay: day + 1,
      slot: s + 1,
      course: courses[stage],
      tier: tiers[stage],
      difficulty: ["easy", "medium", "challenge"][s],
      progression:
        stage < 3 ? "foundational" : stage < 8 ? "intermediate" : "advanced",
      paydaySpecial: (day + 1) % 15 === 0,
      communityStats: { correctPct: 0, sampleSize: 0 },
      kind: s === 0 ? "binary" : "choice",
      format: s === 0 ? "Tama o Mali?" : "Ano'ng Gagawin Mo?",
      prompt:
        s === 0
          ? `${home.scene}. ${positive ? unit.claim : `You should ${lower(unit.bad)}`}.`
          : `${home.scene}. ${s === 1 ? "Choose wisely" : "Protect tomorrow"}: ${lower(unit.bad)}?`,
      promptFilipino:
        s === 0
          ? `${home.sceneFilipino}. ${positive ? unit.claimFilipino : `Dapat ${lower(unit.badFilipino)}`}.`
          : `${home.sceneFilipino}. ${s === 1 ? "Piliin ang tama" : "Ingatan ang bukas"}: ${lower(unit.badFilipino)}?`,
      why: `${unit.reason}. Rule of thumb: ${unit.good}.`,
      whyFilipino: `${unit.claimFilipino}. Tip ng Araw: ${unit.goodFilipino}.`,
      hakbang: `Isulat ang iyong plano: ${lower(unit.goodFilipino)}.`,
      hakbangEnglish: `Write your next step: ${lower(unit.good)}.`,
    };
    if (s === 0)
      Object.assign(q, {
        answer: positive ? "TAMA" : "MALI",
        answerLabel: positive ? "True" : "False",
      });
    else
      Object.assign(
        q,
        choices(
          [unit.good, unit.goodFilipino],
          [unit.bad, unit.badFilipino],
          (day + s) % 3,
        ),
        { answerLabel: unit.good },
      );
    if (s === 0 && day % 4 === 0 && !q.paydaySpecial) {
      const [en, fil, answer, reason, reasonFil] =
        cyberMessages[Math.floor(day / 4) % cyberMessages.length];
      Object.assign(q, {
        format: "Scam o Legit?",
        prompt: en,
        promptFilipino: fil,
        answer,
        answerLabel:
          answer === "SCAM"
            ? "Scam — stop and verify"
            : "Legit — verify the details",
        why: `${reason} Rule of thumb: verify through your own official channel.`,
        whyFilipino: `${reasonFil} Tip ng Araw: Ikaw mismo ang magbukas ng opisyal na channel.`,
      });
    }
    if (q.paydaySpecial) {
      const cash = 9000 + stage * 500,
        bills = 5000 + stage * 200,
        reserve = 1000;
      if (s === 0)
        Object.assign(q, {
          prompt:
            "Payday sale! Spend your whole salary before setting aside bills?",
          promptFilipino:
            "Payday sale! Ubusin ang sweldo bago magtabi para sa bayarin?",
          answer: "MALI",
          answerLabel: "False",
          why: "Bills still fall due after a sale. Rule of thumb: set aside essentials before shopping.",
          whyFilipino:
            "May bayarin pa pagkatapos ng sale. Tip ng Araw: Itabi muna ang para sa kailangan.",
        });
      if (s === 1)
        Object.assign(q, {
          prompt: `From ₱${cash} pay, reserve ₱${bills} for bills and ₱${reserve} for savings. What remains?`,
          promptFilipino: `Sa ₱${cash} sweldo, itabi ang ₱${bills} sa bayarin at ₱${reserve} sa ipon. Magkano ang natira?`,
          ...choices(
            [`₱${cash - bills - reserve}`, `₱${cash - bills - reserve}`],
            [`₱${cash - bills}`, `₱${cash - bills}`],
            day % 3,
          ),
          answerLabel: `₱${cash - bills - reserve}`,
          why: `₱${cash} − ₱${bills} − ₱${reserve} = ₱${cash - bills - reserve}. Rule of thumb: reserved savings are already assigned.`,
          whyFilipino: `₱${cash} − ₱${bills} − ₱${reserve} = ₱${cash - bills - reserve}. Tip ng Araw: May gamit na ang nakalaang ipon.`,
        });
    }
    questions.push(q);
  }
}
questions.sort((a, b) => a.sequenceDay - b.sequenceDay || a.slot - b.slot);
if (
  questions.length !== 1095 ||
  units.length !== 120 ||
  new Set(questions.map((q) => q.id)).size !== 1095
)
  throw Error("Incomplete curriculum");
for (const q of questions) {
  if (
    q.prompt.split(/\s+/).length > 24 ||
    q.promptFilipino.split(/\s+/).length > 32
  )
    throw Error(`Long prompt: ${q.id}`);
  for (const o of q.options || [])
    if (
      o.text.split(/\s+/).length > 8 ||
      o.textFilipino.split(/\s+/).length > 8
    )
      throw Error(`Long choice: ${o.text} / ${o.textFilipino}`);
  if (q.options && new Set(q.options.map((o) => o.text)).size !== 3)
    throw Error(`Ambiguous options: ${q.id}`);
}
const chunks = Array.from(
  { length: Math.ceil(questions.length / 30) },
  (_, i) =>
    `const batch${i}: Question[] = ${JSON.stringify(questions.slice(i * 30, (i + 1) * 30), null, 2)};`,
).join("\n");
writeFileSync(
  new URL("../src/data/questions.ts", import.meta.url),
  `/** Generated by scripts/generate-2026.mjs. */\nimport type { FinancialTier, Question } from './types';\n${chunks}\nexport const QUESTIONS: Question[] = [${Array.from({ length: 37 }, (_, i) => `...batch${i}`).join(",")}];\nexport const QUESTION_BY_ID: Record<string,Question> = Object.fromEntries(QUESTIONS.map(q=>[q.id,q]));\nexport const isBossCard = (q:Question) => q.course===108 && q.slot===3;\nexport const ALL_FORMATS = [...new Set(QUESTIONS.map(q=>q.format))].sort();\nexport const ALL_TIERS: FinancialTier[] = ${JSON.stringify([...new Set(tiers)])};\n`,
);
console.log(
  "Generated 1,095 concise bilingual cards with daily tips and standalone action steps.",
);
