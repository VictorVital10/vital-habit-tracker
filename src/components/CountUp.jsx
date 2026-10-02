import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Number that counts up the first time it scrolls into view (like the
 * pitch's KPI counters), then eases between values when the data changes.
 */
export function CountUp({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  const from = useRef(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(value);
      return;
    }
    const controls = animate(from.current, value, {
      duration: from.current === 0 ? 1.6 : 0.5,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    from.current = value;
    return () => controls.stop();
  }, [inView, value, reduced]);

  // Printing (PDF report) must show real numbers even for sections the
  // user never scrolled to.
  useEffect(() => {
    const showFinal = () => setShown(value);
    window.addEventListener("beforeprint", showFinal);
    return () => window.removeEventListener("beforeprint", showFinal);
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
