// Same localStorage key/shape as the vanilla build, so existing habits
// aren't lost when switching to the React version.
// Key keeps the app's original name (Ember) on purpose: renaming it would
// orphan every habit already saved on users' devices.
const STORAGE_KEY = "ember.habits.v1";

export function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}
