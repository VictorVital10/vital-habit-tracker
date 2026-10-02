import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";

const MESSAGES = {
  7: "Uma semana inteira. O hábito começou a ganhar forma.",
  21: "Três semanas de constância. Isso já faz parte da sua rotina.",
  30: "Um mês completo. Consistência é o que transforma.",
  50: "Cinquenta dias seguidos. Poucos chegam até aqui.",
  100: "Cem dias. Isso já não é um hábito — é estilo de vida.",
};

/**
 * Full-screen celebration (the pitch's closing slide look) shown when a
 * habit's streak hits one of MILESTONES.
 */
export function MilestoneDialog({ milestone, onClose }) {
  return (
    <Dialog.Root open={!!milestone} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-md data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 outline-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,180,204,.25)_0%,transparent_55%)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-300">
          {milestone && (
            <>
              <div className="flex items-center gap-3 mb-5 text-xs font-semibold uppercase tracking-[.2em] text-teal before:block before:w-8 before:h-px before:bg-teal/50 after:block after:w-8 after:h-px after:bg-teal/50">
                Marco alcançado
              </div>
              <div className="num font-display text-[clamp(96px,16vw,160px)] font-semibold leading-none text-teal drop-shadow-[0_0_30px_rgba(0,180,204,.45)] mb-4">
                {milestone.days}
              </div>
              <Dialog.Title className="font-display text-[clamp(26px,4vw,44px)] font-semibold leading-[1.12] tracking-[-1px] text-white max-w-[640px] mb-4">
                dias seguidos de {milestone.habit.emoji} {milestone.habit.name}
              </Dialog.Title>
              <Dialog.Description className="text-base min-[801px]:text-[17px] text-t3 max-w-[480px] leading-[1.65] mb-8">
                {MESSAGES[milestone.days]}
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button className="h-11 px-7 text-[13px]">Continuar</Button>
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
