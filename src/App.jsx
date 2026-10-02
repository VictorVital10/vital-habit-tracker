import { useState } from "react";
import { Header, SideDots } from "@/components/Header";
import { TodayHero } from "@/components/TodayHero";
import { HabitsSection } from "@/components/HabitsSection";
import { ProgressSection } from "@/components/ProgressSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ExploreSection } from "@/components/ExploreSection";
import { GuideSection } from "@/components/GuideSection";
import { ClosingSection } from "@/components/ClosingSection";
import { HabitModal } from "@/components/HabitModal";
import { AddHabitForm } from "@/components/AddHabitForm";
import { MilestoneDialog } from "@/components/MilestoneDialog";
import { useHabits } from "@/hooks/useHabits";
import { scrollToSection, useScrollSpy } from "@/hooks/useScrollSpy";
import { currentStreak, todayKey } from "@/lib/habits";
import { PILLARS } from "@/lib/pillars";
import { MILESTONES } from "@/lib/stats";

const SECTIONS = [
  { id: "hoje", label: "Hoje" },
  { id: "habitos", label: "Hábitos" },
  { id: "progresso", label: "Progresso" },
  { id: "conquistas", label: "Conquistas" },
  { id: "explorar", label: "Explorar" },
  { id: "guia", label: "Como funciona" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function App() {
  const { habits, addHabit, removeHabit, toggleToday, toggleDate, isDoneToday } = useHabits();
  const [addOpen, setAddOpen] = useState(false);
  const [openHabitId, setOpenHabitId] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const active = useScrollSpy(SECTION_IDS);

  const openHabit = habits.find((h) => h.id === openHabitId) ?? null;
  const doneToday = habits.filter(isDoneToday).length;
  const longestLive = habits.reduce((max, h) => Math.max(max, currentStreak(h.completedDates)), 0);

  // Marking today can land a streak exactly on a milestone: celebrate it,
  // after a beat so the check-mark animation is seen first.
  function handleToggleToday(id) {
    const habit = habits.find((h) => h.id === id);
    if (habit && !isDoneToday(habit)) {
      const streak = currentStreak([...habit.completedDates, todayKey()]);
      if (MILESTONES.includes(streak)) {
        setTimeout(() => setMilestone({ habit, days: streak }), 650);
      }
    }
    toggleToday(id);
  }

  function addTemplate(t) {
    const color = PILLARS.find((p) => p.id === t.pillar)?.color;
    addHabit({ ...t, color });
  }

  return (
    <div className="min-h-dvh text-foreground">
      <Header
        sections={SECTIONS}
        active={active}
        onNavigate={scrollToSection}
        onAddHabit={() => setAddOpen(true)}
      />
      <SideDots sections={SECTIONS} active={active} onNavigate={scrollToSection} />

      <main>
        <TodayHero
          habits={habits}
          doneToday={doneToday}
          longestLive={longestLive}
          onAddHabit={() => setAddOpen(true)}
          onExplore={() => scrollToSection("explorar")}
        />
        <HabitsSection
          habits={habits}
          isDoneToday={isDoneToday}
          onToggleToday={handleToggleToday}
          onRemove={removeHabit}
          onOpen={setOpenHabitId}
          onExplore={() => scrollToSection("explorar")}
        />
        <ProgressSection habits={habits} />
        <AchievementsSection habits={habits} />
        <ExploreSection habits={habits} onAddTemplate={addTemplate} onAddHabit={() => setAddOpen(true)} />
        <GuideSection />
        <ClosingSection onAddHabit={() => setAddOpen(true)} />
      </main>

      <AddHabitForm open={addOpen} onOpenChange={setAddOpen} onSubmit={addHabit} />
      <HabitModal
        habit={openHabit}
        open={!!openHabit}
        onOpenChange={(v) => !v && setOpenHabitId(null)}
        onToggleDate={toggleDate}
      />
      <MilestoneDialog milestone={milestone} onClose={() => setMilestone(null)} />
    </div>
  );
}
