import { Activity, ScanLine, MessageSquareCode, BarChart3, ShieldAlert } from "lucide-react";
import { useHero, type ViewId } from "./HeroContext";
import { cn } from "@/lib/utils";

const NAV: { id: ViewId; label: string; icon: typeof Activity }[] = [
  { id: "mission", label: "Mission Control", icon: Activity },
  { id: "scan", label: "Deep Scan", icon: ScanLine },
  { id: "link", label: "Neural Link", icon: MessageSquareCode },
  { id: "stats", label: "Power Stats", icon: BarChart3 },
];

export function Sidebar() {
  const { view, setView, setGovernanceOpen } = useHero();
  return (
    <aside className="hidden md:flex fixed left-4 top-4 bottom-4 w-64 flex-col glass-panel rounded-2xl p-5 z-30 shadow-[0_0_30px_rgba(0,242,254,0.12)]">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-primary/20 grid place-items-center pulse-glow border border-primary/40">
          <span className="font-display text-primary text-lg font-black">H</span>
        </div>
        <div>
          <h1 className="font-display text-xl font-black tracking-widest text-primary pulse-glow leading-none">HERO AI</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Intelligence Console</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 border border-transparent",
              view === id
                ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_15px_rgba(0,242,254,0.5)]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5 hover:border-secondary/30",
            )}
          >
            <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
            <span className="font-display tracking-wide text-xs">{label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => setGovernanceOpen(true)}
        className="mt-auto flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-3 text-[11px] font-medium text-destructive-foreground transition-all hover:shadow-[0_0_15px_rgba(255,70,70,0.4)] hover:bg-destructive/20"
      >
        <ShieldAlert className="h-4 w-4 shrink-0 text-destructive animate-pulse" />
        <span className="leading-tight">HERO Governance Protocol Active</span>
      </button>
    </aside>
  );
}

export function BottomDock() {
  const { view, setView } = useHero();
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 glass-panel rounded-2xl z-30 flex justify-around p-2 shadow-[0_0_25px_rgba(0,242,254,0.2)]">
      {NAV.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          aria-label={label}
          className={cn(
            "flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all",
            view === id ? "text-primary shadow-[0_0_12px_rgba(0,242,254,0.5)]" : "text-muted-foreground",
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="text-[9px] font-display tracking-wide">{label.split(" ")[0]}</span>
        </button>
      ))}
    </nav>
  );
}
