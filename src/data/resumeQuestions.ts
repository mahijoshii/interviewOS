import type { ResumeExperience, ResumeGrillQuestion } from "../types";

export const resumeExperiences: ResumeExperience[] = [
  {
    id: "amplify-timesheets",
    label: "Amplify Care timesheet platform",
    role: "Software Engineering Intern - Product",
    focus: "Company-wide timesheet platform and AI-generated work descriptions.",
    technologies: ["React", "TypeScript", "Python", "Microsoft Graph", "Azure OpenAI", "PostgreSQL"],
    claims: ["Reduced completion time by 60%.", "Saved about 1 hour per employee biweekly.", "Built RAG grounding in company documentation."]
  },
  {
    id: "robots-lab",
    label: "Multi-robot teleoperation research",
    role: "Undergraduate Research Assistant",
    focus: "Task assignment, waypoint planning, and formation-control evaluation.",
    technologies: ["Python", "robot coordination algorithms"],
    claims: ["Reduced control latency below 100 ms.", "Maintained about 5 cm formation error across a 0.70x-1.60x scaling range."]
  },
  {
    id: "cibc-rag",
    label: "CIBC FX research RAG search",
    role: "Global Markets Analyst - FICC Strategy",
    focus: "Internal natural-language search over FX newsletters, spreadsheets, and annual reports.",
    technologies: ["OpenAI text-embedding-3-small", "vector similarity search", "GPT-4o", "Python"],
    claims: ["Indexed 200+ source documents.", "Saved senior team members 2+ hours per week."]
  },
  {
    id: "cibc-etl",
    label: "CIBC Bloomberg FX analytics pipeline",
    role: "Global Markets Analyst - FICC Strategy",
    focus: "Minute-level FX rate ingestion, feature generation, and trader analytics.",
    technologies: ["Python", "Bloomberg Terminal"],
    claims: ["Validated end-of-month analytics at 100% accuracy."]
  },
  {
    id: "mda-anomaly",
    label: "MDA Canadarm3 anomaly detection",
    role: "Software Engineering Intern - GNC",
    focus: "Time-series anomaly detection for simulated Canadarm3 telemetry.",
    technologies: ["LSTM", "One-Class SVM", "Python"],
    claims: ["Achieved 90.0% precision, 84.2% recall, and 87.0% F1.", "Automated about 1,200 simulation datasets per day."]
  },
  {
    id: "omori-ordering",
    label: "Omori machine-ordering platform",
    role: "Software Engineering Intern - Product",
    focus: "Client-facing order capture, validation, and downstream workflow.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "REST APIs"],
    claims: ["Reduced processing by 200+ hours per year.", "Reduced errors by 80%."]
  },
  {
    id: "motion",
    label: "Motion smartwatch activity recognition",
    role: "Personal Project",
    focus: "STM32-based human activity recognition with wearable sensor data.",
    technologies: ["STM32", "XGBoost", "LSTM", "1D CNN", "accelerometer", "gyroscope"],
    claims: ["Collecting and labeling sensor data.", "Comparing models for real-time activity classification."]
  },
  {
    id: "fundr",
    label: "Fundr grant matching platform",
    role: "Hack the Valley X",
    focus: "Personalized AI grant discovery and recommendation.",
    technologies: ["Gemini embeddings", "cosine similarity", "eligibility rules", "Snowflake", "FastAPI"],
    claims: ["Collected grants from 3+ sources.", "Matched users by demographics, project goals, and funding criteria."]
  },
  {
    id: "electrium",
    label: "Electrium Mobility design team",
    role: "Technical Project Manager",
    focus: "Engineering team leadership, integration demos, and STM32 firmware.",
    technologies: ["STM32", "C++"],
    claims: ["Led a 15-member team.", "Developed firmware with sub-50 ms control latency."]
  }
];

const categories = ["Technical", "Architecture", "Metrics", "Ownership", "Debugging", "Scaling", "Tradeoffs"] as const;

function questionFor(experience: ResumeExperience, day: number): ResumeGrillQuestion {
  const category = categories[(day - 1) % categories.length];
  const tech = experience.technologies.join(", ");
  const claim = experience.claims[(day - 1) % experience.claims.length];
  const primaryByCategory = {
    Technical: `For ${experience.label}, what exactly did you implement, and where did ${tech} fit into the implementation?`,
    Architecture: `Walk me through the architecture of ${experience.label} from the first user/system action to the final output.`,
    Metrics: `You claim "${claim}" for ${experience.label}. What was the baseline, denominator, and measurement method?`,
    Ownership: `For ${experience.label}, what was personally yours versus what already existed or was handled by teammates?`,
    Debugging: `What was the hardest bug or failure mode in ${experience.label}, and how did you isolate it?`,
    Scaling: `If ${experience.label} had 10x the users, data, or throughput, what would fail first and why?`,
    Tradeoffs: `What alternative design did you reject for ${experience.label}, and what tradeoff made your chosen approach better?`
  };
  return {
    id: `resume-${day}`,
    day,
    experienceId: experience.id,
    category,
    primary: primaryByCategory[category],
    followUps: [
      `Explain it without buzzwords, as if I am reviewing your contribution line by line.`,
      `What assumption in this story would be easiest for an interviewer to challenge?`,
      `What evidence would you show to prove your answer is accurate?`,
      `What would you redesign today if you had another week?`
    ]
  };
}

export const resumeQuestions: ResumeGrillQuestion[] = Array.from({ length: 90 }, (_, index) => {
  const experience = resumeExperiences[index % resumeExperiences.length];
  return questionFor(experience, index + 1);
});
