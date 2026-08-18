import { curriculum, phaseSummaries } from "../data/curriculum";
import { Card } from "../components/common/Card";
import { ProgressBar } from "../components/common/ProgressBar";
import type { AppState } from "../types";
import type { InterviewActions } from "../hooks/useInterviewState";
import { topicMastery } from "../lib/mastery";

export function CurriculumPage({ state, actions }: { state: AppState; actions: InterviewActions }) {
  const mastery = topicMastery(state);
  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">90-day sequence</p>
          <h1>Curriculum</h1>
          <p>Progress is based on completed study days, not calendar days.</p>
        </div>
        <button className="button secondary" type="button" onClick={() => actions.update((current) => ({ ...current, settings: { ...current.settings, revealFutureProblems: !current.settings.revealFutureProblems } }))}>
          {state.settings.revealFutureProblems ? "Hide future problems" : "Reveal future problems"}
        </button>
      </header>
      <div className="phaseGrid">
        {phaseSummaries.map((phase) => {
          const phaseMastery = mastery.find((item) => item.phase === phase.phase)!;
          const percent = Math.round((phaseMastery.completed / phase.days) * 100);
          return (
            <Card key={phase.phase} title={phase.topic} eyebrow={`Phase ${phase.phase}`}>
              <ProgressBar value={percent} label={`${phase.topic} completion`} />
              <p>{phaseMastery.completed}/{phase.days} days - mastery {phaseMastery.mastery}%</p>
            </Card>
          );
        })}
      </div>
      <Card title="Days">
        <div className="table">
          {curriculum.map((day) => {
            const complete = state.completions.some((item) => item.day === day.day);
            return (
              <div className="tableRow" key={day.day}>
                <span>Day {day.day}</span>
                <span>{day.topic}</span>
                <span>{complete || state.settings.revealFutureProblems ? day.problemTitle : "Hidden until reached"}</span>
                <span>{complete ? "Complete" : "Upcoming"}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
