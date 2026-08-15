import { useState } from "react";
import { Header } from "@/components/Header";
import { HabitCard } from "@/components/HabitCard";
import { HabitModal } from "@/components/HabitModal";
import { AddHabitForm } from "@/components/AddHabitForm";
import { EmptyState } from "@/components/EmptyState";
import { useHabits } from "@/hooks/useHabits";

export default function App() {
  const { habits, addHabit, removeHabit, toggleToday, isDoneToday } = useHabits();
  const [addOpen, setAddOpen] = useState(false);
  const [openHabitId, setOpenHabitId] = useState(null);

  const openHabit = habits.find((h) => h.id === openHabitId) ?? null;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header onAddHabit={() => setAddOpen(true)} />

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 p-4 max-w-[1100px] mx-auto items-stretch">
        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              done={isDoneToday(habit)}
              onToggleToday={toggleToday}
              onRemove={removeHabit}
              onOpen={setOpenHabitId}
            />
          ))
        )}
      </main>

      <AddHabitForm open={addOpen} onOpenChange={setAddOpen} onSubmit={addHabit} />
      <HabitModal habit={openHabit} open={!!openHabit} onOpenChange={(v) => !v && setOpenHabitId(null)} />
    </div>
  );
}
