import { Download, Upload, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Card } from "../components/common/Card";
import type { AppState } from "../types";
import type { InterviewActions } from "../hooks/useInterviewState";
import { defaultState, exportPayload, parseImport } from "../lib/storage";

export function SettingsPage({ state, actions }: { state: AppState; actions: InterviewActions }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importSummary, setImportSummary] = useState<{ text: string; state: AppState } | null>(null);

  function exportProgress() {
    const payload = JSON.stringify(exportPayload(state), null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `interviewos-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function loadImport(file: File) {
    const result = parseImport(await file.text());
    if (!result.ok) {
      setImportSummary({ text: result.error, state });
      return;
    }
    setImportSummary({
      text: `${result.state.completions.length} completed days, ${Object.keys(result.state.dsaAttempts).length} DSA attempts, ${Object.keys(result.state.behavioral).length} behavioral notes.`,
      state: result.state
    });
  }

  return (
    <div className="pageStack">
      <header className="topHeader">
        <div>
          <p className="eyebrow">Local controls</p>
          <h1>Settings</h1>
          <p>Progress stays in browser storage unless you export it.</p>
        </div>
      </header>
      <Card title="Preferences">
        <div className="settingsGrid">
          <label className="inlineField">Theme
            <select value={state.settings.theme} onChange={(event) => actions.update((current) => ({ ...current, settings: { ...current.settings, theme: event.target.value as AppState["settings"]["theme"] } }))}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="inlineField">Preferred coding language
            <input value={state.settings.preferredLanguage} onChange={(event) => actions.update((current) => ({ ...current, settings: { ...current.settings, preferredLanguage: event.target.value } }))} />
          </label>
          <label className="checkField"><input type="checkbox" checked={state.settings.revealFutureProblems} onChange={(event) => actions.update((current) => ({ ...current, settings: { ...current.settings, revealFutureProblems: event.target.checked } }))} /> Reveal future problems</label>
          <label className="checkField"><input type="checkbox" checked={state.settings.showReviewCard} onChange={(event) => actions.update((current) => ({ ...current, settings: { ...current.settings, showReviewCard: event.target.checked } }))} /> Show optional review card</label>
        </div>
      </Card>
      <Card title="Backup">
        <div className="buttonGrid">
          <button className="button secondary" type="button" onClick={exportProgress}><Download size={16} /> Export Progress</button>
          <button className="button secondary" type="button" onClick={() => fileRef.current?.click()}><Upload size={16} /> Import Progress</button>
          <input ref={fileRef} className="hiddenInput" type="file" accept="application/json" onChange={(event) => event.target.files?.[0] && void loadImport(event.target.files[0])} />
        </div>
        {importSummary && (
          <div className="notice">
            <p>{importSummary.text}</p>
            <button className="button" type="button" onClick={() => actions.replace(importSummary.state)}>Confirm import and replace current progress</button>
          </div>
        )}
      </Card>
      <Card title="Reset">
        <p>Reset removes local progress on this browser. Export first if you may need it later.</p>
        <button
          className="button danger"
          type="button"
          onClick={() => {
            if (window.confirm("Type reset mentally, then confirm: remove all InterviewOS progress from this browser?")) actions.replace(defaultState);
          }}
        >
          <Trash2 size={16} /> Reset All Progress
        </button>
      </Card>
    </div>
  );
}
