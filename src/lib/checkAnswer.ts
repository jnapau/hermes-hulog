import type { Question } from '../data/types';

/** Learning feedback only. The server independently verifies scoring and rewards. */
export function checkAnswer(question: Question, choice: string): boolean {
  if (question.kind !== 'sort') return question.answer === choice;
  try {
    const mapping = JSON.parse(choice);
    return Boolean(question.items?.length) && question.items!.every(i => mapping[i.key] === i.answer);
  } catch { return false; }
}
