export type CourseCode = 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108;

/** How the card is played on screen. */
export type CardKind = 'binary' | 'choice' | 'sort';

export interface Option {
  key: string;
  text: string;
}

export interface SortItem {
  key: string;
  text: string;
  /** The category this item belongs to (must be one of `categories`). */
  answer: string;
}

export interface Question {
  id: string;
  course: CourseCode;
  /** Display name of the game format, e.g. "Scam o Legit?" */
  format: string;
  kind: CardKind;
  prompt: string;
  /** binary + choice cards */
  options?: Option[];
  /** binary + choice cards: key of the correct option */
  answer?: string;
  /** sort cards */
  categories?: string[];
  items?: SortItem[];
  /** Short label of the correct answer, e.g. "MALI (Anchoring Bias)" */
  answerLabel: string;
  /** Hestia's one-sentence "why" */
  why: string;
  /** Isang Hakbang — optional real-world micro-action */
  hakbang: string;
}

export interface Course {
  code: CourseCode;
  title: string;
  focus: string;
  tier: string;
  color: string;
}
