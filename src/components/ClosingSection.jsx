import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill, Reveal } from "@/components/section";
import { PILLARS } from "@/lib/pillars";

/** The pitch's closing slide + footer bar. */
export function ClosingSection({ onAddHabit }) {
  return (
    <section className="bg-[radial-gradient(ellipse_at_60%_35%,rgba(0,180,204,.22)_0%,transparent_55%),radial-gradient(ellipse_at_20%_75%,rgba(0,119,168,.18)_0%,transparent_50%)]">
      <div className="flex flex-col items-center text-center px-5 py-16 min-[801px]:px-14 min-[801px]:py-24">
        <Reveal className="flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-[.14em] min-[481px]:tracking-[.2em] text-teal before:block before:w-4 min-[481px]:before:w-8 before:h-px before:bg-teal/50 after:block after:w-4 min-[481px]:after:w-8 after:h-px after:bg-teal/50">
          Vital · Saúde &amp; bons hábitos
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(30px,4vw,52px)] font-semibold leading-[1.12] tracking-[-1.2px] text-white max-w-[720px] mb-6">
            Pequenos hábitos, repetidos todos os dias, constroem uma vida mais saudável.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-base min-[801px]:text-[17px] text-t3 max-w-[520px] leading-[1.65] mb-8">
            Movimento, alimentação, sono, mente e hidratação — um passo de cada vez, no seu ritmo.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {PILLARS.map((p) => (
            <Pill key={p.id} icon={p.icon}>
              {p.name}
            </Pill>
          ))}
        </Reveal>
        <Reveal delay={0.4} className="no-print">
          <Button onClick={onAddHabit} className="h-11 px-6 text-[13px]">
            <Plus className="size-4" strokeWidth={2} />
            Criar novo hábito
          </Button>
        </Reveal>
      </div>

      <div className="bg-black/30 px-5 py-4 min-[801px]:px-10 min-[801px]:py-3.5 flex flex-col min-[801px]:flex-row items-center justify-between gap-1.5 text-xs text-t4 text-center">
        <span>Vital · Saúde &amp; bons hábitos · {new Date().getFullYear()}</span>
        <span className="text-teal">Seus dados ficam só neste aparelho</span>
      </div>
    </section>
  );
}
