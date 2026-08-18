import { resumeExperiences, resumeQuestions } from "../data/resumeQuestions";
import { Card } from "../components/common/Card";
import { Field } from "../components/common/Field";
import type { AppState } from "../types";
import type { InterviewActions } from "../hooks/useInterviewState";

export function ResumePage({ state, actions }: { state: AppState; actions: InterviewActions }) {
  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">Defense practice</p>
          <h1>Resume Prep</h1>
          <p>Concise resume-derived labels only. Original resume files are not stored in the app.</p>
        </div>
      </header>
      {resumeExperiences.map((experience) => {
        const questions = resumeQuestions.filter((question) => question.experienceId === experience.id);
        const practiced = questions.filter((question) => state.resume[question.day]).length;
        const ratings = questions.map((question) => state.resume[question.day]?.confidence).filter((rating): rating is number => Boolean(rating));
        const avg = ratings.length ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) : "unrated";
        return (
          <Card key={experience.id} title={experience.label} eyebrow={experience.role}>
            <p>{experience.focus}</p>
            <p>{practiced}/{questions.length} practiced - average confidence {avg}</p>
            <div className="chips">{experience.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
            {questions.map((question) => {
              const practice = state.resume[question.day] ?? { day: question.day, practicedAt: "", notes: "" };
              return (
                <details key={question.id} className="questionDetail">
                  <summary>Day {question.day} - {question.category}</summary>
                  <h3>{question.primary}</h3>
                  <Field label="My answer notes" value={practice.notes} onChange={(value) => actions.update((current) => ({ ...current, resume: { ...current.resume, [question.day]: { ...practice, practicedAt: practice.practicedAt || new Date().toISOString(), notes: value } } }))} />
                </details>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
}
