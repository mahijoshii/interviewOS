import type { BehavioralQuestion } from "../types";
import { resumeExperiences } from "./resumeQuestions";

const standardPrompts = [
  ["ownership", "Tell me about a time you took ownership of a problem that was not clearly assigned to you."],
  ["conflict", "Tell me about a technical disagreement and how you handled it."],
  ["failure", "Tell me about a time your first approach failed."],
  ["ambiguity", "Tell me about a time you had to make progress with incomplete information."],
  ["leadership", "Tell me about a time you helped a team align around a plan."],
  ["prioritization", "Tell me about a time you had multiple urgent priorities and had to choose."],
  ["feedback", "Tell me about a time feedback changed how you worked."],
  ["initiative", "Tell me about a time you found an opportunity before anyone asked for it."],
  ["learning quickly", "Tell me about a time you had to learn a new technical area quickly."],
  ["user focus", "Tell me about a time user or stakeholder feedback changed the product."]
] as const;

function resumePrompt(day: number): BehavioralQuestion {
  const experience = resumeExperiences[(day - 1) % resumeExperiences.length];
  const competencies = ["ownership", "ambiguity", "technical disagreement", "impact", "learning quickly", "collaboration"];
  const competency = competencies[(day - 1) % competencies.length];
  const prompts = [
    `Tell me about a time during ${experience.label} when your original technical approach did not work.`,
    `Which decision in ${experience.label} had the greatest impact, and how did you make it?`,
    `Tell me about a disagreement or uncertainty you had while working on ${experience.label}.`,
    `Tell me about a time you had to explain ${experience.label} to a non-expert stakeholder.`,
    `Tell me about a moment during ${experience.label} when you had to take responsibility for quality.`
  ];
  return {
    id: `behavioral-${day}`,
    day,
    type: "resume",
    competency,
    prompt: prompts[(day - 1) % prompts.length],
    resumeRefId: experience.id
  };
}

export const behavioralQuestions: BehavioralQuestion[] = Array.from({ length: 90 }, (_, index) => {
  const day = index + 1;
  if (day % 2 === 0) return resumePrompt(day);
  const [competency, prompt] = standardPrompts[(Math.floor(day / 2)) % standardPrompts.length];
  return {
    id: `behavioral-${day}`,
    day,
    type: "standard",
    competency,
    prompt
  };
});
