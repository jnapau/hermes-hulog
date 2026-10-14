/**
 * Admin Custom Question Bank Engine.
 * Allows admins to dynamically add, edit, and delete questions/games
 * without touching source code.
 */
import { useSyncExternalStore } from 'react';
import { QUESTIONS } from '../data/questions';
import type { Question } from '../data/types';

const CUSTOM_QUESTIONS_KEY = 'hulog.custom_questions.v1';

function loadCustomQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

let cachedCustomQuestions: Question[] =
  typeof window !== 'undefined' ? loadCustomQuestions() : [];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function getCustomQuestions(): Question[] {
  return cachedCustomQuestions;
}

export function getAllQuestions(): Question[] {
  return [...cachedCustomQuestions, ...QUESTIONS];
}

export function addCustomQuestion(
  q: Omit<Question, 'id' | 'communityStats'> & { id?: string; communityStats?: Question['communityStats'] },
): Question {
  const customId = q.id || `CUSTOM-${Date.now().toString().slice(-4)}`;
  const newQuestion: Question = {
    ...q,
    id: customId,
    communityStats: q.communityStats || {
      correctPct: 100,
      sampleSize: 1,
      topMisconception: 'New question pending community benchmark',
    },
  };

  cachedCustomQuestions = [newQuestion, ...cachedCustomQuestions];
  try {
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(cachedCustomQuestions));
  } catch {
    /* storage safe */
  }

  notify();
  return newQuestion;
}

export function deleteCustomQuestion(id: string): void {
  cachedCustomQuestions = cachedCustomQuestions.filter((q) => q.id !== id);
  try {
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(cachedCustomQuestions));
  } catch {
    /* storage safe */
  }
  notify();
}

export function useAllQuestions(): Question[] {
  const questions = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => getAllQuestions(),
    () => getAllQuestions(),
  );

  return questions;
}

export function useCustomQuestions(): Question[] {
  const customList = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => cachedCustomQuestions,
    () => cachedCustomQuestions,
  );

  return customList;
}
