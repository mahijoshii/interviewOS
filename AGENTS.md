# InterviewOS Agent Notes

InterviewOS is a static React/TypeScript interview-preparation dashboard that assigns the next unfinished curriculum day, not the calendar day. Preserve the completion-based progression, hash routing for GitHub Pages, and local-only storage model.

Key structure: curriculum content lives in `src/data/curriculum.ts`, behavioral prompts in `src/data/behavioralQuestions.ts`, resume grill prompts and concise experience labels in `src/data/resumeQuestions.ts`, storage schema in `src/lib/storage.ts`, and review/streak/mastery logic in `src/lib/`. Pages are under `src/pages/`; shared UI primitives are under `src/components/common/`.

Commands: `npm install`, `npm run dev`, `npm run lint`, `npm test`, `npm run build`. Deployment is `.github/workflows/pages.yml`, which publishes `dist` to GitHub Pages on pushes to `main`. Keep Vite `base` aligned with the repo project-page path.

Privacy constraints: never add source resume files, raw resume text, private notes, exports, `.env` files, or user answers to source or build artifacts. Resume-derived app content should stay concise and question-oriented. Future content changes must keep question data separate from presentation components and pass `validateContent()`.
