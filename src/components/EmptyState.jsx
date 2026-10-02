import { Compass, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ onExplore }) {
  return (
    <div className="col-span-full flex flex-col items-center text-center py-14 px-6 bg-glass border border-line rounded-[16px]">
      <div className="w-[52px] h-[52px] rounded-full bg-teal-glass border border-teal-line flex items-center justify-center text-teal2 mb-4">
        <HeartPulse className="w-[22px] h-[22px]" strokeWidth={1.75} />
      </div>
      <p className="font-display text-[22px] font-semibold text-white mb-1.5">Nenhum hábito ainda</p>
      <p className="text-sm text-t3 mb-5">Crie o seu em “+ Hábito” ou comece por uma das sugestões prontas.</p>
      <Button variant="secondary" onClick={onExplore}>
        <Compass className="size-[15px]" strokeWidth={2} />
        Ver sugestões
      </Button>
    </div>
  );
}
