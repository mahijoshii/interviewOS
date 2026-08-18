import type { CompletionRecord } from "../types";
import { dayDiff } from "./dates";

export function calculateStreaks(completions: CompletionRecord[]): { current: number; longest: number } {
  const uniqueDates = [...new Set(completions.map((item) => item.completedAt.slice(0, 10)))].sort();
  if (uniqueDates.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let index = 1; index < uniqueDates.length; index += 1) {
    if (dayDiff(uniqueDates[index - 1], uniqueDates[index]) === 1) run += 1;
    else run = 1;
    longest = Math.max(longest, run);
  }

  return { current: run, longest };
}
