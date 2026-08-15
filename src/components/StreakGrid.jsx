import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";
import { buildGridDays } from "@/lib/calendar";

const LEVEL_CLASS = {
  0: "bg-ember-off",
  1: "bg-primary",
  2: "bg-ember-hot",
};

// level 2 (7+ day streak) glows a little — reinforces the "brasa crescendo" idea
const GLOW_STYLE = { boxShadow: "0 0 4px 0 color-mix(in srgb, var(--ember-hot) 45%, transparent)" };

/**
 * pulseKey: bump this (e.g. a counter) right after the user marks a habit
 * done, and today's cell flashes once. Leave at 0 to render statically.
 */
export function StreakGrid({ completedDates, weeks, cellSize = 11, pulseKey = 0 }) {
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
      {days.map((day) =>
        day.isFuture ? (
          <div key={day.date} style={{ width: cellSize, height: cellSize }} className="invisible" />
        ) : (
          <div
            key={day.date}
            title={day.date}
            data-today={day.isToday || undefined}
            style={{ width: cellSize, height: cellSize, ...(day.level === 2 ? GLOW_STYLE : null) }}
            className={`rounded-sm ${LEVEL_CLASS[day.level]} ${
              day.isToday ? "ring-2 ring-foreground ring-inset" : ""
            }`}
          />
        )
      )}
    </div>
  );
}
