import { buildGridDays } from "@/lib/calendar";

const LEVEL_CLASS = {
  0: "bg-ember-off",
  1: "bg-primary",
  2: "bg-ember-hot",
};

export function StreakGrid({ completedDates, weeks, cellSize = 11 }) {
  const days = buildGridDays(completedDates, weeks);

  return (
    <div
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
            style={{ width: cellSize, height: cellSize }}
            className={`rounded-sm ${LEVEL_CLASS[day.level]} ${
              day.isToday ? "ring-2 ring-foreground ring-inset" : ""
            }`}
          />
        )
      )}
    </div>
  );
}
