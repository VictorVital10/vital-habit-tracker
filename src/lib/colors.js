// Per-habit accent colors (HabitNow-style: each habit gets its own color,
// not just a shared app-wide accent). All drawn from the GenesysMed teal/blue
// family and kept light enough that the dark ink check mark on a filled
// checkbox stays legible, while still glowing against the navy background.
export const HABIT_COLORS = [
  { name: "teal", hex: "#00b4cc" }, // default — matches the app's own brand color
  { name: "aqua", hex: "#26c8dc" },
  { name: "mist", hex: "#80deea" },
  { name: "lagoon", hex: "#2ec4a6" },
  { name: "sky", hex: "#4fa3e0" },
  { name: "azure", hex: "#5b8def" },
  { name: "periwinkle", hex: "#8c9eff" },
  { name: "slate", hex: "#8ba8b8" },
];

export const DEFAULT_HABIT_COLOR = HABIT_COLORS[0].hex;

// Habits saved under the old warm "brasa" palette keep their slot: each old
// color maps to the new color at the same position in the picker.
const LEGACY_COLORS = ["#e4572e", "#d9922e", "#4c8b46", "#2b8a8a", "#2f6fa8", "#7457c9", "#c9457e", "#5c6470"];

/** Old habits saved before this feature existed have no `color` field. */
export function habitColor(habit) {
  const legacy = LEGACY_COLORS.indexOf(habit.color);
  if (legacy !== -1) return HABIT_COLORS[legacy].hex;
  return habit.color || DEFAULT_HABIT_COLOR;
}
