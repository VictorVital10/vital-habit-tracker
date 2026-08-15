import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StreakGrid } from "@/components/StreakGrid";
import { bestStreak, currentStreak } from "@/lib/habits";

function Stat({ value, label }) {
  return (
    <div className="flex-1 border-2 border-border rounded-sm bg-background text-center py-2.5 px-2">
      <span className="block font-mono font-bold text-[22px] text-primary">{value}</span>
      <span className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  );
}

export function HabitModal({ habit, open, onOpenChange }) {
  if (!habit) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="border-t-2 border-border rounded-t-2xl max-h-[85dvh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            {habit.emoji} {habit.name}
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-2.5 px-4">
          <Stat value={currentStreak(habit.completedDates)} label="streak atual" />
          <Stat value={bestStreak(habit.completedDates)} label="melhor streak" />
          <Stat value={habit.completedDates.length} label="total de dias" />
        </div>

        <div className="px-4 pb-4 pt-4 overflow-x-auto">
          <StreakGrid completedDates={habit.completedDates} weeks={26} cellSize={15} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
