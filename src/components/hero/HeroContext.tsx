import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { heroAudio } from "@/lib/heroAudio";

export type ViewId = "mission" | "scan" | "link" | "stats";
export type Persona = "tactical" | "corporate" | "scientist";

interface HeroState {
  view: ViewId;
  setView: (v: ViewId) => void;
  persona: Persona;
  setPersona: (p: Persona) => void;
  completed: Set<string>;
  toggleTask: (id: string) => void;
  tasksPct: number;
  hasData: boolean;
  loadData: () => void;
  celebrate: boolean;
  governanceOpen: boolean;
  setGovernanceOpen: (v: boolean) => void;
}

const Ctx = createContext<HeroState | null>(null);

export function useHero() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHero must be used inside HeroProvider");
  return ctx;
}

export function HeroProvider({ children }: { children: ReactNode }) {
  const [view, setViewRaw] = useState<ViewId>("mission");
  const [persona, setPersona] = useState<Persona>("corporate");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hasData, setHasData] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [governanceOpen, setGovernanceOpen] = useState(false);

  const setView = useCallback((v: ViewId) => {
    heroAudio.navigate();
    setViewRaw(v);
  }, []);

  const loadData = useCallback(() => setHasData(true), []);

  const toggleTask = useCallback((id: string) => {
    heroAudio.click();
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      const pct = Math.min(100, next.size * 33);
      if (pct >= 99 && prev.size * 33 < 99) {
        heroAudio.victory();
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 4000);
      }
      return next;
    });
  }, []);

  const tasksPct = useMemo(() => Math.min(100, completed.size * 33), [completed]);

  const value = useMemo<HeroState>(
    () => ({
      view, setView, persona, setPersona, completed, toggleTask, tasksPct,
      hasData, loadData, celebrate, governanceOpen, setGovernanceOpen,
    }),
    [view, setView, persona, completed, toggleTask, tasksPct, hasData, loadData, celebrate, governanceOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const personaAccent: Record<Persona, string> = {
  tactical: "var(--color-neon-red)",
  corporate: "var(--color-neon-cyan)",
  scientist: "var(--color-neon-green)",
};
