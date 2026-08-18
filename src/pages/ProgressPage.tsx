import { curriculum } from "../data/curriculum";
import { resumeQuestions } from "../data/resumeQuestions";
import { behavioralQuestions } from "../data/behavioralQuestions";
import { Card } from "../components/common/Card";
import { ProgressBar } from "../components/common/ProgressBar";
import type { AppState } from "../types";
import { overallDsaStats, topicMastery } from "../lib/mastery";
import { calculateStreaks } from "../lib/streaks";
import { nextUnfinishedDay } from "../lib/progress";

export function ProgressPage({ state }: { state: AppState }) {
  const dsa = overallDsaStats(state);
  const streaks = calculateStreaks(state.completions);
  const day = nextUnfinishedDay(state);
  const behavioralRatings = Object.values(state.behavioral).map((item) => item.confidence).filter((rating): rating is number => Boolean(rating));
  const resumeRatings = Object.values(state.resume).map((item) => item.confidence).filter((rating): rating is number => Boolean(rating));
  const avgBehavioral = behavioralRatings.length ? (behavioralRatings.reduce((sum, value) => sum + value, 0) / behavioralRatings.length).toFixed(1) : "unrated";
  const avgResume = resumeRatings.length ? (resumeRatings.reduce((sum, value) => sum + value, 0) / resumeRatings.length).toFixed(1) : "unrated";

  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">Transparent stats</p>
          <h1>Progress</h1>
          <p>Mastery formula: couldn't solve 0, hint 0.4, slow 0.7, confident 1.0.</p>
        </div>
      </header>
      <div className="metricGrid">
        <Card title={`Day ${day} / ${curriculum.length}`} eyebrow="Current curriculum day"><ProgressBar value={Math.round((state.completions.length / curriculum.length) * 100)} label="Overall completion" /></Card>
        <Card title={`${streaks.current}`} eyebrow="Current streak"><p>Longest streak: {streaks.longest}</p></Card>
        <Card title={`${dsa.total}`} eyebrow="LeetCode attempts"><p>{dsa.solved_confidently} confident - {dsa.weak} weak</p></Card>
        <Card title={`${Object.keys(state.behavioral).length} / ${behavioralQuestions.length}`} eyebrow="Behavioral practiced"><p>Average confidence: {avgBehavioral}</p></Card>
        <Card title={`${Object.keys(state.resume).length} / ${resumeQuestions.length}`} eyebrow="Resume grills practiced"><p>Average confidence: {avgResume}</p></Card>
      </div>
      <Card title="Topic Mastery">
        <div className="table">
          {topicMastery(state).map((topic) => (
            <div className="tableRow" key={topic.phase}>
              <span>{topic.topic}</span>
              <span>{topic.completed}/{topic.days}</span>
              <span>{topic.mastery}% mastery</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
