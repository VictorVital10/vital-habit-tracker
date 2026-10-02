import { useEffect, useState } from "react";
import { loadHabits, saveHabits } from "@/lib/storage";
import { todayKey, uid } from "@/lib/habits";
import { DEFAULT_HABIT_COLOR } from "@/lib/colors";
import { DEFAULT_GOAL } from "@/lib/stats";

export function useHabits() {
  const [habits, setHabits] = useState(loadHabits);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit({ name, emoji = "", color = DEFAULT_HABIT_COLOR, pillar = "geral", goal = DEFAULT_GOAL }) {
    const habit = {
      id: uid(),
      name: name.trim(),
      emoji: emoji.trim() || "✨",
      color,
      pillar,
      goal,
      createdAt: todayKey(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, habit]);
  }

  function removeHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  /** Marks/unmarks any past day (used by the history grid in the modal). */
  function toggleDate(id, date) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const set = new Set(h.completedDates);
        if (set.has(date)) {
          set.delete(date);
        } else {
          set.add(date);
        }
        return { ...h, completedDates: [...set].sort() };
      })
    );
  }

  function toggleToday(id) {
    toggleDate(id, todayKey());
  }

  function isDoneToday(habit) {
    return habit.completedDates.includes(todayKey());
  }

  return { habits, addHabit, removeHabit, toggleToday, toggleDate, isDoneToday };
}
