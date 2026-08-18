export type Difficulty = "Easy" | "Medium" | "Hard";
export type AttemptOutcome = "couldnt_solve" | "solved_with_hint" | "solved_slowly" | "solved_confidently";
export type BehavioralType = "standard" | "resume";
export type ThemePreference = "system" | "light" | "dark";

export interface Resource {
  label: string;
  url: string;
  kind: "concept" | "solution" | "docs";
}

export interface CurriculumDay {
  day: number;
  phase: number;
  topic: string;
  subtopic?: string;
  conceptTitle: string;
  conceptSummary: string;
  recognitionSignals: string[];
  problemTitle: string;
  difficulty: Difficulty;
  leetcodeUrl: string;
  pattern: string;
  targetMinutes: number;
  conceptResources?: Resource[];
  solutionResources?: Resource[];
  hints: string[];
  expectedTimeComplexity?: string;
  expectedSpaceComplexity?: string;
  isReviewDay?: boolean;
  reviewOfDay?: number;
  hidePatternUntilReveal?: boolean;
}

export interface BehavioralQuestion {
  id: string;
  day: number;
  type: BehavioralType;
  competency: string;
  prompt: string;
  resumeRefId?: string;
}

export interface ResumeExperience {
  id: string;
  label: string;
  role: string;
  focus: string;
  technologies: string[];
  claims: string[];
}

export type ResumeQuestionCategory =
  | "Technical"
  | "Architecture"
  | "Metrics"
  | "Ownership"
  | "Debugging"
  | "Scaling"
  | "Tradeoffs";

export interface ResumeGrillQuestion {
  id: string;
  day: number;
  experienceId: string;
  category: ResumeQuestionCategory;
  primary: string;
  followUps: string[];
}

export interface StarNotes {
  situation: string;
  task: string;
  action: string;
  result: string;
  lesson: string;
}

export interface DsaAttempt {
  day: number;
  outcome: AttemptOutcome;
  attemptedAt: string;
  secondsElapsed: number;
  approach: string;
  recognizedPattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  missed: string;
  nextTime: string;
  reviewStep: number;
  nextReviewDate?: string;
  knownAlready?: boolean;
}

export interface BehavioralPractice {
  day: number;
  practicedAt: string;
  notes: StarNotes;
  confidence?: number;
}

export interface ResumePractice {
  day: number;
  practicedAt: string;
  notes: string;
  confidence?: number;
}

export interface CompletionRecord {
  day: number;
  completedAt: string;
}

export interface SettingsState {
  theme: ThemePreference;
  preferredLanguage: string;
  revealFutureProblems: boolean;
  showReviewCard: boolean;
}

export interface AppState {
  schemaVersion: 1;
  completions: CompletionRecord[];
  dsaAttempts: Record<number, DsaAttempt>;
  behavioral: Record<number, BehavioralPractice>;
  resume: Record<number, ResumePractice>;
  settings: SettingsState;
}
