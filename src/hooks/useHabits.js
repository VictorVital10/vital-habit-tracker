import { useEffect, useState } from "react";
import { loadHabits, saveHabits } from "@/lib/storage";
import { todayKey, uid } from "@/lib/habits";
import { DEFAULT_HABIT_COLOR } from "@/lib/colors";

export function useHabits() {
  const [habits, setHabits] = useState(loadHabits);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit(name, emoji, color = DEFAULT_HABIT_COLOR) {
    const habit = {
      id: uid(),
      name: name.trim(),
      emoji: emoji.trim() || "🔥",
      color,
      createdAt: todayKey(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, habit]);
  }

  function removeHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function toggleToday(id) {
    const today = todayKey();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const set = new Set(h.completedDates);
        if (set.has(today)) {
          set.delete(today);
        } else {
          set.add(today);
        }
        return { ...h, completedDates: [...set].sort() };
      })
    );
  }

  function isDoneToday(habit) {
    return habit.completedDates.includes(todayKey());
  }

  return { habits, addHabit, removeHabit, toggleToday, isDoneToday };
}
