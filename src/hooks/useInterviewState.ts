import { useEffect, useMemo, useState } from "react";
import type { AppState } from "../types";
import { defaultState, loadState, saveState } from "../lib/storage";

export type InterviewActions = {
  update(mutator: (state: AppState) => AppState): void;
  replace(next: AppState): void;
};

export function useInterviewState() {
  const [state, setState] = useState<AppState>(() => {
    if (typeof localStorage === "undefined") return defaultState;
    return loadState();
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const actions: InterviewActions = useMemo(
    () => ({
      update(mutator: (state: AppState) => AppState) {
        setState((current) => mutator(current));
      },
      replace(next: AppState) {
        setState(next);
      }
    }),
    []
  );

  return { state, actions };
}
