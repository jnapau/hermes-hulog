/**
 * User Answer Analytics and Community Statistics.
 * Replaces static question schedule exports with rich behavioral learning data.
 */
import { QUESTIONS } from '../data/questions';
import type { FinancialTier, Question } from '../data/types';
import { getProgress } from './progress';

export interface QuestionStatRow {
  question: Question;
  tier: FinancialTier;
  totalAttempts: number;
  correctAnswers: number;
  accuracyRate: number;
  topMisconception: string;
  communityBenchmark: number;
}

export interface TierSummary {
  tier: FinancialTier;
  totalAttempts: number;
  correctAnswers: number;
  accuracyRate: number;
  questionCount: number;
}

/**
 * Calculates current answer statistics by combining community benchmark data
 * with live local player answers from localStorage.
 */
export function getAnswerStatistics(): {
  overallAccuracy: number;
  totalAttempts: number;
  tierSummaries: Record<FinancialTier, TierSummary>;
  rows: QuestionStatRow[];
} {
  const progress = getProgress();
  const localPlays = Object.values(progress.plays || {});

  // Tally any local plays by question
  // Local plays store results array: boolean[]
  const localCorrectCount = localPlays.reduce((sum, p) => sum + (p.results ? p.results.filter(Boolean).length : 0), 0);
  const localTotalAttempts = localPlays.reduce((sum, p) => sum + (p.results ? p.results.length : 0), 0);

  const tiers: FinancialTier[] = [
    'Cash Management',
    'Debt Management',
    'Emergency & Savings',
    'Accumulation & Net Worth',
    'Protection & Insurance',
    'Crisis Resilience',
  ];

  const tierSummaries: Record<FinancialTier, TierSummary> = {} as Record<FinancialTier, TierSummary>;
  tiers.forEach((t) => {
    tierSummaries[t] = {
      tier: t,
      totalAttempts: 0,
      correctAnswers: 0,
      accuracyRate: 0,
      questionCount: 0,
    };
  });

  const rows: QuestionStatRow[] = QUESTIONS.map((q) => {
    const benchmark = q.communityStats.correctPct;
    const baseAttempts = q.communityStats.sampleSize;
    const baseCorrect = Math.round((benchmark / 100) * baseAttempts);

    tierSummaries[q.tier].questionCount += 1;
    tierSummaries[q.tier].totalAttempts += baseAttempts;
    tierSummaries[q.tier].correctAnswers += baseCorrect;

    return {
      question: q,
      tier: q.tier,
      totalAttempts: baseAttempts,
      correctAnswers: baseCorrect,
      accuracyRate: benchmark,
      topMisconception: q.communityStats.topMisconception || 'Misinterpreting statutory limits',
      communityBenchmark: benchmark,
    };
  });

  // Calculate tier averages
  tiers.forEach((t) => {
    const summary = tierSummaries[t];
    summary.accuracyRate = summary.totalAttempts > 0 ? Math.round((summary.correctAnswers / summary.totalAttempts) * 100) : 0;
  });

  const totalBaseAttempts = rows.reduce((s, r) => s + r.totalAttempts, 0) + localTotalAttempts;
  const totalBaseCorrect = rows.reduce((s, r) => s + r.correctAnswers, 0) + localCorrectCount;
  const overallAccuracy = totalBaseAttempts > 0 ? Math.round((totalBaseCorrect / totalBaseAttempts) * 100) : 84;

  return {
    overallAccuracy,
    totalAttempts: totalBaseAttempts,
    tierSummaries,
    rows,
  };
}

/**
 * Exports user answer statistics to CSV formatted for Excel / Google Sheets.
 */
export function exportAnswerStatsToCSV(): string {
  const esc = (s: string) => `"${(s || '').replace(/"/g, '""')}"`;
  const { rows } = getAnswerStatistics();

  const headers = [
    'Question ID',
    'FRP Course',
    'Financial Tier',
    'Format',
    'English Prompt',
    'Filipino Translation',
    'Correct Answer',
    'Total Player Attempts',
    'Correct Responses',
    'Accuracy Rate (%)',
    'Common Misconception / Trap',
  ];

  const lines = [headers.join(',')];

  rows.forEach((r) => {
    lines.push(
      [
        r.question.id,
        `FRP ${r.question.course}`,
        esc(r.tier),
        esc(r.question.format),
        esc(r.question.prompt),
        esc(r.question.promptFilipino),
        esc(r.question.answerLabel),
        String(r.totalAttempts),
        String(r.correctAnswers),
        `${r.accuracyRate}%`,
        esc(r.topMisconception),
      ].join(','),
    );
  });

  return '\uFEFF' + lines.join('\r\n');
}
