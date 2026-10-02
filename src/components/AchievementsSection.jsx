import { CalendarCheck, Flame, Footprints, Layers, Lock, Medal, Scale, Star, Target, Trophy } from "lucide-react";
import { Reveal, Section, SectionIntro } from "@/components/section";
import { achievements } from "@/lib/stats";
import { cn } from "@/lib/utils";

const ICONS = {
  first: Footprints,
  streak3: Flame,
  streak7: CalendarCheck,
  streak21: Target,
  streak30: Medal,
  streak100: Trophy,
  perfect: Star,
  balance: Scale,
  routine: Layers,
};

export function AchievementsSection({ habits }) {
  const list = achievements(habits);
  const unlocked = list.filter((a) => a.unlocked).length;

  return (
    <Section id="conquistas" className="bg-deep">
      <SectionIntro
        label="Conquistas"
        title={
          <>
            Cada marco <em>conta</em>
          </>
        }
        intro={`${unlocked} de ${list.length} conquistas desbloqueadas. Elas aparecem conforme sua rotina ganha forma.`}
      />

      <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[1000px]:grid-cols-3 gap-4">
        {list.map((a, i) => {
          const Icon = a.unlocked ? ICONS[a.id] : Lock;
          return (
            <Reveal
              key={a.id}
              delay={Math.min(i, 6) * 0.06}
              className={cn(
                "group border rounded-[14px] px-5 py-6 text-center transition-[translate,background-color,border-color,box-shadow] duration-250",
                a.unlocked
                  ? "bg-teal/7 border-teal-line hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] motion-safe:hover:-translate-y-[3px]"
                  : "bg-glass border-line"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 mx-auto mb-3.5 rounded-[12px] border flex items-center justify-center transition-[scale,box-shadow,background-color] duration-250",
                  a.unlocked
                    ? "bg-teal-glass border-teal-line text-teal2 group-hover:bg-teal/26 group-hover:text-white motion-safe:group-hover:scale-106 group-hover:shadow-[0_0_0_4px_rgba(0,180,204,.08),0_6px_22px_rgba(0,180,204,.32)]"
                    : "bg-white/4 border-line text-t4"
                )}
              >
                <Icon className="size-[22px]" strokeWidth={1.75} />
              </div>
              <div className={cn("text-[14.5px] font-semibold mb-1.5", a.unlocked ? "text-white" : "text-t2")}>{a.title}</div>
              <div className="text-[13px] text-t3 leading-[1.55]">{a.desc}</div>
              {a.unlocked ? (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold text-teal2 bg-teal-glass border border-teal-line">
                  ✓ Conquistada
                </span>
              ) : (
                <div className="mt-3.5 flex items-center gap-2.5">
                  <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div className="h-full rounded-full bg-teal/60" style={{ width: `${(a.current / a.target) * 100}%` }} />
                  </div>
                  <span className="num text-xs text-t4 whitespace-nowrap">
                    {a.current}/{a.target}
                  </span>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
