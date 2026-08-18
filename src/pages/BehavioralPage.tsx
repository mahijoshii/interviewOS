import { useMemo, useState } from "react";
import { behavioralQuestions } from "../data/behavioralQuestions";
import { resumeExperiences } from "../data/resumeQuestions";
import { Card } from "../components/common/Card";
import { Field } from "../components/common/Field";
import type { AppState, StarNotes } from "../types";
import type { InterviewActions } from "../hooks/useInterviewState";

const emptyStar: StarNotes = { situation: "", task: "", action: "", result: "", lesson: "" };

export function BehavioralPage({ state, actions }: { state: AppState; actions: InterviewActions }) {
  const [type, setType] = useState("all");
  const [competency, setCompetency] = useState("all");
  const competencies = [...new Set(behavioralQuestions.map((question) => question.competency))];
  const filtered = useMemo(
    () => behavioralQuestions.filter((question) => (type === "all" || question.type === type) && (competency === "all" || question.competency === competency)),
    [competency, type]
  );

  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">Story practice</p>
          <h1>Behavioral</h1>
          <p>Build your own STAR answers. No canned model answers are generated.</p>
        </div>
      </header>
      <Card>
        <div className="filters">
          <label className="inlineField">Type
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="all">All</option>
              <option value="standard">Standard</option>
              <option value="resume">Resume-specific</option>
            </select>
          </label>
          <label className="inlineField">Competency
            <select value={competency} onChange={(event) => setCompetency(event.target.value)}>
              <option value="all">All</option>
              {competencies.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </Card>
      {filtered.map((question) => {
        const practice = state.behavioral[question.day] ?? { day: question.day, practicedAt: "", notes: emptyStar };
        const label = question.resumeRefId ? resumeExperiences.find((item) => item.id === question.resumeRefId)?.label : undefined;
        return (
          <Card key={question.id} title={`Day ${question.day}`} eyebrow={`${question.type} - ${question.competency}`}>
            <h3>{question.prompt}</h3>
            {label && <p>{label}</p>}
            <div className="formGrid compact">
              {(["situation", "task", "action", "result", "lesson"] as const).map((field) => (
                <Field
                  key={field}
                  label={field[0].toUpperCase() + field.slice(1)}
                  value={practice.notes[field]}
                  onChange={(value) => actions.update((current) => ({ ...current, behavioral: { ...current.behavioral, [question.day]: { ...practice, practicedAt: practice.practicedAt || new Date().toISOString(), notes: { ...practice.notes, [field]: value } } } }))}
                />
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
