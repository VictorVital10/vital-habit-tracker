import { Flame, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ onAddHabit }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b-2 border-border sticky top-0 z-10 bg-background pt-[calc(env(safe-area-inset-top)+14px)]">
      <div className="flex items-center gap-2">
        <Flame className="w-6 h-6 text-primary" fill="currentColor" />
        <span className="font-display font-bold text-xl tracking-wide">ember</span>
      </div>
      <Button onClick={onAddHabit}>
        <Plus className="w-4 h-4" />
        hábito
      </Button>
    </header>
  );
}
