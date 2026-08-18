export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="progressWrap" aria-label={label}>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${clamped}%` }} />
      </div>
      <span>{clamped}%</span>
    </div>
  );
}
