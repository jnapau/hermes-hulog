import type { Course, CourseCode } from './types';

export const COURSES: Course[] = [
  {
    code: 101,
    title: 'Financial Well-Being & Household Foundations',
    focus: 'Distinguishing needs, wants, and family obligations; recognizing household vulnerability and establishing cash-flow priorities.',
    tier: 'Cash Flow',
    color: '#F5A524',
  },
  {
    code: 102,
    title: 'Behavioral Finance & Money Psychology',
    focus: 'Cognitive biases, present bias, social comparison, lifestyle inflation, and boundary-setting scripts in Taglish.',
    tier: 'Cash Flow',
    color: '#E8665A',
  },
  {
    code: 103,
    title: 'Cash Flow & Budget Management',
    focus: 'Fixed vs variable expenses, timing ng kinsenas/katapusan, Safe-to-Spend calculations, and envelope budgeting.',
    tier: 'Cash Flow',
    color: '#7FA145',
  },
  {
    code: 104,
    title: 'Saving, Emergency Buffers & Compounding',
    focus: 'Emergency funds vs sinking funds, liquidity, inflation impact, Pag-IBIG MP2, and compounding growth.',
    tier: 'Emergency / Accumulation',
    color: '#2A9D8F',
  },
  {
    code: 105,
    title: 'Debt, Credit & Borrowing Decisions',
    focus: '5-6 vs formal credit, credit card finance charges, debt avalanche vs snowball, borrower rights, and illegal harassment.',
    tier: 'Debt',
    color: '#C9690F',
  },
  {
    code: 106,
    title: 'Financial Position, Net Worth & Solvency',
    focus: 'Assets vs liabilities, computing net worth without shame, liquidity vs non-liquid wealth, and solvency ratios.',
    tier: 'Accumulation',
    color: '#1B50D8',
  },
  {
    code: 107,
    title: 'Financial Risk, Protection & Anti-Fraud',
    focus: 'Scam o Legit identification, PhilHealth & SSS statutory protection, term vs VUL neutral education, and digital privacy safety.',
    tier: 'Protection',
    color: '#8E5BD8',
  },
  {
    code: 108,
    title: 'Personal Financial Resilience Plan & Crisis Simulations',
    focus: 'Integrating cash flow, buffers, debt strategy, protection, and navigating simulated Philippine crises (Bagyo, medical shock, retrenchment).',
    tier: 'Emergency / Protection',
    color: '#4A2A12',
  },
];

export const COURSE_BY_CODE: Record<CourseCode, Course> = COURSES.reduce(
  (acc, c) => ({ ...acc, [c.code]: c }),
  {} as Record<CourseCode, Course>,
);
