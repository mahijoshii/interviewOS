import type { AppState } from "../types";
import { curriculum } from "../data/curriculum";

export function completedDaySet(state: AppState): Set<number> {
  return new Set(state.completions.map((completion) => completion.day));
}

export function nextUnfinishedDay(state: AppState): number {
  const completed = completedDaySet(state);
  return curriculum.find((day) => !completed.has(day.day))?.day ?? curriculum.length;
}

export function canCompleteDay(state: AppState, day: number): boolean {
  return Boolean(state.dsaAttempts[day] && state.behavioral[day] && state.resume[day]);
}
