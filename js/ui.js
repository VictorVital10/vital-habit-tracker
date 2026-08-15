import { HabitStore, currentStreak, bestStreak, todayKey, streakTier, streakLabel } from "./habits.js";
import { buildGridDays, renderGrid } from "./calendar.js";

const store = new HabitStore();

const habitListEl = document.getElementById("habitList");
const emptyStateTpl = document.getElementById("emptyStateTemplate");
const habitCardTpl = document.getElementById("habitCardTemplate");

const addHabitBtn = document.getElementById("addHabitBtn");
const sheetOverlay = document.getElementById("sheetOverlay");
const addSheet = document.getElementById("addSheet");
const addHabitForm = document.getElementById("addHabitForm");
const habitEmojiInput = document.getElementById("habitEmoji");
const habitNameInput = document.getElementById("habitName");
const cancelAddBtn = document.getElementById("cancelAddBtn");

const historyOverlay = document.getElementById("historyOverlay");
const historySheet = document.getElementById("historySheet");
const historyTitle = document.getElementById("historyTitle");
const historyStreakEl = document.getElementById("historyStreak");
const historyBestEl = document.getElementById("historyBest");
const historyTotalEl = document.getElementById("historyTotal");
const historyGrid = document.getElementById("historyGrid");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");

let activeHistoryHabitId = null;

export function init() {
  render();
  wireGlobalEvents();
}

function render() {
  habitListEl.innerHTML = "";
  const habits = store.all();

  if (habits.length === 0) {
    habitListEl.appendChild(emptyStateTpl.content.cloneNode(true));
    return;
  }

  const frag = document.createDocumentFragment();
  for (const habit of habits) {
    frag.appendChild(renderHabitCard(habit));
  }
  habitListEl.appendChild(frag);
}

function renderHabitCard(habit) {
  const node = habitCardTpl.content.firstElementChild.cloneNode(true);
  const today = todayKey();

  node.dataset.id = habit.id;
  node.querySelector(".habit-card__emoji").textContent = habit.emoji;
  node.querySelector(".habit-card__name").textContent = habit.name;

  const toggle = node.querySelector(".today-toggle");
  const done = store.isDoneOn(habit.id, today);
  toggle.classList.toggle("is-done", done);
  toggle.querySelector(".today-toggle__label").textContent = done ? "feito hoje" : "hoje";

  const streak = currentStreak(habit.completedDates);
  node.querySelector(".streak-display__num").textContent = String(streak);
  node.querySelector(".streak-display__label").textContent = streakLabel(streak);
  node.querySelector(".streak-display").classList.add(`streak-display--tier-${streakTier(streak)}`);

  const miniGrid = node.querySelector(".habit-grid--mini");
  renderGrid(miniGrid, buildGridDays(habit.completedDates, 9));

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasDone = store.isDoneOn(habit.id, today);
    store.toggleDate(habit.id, today);
    render();
    if (!wasDone) triggerIgnite(habit.id);
  });

  node.querySelector(".habit-card__delete").addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm(`Excluir "${habit.name}"? Isso apaga todo o histórico.`)) {
      store.remove(habit.id);
      render();
    }
  });

  node.addEventListener("click", () => openHistory(habit.id));
  node.addEventListener("keydown", (e) => {
    if (e.target !== node) return; // ignore Enter/Space bubbling from nested buttons
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openHistory(habit.id);
    }
  });

  return node;
}

/** Small celebratory flash on the flame icon + today's cell right after marking a habit done. */
function triggerIgnite(habitId) {
  const card = habitListEl.querySelector(`[data-id="${habitId}"]`);
  if (!card) return;
  card.querySelector(".streak-flame")?.classList.add("is-lighting");
  card.querySelector(".cell.is-today")?.classList.add("is-igniting");
}

/* ---------- add-habit sheet ---------- */

function openAddSheet() {
  habitEmojiInput.value = "";
  habitNameInput.value = "";
  sheetOverlay.hidden = false;
  addSheet.hidden = false;
  setTimeout(() => habitNameInput.focus(), 50);
}

function closeAddSheet() {
  sheetOverlay.hidden = true;
  addSheet.hidden = true;
}

function wireGlobalEvents() {
  addHabitBtn.addEventListener("click", openAddSheet);
  cancelAddBtn.addEventListener("click", closeAddSheet);
  sheetOverlay.addEventListener("click", () => {
    closeAddSheet();
    closeHistory();
  });

  addHabitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = habitNameInput.value.trim();
    if (!name) return;
    store.add(name, habitEmojiInput.value);
    closeAddSheet();
    render();
  });

  closeHistoryBtn.addEventListener("click", closeHistory);
  historyOverlay.addEventListener("click", closeHistory);
}

/* ---------- history sheet ---------- */

function openHistory(habitId) {
  const habit = store.get(habitId);
  if (!habit) return;
  activeHistoryHabitId = habitId;

  historyTitle.textContent = `${habit.emoji} ${habit.name}`;
  historyStreakEl.textContent = String(currentStreak(habit.completedDates));
  historyBestEl.textContent = String(bestStreak(habit.completedDates));
  historyTotalEl.textContent = String(habit.completedDates.length);

  renderGrid(historyGrid, buildGridDays(habit.completedDates, 26));

  historyOverlay.hidden = false;
  historySheet.hidden = false;
}

function closeHistory() {
  historyOverlay.hidden = true;
  historySheet.hidden = true;
  activeHistoryHabitId = null;
}
