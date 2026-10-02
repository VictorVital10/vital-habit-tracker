import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { HabitCard } from "@/components/HabitCard";
import { EmptyState } from "@/components/EmptyState";
import { Reveal, Section, SectionIntro } from "@/components/section";
import { GENERAL_PILLAR, PILLARS, pillarOf } from "@/lib/pillars";
import { tipOfDay } from "@/lib/tips";
import { cn } from "@/lib/utils";

function FilterPill({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-full border text-xs font-medium tracking-[.02em] whitespace-nowrap transition-all duration-150",
        active
          ? "text-teal border-teal-line bg-teal-glass"
          : "text-t4 border-line hover:text-teal hover:border-teal-line hover:bg-teal-glass"
      )}
    >
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </button>
  );
}

export function HabitsSection({ habits, isDoneToday, onToggleToday, onRemove, onOpen, onExplore }) {
  const [filter, setFilter] = useState("todos");

  // Only offer filters for pillars that actually have habits.
  const present = [...PILLARS, GENERAL_PILLAR].filter((p) => habits.some((h) => pillarOf(h).id === p.id));
  const effective = present.some((p) => p.id === filter) ? filter : "todos";
  const shown = effective === "todos" ? habits : habits.filter((h) => pillarOf(h).id === effective);

  const tip = tipOfDay();
  const tipPillar = PILLARS.find((p) => p.id === tip.pillar);

  return (
    <Section id="habitos" className="bg-deep">
      <SectionIntro
        label="Seus hábitos"
        title={
          <>
            Sua rotina, <em>quadrado a quadrado</em>
          </>
        }
        intro="Toque no círculo para marcar o dia. Toque no card para ver o histórico completo — e marcar dias que ficaram para trás."
      />

      {present.length > 1 && (
        <Reveal className="flex flex-wrap gap-2 mb-5">
          <FilterPill active={effective === "todos"} onClick={() => setFilter("todos")}>
            Todos
          </FilterPill>
          {present.map((p) => (
            <FilterPill key={p.id} active={effective === p.id} onClick={() => setFilter(p.id)} icon={p.icon}>
              {p.name}
            </FilterPill>
          ))}
        </Reveal>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {habits.length === 0 ? (
          <EmptyState onExplore={onExplore} />
        ) : (
          shown.map((habit, i) => (
            <Reveal key={habit.id} delay={Math.min(i, 6) * 0.08} className="h-full">
              <HabitCard
                habit={habit}
                done={isDoneToday(habit)}
                onToggleToday={onToggleToday}
                onRemove={onRemove}
                onOpen={onOpen}
              />
            </Reveal>
          ))
        )}
      </div>

      {/* "Dica do dia" — the pitch's teal requirement box */}
      <Reveal className="mt-8 flex gap-4 items-start px-5 py-5 min-[801px]:px-7 bg-teal-glass border border-teal-line rounded-[16px] max-w-[640px]">
        <div className="w-10 h-10 rounded-[12px] bg-teal/18 border border-teal-line flex items-center justify-center text-teal2 shrink-0">
          <Lightbulb className="size-5" strokeWidth={1.75} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[.14em] text-teal mb-2">
            Dica do dia{tipPillar ? ` · ${tipPillar.name}` : ""}
          </div>
          <p className="text-[15px] font-medium text-white leading-[1.6]">{tip.text}</p>
        </div>
      </Reveal>
    </Section>
  );
}
