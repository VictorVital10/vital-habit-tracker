import { addDays, todayKey } from "./habits.js";

/**
 * Builds a day-by-day grid (like GitHub's contribution graph) ending today.
 * Weeks run as columns, Sun-Sat as rows, so the DOM order is column-major —
 * matches the CSS grid-auto-flow:column layout.
 *
 * "Level" has 3 states: 0 = not done, 1 = done, 2 = done as part of a
 * streak of 7+ consecutive days ("incandescent" — see levelForRun).
 */
export function buildGridDays(completedDates, weeks = 13) {
  const today = todayKey();
  const totalDays = weeks * 7;
  const set = new Set(completedDates);

  // Align the end of the grid to the upcoming Saturday so full weeks render.
  const todayDow = new Date().getDay(); // 0=Sun..6=Sat
  const end = addDays(today, 6 - todayDow);
  const start = addDays(end, -(totalDays - 1));

  const days = [];
  let runLength = 0;
  let cursor = start;
  for (let i = 0; i < totalDays; i++) {
    const done = set.has(cursor);
    runLength = done ? runLength + 1 : 0;
    days.push({
      date: cursor,
      done,
      isToday: cursor === today,
      isFuture: cursor > today,
      level: done ? levelForRun(runLength) : 0,
    });
    cursor = addDays(cursor, 1);
  }
  return days;
}

function levelForRun(runLength) {
  return runLength >= 7 ? 2 : 1;
}

export function renderGrid(container, days) {
  container.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (const day of days) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (day.isFuture) {
      cell.style.visibility = "hidden";
    } else {
      cell.dataset.level = String(day.level);
      cell.title = day.date;
      if (day.isToday) cell.classList.add("is-today");
    }
    frag.appendChild(cell);
  }
  container.appendChild(frag);
}
