import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AddHabitForm({ open, onOpenChange, onSubmit }) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEmoji("");
      setName("");
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed, emoji);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="border-t-2 border-border rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">novo hábito</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-4 pb-4">
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
          <div className="flex flex-col gap-1">
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
