import { motion, useReducedMotion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StreakGrid } from "@/components/StreakGrid";
import { bestStreak, currentStreak } from "@/lib/habits";
import { habitColor } from "@/lib/colors";

function Stat({ value, label, color }) {
  return (
    <div className="flex-1 bg-teal-glass border border-teal-line rounded-[12px] text-center py-4 px-2">
      <span className="num block font-display font-semibold text-[28px] leading-none mb-1.5" style={{ color }}>
        {value}
      </span>
      <span className="block text-[11px] font-semibold uppercase tracking-[.12em] text-t3 leading-tight">{label}</span>
    </div>
  );
}

export function HabitModal({ habit, open, onOpenChange }) {
  const reducedMotion = useReducedMotion();
  if (!habit) return null;

  const color = habitColor(habit);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="border-t border-teal-line rounded-t-[20px] bg-deep max-h-[85dvh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-semibold tracking-[-.5px]">
            {habit.emoji} {habit.name}
          </SheetTitle>
        </SheetHeader>

        <motion.div
          key={habit.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex gap-2.5 px-4">
            <Stat value={currentStreak(habit.completedDates)} label="streak atual" color={color} />
            <Stat value={bestStreak(habit.completedDates)} label="melhor streak" color={color} />
            <Stat value={habit.completedDates.length} label="total de dias" color={color} />
          </div>

          <div className="px-4 pb-4 pt-4 overflow-x-auto">
            <StreakGrid completedDates={habit.completedDates} weeks={26} cellSize={15} color={color} />
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
