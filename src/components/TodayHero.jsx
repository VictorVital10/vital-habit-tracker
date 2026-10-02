import { motion, useReducedMotion } from "framer-motion";
import { Compass, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { Pill, Reveal, Section, SectionLabel, SectionTitle, Divider, Intro } from "@/components/section";
import { PILLARS, pillarOf } from "@/lib/pillars";

/**
 * The pitch's rotating "orbit" hero visual, repurposed as today's progress:
 * the outer ring + dots keep spinning slowly, the inner disc holds a
 * progress arc and the done/total count.
 */
function TodayRing({ done, total }) {
  const reduced = useReducedMotion();
  const pct = total ? done / total : 0;
  const complete = total > 0 && done === total;

  return (
    <div
      role="img"
      aria-label={`${done} de ${total} hábitos feitos hoje`}
      className="relative w-[260px] h-[260px] min-[1000px]:w-[300px] min-[1000px]:h-[300px] shrink-0"
    >
      <div className="absolute inset-0 rounded-full border border-teal/16 motion-safe:animate-orbit">
        <div className="absolute inset-5 rounded-full border border-dashed border-teal/20" />
        <span className="absolute top-[5%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal/70" />
        <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal/70" />
        <span className="absolute left-[5%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal/70" />
      </div>

      <div className="absolute inset-[19%] rounded-full bg-teal/8 border border-teal/22 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className={`absolute inset-0 w-full h-full -rotate-90 ${complete ? "drop-shadow-[0_0_10px_rgba(0,180,204,.55)]" : ""}`}
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="6"
            strokeLinecap={pct > 0 ? "round" : "butt"}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: pct }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </svg>
        <div className="relative text-center">
          <div className="num font-display text-[44px] font-semibold leading-none text-white">
            {done}
            <span className="text-[26px] text-t4">/{total}</span>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-teal mt-2">
            {complete ? "dia completo" : "feitos hoje"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ children, label }) {
  return (
    <div className="py-[18px] px-5 text-center">
      <div className="num font-display text-[30px] font-semibold text-teal leading-none">{children}</div>
      <div className="text-xs text-t3 mt-1.5 uppercase tracking-[.1em]">{label}</div>
    </div>
  );
}

export function TodayHero({ habits, doneToday, longestLive, onAddHabit, onExplore }) {
  const total = habits.length;
  const remaining = total - doneToday;
  const date = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  let message;
  if (total === 0) {
    message =
      "Comece com um hábito simples. Escolha um pilar — movimento, alimentação, sono, mente ou hidratação — e acompanhe sua evolução dia a dia.";
  } else if (remaining === 0) {
    message = "Tudo feito hoje. Cada quadrado marcado é um passo a mais na direção da sua saúde.";
  } else {
    message = `${remaining === 1 ? "Falta 1 hábito" : `Faltam ${remaining} hábitos`} para fechar o dia. Pequenos hábitos, repetidos todos os dias, constroem grandes resultados.`;
  }

  // Pills: the pillars you're working on (with counts), or all five to start.
  const counts = new Map();
  for (const h of habits) {
    const p = pillarOf(h);
    counts.set(p, (counts.get(p) ?? 0) + 1);
  }
  const pills = counts.size > 0 ? [...counts.entries()] : PILLARS.map((p) => [p, 0]);

  return (
    <Section
      id="hoje"
      innerClassName="min-[1000px]:min-h-[min(calc(100svh-56px),860px)] flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 min-[1000px]:grid-cols-[minmax(0,1fr)_320px] gap-12 items-center">
        <div>
          <Reveal>
            <SectionLabel>
              <span className="inline-block first-letter:uppercase">{date}</span>
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle as="h1" className="text-[clamp(40px,5.6vw,72px)] leading-[1.04] tracking-[-1.5px] mb-0">
              Sua saúde, <em>um dia</em> de cada vez
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.2}>
            <Divider />
          </Reveal>
          <Reveal delay={0.3}>
            <Intro className="mb-7">{message}</Intro>
          </Reveal>
          <Reveal delay={0.4} className="flex flex-wrap gap-2.5">
            <Button onClick={onAddHabit} className="h-10 px-5 text-[13px]">
              <Plus className="size-4" strokeWidth={2} />
              Novo hábito
            </Button>
            <Button variant="secondary" onClick={onExplore} className="h-10 px-5 text-[13px]">
              <Compass className="size-4" strokeWidth={2} />
              Ver sugestões
            </Button>
          </Reveal>
          <Reveal delay={0.5} className="flex flex-wrap gap-2.5 mt-8">
            {pills.map(([p, n]) => (
              <Pill key={p.id} icon={p.icon}>
                {p.name}
                {n > 0 && <span className="num text-white/80">· {n}</span>}
              </Pill>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center">
          <TodayRing done={doneToday} total={total} />
        </Reveal>
      </div>

      {total > 0 && (
        <Reveal
          delay={0.3}
          className="grid grid-cols-1 min-[481px]:grid-cols-3 mt-12 bg-teal/8 border border-teal-line rounded-[14px] overflow-hidden divide-y min-[481px]:divide-y-0 min-[481px]:divide-x divide-teal/20"
        >
          <Kpi label={total === 1 ? "hábito ativo" : "hábitos ativos"}>
            <CountUp value={total} />
          </Kpi>
          <Kpi label="feitos hoje">
            <CountUp value={doneToday} />/{total}
          </Kpi>
          <Kpi label="maior sequência">
            <CountUp value={longestLive} />
          </Kpi>
        </Reveal>
      )}
    </Section>
  );
}
