import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Building blocks copied from the GenesysMed pitch's slide anatomy:
 * full-width band -> 1080px column -> label (dot + caps) -> serif title with
 * a teal <em> -> short teal divider -> intro paragraph.
 */

export function Section({ id, className, innerClassName, children }) {
  return (
    <section id={id} className={cn("scroll-mt-24 min-[1240px]:scroll-mt-14", className)}>
      <div className={cn("max-w-[1080px] mx-auto px-5 pt-14 pb-16 min-[801px]:px-14 min-[801px]:pt-16 min-[801px]:pb-20", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Fades + rises into view once, like the pitch's `.rv` scroll reveal. */
export function Reveal({ delay = 0, className, children, ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, className }) {
  return (
    <div className={cn("inline-flex items-center gap-2 mb-4", className)}>
      <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-[.18em] text-teal">{children}</span>
    </div>
  );
}

/** Children may include <em> for the teal highlighted word. */
export function SectionTitle({ as: Tag = "h2", className, children }) {
  return (
    <Tag
      className={cn(
        "font-display text-[clamp(30px,3.8vw,48px)] font-semibold leading-[1.1] tracking-[-1px] text-white mb-2 [&_em]:not-italic [&_em]:text-teal",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Divider() {
  return <div className="w-12 h-0.5 bg-teal rounded-full mt-4 mb-6" />;
}

export function Intro({ children, className }) {
  return (
    <p className={cn("text-base min-[801px]:text-[17px] text-t3 leading-[1.7] max-w-[620px] mb-8", className)}>{children}</p>
  );
}

/** Label + title + divider + intro, revealed in sequence. */
export function SectionIntro({ label, title, intro, as }) {
  return (
    <>
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.1}>
        <SectionTitle as={as}>{title}</SectionTitle>
      </Reveal>
      <Reveal delay={0.2}>
        <Divider />
      </Reveal>
      {intro && (
        <Reveal delay={0.3}>
          <Intro>{intro}</Intro>
        </Reveal>
      )}
    </>
  );
}

/** Small rounded pill, like the pitch's certification strip. */
export function Pill({ icon: Icon, children, className }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-line bg-teal-glass text-xs font-semibold tracking-[.04em] text-teal2",
        className
      )}
    >
      {Icon && <Icon className="size-[15px] shrink-0" strokeWidth={1.75} />}
      {children}
    </div>
  );
}
