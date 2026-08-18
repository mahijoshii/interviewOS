import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export function Timer({ onTick }: { onTick?: (seconds: number) => void }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      setSeconds((value) => {
        const next = value + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [onTick, running]);

  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");

  return (
    <div className="timer">
      <span aria-live="polite">
        {minutes}:{rest}
      </span>
      <button type="button" className="iconButton" onClick={() => setRunning((value) => !value)} aria-label={running ? "Pause timer" : "Start timer"}>
        {running ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        type="button"
        className="iconButton"
        onClick={() => {
          setSeconds(0);
          onTick?.(0);
        }}
        aria-label="Reset timer"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
