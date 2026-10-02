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
      className="group flex flex-col h-full bg-glass border border-line rounded-[16px] p-5 cursor-pointer transition-[translate,background-color,border-color,box-shadow] duration-250 hover:bg-teal/8 hover:border-teal-line hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] motion-safe:hover:-translate-y-[3px]"
    >
      <div className="flex items-center gap-[18px]">
        {/* icon tile tinted with the habit color, like the pitch's .mk-icon;
            lights up on card hover */}
        <div
          className="w-12 h-12 rounded-[12px] border flex items-center justify-center text-[22px] shrink-0 transition-[scale,box-shadow] duration-250 motion-safe:group-hover:scale-106 group-hover:shadow-[0_0_0_4px_var(--glow-soft),0_6px_22px_var(--glow)]"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
            borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
            "--glow": `color-mix(in srgb, ${color} 32%, transparent)`,
            "--glow-soft": `color-mix(in srgb, ${color} 8%, transparent)`,
          }}
        >
          {habit.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-base tracking-[-.2px] text-white truncate">{habit.name}</span>
            <button
              type="button"
              aria-label="excluir hábito"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Excluir "${habit.name}"? Isso apaga todo o histórico.`)) {
                  onRemove(habit.id);
                }
              }}
              className="ml-auto text-t4 hover:text-destructive leading-none p-1 shrink-0 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Flame ref={flameScope} width={15} height={15} style={{ color }} className="shrink-0" fill="currentColor" />
            <span className="num font-display font-semibold text-lg leading-none" style={{ color }}>
              {streak}
            </span>
            <span className="text-xs uppercase tracking-[.1em] text-t3">{streakLabel(streak)}</span>
          </div>
        </div>

        <button
          type="button"
          aria-label={done ? "marcado como feito hoje" : "marcar como feito hoje"}
          onClick={handleToggle}
          style={done ? { backgroundColor: color, borderColor: color } : undefined}
          className="relative w-11 h-11 rounded-full border border-teal-line bg-teal-glass hover:bg-teal/26 flex items-center justify-center shrink-0 transition-colors duration-250"
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

      <div className="mt-auto pt-5 overflow-hidden">
        <StreakGrid completedDates={habit.completedDates} weeks={9} cellSize={11} pulseKey={pulseKey} color={color} />
      </div>
    </article>
  );
}
