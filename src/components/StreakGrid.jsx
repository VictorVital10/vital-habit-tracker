import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";
import { buildGridDays } from "@/lib/calendar";
import { DEFAULT_HABIT_COLOR } from "@/lib/colors";

function cellStyle(level, cellSize, color) {
  if (level === 0) return { width: cellSize, height: cellSize };
  if (level === 1) return { width: cellSize, height: cellSize, backgroundColor: color };
  // level 2 (7+ day streak): same color, but glowing — the "brasa crescendo" idea
  return {
    width: cellSize,
    height: cellSize,
    backgroundColor: color,
    boxShadow: `0 0 4px 0 color-mix(in srgb, ${color} 55%, transparent)`,
  };
}

/** "2026-10-01" -> "1 de out." for cell labels. */
function shortDate(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

/**
 * pulseKey: bump this (e.g. a counter) right after the user marks a habit
 * done, and today's cell flashes once. Leave at 0 to render statically.
 * onToggleDate: when given, each past cell becomes a button that marks or
 * unmarks that day (used by the history grid in the habit modal).
 */
export function StreakGrid({ completedDates, weeks, cellSize = 11, pulseKey = 0, color = DEFAULT_HABIT_COLOR, onToggleDate }) {
  const days = buildGridDays(completedDates, weeks);
  const [scope, animate] = useAnimate();
  const prevPulseKey = useRef(pulseKey);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (pulseKey !== prevPulseKey.current && pulseKey > 0 && !reducedMotion) {
      animate(
        "[data-today]",
        { scale: [1, 1.5, 1], filter: ["brightness(1)", "brightness(1.9)", "brightness(1)"] },
        { duration: 0.6, ease: "easeOut" }
      );
    }
    prevPulseKey.current = pulseKey;
  }, [pulseKey, animate, reducedMotion]);

  return (
    <div
      ref={scope}
      className="grid grid-flow-col auto-cols-max gap-1"
      style={{ gridTemplateRows: `repeat(7, ${cellSize}px)` }}
    >
      {days.map((day) => {
        if (day.isFuture) {
          return <div key={day.date} style={{ width: cellSize, height: cellSize }} className="invisible" />;
        }
        const className = `rounded-[3px] ${day.level === 0 ? "bg-cell-off" : ""} ${
          day.isToday ? "ring-2 ring-foreground ring-inset" : ""
        }`;
        const label = `${shortDate(day.date)}${day.done ? " · feito" : ""}`;
        return onToggleDate ? (
          <button
            key={day.date}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={day.done}
            data-today={day.isToday || undefined}
            onClick={() => onToggleDate(day.date)}
            style={cellStyle(day.level, cellSize, color)}
            className={`${className} p-0 cursor-pointer transition-[outline-color] outline outline-1 outline-transparent hover:outline-teal`}
          />
        ) : (
          <div
            key={day.date}
            title={label}
            data-today={day.isToday || undefined}
            style={cellStyle(day.level, cellSize, color)}
            className={className}
          />
        );
      })}
    </div>
  );
}
