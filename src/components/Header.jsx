import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ onAddHabit }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 h-[calc(env(safe-area-inset-top)+56px)] pt-[env(safe-area-inset-top)] px-5 sm:px-8 bg-ink/94 backdrop-blur-xl border-b border-teal/12">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-linear-135 from-teal to-[#0077a8] font-display text-[13px] font-bold text-white">
          V
        </div>
        <span className="text-sm font-semibold tracking-[.01em] text-white/92">Vital</span>
        <div className="hidden sm:block w-px h-4 bg-white/14" />
        <span className="hidden sm:inline text-xs tracking-[.02em] text-t4 whitespace-nowrap">Saúde &amp; bons hábitos</span>
      </div>
      <Button onClick={onAddHabit}>
        <Plus className="size-[15px]" strokeWidth={2} />
        Hábito
      </Button>
    </header>
  );
}
