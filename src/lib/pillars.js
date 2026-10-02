import { Activity, Brain, Droplets, Moon, Salad, Sparkles } from "lucide-react";

// The five health pillars a habit can belong to. Each one carries a default
// color (from HABIT_COLORS) so picking a pillar pre-fills a matching color.
export const PILLARS = [
  {
    id: "movimento",
    name: "Movimento",
    icon: Activity,
    color: "#00b4cc",
    desc: "Treinos, caminhadas e alongamento — o corpo em ação, no seu ritmo.",
  },
  {
    id: "alimentacao",
    name: "Alimentação",
    icon: Salad,
    color: "#2ec4a6",
    desc: "Escolhas simples à mesa que, somadas ao longo da semana, fazem diferença.",
  },
  {
    id: "sono",
    name: "Sono",
    icon: Moon,
    color: "#8c9eff",
    desc: "Uma rotina de descanso consistente para acordar com mais energia.",
  },
  {
    id: "mente",
    name: "Mente",
    icon: Brain,
    color: "#5b8def",
    desc: "Foco, calma e aprendizado contínuo — saúde também é cabeça.",
  },
  {
    id: "hidratacao",
    name: "Hidratação",
    icon: Droplets,
    color: "#4fa3e0",
    desc: "Água ao longo do dia, sem precisar lembrar toda hora.",
  },
];

/** Fallback for habits created before pillars existed. */
export const GENERAL_PILLAR = { id: "geral", name: "Geral", icon: Sparkles, color: "#8ba8b8", desc: "" };

export function pillarOf(habit) {
  return PILLARS.find((p) => p.id === habit.pillar) ?? GENERAL_PILLAR;
}
