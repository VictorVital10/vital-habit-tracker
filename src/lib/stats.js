import { addDays, bestStreak, todayKey } from "@/lib/habits";
import { pillarOf } from "@/lib/pillars";

/** Weekly targets a habit can have (days per week). */
export const GOALS = [
  { value: 3, name: "Leve", desc: "3x por semana" },
  { value: 5, name: "Moderada", desc: "5x por semana" },
  { value: 7, name: "Diária", desc: "Todos os dias" },
];

export const DEFAULT_GOAL = 7;

/** Streak lengths that trigger the full-screen celebration. */
export const MILESTONES = [7, 21, 30, 50, 100];

/** Habits saved before weekly goals existed are daily habits. */
export function habitGoal(habit) {
  return habit.goal || DEFAULT_GOAL;
}

export function goalLabel(goal) {
  return GOALS.find((g) => g.value === goal)?.desc ?? `${goal}x por semana`;
}

/** Whole days from a to b (b - a), both YYYY-MM-DD. */
export function daysBetween(a, b) {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

/** Sunday that starts the week containing dateKey (matches the grid's Sun-Sat rows). */
export function weekStart(dateKey = todayKey()) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return addDays(dateKey, -new Date(y, m - 1, d).getDay());
}

function countBetween(dates, from, to) {
  return dates.filter((d) => d >= from && d <= to).length;
}

/** Days marked in the current week (weeksAgo = 0) or an earlier one. */
export function weekCount(dates, weeksAgo = 0, today = todayKey()) {
  const start = addDays(weekStart(today), -7 * weeksAgo);
  return countBetween(dates, start, addDays(start, 6));
}

/** Earliest day a habit "existed": its creation or its first marked day. */
function habitStart(habit) {
  const first = habit.completedDates[0];
  const created = habit.createdAt;
  if (first && created) return first < created ? first : created;
  return first || created;
}

/**
 * Average share of each habit's weekly goal met over the last 7 days (0-100).
 * A habit created 2 days ago is only judged on those 2 days, pro-rated.
 */
export function goalRate(habits, today = todayKey()) {
  if (habits.length === 0) return 0;
  const from = addDays(today, -6);
  let sum = 0;
  for (const habit of habits) {
    const start = habitStart(habit) ?? today;
    const windowStart = start > from ? start : from;
    const days = daysBetween(windowStart, today) + 1;
    const expected = Math.max(1, (habitGoal(habit) * days) / 7);
    const done = countBetween(habit.completedDates, windowStart, today);
    sum += Math.min(1, done / expected);
  }
  return Math.round((sum / habits.length) * 100);
}

/** Distinct days this month with at least one habit marked. */
export function activeDaysThisMonth(habits, today = todayKey()) {
  const month = today.slice(0, 7);
  const days = new Set();
  for (const habit of habits) {
    for (const date of habit.completedDates) {
      if (date.startsWith(month)) days.add(date);
    }
  }
  return days.size;
}

export function totalCheckins(habits) {
  return habits.reduce((sum, h) => sum + h.completedDates.length, 0);
}

/** A day when every habit was marked (only meaningful with 2+ habits). */
function hasPerfectDay(habits) {
  if (habits.length < 2) return false;
  const counts = new Map();
  for (const habit of habits) {
    for (const date of habit.completedDates) counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  return [...counts.values()].some((n) => n === habits.length);
}

/**
 * Achievement list with progress. `id` is used by the UI to pick an icon.
 * `current` is capped at `target`, so `current === target` means unlocked.
 */
export function achievements(habits) {
  const best = habits.reduce((max, h) => Math.max(max, bestStreak(h.completedDates)), 0);
  const total = totalCheckins(habits);
  const pillars = new Set(habits.map((h) => pillarOf(h).id).filter((id) => id !== "geral")).size;

  const list = [
    { id: "first", title: "Primeiro passo", desc: "Marque um hábito pela primeira vez", current: total, target: 1 },
    { id: "streak3", title: "Aquecendo", desc: "3 dias seguidos em um hábito", current: best, target: 3 },
    { id: "streak7", title: "Uma semana", desc: "7 dias seguidos em um hábito", current: best, target: 7 },
    { id: "streak21", title: "Três semanas", desc: "21 dias seguidos em um hábito", current: best, target: 21 },
    { id: "streak30", title: "Um mês inteiro", desc: "30 dias seguidos em um hábito", current: best, target: 30 },
    { id: "streak100", title: "Centenário", desc: "100 dias seguidos em um hábito", current: best, target: 100 },
    { id: "perfect", title: "Dia perfeito", desc: "Todos os hábitos feitos no mesmo dia", current: hasPerfectDay(habits) ? 1 : 0, target: 1 },
    { id: "balance", title: "Equilíbrio", desc: "Hábitos em 3 pilares diferentes", current: pillars, target: 3 },
    { id: "routine", title: "Rotina completa", desc: "5 hábitos ativos ao mesmo tempo", current: habits.length, target: 5 },
  ];
  return list.map((a) => ({ ...a, current: Math.min(a.current, a.target), unlocked: a.current >= a.target }));
}
