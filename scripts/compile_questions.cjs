// scripts/compile_questions.cjs
const fs = require('fs');
const path = require('path');

const { questions101_104 } = require('./questions_101_104.cjs');
const { questions105_107 } = require('./questions_105_107.cjs');
const { bossQuestions } = require('./questions_108_boss.cjs');

const allQuestions = [...questions101_104, ...questions105_107, ...bossQuestions];

console.log(`Total questions compiled: ${allQuestions.length}`);
console.log(`- FRP 101–104: ${questions101_104.length}`);
console.log(`- FRP 105–107: ${questions105_107.length}`);
console.log(`- FRP 108 (52 Sundays): ${bossQuestions.length}`);

// Verify IDs are unique
const idSet = new Set();
for (const q of allQuestions) {
  if (idSet.has(q.id)) {
    throw new Error(`Duplicate Question ID: ${q.id}`);
  }
  idSet.add(q.id);
  if (!q.tier) throw new Error(`Missing tier for Question ${q.id}`);
  if (!q.prompt) throw new Error(`Missing prompt for Question ${q.id}`);
  if (!q.promptFilipino) throw new Error(`Missing promptFilipino for Question ${q.id}`);
}

const header = `/**
 * Hulog Question Bank — Complete Year-Long Curriculum (FRP 101–108).
 *
 * Mapped to the 6 Financial Pyramid Tiers:
 * 1. Cash Management (FRP 101, 102, 103)
 * 2. Debt Management (FRP 105)
 * 3. Emergency & Savings (FRP 104)
 * 4. Accumulation & Net Worth (FRP 106)
 * 5. Protection & Insurance (FRP 107)
 * 6. Crisis Resilience (FRP 108 — 52 Sunday Boss Shock Simulations)
 *
 * Every single question features:
 * - English prompt matching hermes.exoasia.org
 * - Tagalog / Filipino translation (promptFilipino)
 * - Explicit Financial Tier label
 * - Anonymous Community Answer Statistics
 */
import type { FinancialTier, Question } from './types';

export const QUESTIONS: Question[] = ${JSON.stringify(allQuestions, null, 2)};

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);

/** Sunday "Linggo Boss" cards are kept out of the weekday rotation. */
export const isBossCard = (q: Question) =>
  q.format.startsWith('Linggo Boss') || q.course === 108;

export const ALL_FORMATS: string[] = Array.from(
  new Set(QUESTIONS.map((q) => q.format)),
).sort();

export const ALL_TIERS: FinancialTier[] = [
  'Cash Management',
  'Debt Management',
  'Emergency & Savings',
  'Accumulation & Net Worth',
  'Protection & Insurance',
  'Crisis Resilience',
];
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'questions.ts');
fs.writeFileSync(outputPath, header, 'utf8');
console.log(`Successfully generated: ${outputPath}`);
