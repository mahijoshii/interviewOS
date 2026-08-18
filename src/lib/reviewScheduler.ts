import type { AttemptOutcome, DsaAttempt } from "../types";
import { addDays, localDateKey } from "./dates";

export const reviewIntervals: Record<AttemptOutcome, number[]> = {
  couldnt_solve: [1, 3, 7, 14],
  solved_with_hint: [2, 5, 12],
  solved_slowly: [4, 10, 21],
  solved_confidently: [14, 30]
};

export function scheduleNextReview(outcome: AttemptOutcome, reviewStep: number, fromDate = localDateKey()): string | undefined {
  const intervals = reviewIntervals[outcome];
  const interval = intervals[Math.min(reviewStep, intervals.length - 1)];
  return interval ? addDays(fromDate, interval) : undefined;
}

export function findDueReview(attempts: Record<number, DsaAttempt>, completedDays: Set<number>, today = localDateKey()): DsaAttempt | undefined {
  return Object.values(attempts)
    .filter((attempt) => attempt.nextReviewDate && attempt.nextReviewDate <= today && completedDays.has(attempt.day))
    .sort((a, b) => (a.nextReviewDate ?? "").localeCompare(b.nextReviewDate ?? "") || a.day - b.day)[0];
}
