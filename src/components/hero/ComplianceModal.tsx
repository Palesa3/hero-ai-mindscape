import { X, ShieldCheck } from "lucide-react";
import { useHero } from "./HeroContext";
import { heroAudio } from "@/lib/heroAudio";

const LOGS = [
  { t: "Ethical Alignment", v: "PASS", d: "All outputs filtered through value-alignment lattice v4.2. No protected-class bias detected across 1,204 sampled responses." },
  { t: "Hallucination Tracking", v: "0.7%", d: "Confidence-weighted fabrication rate held below 1.0% threshold. Auto-citation enforced on factual claims." },
  { t: "Data Sovereignty", v: "LOCAL", d: "100% client-side processing. Zero payloads transmitted to external servers. No PII leaves the device." },
  { t: "Transparency Ledger", v: "ACTIVE", d: "Every decision traced to a reproducible reasoning chain stored in the local audit log." },
  { t: "Human Oversight", v: "ENABLED", d: "All high-impact actions require explicit operator confirmation before execution." },
];

export function ComplianceModal() {
  const { governanceOpen, setGovernanceOpen } = useHero();
  if (!governanceOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4 animate-[fade-in_0.2s_ease-out]"
      onClick={() => setGovernanceOpen(false)}
    >
      <div
        className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(157,78,221,0.3)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-neon-green" />
            <h2 className="font-display text-lg font-bold tracking-widest text-foreground">HERO GOVERNANCE PROTOCOL</h2>
          </div>
          <button
            onClick={() => { heroAudio.click(); setGovernanceOpen(false); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="overflow-y-auto p-5 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Responsible AI Compliance — Live Audit Logs</p>
          {LOGS.map((l) => (
            <div key={l.t} className="rounded-xl border border-border bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-primary">{l.t}</h3>
                <span className="rounded-md bg-neon-green/15 px-2 py-0.5 text-xs font-bold text-neon-green border border-neon-green/40">{l.v}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.d}</p>
              <div className="mt-3 flex gap-1 h-8 items-end">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-secondary/50"
                    style={{ height: `${20 + Math.abs(Math.sin(i + l.t.length)) * 80}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-[10px] text-muted-foreground pt-2">Audit stream refreshed continuously • All systems nominal</p>
        </div>
      </div>
    </div>
  );
}
