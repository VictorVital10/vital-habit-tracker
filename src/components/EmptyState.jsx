import { HeartPulse } from "lucide-react";

export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center text-center py-14 px-6 bg-glass border border-line rounded-[16px]">
      <div className="w-[52px] h-[52px] rounded-full bg-teal-glass border border-teal-line flex items-center justify-center text-teal2 mb-4">
        <HeartPulse className="w-[22px] h-[22px]" strokeWidth={1.75} />
      </div>
      <p className="font-display text-[22px] font-semibold text-white mb-1.5">Nenhum hábito ainda</p>
      <p className="text-sm text-t3">Toque em “+ Hábito” para criar o primeiro.</p>
    </div>
  );
}
