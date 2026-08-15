import { Flame } from "lucide-react";

export function EmptyState() {
  return (
    <div className="col-span-full text-center py-16 px-6 text-muted-foreground">
      <Flame className="w-10 h-10 mx-auto mb-3 opacity-50" />
      <p className="font-display text-lg text-foreground mb-1">nenhuma chama acesa ainda</p>
      <p className="text-sm">toque em "+ hábito" para acender a primeira</p>
    </div>
  );
}
