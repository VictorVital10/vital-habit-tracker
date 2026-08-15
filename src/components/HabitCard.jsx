import { useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";
import { Check, Flame, X } from "lucide-react";
import { currentStreak, streakLabel } from "@/lib/habits";
import { habitColor } from "@/lib/colors";
import { StreakGrid } from "@/components/StreakGrid";

export function HabitCard({ habit, done, onToggleToday, onRemove, onOpen }) {
  const streak = currentStreak(habit.completedDates);
  const color = habitColor(habit);
  const [pulseKey, setPulseKey] = useState(0);
  const [flameScope, animateFlame] = useAnimate();
  const reducedMotion = useReducedMotion();

  function handleToggle(e) {
    e.stopPropagation();
    const justMarkedDone = !done;
    onToggleToday(habit.id);
    if (justMarkedDone) {
      setPulseKey((k) => k + 1);
      if (!reducedMotion) {
        animateFlame(flameScope.current, { scale: [1, 1.35, 1] }, { duration: 0.5, ease: "easeOut" });
      }
    }
  }

  return (
    <article
      tabIndex={0}
      onClick={() => onOpen(habit.id)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(habit.id);
        }
      }}
      className="flex flex-col h-full bg-card border-2 border-border rounded-sm shadow-[4px_4px_0_0_var(--border)] p-3.5 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: color }}
        >
          {habit.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-[16px] truncate">{habit.name}</span>
            <button
              type="button"
              aria-label="excluir hábito"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Excluir "${habit.name}"? Isso apaga todo o histórico.`)) {
                  onRemove(habit.id);
                }
              }}
              className="ml-auto text-muted-foreground hover:text-destructive leading-none p-1 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Flame ref={flameScope} width={15} height={15} style={{ color }} className="shrink-0" fill="currentColor" />
            <span className="font-mono font-bold text-sm" style={{ color }}>
              {streak}
            </span>
            <span className="text-xs text-muted-foreground">{streakLabel(streak)}</span>
          </div>
        </div>

        <button
          type="button"
          aria-label={done ? "marcado como feito hoje" : "marcar como feito hoje"}
          onClick={handleToggle}
          style={done ? { backgroundColor: color, borderColor: color } : undefined}
          className="relative w-11 h-11 rounded-full border-2 border-border flex items-center justify-center shrink-0 transition-colors duration-250"
        >
          <AnimatePresence>
            {done && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="mt-auto pt-3 overflow-hidden">
        <StreakGrid completedDates={habit.completedDates} weeks={9} cellSize={11} pulseKey={pulseKey} color={color} />
      </div>
    </article>
  );
}
