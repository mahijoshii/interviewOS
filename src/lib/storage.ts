import type { AppState } from "../types";

export const STORAGE_KEY = "interviewOS:v1";

export const defaultState: AppState = {
  schemaVersion: 1,
  completions: [],
  dsaAttempts: {},
  behavioral: {},
  resume: {},
  settings: {
    theme: "system",
    preferredLanguage: "Python",
    revealFutureProblems: false,
    showReviewCard: true
  }
};

export function isAppState(value: unknown): value is AppState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AppState>;
  return (
    candidate.schemaVersion === 1 &&
    Array.isArray(candidate.completions) &&
    typeof candidate.dsaAttempts === "object" &&
    typeof candidate.behavioral === "object" &&
    typeof candidate.resume === "object" &&
    typeof candidate.settings === "object"
  );
}

export function normalizeState(value: unknown): AppState {
  if (!isAppState(value)) return defaultState;
  return {
    ...defaultState,
    ...value,
    settings: { ...defaultState.settings, ...value.settings }
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : defaultState;
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportPayload(state: AppState) {
  return { schemaVersion: 1, exportedAt: new Date().toISOString(), state };
}

export function parseImport(raw: string): { ok: true; state: AppState } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { ok: false, error: "Import is not an object." };
    const state = (parsed as { state?: unknown }).state;
    if (!isAppState(state)) return { ok: false, error: "Import does not match InterviewOS v1 schema." };
    return { ok: true, state: normalizeState(state) };
  } catch {
    return { ok: false, error: "Import is not valid JSON." };
  }
}
