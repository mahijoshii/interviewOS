export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localDateKey(date);
}

export function dayDiff(a: string, b: string): number {
  const first = new Date(`${a}T12:00:00`).getTime();
  const second = new Date(`${b}T12:00:00`).getTime();
  return Math.round((second - first) / 86_400_000);
}
