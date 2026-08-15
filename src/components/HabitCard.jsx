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
          onClick={(e) => {
            e.stopPropagation();
            onToggleToday(habit.id);
          }}
          className={`flex items-center gap-2 border-2 rounded-sm px-3.5 py-2 font-bold text-[13px] uppercase tracking-wide transition-colors ${
            done
              ? "bg-ember-hot border-ember-hot text-primary-foreground"
              : "bg-transparent border-border text-foreground"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
              done ? "bg-primary-foreground border-primary-foreground" : "border-border"
            }`}
          >
            {done && <Check className="w-2.5 h-2.5 text-ember-hot" strokeWidth={3} />}
          </span>
          {done ? "feito hoje" : "hoje"}
        </button>

        <div className="ml-auto flex flex-col items-end justify-center text-right">
          <div className="flex items-center gap-1.5">
            <Flame
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
        <StreakGrid completedDates={habit.completedDates} weeks={9} cellSize={11} />
      </div>
    </article>
  );
}
