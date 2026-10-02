import { Check, Plus } from "lucide-react";
import { Reveal, Section, SectionIntro } from "@/components/section";
import { PILLARS } from "@/lib/pillars";
import { goalLabel } from "@/lib/stats";
import { TEMPLATES } from "@/lib/templates";

const cardClass =
  "group bg-glass border border-line rounded-[16px] p-6 transition-[translate,background-color,border-color,box-shadow] duration-250 hover:bg-teal/8 hover:border-teal-line hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] motion-safe:hover:-translate-y-[3px]";

export function ExploreSection({ habits, onAddTemplate, onAddHabit }) {
  const taken = new Set(habits.map((h) => h.name.trim().toLowerCase()));

  return (
    <Section
      id="explorar"
      className="bg-[radial-gradient(ellipse_at_15%_25%,rgba(0,119,168,.2)_0%,transparent_52%),radial-gradient(ellipse_at_85%_75%,rgba(0,180,204,.12)_0%,transparent_50%)]"
    >
      <SectionIntro
        label="Explorar"
        title={
          <>
            Ideias para <em>começar</em>
          </>
        }
        intro="Hábitos prontos, organizados pelos cinco pilares da saúde. Toque em + para adicionar — meta, cor e pilar já vêm definidos."
      />

      <div className="grid grid-cols-1 min-[601px]:grid-cols-2 min-[1000px]:grid-cols-3 gap-4">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.id} delay={Math.min(i, 6) * 0.08} className={cardClass}>
              <div
                className="w-11 h-11 rounded-[12px] border flex items-center justify-center mb-4 transition-[scale,box-shadow] duration-250 motion-safe:group-hover:scale-106"
                style={{
                  color: pillar.color,
                  backgroundColor: `color-mix(in srgb, ${pillar.color} 16%, transparent)`,
                  borderColor: `color-mix(in srgb, ${pillar.color} 32%, transparent)`,
                }}
              >
                <Icon className="size-[21px]" strokeWidth={1.75} />
              </div>
              <div className="text-[15px] font-semibold text-white mb-2">{pillar.name}</div>
              <div className="text-sm text-t3 leading-[1.6] mb-4">{pillar.desc}</div>

              <ul className="flex flex-col">
                {TEMPLATES.filter((t) => t.pillar === pillar.id).map((t) => {
                  const added = taken.has(t.name.toLowerCase());
                  return (
                    <li key={t.name} className="flex items-center gap-3 py-2.5 border-t border-white/6">
                      <span className="text-lg w-6 text-center shrink-0">{t.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-t2 truncate">{t.name}</div>
                        <div className="text-[11px] text-t4">{goalLabel(t.goal)}</div>
                      </div>
                      {added ? (
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-teal shrink-0">
                          <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                          <span className="sr-only">já adicionado</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Adicionar ${t.name}`}
                          onClick={() => onAddTemplate(t)}
                          className="w-8 h-8 rounded-full border border-teal-line bg-teal-glass text-teal flex items-center justify-center shrink-0 transition-colors hover:bg-teal hover:text-ink"
                        >
                          <Plus className="size-4" strokeWidth={2.5} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}

        {/* sixth tile: your own habit */}
        <Reveal delay={0.4}>
          <button
            type="button"
            onClick={onAddHabit}
            className="w-full h-full min-h-[220px] flex flex-col items-center justify-center text-center gap-3 rounded-[16px] border border-dashed border-teal-line bg-teal/4 p-6 transition-colors hover:bg-teal-glass"
          >
            <div className="w-12 h-12 rounded-full bg-teal-glass border border-teal-line flex items-center justify-center text-teal2">
              <Plus className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div className="text-[15px] font-semibold text-white">Crie o seu</div>
            <div className="text-sm text-t3 leading-[1.6] max-w-[240px]">
              Nome, emoji, pilar, meta e cor do seu jeito.
            </div>
          </button>
        </Reveal>
      </div>
    </Section>
  );
}
