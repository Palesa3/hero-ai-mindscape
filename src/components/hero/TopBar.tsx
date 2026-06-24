import { useHero } from "./HeroContext";

export function TopBar() {
  const { tasksPct } = useHero();
  return (
    <div className="glass-panel rounded-2xl p-4 mb-6 flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            Workplace Tasks Automated Today
          </span>
          <span className="font-display text-lg font-black text-neon-green tabular-nums drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
            {tasksPct}%
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/40 border border-border">
          <div
            className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-neon-green transition-all duration-700 ease-out shadow-[0_0_12px_rgba(57,255,20,0.6)]"
            style={{ width: `${tasksPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
