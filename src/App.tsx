import { BookOpen, Brain, CalendarDays, ChartNoAxesColumn, ClipboardList, Settings, UserRoundCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useInterviewState } from "./hooks/useInterviewState";
import { nextUnfinishedDay } from "./lib/progress";
import { calculateStreaks } from "./lib/streaks";
import { TodayPage } from "./pages/TodayPage";
import { CurriculumPage } from "./pages/CurriculumPage";
import { BehavioralPage } from "./pages/BehavioralPage";
import { ResumePage } from "./pages/ResumePage";
import { ProgressPage } from "./pages/ProgressPage";
import { SettingsPage } from "./pages/SettingsPage";

export type PageKey = "today" | "curriculum" | "behavioral" | "resume" | "progress" | "settings";

const nav = [
  { key: "today", label: "Today", icon: CalendarDays },
  { key: "curriculum", label: "Curriculum", icon: BookOpen },
  { key: "behavioral", label: "Behavioral", icon: Brain },
  { key: "resume", label: "Resume Prep", icon: ClipboardList },
  { key: "progress", label: "Progress", icon: ChartNoAxesColumn },
  { key: "settings", label: "Settings", icon: Settings }
] satisfies { key: PageKey; label: string; icon: typeof CalendarDays }[];

function pageFromHash(): PageKey {
  const key = window.location.hash.replace("#/", "") as PageKey;
  return nav.some((item) => item.key === key) ? key : "today";
}

export default function App() {
  const { state, actions } = useInterviewState();
  const [page, setPage] = useState<PageKey>(() => pageFromHash());
  const day = nextUnfinishedDay(state);
  const streaks = useMemo(() => calculateStreaks(state.completions), [state.completions]);

  useEffect(() => {
    const listener = () => setPage(pageFromHash());
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = state.settings.theme;
  }, [state.settings.theme]);

  const active = {
    today: <TodayPage state={state} actions={actions} activeDay={day} streak={streaks.current} />,
    curriculum: <CurriculumPage state={state} actions={actions} />,
    behavioral: <BehavioralPage state={state} actions={actions} />,
    resume: <ResumePage state={state} actions={actions} />,
    progress: <ProgressPage state={state} />,
    settings: <SettingsPage state={state} actions={actions} />
  }[page];

  return (
    <div className="appShell">
      <aside className="sidebar">
        <a className="brand" href="#/today" aria-label="InterviewOS home">
          <UserRoundCheck size={22} />
          <span>InterviewOS</span>
        </a>
        <nav aria-label="Primary">
          {nav.map(({ key, label, icon: Icon }) => (
            <a key={key} href={`#/${key}`} className={page === key ? "active" : ""}>
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>
      <main className="main">{active}</main>
    </div>
  );
}
