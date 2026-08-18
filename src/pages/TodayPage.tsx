import { Check, ExternalLink, Lightbulb, TimerReset } from "lucide-react";
import { useMemo, useState } from "react";
import { behavioralQuestions } from "../data/behavioralQuestions";
import { curriculum } from "../data/curriculum";
import { resumeExperiences, resumeQuestions } from "../data/resumeQuestions";
import { Card } from "../components/common/Card";
import { Field } from "../components/common/Field";
import { Timer } from "../components/common/Timer";
import type { AppState, AttemptOutcome, DsaAttempt, StarNotes } from "../types";
import type { InterviewActions } from "../hooks/useInterviewState";
import { canCompleteDay, completedDaySet } from "../lib/progress";
import { localDateKey } from "../lib/dates";
import { findDueReview, scheduleNextReview } from "../lib/reviewScheduler";

const outcomes: { value: AttemptOutcome; label: string }[] = [
  { value: "couldnt_solve", label: "Couldn't solve" },
  { value: "solved_with_hint", label: "Solved with hint" },
  { value: "solved_slowly", label: "Solved slowly" },
  { value: "solved_confidently", label: "Solved confidently" }
];

const emptyStar: StarNotes = { situation: "", task: "", action: "", result: "", lesson: "" };

export function TodayPage({ state, actions, activeDay, streak }: { state: AppState; actions: InterviewActions; activeDay: number; streak: number }) {
  const day = curriculum.find((item) => item.day === activeDay) ?? curriculum[curriculum.length - 1];
  const behavioral = behavioralQuestions[day.day - 1];
  const grill = resumeQuestions[day.day - 1];
  const experience = resumeExperiences.find((item) => item.id === grill.experienceId);
  const [secondsElapsed, setSecondsElapsed] = useState(state.dsaAttempts[day.day]?.secondsElapsed ?? 0);
  const [visibleHints, setVisibleHints] = useState(0);
  const [visibleFollowUps, setVisibleFollowUps] = useState(0);
  const [patternRevealed, setPatternRevealed] = useState(!day.hidePatternUntilReveal);
  const completed = completedDaySet(state);
  const dueReview = useMemo(() => findDueReview(state.dsaAttempts, completed), [completed, state.dsaAttempts]);
  const dsa = state.dsaAttempts[day.day];
  const behavioralPractice = state.behavioral[day.day] ?? { day: day.day, practicedAt: "", notes: emptyStar };
  const resumePractice = state.resume[day.day] ?? { day: day.day, practicedAt: "", notes: "" };

  function saveAttempt(outcome: AttemptOutcome, knownAlready = false) {
    const today = localDateKey();
    const attempt: DsaAttempt = {
      day: day.day,
      outcome,
      knownAlready,
      attemptedAt: new Date().toISOString(),
      secondsElapsed,
      approach: dsa?.approach ?? "",
      recognizedPattern: dsa?.recognizedPattern ?? "",
      timeComplexity: dsa?.timeComplexity ?? "",
      spaceComplexity: dsa?.spaceComplexity ?? "",
      missed: dsa?.missed ?? "",
      nextTime: dsa?.nextTime ?? "",
      reviewStep: 0,
      nextReviewDate: scheduleNextReview(outcome, 0, today)
    };
    actions.update((current) => ({ ...current, dsaAttempts: { ...current.dsaAttempts, [day.day]: attempt } }));
  }

  function updateAttemptField(field: keyof DsaAttempt, value: string) {
    if (!dsa) return;
    actions.update((current) => ({ ...current, dsaAttempts: { ...current.dsaAttempts, [day.day]: { ...dsa, [field]: value } } }));
  }

  function updateStar(field: keyof StarNotes, value: string) {
    actions.update((current) => ({
      ...current,
      behavioral: {
        ...current.behavioral,
        [day.day]: {
          ...behavioralPractice,
          practicedAt: behavioralPractice.practicedAt || new Date().toISOString(),
          notes: { ...behavioralPractice.notes, [field]: value }
        }
      }
    }));
  }

  function completeDay() {
    if (!canCompleteDay(state, day.day)) return;
    actions.update((current) => ({
      ...current,
      completions: current.completions.some((item) => item.day === day.day)
        ? current.completions
        : [...current.completions, { day: day.day, completedAt: new Date().toISOString() }]
    }));
  }

  const ready = canCompleteDay(state, day.day);

  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">Day {day.day} / 90</p>
          <h1>{day.topic}</h1>
          <p>{day.subtopic} - streak {streak} day{streak === 1 ? "" : "s"}</p>
        </div>
        <div className="statPill">{state.completions.length} completed</div>
      </header>

      <Card title="1. Learn" eyebrow={day.conceptTitle}>
        <p>{day.conceptSummary}</p>
        <div className="chips">{day.recognitionSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </Card>

      <Card title="2. LeetCode" eyebrow={`${day.difficulty} - target ${day.targetMinutes} min`}>
        <div className="splitLine">
          <div>
            <h3>{day.problemTitle}</h3>
            <p>{patternRevealed ? day.pattern : "Pattern hidden for interview-style practice."}</p>
          </div>
          <a className="button secondary" href={day.leetcodeUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> LeetCode
          </a>
        </div>
        {day.hidePatternUntilReveal && !patternRevealed && <button className="button ghost" type="button" onClick={() => setPatternRevealed(true)}>Reveal pattern</button>}
        <Timer onTick={setSecondsElapsed} />
        <div className="hintBox">
          {day.hints.slice(0, visibleHints).map((hint) => <p key={hint}><Lightbulb size={15} /> {hint}</p>)}
          {visibleHints < day.hints.length && <button className="button ghost" type="button" onClick={() => setVisibleHints((value) => value + 1)}>Reveal hint</button>}
        </div>
        <div className="buttonGrid">
          {outcomes.map((outcome) => (
            <button key={outcome.value} className={dsa?.outcome === outcome.value ? "button selected" : "button secondary"} type="button" onClick={() => saveAttempt(outcome.value)}>
              {outcome.label}
            </button>
          ))}
          <button className="button secondary" type="button" onClick={() => saveAttempt("solved_confidently", true)}>Already know this problem</button>
        </div>
        {dsa && (
          <div className="formGrid">
            <Field label="Approach used" value={dsa.approach} onChange={(value) => updateAttemptField("approach", value)} />
            <Field label="Pattern I should recognize" value={dsa.recognizedPattern} onChange={(value) => updateAttemptField("recognizedPattern", value)} />
            <Field label="Time complexity" value={dsa.timeComplexity} onChange={(value) => updateAttemptField("timeComplexity", value)} rows={2} />
            <Field label="Space complexity" value={dsa.spaceComplexity} onChange={(value) => updateAttemptField("spaceComplexity", value)} rows={2} />
            <Field label="What I missed" value={dsa.missed} onChange={(value) => updateAttemptField("missed", value)} />
            <Field label="Next time" value={dsa.nextTime} onChange={(value) => updateAttemptField("nextTime", value)} />
          </div>
        )}
      </Card>

      <Card title="3. Behavioral" eyebrow={`${behavioral.type} - ${behavioral.competency}`}>
        <h3>{behavioral.prompt}</h3>
        <div className="formGrid">
          {(["situation", "task", "action", "result", "lesson"] as const).map((field) => (
            <Field key={field} label={field[0].toUpperCase() + field.slice(1)} value={behavioralPractice.notes[field]} onChange={(value) => updateStar(field, value)} />
          ))}
        </div>
        <div className="splitLine">
          <label className="inlineField">Confidence
            <select
              value={behavioralPractice.confidence ?? ""}
              onChange={(event) => actions.update((current) => ({ ...current, behavioral: { ...current.behavioral, [day.day]: { ...behavioralPractice, practicedAt: new Date().toISOString(), confidence: Number(event.target.value), notes: behavioralPractice.notes } } }))}
            >
              <option value="">Unrated</option>
              {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
            </select>
          </label>
          <button className={state.behavioral[day.day] ? "button selected" : "button secondary"} type="button" onClick={() => actions.update((current) => ({ ...current, behavioral: { ...current.behavioral, [day.day]: { ...behavioralPractice, practicedAt: new Date().toISOString() } } }))}><Check size={16} /> Mark practiced</button>
        </div>
      </Card>

      <Card title="4. Resume Grill" eyebrow={`${experience?.label} - ${grill.category}`}>
        <h3>{grill.primary}</h3>
        {grill.followUps.slice(0, visibleFollowUps).map((followUp) => <p className="followUp" key={followUp}>{followUp}</p>)}
        {visibleFollowUps < grill.followUps.length && <button className="button ghost" type="button" onClick={() => setVisibleFollowUps((value) => value + 1)}>Interviewer follow-up</button>}
        <Field label="My answer notes" value={resumePractice.notes} onChange={(value) => actions.update((current) => ({ ...current, resume: { ...current.resume, [day.day]: { ...resumePractice, practicedAt: resumePractice.practicedAt || new Date().toISOString(), notes: value } } }))} rows={5} />
        <div className="splitLine">
          <label className="inlineField">Confidence
            <select value={resumePractice.confidence ?? ""} onChange={(event) => actions.update((current) => ({ ...current, resume: { ...current.resume, [day.day]: { ...resumePractice, practicedAt: new Date().toISOString(), confidence: Number(event.target.value) } } }))}>
              <option value="">Unrated</option>
              {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
            </select>
          </label>
          <button className={state.resume[day.day] ? "button selected" : "button secondary"} type="button" onClick={() => actions.update((current) => ({ ...current, resume: { ...current.resume, [day.day]: { ...resumePractice, practicedAt: new Date().toISOString() } } }))}><Check size={16} /> Mark practiced</button>
        </div>
      </Card>

      {state.settings.showReviewCard && (
        <Card title="5. Review Due" eyebrow="Optional spaced repetition">
          {dueReview ? <p><TimerReset size={16} /> Day {dueReview.day}: {curriculum[dueReview.day - 1].problemTitle} is due for review.</p> : <p>Nothing due for review. Keep moving.</p>}
        </Card>
      )}

      <button className="completeButton" type="button" disabled={!ready} onClick={completeDay}>
        Complete Day
      </button>
    </div>
  );
}
