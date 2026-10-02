import { useRef } from "react";
import { useInView } from "framer-motion";
import { CountUp } from "@/components/CountUp";
import { Reveal, Section, SectionIntro } from "@/components/section";
import { habitColor } from "@/lib/colors";
import { activeDaysThisMonth, goalRate, totalCheckins, weekCount } from "@/lib/stats";
import { cn } from "@/lib/utils";

function StatCard({ label, children, unit, desc, delay }) {
  return (
    <Reveal
      delay={delay}
      className="bg-glass border border-line rounded-[16px] p-6 transition-[translate,background-color,border-color,box-shadow] duration-250 hover:bg-teal/8 hover:border-teal-line hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] motion-safe:hover:-translate-y-[3px]"
    >
      <div className="num font-display text-[38px] font-semibold text-teal leading-none mb-2">
        {children}
        {unit && <span className="text-[22px] text-t4">{unit}</span>}
      </div>
      <div className="text-xs font-semibold uppercase tracking-[.1em] text-t3 mb-1.5">{label}</div>
      <div className="text-sm text-t3 leading-[1.5]">{desc}</div>
    </Reveal>
  );
}

/**
 * One bar row. Width animates from 0 via CSS once the chart is in view
 * (the pitch's `.chart.go .bar-fill`); print CSS forces the final width.
 */
function Bar({ who, value, go, delay, color, muted }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-14 shrink-0 text-right text-xs text-t4">{who}</div>
      <div className="flex-1 h-[26px] rounded bg-white/6">
        <div
          className="bar-fill relative h-full rounded transition-[width] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{
            "--w": `${(value / 7) * 100}%`,
            width: go ? "var(--w)" : 0,
            transitionDelay: `${delay}s`,
            backgroundColor: muted ? "rgba(255,255,255,.3)" : color,
          }}
        >
          <span
            className={cn(
              "absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-[12.5px] font-bold tabular-nums whitespace-nowrap transition-opacity duration-400",
              go ? "opacity-100" : "opacity-0"
            )}
            style={{ color: muted ? "rgba(255,255,255,.8)" : color, transitionDelay: `${delay + 0.8}s` }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

function WeekChart({ habits }) {
  const ref = useRef(null);
  const go = useInView(ref, { once: true, amount: 0.25 });

  return (
    <Reveal className="bg-glass border border-line rounded-[16px] px-5 py-5 min-[801px]:px-8 min-[801px]:py-7 mt-4">
      <div ref={ref}>
        <div className="text-xs font-bold uppercase tracking-[.14em] text-t4 mb-5 leading-[1.5]">
          Esta semana vs semana passada — dias marcados por hábito
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-teal" />
            <span className="text-[13px] text-t2">Esta semana</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-white/30" />
            <span className="text-[13px] text-t2">Semana passada</span>
          </div>
        </div>

        {habits.length === 0 ? (
          <p className="text-sm text-t3">Adicione hábitos para comparar suas semanas.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {habits.map((habit, i) => {
              const now = weekCount(habit.completedDates, 0);
              const before = weekCount(habit.completedDates, 1);
              const color = habitColor(habit);
              return (
                <div key={habit.id}>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="text-[13px] font-medium text-t2 truncate">
                      {habit.emoji} {habit.name}
                    </span>
                    {now > before && <span className="text-xs font-semibold text-teal whitespace-nowrap">✦ melhor</span>}
                  </div>
                  <div className="flex flex-col gap-1.5 pr-8">
                    <Bar who="Esta" value={now} go={go} delay={0.25 + i * 0.12} color={color} />
                    <Bar who="Passada" value={before} go={go} delay={0.31 + i * 0.12} muted />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-5 text-xs text-t4 italic leading-[1.5]">
          Escala de 0 a 7 dias. Semanas de domingo a sábado.
        </div>
      </div>
    </Reveal>
  );
}

export function ProgressSection({ habits }) {
  const month = new Date().toLocaleDateString("pt-BR", { month: "long" });
  const today = new Date().getDate();

  return (
    <Section
      id="progresso"
      className="bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,180,204,.14)_0%,transparent_60%)]"
    >
      <SectionIntro
        label="Seu progresso"
        title={
          <>
            Constância que <em>aparece</em>
          </>
        }
        intro="Quanto das suas metas você cumpriu, quantos dias esteve ativo e como esta semana se compara à anterior."
      />

      <div className="grid grid-cols-1 min-[601px]:grid-cols-3 gap-4">
        <StatCard label="Metas · 7 dias" unit="%" desc="Cumprimento médio das metas semanais nos últimos 7 dias" delay={0}>
          <CountUp value={goalRate(habits)} />
        </StatCard>
        <StatCard label="Dias ativos" unit={` / ${today}`} desc={`Dias de ${month} com pelo menos um hábito marcado`} delay={0.1}>
          <CountUp value={activeDaysThisMonth(habits)} />
        </StatCard>
        <StatCard label="Check-ins" desc="Hábitos marcados desde o início" delay={0.2}>
          <CountUp value={totalCheckins(habits)} />
        </StatCard>
      </div>

      <WeekChart habits={habits} />
    </Section>
  );
}
