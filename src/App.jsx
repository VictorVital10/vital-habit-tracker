import { useState } from "react";
import { Header } from "@/components/Header";
import { HabitCard } from "@/components/HabitCard";
import { HabitModal } from "@/components/HabitModal";
import { AddHabitForm } from "@/components/AddHabitForm";
import { EmptyState } from "@/components/EmptyState";
import { useHabits } from "@/hooks/useHabits";
import { currentStreak } from "@/lib/habits";

function Kpi({ value, label }) {
  return (
    <div className="py-[18px] px-5 text-center">
      <div className="num font-display text-[30px] font-semibold text-teal leading-none">{value}</div>
      <div className="text-xs text-t3 mt-1.5 uppercase tracking-[.1em]">{label}</div>
    </div>
  );
}

export default function App() {
  const { habits, addHabit, removeHabit, toggleToday, isDoneToday } = useHabits();
  const [addOpen, setAddOpen] = useState(false);
  const [openHabitId, setOpenHabitId] = useState(null);

  const openHabit = habits.find((h) => h.id === openHabitId) ?? null;
  const doneToday = habits.filter(isDoneToday).length;
  const longestLive = habits.reduce((max, h) => Math.max(max, currentStreak(h.completedDates)), 0);

  return (
    <div className="min-h-dvh text-foreground">
      <Header onAddHabit={() => setAddOpen(true)} />

      <main className="max-w-[1080px] mx-auto px-5 pt-10 pb-14 min-[801px]:px-14 min-[801px]:pt-12 min-[801px]:pb-16">
        {/* section intro — same anatomy as the pitch slides */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-[.18em] text-teal">Seus hábitos</span>
        </div>
        <h1 className="font-display text-[clamp(30px,3.8vw,48px)] font-semibold leading-[1.1] tracking-[-1px] text-white mb-2">
          Sua saúde, <em className="not-italic text-teal">um dia</em> de cada vez
        </h1>
        <div className="w-12 h-0.5 bg-teal rounded-full mt-4 mb-6" />
        <p className="text-base min-[801px]:text-[17px] text-t3 leading-[1.7] max-w-[620px] mb-8">
          Pequenos hábitos constroem grandes resultados. Marque o que fez hoje e veja sua sequência crescer, quadrado a quadrado.
        </p>

        {habits.length > 0 && (
          <div className="grid grid-cols-1 min-[481px]:grid-cols-3 mb-4 bg-teal/8 border border-teal-line rounded-[14px] overflow-hidden divide-y min-[481px]:divide-y-0 min-[481px]:divide-x divide-teal/20">
            <Kpi value={habits.length} label={habits.length === 1 ? "hábito ativo" : "hábitos ativos"} />
            <Kpi value={`${doneToday}/${habits.length}`} label="feitos hoje" />
            <Kpi value={longestLive} label="maior sequência" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
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
        </div>
      </main>

      <AddHabitForm open={addOpen} onOpenChange={setAddOpen} onSubmit={addHabit} />
      <HabitModal habit={openHabit} open={!!openHabit} onOpenChange={(v) => !v && setOpenHabitId(null)} />
    </div>
  );
}
