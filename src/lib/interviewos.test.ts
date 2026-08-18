import { describe, expect, it } from "vitest";
import type { AppState } from "../types";
import { curriculum } from "../data/curriculum";
import { behavioralQuestions } from "../data/behavioralQuestions";
import { resumeExperiences, resumeQuestions } from "../data/resumeQuestions";
import { validateContent } from "../data/validateContent";
import { canCompleteDay, nextUnfinishedDay } from "./progress";
import { defaultState, exportPayload, normalizeState, parseImport } from "./storage";
import { scheduleNextReview } from "./reviewScheduler";
import { calculateStreaks } from "./streaks";
import { topicMastery } from "./mastery";

function stateWith(overrides: Partial<AppState>): AppState {
  return { ...defaultState, ...overrides, settings: { ...defaultState.settings, ...overrides.settings } };
}

describe("curriculum content", () => {
  it("contains exactly 90 sequential days with valid LeetCode URLs", () => {
    expect(curriculum).toHaveLength(90);
    expect(validateContent()).toEqual([]);
    curriculum.forEach((day, index) => {
      expect(day.day).toBe(index + 1);
      expect(day.problemTitle.length).toBeGreaterThan(0);
      expect(day.leetcodeUrl).toMatch(/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/);
    });
  });

  it("resolves required behavioral and resume question references", () => {
    const experienceIds = new Set(resumeExperiences.map((item) => item.id));
    expect(behavioralQuestions).toHaveLength(90);
    expect(resumeQuestions).toHaveLength(90);
    expect(resumeQuestions.every((question) => experienceIds.has(question.experienceId))).toBe(true);
    expect(behavioralQuestions.every((question) => !question.resumeRefId || experienceIds.has(question.resumeRefId))).toBe(true);
  });
});

describe("progression", () => {
  it("chooses the next unfinished curriculum day without calendar skipping", () => {
    const state = stateWith({ completions: [{ day: 1, completedAt: "2026-08-17T12:00:00.000Z" }] });
    expect(nextUnfinishedDay(state)).toBe(2);
  });

  it("requires DSA, behavioral, and resume practice before completing", () => {
    const partial = stateWith({
      dsaAttempts: {
        1: {
          day: 1,
          outcome: "solved_confidently",
          attemptedAt: "2026-08-17T12:00:00.000Z",
          secondsElapsed: 60,
          approach: "",
          recognizedPattern: "",
          timeComplexity: "",
          spaceComplexity: "",
          missed: "",
          nextTime: "",
          reviewStep: 0
        }
      }
    });
    expect(canCompleteDay(partial, 1)).toBe(false);
    expect(canCompleteDay(stateWith({ ...partial, behavioral: { 1: { day: 1, practicedAt: "x", notes: { situation: "", task: "", action: "", result: "", lesson: "" } } }, resume: { 1: { day: 1, practicedAt: "x", notes: "" } } }), 1)).toBe(true);
  });
});

describe("scheduling and stats", () => {
  it("schedules deterministic spaced repetition intervals", () => {
    expect(scheduleNextReview("couldnt_solve", 0, "2026-08-17")).toBe("2026-08-18");
    expect(scheduleNextReview("solved_with_hint", 1, "2026-08-17")).toBe("2026-08-22");
    expect(scheduleNextReview("solved_confidently", 0, "2026-08-17")).toBe("2026-08-31");
  });

  it("calculates current and longest streaks from local dates", () => {
    expect(calculateStreaks([
      { day: 1, completedAt: "2026-08-15T10:00:00" },
      { day: 2, completedAt: "2026-08-16T10:00:00" },
      { day: 3, completedAt: "2026-08-18T10:00:00" }
    ])).toEqual({ current: 1, longest: 2 });
  });

  it("calculates transparent topic mastery", () => {
    const state = stateWith({
      dsaAttempts: {
        1: {
          day: 1,
          outcome: "solved_confidently",
          attemptedAt: "x",
          secondsElapsed: 0,
          approach: "",
          recognizedPattern: "",
          timeComplexity: "",
          spaceComplexity: "",
          missed: "",
          nextTime: "",
          reviewStep: 0
        }
      }
    });
    expect(topicMastery(state)[0].mastery).toBe(13);
  });
});

describe("storage", () => {
  it("normalizes malformed storage to defaults", () => {
    expect(normalizeState({ nope: true })).toEqual(defaultState);
  });

  it("validates exported import payloads", () => {
    const payload = JSON.stringify(exportPayload(defaultState));
    const parsed = parseImport(payload);
    expect(parsed.ok).toBe(true);
    expect(parseImport("{bad").ok).toBe(false);
  });
});
