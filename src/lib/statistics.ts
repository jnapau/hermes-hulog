/**
 * User Answer Analytics and Community Statistics.
 * Powered directly by actual registered user answers (from local database/logs).
 */
import type { FinancialTier, Question } from '../data/types';
import { getAllQuestions } from './customQuestions';
import { getAllAnswerLogs, getAllUsers, User, AnswerLog } from './users';

export interface QuestionStatRow {
  question: Question;
  tier: FinancialTier;
  totalAttempts: number;
  correctAnswers: number;
  accuracyRate: number;
  topMisconception: string;
  userResponses: AnswerLog[];
}

export interface UserSummaryRow {
  user: User;
  totalAttempts: number;
  correctAnswers: number;
  accuracyRate: number;
  lastActive: string;
}

export interface TierSummary {
  tier: FinancialTier;
  totalAttempts: number;
  correctAnswers: number;
  accuracyRate: number;
  questionCount: number;
}

export interface AnswerStatisticsResult {
  overallAccuracy: number;
  totalAttempts: number;
  totalRegisteredUsers: number;
  tierSummaries: Record<FinancialTier, TierSummary>;
  rows: QuestionStatRow[];
  userSummaries: UserSummaryRow[];
  recentLogs: AnswerLog[];
}

export function getAnswerStatistics(): AnswerStatisticsResult {
  const allQuestions = getAllQuestions();
  const allUsers = getAllUsers().filter((u) => !u.is_admin);
  const adminNames = new Set(
    getAllUsers()
      .filter((u) => u.is_admin)
      .map((u) => u.username.toLowerCase()),
  );
  const allLogs = getAllAnswerLogs().filter(
    (l) => !adminNames.has(l.username.toLowerCase()),
  );

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

  // Calculate per-question statistics based on registered user answer logs
  const rows: QuestionStatRow[] = allQuestions.map((q) => {
    const questionLogs = allLogs.filter((l) => l.questionId === q.id);
    const totalAttempts = questionLogs.length;
    const correctAnswers = questionLogs.filter((l) => l.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

    // Track common wrong choices
    const wrongLogs = questionLogs.filter((l) => !l.isCorrect);
    const misconception =
      wrongLogs.length > 0
        ? `Mistaken choice: "${wrongLogs[0].userChoice}" by registered players`
        : q.communityStats?.topMisconception || 'No errors recorded yet';

    if (tierSummaries[q.tier]) {
      tierSummaries[q.tier].questionCount += 1;
      tierSummaries[q.tier].totalAttempts += totalAttempts;
      tierSummaries[q.tier].correctAnswers += correctAnswers;
    }

    return {
      question: q,
      tier: q.tier,
      totalAttempts,
      correctAnswers,
      accuracyRate,
      topMisconception: misconception,
      userResponses: questionLogs,
    };
  });

  // Compute tier averages
  tiers.forEach((t) => {
    const summary = tierSummaries[t];
    if (summary) {
      summary.accuracyRate =
        summary.totalAttempts > 0 ? Math.round((summary.correctAnswers / summary.totalAttempts) * 100) : 0;
    }
  });

  // Calculate per-user summaries
  const userSummaries: UserSummaryRow[] = allUsers.map((u) => {
    const uLogs = allLogs.filter((l) => l.username.toLowerCase() === u.username.toLowerCase());
    const totalAttempts = uLogs.length;
    const correctAnswers = uLogs.filter((l) => l.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;
    const lastLog = uLogs.sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];

    return {
      user: u,
      totalAttempts,
      correctAnswers,
      accuracyRate,
      lastActive: lastLog ? lastLog.date : u.registeredAt.slice(0, 10),
    };
  });

  const totalAttempts = allLogs.length;
  const totalCorrect = allLogs.filter((l) => l.isCorrect).length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return {
    overallAccuracy,
    totalAttempts,
    totalRegisteredUsers: allUsers.length,
    tierSummaries,
    rows,
    userSummaries,
    recentLogs: allLogs.slice(0, 20),
  };
}
