// Per-habit accent colors (HabitNow-style: each habit gets its own color,
// not just a shared app-wide accent). Deliberately kept mid-to-dark and
// similarly saturated so the fixed cream/dark text in a colored chip or
// checkbox always stays legible, in both light and dark mode.
export const HABIT_COLORS = [
  { name: "ember", hex: "#e4572e" }, // default — matches the app's own brand color
  { name: "amber", hex: "#d9922e" },
  { name: "leaf", hex: "#4c8b46" },
  { name: "teal", hex: "#2b8a8a" },
  { name: "sky", hex: "#2f6fa8" },
  { name: "violet", hex: "#7457c9" },
  { name: "rose", hex: "#c9457e" },
  { name: "slate", hex: "#5c6470" },
];

export const DEFAULT_HABIT_COLOR = HABIT_COLORS[0].hex;

/** Old habits saved before this feature existed have no `color` field. */
export function habitColor(habit) {
  return habit.color || DEFAULT_HABIT_COLOR;
}
