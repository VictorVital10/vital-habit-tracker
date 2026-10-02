import { useEffect, useRef } from "react";
import { Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * GenesysMed pitch nav: logo on the left, section pills in the middle that
 * light up for the section in view, actions on the right. Below 1240px the
 * pills drop to a second, horizontally scrollable row.
 */
export function Header({ sections, active, onNavigate, onAddHabit }) {
  const linksRef = useRef(null);

  // In the scrollable row, keep the active pill centered in view.
  useEffect(() => {
    const wrap = linksRef.current;
    const pill = wrap?.querySelector(`[data-id="${active}"]`);
    if (wrap && pill && wrap.scrollWidth > wrap.clientWidth) {
      wrap.scrollLeft = pill.offsetLeft - (wrap.clientWidth - pill.offsetWidth) / 2;
    }
  }, [active]);

  return (
    <header className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-x-4 px-5 pt-[env(safe-area-inset-top)] bg-ink/94 backdrop-blur-xl border-b border-teal/12 min-[1240px]:flex-nowrap min-[1240px]:h-[calc(env(safe-area-inset-top)+56px)] min-[1240px]:px-8">
      <div className="flex items-center gap-3 shrink-0 h-[52px] min-[1240px]:h-auto">
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-linear-135 from-teal to-[#0077a8] font-display text-[13px] font-bold text-white">
          V
        </div>
        <span className="text-sm font-semibold tracking-[.01em] text-white/92">Vital</span>
        <div className="hidden min-[1440px]:block w-px h-4 bg-white/14" />
        <span className="hidden min-[1440px]:inline text-xs tracking-[.02em] text-t4 whitespace-nowrap">
          Saúde &amp; bons hábitos
        </span>
      </div>

      <nav
        ref={linksRef}
        aria-label="Seções"
        className="order-3 basis-[calc(100%+40px)] -mx-5 px-5 pt-0.5 pb-2.5 flex gap-0.5 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-[1240px]:order-none min-[1240px]:basis-auto min-[1240px]:m-0 min-[1240px]:p-0 min-[1240px]:overflow-visible"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            data-id={s.id}
            aria-current={active === s.id ? "true" : undefined}
            onClick={() => onNavigate(s.id)}
            className={cn(
              "px-3 py-[7px] min-[1240px]:px-2.5 min-[1240px]:py-1.5 rounded-full border text-xs font-medium tracking-[.02em] whitespace-nowrap transition-all duration-150 max-[1239px]:first:ml-auto max-[1239px]:last:mr-auto",
              active === s.id
                ? "text-teal border-teal-line bg-teal-glass"
                : "text-t4 border-transparent hover:text-teal hover:border-teal-line hover:bg-teal-glass"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 shrink-0 h-[52px] min-[1240px]:h-auto">
        <Button variant="secondary" onClick={() => window.print()} aria-label="Exportar relatório em PDF">
          <Printer className="size-[15px]" strokeWidth={2} />
          PDF
        </Button>
        <Button onClick={onAddHabit}>
          <Plus className="size-[15px]" strokeWidth={2} />
          Hábito
        </Button>
      </div>
    </header>
  );
}

/** Dot navigation on the right edge (wide screens only), with hover labels. */
export function SideDots({ sections, active, onNavigate }) {
  return (
    <nav
      aria-label="Navegação rápida"
      className="no-print hidden min-[1240px]:flex fixed right-3 top-1/2 -translate-y-1/2 z-20 flex-col gap-0.5"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-label={s.label}
          onClick={() => onNavigate(s.id)}
          className="group relative w-4 h-4 flex items-center justify-center"
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              active === s.id ? "bg-teal scale-140" : "bg-teal/28 group-hover:bg-teal group-hover:scale-140"
            )}
          />
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-teal-line bg-ink/95 px-2.5 py-1 text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
