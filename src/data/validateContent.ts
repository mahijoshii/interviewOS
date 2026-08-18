import { behavioralQuestions } from "./behavioralQuestions";
import { curriculum } from "./curriculum";
import { resumeExperiences, resumeQuestions } from "./resumeQuestions";

export function validateContent(): string[] {
  const errors: string[] = [];
  if (curriculum.length !== 90) errors.push(`Expected 90 curriculum days, found ${curriculum.length}.`);
  curriculum.forEach((day, index) => {
    if (day.day !== index + 1) errors.push(`Day ${day.day} is out of sequence.`);
    if (!day.problemTitle.trim()) errors.push(`Day ${day.day} is missing a problem title.`);
    if (!/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/.test(day.leetcodeUrl)) errors.push(`Day ${day.day} has malformed LeetCode URL.`);
    if (!day.topic.trim()) errors.push(`Day ${day.day} is missing a topic.`);
    if (day.hints.length === 0) errors.push(`Day ${day.day} is missing hints.`);
    if (!["Easy", "Medium", "Hard"].includes(day.difficulty)) errors.push(`Day ${day.day} has invalid difficulty.`);
  });
  if (behavioralQuestions.length !== 90) errors.push("Behavioral schedule must contain 90 questions.");
  if (resumeQuestions.length !== 90) errors.push("Resume grill schedule must contain 90 questions.");
  const experienceIds = new Set(resumeExperiences.map((item) => item.id));
  resumeQuestions.forEach((question) => {
    if (!experienceIds.has(question.experienceId)) errors.push(`${question.id} references an unknown experience.`);
    if (question.followUps.length < 3) errors.push(`${question.id} needs at least three follow-ups.`);
  });
  behavioralQuestions.forEach((question) => {
    if (question.resumeRefId && !experienceIds.has(question.resumeRefId)) errors.push(`${question.id} references an unknown resume item.`);
  });
  return errors;
}
