import { useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";
import { Check, Flame, X } from "lucide-react";
import { currentStreak, streakLabel, streakTier } from "@/lib/habits";
import { StreakGrid } from "@/components/StreakGrid";

const FLAME_TIER_CLASS = {
  0: "text-ember-off",
  1: "text-primary",
  2: "text-ember-hot",
};

export function HabitCard({ habit, done, onToggleToday, onRemove, onOpen }) {
  const streak = currentStreak(habit.completedDates);
  const tier = streakTier(streak);
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
      className="flex flex-col h-full bg-card border-2 border-border rounded-sm shadow-[4px_4px_0_0_var(--border)] p-4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl leading-none">{habit.emoji}</span>
          <span className="font-display font-bold text-[17px] truncate">{habit.name}</span>
        </div>
        <button
          type="button"
          aria-label="excluir hábito"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Excluir "${habit.name}"? Isso apaga todo o histórico.`)) {
              onRemove(habit.id);
            }
          }}
          className="text-muted-foreground hover:text-destructive text-xl leading-none px-1.5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-stretch gap-3 mt-3">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center gap-2 border-2 rounded-sm px-3.5 py-2 font-bold text-[13px] uppercase tracking-wide transition-colors duration-250 ${
            done
              ? "bg-ember-hot border-ember-hot text-primary-foreground"
              : "bg-transparent border-border text-foreground"
          }`}
        >
          <span
            className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-250 ${
              done ? "bg-primary-foreground border-primary-foreground" : "border-border"
            }`}
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
                  <Check className="w-2.5 h-2.5 text-ember-hot" strokeWidth={3} />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          {done ? "feito hoje" : "hoje"}
        </button>

        <div className="ml-auto flex flex-col items-end justify-center text-right">
          <div className="flex items-center gap-1.5">
            <Flame
              ref={flameScope}
              className={`shrink-0 ${FLAME_TIER_CLASS[tier]}`}
              width={tier === 2 ? 27 : 22}
              height={tier === 2 ? 27 : 22}
              fill="currentColor"
            />
            <span
              className={`font-display font-bold text-[40px] leading-none ${
                tier === 0 ? "text-muted-foreground" : tier === 2 ? "text-ember-hot" : "text-primary"
              }`}
            >
              {streak}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
            {streakLabel(streak)}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-3.5 overflow-hidden">
        <StreakGrid completedDates={habit.completedDates} weeks={9} cellSize={11} pulseKey={pulseKey} />
      </div>
    </article>
  );
}
