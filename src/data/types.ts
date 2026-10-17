export type CourseCode = 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108;

/** How the card is played on screen. */
export type CardKind = 'binary' | 'choice' | 'sort';

export type FinancialTier =
  | 'Cash Management'
  | 'Debt Management'
  | 'Emergency & Savings'
  | 'Accumulation & Net Worth'
  | 'Protection & Insurance'
  | 'Crisis Resilience';

export interface Option {
  key: string;
  text: string;
  textFilipino?: string;
}

export interface SortItem {
  key: string;
  text: string;
  textFilipino?: string;
  /** The category this item belongs to (must be one of `categories`). */
  answer: string;
}

export interface QuestionCommunityStats {
  correctPct: number;
  sampleSize: number;
  topMisconception?: string;
}

export interface Question {
  difficulty?: 'easy' | 'medium' | 'challenge';
  progression?: 'foundational' | 'intermediate' | 'advanced';
  paydaySpecial?: boolean;
  scheduledDate?: string | null;
  recurringDay?: number | null;
  slot?: number;
  id: string;
  course: CourseCode;
  tier: FinancialTier;
  /** Display name of the game format, e.g. "Scam o Legit?", "Sweldo Sort" */
  format: string;
  kind: CardKind;
  week?: number;
  /** English prompt matching the main site style */
  prompt: string;
  /** Filipino / Tagalog translation for the question prompt */
  promptFilipino: string;
  /** binary + choice cards */
  options?: Option[];
  /** binary + choice cards: key of the correct option */
  answer?: string;
  /** sort cards */
  categories?: string[];
  items?: SortItem[];
  /** Short label of the correct answer, e.g. "FALSE (Anchoring Bias)" */
  answerLabel: string;
  /** Hestia's one-sentence "why" explanation */
  why: string;
  /** Optional Filipino explanation note */
  whyFilipino?: string;
  /** Isang Hakbang — optional real-world micro-action */
  hakbang: string;
  /** Anonymous community answer statistics */
  communityStats: QuestionCommunityStats;
}

export interface Course {
  code: CourseCode;
  title: string;
  focus: string;
  tier: FinancialTier;
  color: string;
}

export const TIER_STYLE: Record<
  FinancialTier,
  { bg: string; text: string; border: string; pill: string; badge: string; icon: string }
> = {
  'Cash Management': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badge: 'bg-emerald-600 text-white',
    icon: '💵',
  },
  'Debt Management': {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    pill: 'bg-rose-100 text-rose-800 border-rose-300',
    badge: 'bg-rose-600 text-white',
    icon: '💳',
  },
  'Emergency & Savings': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    pill: 'bg-amber-100 text-amber-800 border-amber-300',
    badge: 'bg-amber-600 text-white',
    icon: '🛡️',
  },
  'Accumulation & Net Worth': {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    pill: 'bg-blue-100 text-blue-800 border-blue-300',
    badge: 'bg-blue-600 text-white',
    icon: '📈',
  },
  'Protection & Insurance': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    pill: 'bg-purple-100 text-purple-800 border-purple-300',
    badge: 'bg-purple-600 text-white',
    icon: '🔒',
  },
  'Crisis Resilience': {
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200',
    pill: 'bg-orange-100 text-orange-800 border-orange-300',
    badge: 'bg-orange-600 text-white',
    icon: '⚡',
  },
};
