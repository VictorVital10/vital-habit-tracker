import { Reveal, Section, SectionIntro } from "@/components/section";

const STEPS = [
  { title: "Escolha", desc: "Comece com um ou dois hábitos de um pilar que importa para você.", tag: "Comece pequeno" },
  { title: "Defina a meta", desc: "Todos os dias, 5x ou 3x por semana — o que for realista agora.", tag: "Meta possível" },
  { title: "Marque", desc: "Fez? Toque no círculo. Esqueceu ontem? Marque pelo histórico.", tag: "Leva um segundo" },
  { title: "Acompanhe", desc: "Sequências, gráficos e conquistas mostram sua evolução.", tag: "Constância > perfeição" },
];

const INFO = [
  { k: "Seus dados", v: "Ficam no aparelho", d: "Nada é enviado para servidores. Seus hábitos são só seus." },
  { k: "Offline", v: "Funciona sem internet", d: "Instale como app pelo navegador e abra direto da tela inicial." },
  { k: "Relatório", v: "PDF do seu progresso", d: "Use o botão PDF no topo para salvar ou imprimir um resumo." },
];

export function GuideSection() {
  return (
    <Section id="guia" className="bg-deep">
      <SectionIntro
        label="Como funciona"
        title={
          <>
            Simples de <em>começar</em>, fácil de manter
          </>
        }
        intro="Quatro passos, sem complicação. O resto é repetição — e o Vital cuida de mostrar o quanto você já avançou."
      />

      {/* numbered flow with arrows (horizontal) / vertical list on small screens */}
      <div className="flex flex-col gap-6 min-[801px]:flex-row min-[801px]:gap-0 min-[801px]:items-start">
        {STEPS.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 0.12}
            className="group relative flex-1 grid grid-cols-[56px_1fr] gap-x-4 items-start min-[801px]:flex min-[801px]:flex-col min-[801px]:items-center min-[801px]:text-center min-[801px]:px-3"
          >
            <div className="row-span-3 w-14 h-14 rounded-full bg-linear-135 from-teal/25 to-[#0077a8]/20 border border-teal-line flex items-center justify-center font-display text-[22px] font-semibold text-teal min-[801px]:mb-3.5 transition-[scale,box-shadow,background-color] duration-250 group-hover:bg-teal/26 motion-safe:group-hover:scale-106 group-hover:shadow-[0_0_0_4px_rgba(0,180,204,.08),0_6px_22px_rgba(0,180,204,.32)]">
              {i + 1}
            </div>
            <div className="text-[15px] font-semibold text-white mt-1 mb-1.5 min-[801px]:mt-0">{s.title}</div>
            <div className="text-[13.5px] text-t3 leading-[1.55]">{s.desc}</div>
            <span className="justify-self-start inline-block mt-2.5 px-3 py-1 rounded-full text-xs font-semibold text-teal2 bg-teal-glass border border-teal-line">
              {s.tag}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="hidden min-[801px]:block absolute -right-3 top-[26px] text-lg text-teal/55">
                →
              </span>
            )}
          </Reveal>
        ))}
      </div>

      <div className="grid grid-cols-1 min-[801px]:grid-cols-3 gap-4 mt-12">
        {INFO.map((item, i) => (
          <Reveal
            key={item.k}
            delay={i * 0.1}
            className="bg-teal-glass border border-teal-line rounded-[14px] px-5 py-6 text-center transition-[translate,box-shadow] duration-250 hover:shadow-[0_12px_32px_rgba(0,0,0,.25)] motion-safe:hover:-translate-y-[3px]"
          >
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-teal mb-2">{item.k}</div>
            <div className="text-[17px] font-semibold text-white mb-1.5">{item.v}</div>
            <div className="text-[13px] text-t3 leading-[1.5]">{item.d}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
