import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DEFAULT_HABIT_COLOR, HABIT_COLORS } from "@/lib/colors";

export function AddHabitForm({ open, onOpenChange, onSubmit }) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_HABIT_COLOR);
  const nameRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEmoji("");
      setName("");
      setColor(DEFAULT_HABIT_COLOR);
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed, emoji, color);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="border-t-2 border-border rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">novo hábito</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-4 pb-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="habitEmoji" className="text-[11px] uppercase tracking-wide text-muted-foreground">
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
                className="w-16 text-center border-2 border-border rounded-sm bg-background px-3 py-2.5 text-base focus:outline-2 focus:outline-ring focus:outline-offset-1"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label htmlFor="habitName" className="text-[11px] uppercase tracking-wide text-muted-foreground">
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
                className="border-2 border-border rounded-sm bg-background px-3 py-2.5 text-base focus:outline-2 focus:outline-ring focus:outline-offset-1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] uppercase tracking-wide text-muted-foreground">cor</Label>
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
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-1.5">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              cancelar
            </Button>
            <Button type="submit">acender</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
