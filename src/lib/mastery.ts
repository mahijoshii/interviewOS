import type { AppState, AttemptOutcome } from "../types";
import { curriculum, phaseSummaries } from "../data/curriculum";

export const outcomeWeights: Record<AttemptOutcome, number> = {
  couldnt_solve: 0,
  solved_with_hint: 0.4,
  solved_slowly: 0.7,
  solved_confidently: 1
};

export function topicMastery(state: AppState) {
  return phaseSummaries.map((phase) => {
    const days = curriculum.filter((day) => day.phase === phase.phase);
    const attempts = days.map((day) => state.dsaAttempts[day.day]).filter(Boolean);
    const score = attempts.length
      ? attempts.reduce((sum, attempt) => sum + outcomeWeights[attempt.outcome], 0) / days.length
      : 0;
    const completed = days.filter((day) => state.completions.some((record) => record.day === day.day)).length;
    return { ...phase, completed, mastery: Math.round(score * 100) };
  });
}

export function overallDsaStats(state: AppState) {
  const attempts = Object.values(state.dsaAttempts);
  return {
    total: attempts.length,
    couldnt_solve: attempts.filter((a) => a.outcome === "couldnt_solve").length,
    solved_with_hint: attempts.filter((a) => a.outcome === "solved_with_hint").length,
    solved_slowly: attempts.filter((a) => a.outcome === "solved_slowly").length,
    solved_confidently: attempts.filter((a) => a.outcome === "solved_confidently").length,
    weak: attempts.filter((a) => a.outcome === "couldnt_solve" || a.outcome === "solved_with_hint").length
  };
}
