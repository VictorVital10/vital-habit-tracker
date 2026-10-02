import { todayKey } from "@/lib/habits";

// Short, practical tips — one per day, rotating. `pillar` matches PILLARS ids
// (or "geral").
export const TIPS = [
  { pillar: "geral", text: "Comece pequeno: um hábito fácil feito todo dia vale mais que um difícil feito às vezes." },
  { pillar: "movimento", text: "Não precisa ser um treino longo — uma caminhada de 10 minutos depois das refeições já conta." },
  { pillar: "alimentacao", text: "Monte o prato começando pelos vegetais: deixe metade dele colorida." },
  { pillar: "sono", text: "Horários regulares para dormir e acordar, inclusive no fim de semana, ajudam o corpo a entrar no ritmo." },
  { pillar: "mente", text: "Junte um hábito novo a um que você já tem: “depois do café, medito 5 minutos”." },
  { pillar: "hidratacao", text: "Comece o dia com um copo de água antes do café." },
  { pillar: "geral", text: "Falhou um dia? Não falhe dois. Retomar rápido vale mais que uma sequência perfeita." },
  { pillar: "movimento", text: "Deixe a roupa de treino separada na noite anterior — é uma decisão a menos pela manhã." },
  { pillar: "alimentacao", text: "Planejar as refeições da semana evita escolhas de última hora quando a fome aperta." },
  { pillar: "sono", text: "Quarto escuro, silencioso e fresco favorece um sono mais profundo." },
  { pillar: "mente", text: "Antes de dormir, anote uma coisa que deu certo hoje. Ajuda a fechar o dia com a cabeça leve." },
  { pillar: "hidratacao", text: "Deixe uma garrafa de água à vista na mesa: o que está visível é lembrado." },
  { pillar: "geral", text: "Marque o hábito logo depois de fazê-lo — o registro imediato reforça a rotina." },
  { pillar: "geral", text: "Cada quadrado marcado é um voto na pessoa que você quer ser." },
];

/** Same tip all day long, a different one tomorrow. */
export function tipOfDay(today = todayKey()) {
  const [y, m, d] = today.split("-").map(Number);
  const dayNumber = Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  return TIPS[dayNumber % TIPS.length];
}
