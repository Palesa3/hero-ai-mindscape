import { useRef, useState } from "react";
import { UploadCloud, Sparkles, ShieldAlert, Mail, CheckCircle2 } from "lucide-react";
import { useHero } from "./HeroContext";
import { heroAudio } from "@/lib/heroAudio";
import { cn } from "@/lib/utils";

export function MissionControl() {
  const { hasData, loadData, setView } = useHero();
  const [dragActive, setDragActive] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notify, setNotify] = useState(false);

  const startDecrypt = () => {
    heroAudio.rumble();
    setIsDecrypting(true);
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const pct = Math.min(100, ((Date.now() - start) / 1500) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else {
        setIsDecrypting(false);
        loadData();
        setNotify(true);
        heroAudio.victory();
        setTimeout(() => setNotify(false), 4000);
      }
    };
    requestAnimationFrame(tick);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    startDecrypt();
  };

  return (
    <section>
      <h2 className="font-display text-2xl font-black tracking-widest text-foreground mb-6">MISSION CONTROL</h2>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => !isDecrypting && !hasData && startDecrypt()}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 grid place-items-center min-h-[220px]",
          dragActive
            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(0,242,254,0.5)]"
            : "border-border hover:border-secondary/60 glass-panel",
        )}
      >
        {dragActive && (
          <>
            <span className="absolute h-32 w-32 rounded-full bg-primary/30 animate-ping" />
            <span className="absolute h-48 w-48 rounded-full border border-primary/40 animate-ping" />
          </>
        )}
        <div className="relative z-10">
          <UploadCloud className={cn("mx-auto h-10 w-10 mb-3", dragActive ? "text-primary" : "text-muted-foreground")} />
          {isDecrypting ? (
            <div className="w-full max-w-sm mx-auto">
              <p className="font-display tracking-widest text-primary mb-3 text-sm">DECRYPTING DATA MATRIX...</p>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/40 border border-primary/40">
                <div className="h-full bg-gradient-to-r from-secondary to-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 font-display text-primary tabular-nums text-sm">{Math.round(progress)}%</p>
            </div>
          ) : dragActive ? (
            <p className="font-display tracking-wide text-primary text-sm">⚡ READY TO DECRYPT DATA MATRIX... DROP TO ACTIVATE.</p>
          ) : (
            <p className="text-muted-foreground text-sm">
              {hasData ? "✅ DATA MATRIX LOADED — operational strategy online." : "FEED HERO DATA: Drop files, paste text, or insert URL..."}
            </p>
          )}
        </div>
      </div>

      {notify && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-neon-green/40 bg-neon-green/10 px-4 py-3 text-sm text-neon-green animate-[fade-in_0.3s_ease-out]">
          <CheckCircle2 className="h-4 w-4" /> Operational strategy data loaded successfully.
        </div>
      )}

      {/* Quick actions */}
      <h3 className="font-display text-sm tracking-widest text-muted-foreground uppercase mt-8 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Instant Summary Mode", icon: Sparkles, to: "scan" as const },
          { label: "Risk Scan", icon: ShieldAlert, to: "scan" as const },
          { label: "Draft Email", icon: Mail, to: "link" as const },
        ].map(({ label, icon: Icon, to }) => (
          <button
            key={label}
            disabled={!hasData}
            onClick={() => { heroAudio.click(); setView(to); }}
            className={cn(
              "glass-panel group flex flex-col items-start gap-3 rounded-2xl p-5 text-left transition-all duration-300",
              hasData
                ? "hover:border-primary/60 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                : "opacity-40 cursor-not-allowed",
            )}
          >
            <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-display text-sm font-bold tracking-wide">{label}</span>
            <span className="text-xs text-muted-foreground">{hasData ? "Tap to deploy →" : "Feed data first"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
