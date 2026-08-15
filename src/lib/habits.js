/** YYYY-MM-DD in local time (not UTC, so it matches the user's day). */
export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(dateKey, delta) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return todayKey(dt);
}

export function uid() {
  return `h_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Current streak: consecutive completed days ending today.
 * If today isn't done yet, the streak still counts as "alive" through
 * yesterday (so marking today doesn't feel like starting over at 1am),
 * but breaks to 0 as soon as a full day is skipped.
 */
export function currentStreak(completedDates, today = todayKey()) {
  const set = new Set(completedDates);
  let cursor = set.has(today) ? today : addDays(today, -1);
  if (!set.has(cursor)) return 0;

  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Longest streak ever recorded, from the full completed-dates history. */
export function bestStreak(completedDates) {
  const dates = [...completedDates].sort();
  if (dates.length === 0) return 0;

  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i++) {
    if (addDays(dates[i - 1], 1) === dates[i]) {
      run++;
    } else {
      run = 1;
    }
    best = Math.max(best, run);
  }
  return best;
}

/** Visual intensity tier for a streak length: 0 = none, 1 = lit, 2 = incandescent (7+). */
export function streakTier(streak) {
  if (streak >= 7) return 2;
  if (streak >= 1) return 1;
  return 0;
}

/** "1 dia seguido" vs "N dias seguidos". */
export function streakLabel(streak) {
  return streak === 1 ? "dia seguido" : "dias seguidos";
}
