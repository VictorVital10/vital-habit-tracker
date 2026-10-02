import { motion, useReducedMotion } from "framer-motion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StreakGrid } from "@/components/StreakGrid";
import { bestStreak, currentStreak } from "@/lib/habits";
import { habitColor } from "@/lib/colors";
import { pillarOf } from "@/lib/pillars";
import { MILESTONES, goalLabel, habitGoal, weekCount } from "@/lib/stats";
import { cn } from "@/lib/utils";

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

export function HabitModal({ habit, open, onOpenChange, onToggleDate }) {
  const reducedMotion = useReducedMotion();
  if (!habit) return null;

  const color = habitColor(habit);
  const pillar = pillarOf(habit);
  const PillarIcon = pillar.icon;
  const goal = habitGoal(habit);
  const best = bestStreak(habit.completedDates);
  const week = weekCount(habit.completedDates);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="border-t border-teal-line rounded-t-[20px] bg-deep max-h-[88dvh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-semibold tracking-[-.5px]">
            {habit.emoji} {habit.name}
          </SheetTitle>
          <SheetDescription className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-teal-line bg-teal-glass text-[11px] font-semibold tracking-[.04em] text-teal2">
              <PillarIcon className="size-3.5" strokeWidth={2} />
              {pillar.name}
            </span>
            <span className="text-xs text-t3">
              Meta: {goalLabel(goal).toLowerCase()} · <span className="num font-semibold text-white">{week}</span>/{goal} nesta semana
            </span>
          </SheetDescription>
        </SheetHeader>

        <motion.div
          key={habit.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex gap-2.5 px-4">
            <Stat value={currentStreak(habit.completedDates)} label="sequência atual" color={color} />
            <Stat value={best} label="melhor sequência" color={color} />
            <Stat value={habit.completedDates.length} label="total de dias" color={color} />
          </div>

          <div className="px-4 pt-5">
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-teal mb-2.5">Marcos de sequência</div>
            <div className="flex flex-wrap gap-2">
              {MILESTONES.map((m) => (
                <span
                  key={m}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-semibold tracking-[.04em]",
                    best >= m ? "border-teal-line bg-teal-glass text-teal2" : "border-line bg-white/4 text-t4"
                  )}
                >
                  {best >= m ? "✓ " : ""}
                  {m} dias
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 pt-5">
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-teal mb-1">Histórico</div>
            <p className="text-xs text-t4 mb-3">Toque em um dia para marcar ou desmarcar.</p>
          </div>
          <div className="px-4 pb-6 overflow-x-auto">
            <StreakGrid
              completedDates={habit.completedDates}
              weeks={26}
              cellSize={15}
              color={color}
              onToggleDate={(date) => onToggleDate(habit.id, date)}
            />
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
