import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DEFAULT_HABIT_COLOR, HABIT_COLORS } from "@/lib/colors";
import { PILLARS } from "@/lib/pillars";
import { DEFAULT_GOAL, GOALS } from "@/lib/stats";
import { cn } from "@/lib/utils";

export function AddHabitForm({ open, onOpenChange, onSubmit }) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_HABIT_COLOR);
  const [pillar, setPillar] = useState("geral");
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const nameRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEmoji("");
      setName("");
      setColor(DEFAULT_HABIT_COLOR);
      setPillar("geral");
      setGoal(DEFAULT_GOAL);
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit({ name: trimmed, emoji, color, pillar, goal });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="border-t border-teal-line rounded-t-[20px] bg-deep max-h-[92dvh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-semibold tracking-[-.5px]">Novo <em className="not-italic text-teal">hábito</em></SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-4 pb-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="habitEmoji" className="text-xs font-semibold uppercase tracking-[.14em] text-teal">
                emoji
              </Label>
              <input
                id="habitEmoji"
                type="text"
                maxLength={8}
                placeholder="🔥"
                autoComplete="off"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-16 text-center border border-input rounded-[12px] bg-white/4 px-3 py-2.5 text-base text-white placeholder:text-t4 transition-colors focus:border-teal-line focus:bg-teal/8 focus:outline-2 focus:outline-ring focus:outline-offset-1"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="habitName" className="text-xs font-semibold uppercase tracking-[.14em] text-teal">
                nome
              </Label>
              <input
                id="habitName"
                ref={nameRef}
                type="text"
                placeholder="beber água"
                required
                maxLength={40}
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-input rounded-[12px] bg-white/4 px-3 py-2.5 text-base text-white placeholder:text-t4 transition-colors focus:border-teal-line focus:bg-teal/8 focus:outline-2 focus:outline-ring focus:outline-offset-1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-[.14em] text-teal">pilar</Label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="pilar do hábito">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                const selected = pillar === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      // picking a pillar also suggests its color (still editable below)
                      setPillar(selected ? "geral" : p.id);
                      if (!selected) setColor(p.color);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-full border text-xs font-medium tracking-[.02em] transition-all duration-150",
                      selected
                        ? "text-teal border-teal-line bg-teal-glass"
                        : "text-t4 border-line hover:text-teal hover:border-teal-line"
                    )}
                  >
                    <Icon className="size-3.5" strokeWidth={2} />
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-[.14em] text-teal">meta</Label>
            {/* the pitch's three-scenario cards, middle-highlight style */}
            <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="meta semanal">
              {GOALS.map((g) => {
                const selected = goal === g.value;
                return (
                  <button
                    key={g.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setGoal(g.value)}
                    className={cn(
                      "text-center px-2 py-3 rounded-[10px] border transition-colors",
                      selected ? "bg-teal/10 border-teal-line" : "bg-glass border-white/8 hover:border-teal-line"
                    )}
                  >
                    <div
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-[.12em] mb-1",
                        selected ? "text-teal" : "text-t4"
                      )}
                    >
                      {g.name}
                    </div>
                    <div className="num font-display text-xl font-semibold text-white leading-none mb-1">
                      {g.value}x
                    </div>
                    <div className="text-[11px] text-t4">{g.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-[.14em] text-teal">cor</Label>
            <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="cor do hábito">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  role="radio"
                  aria-checked={color === c.hex}
                  aria-label={c.name}
                  onClick={() => setColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    color === c.hex
                      ? "border-white scale-110 shadow-[0_0_0_4px_rgba(0,180,204,.12)]"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-1.5">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
