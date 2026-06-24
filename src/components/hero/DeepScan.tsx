import { useEffect, useState } from "react";
import { Zap, ChevronDown, Network, Loader2 } from "lucide-react";
import { useHero } from "./HeroContext";
import { heroAudio } from "@/lib/heroAudio";
import { cn } from "@/lib/utils";
import { TACTICAL_SUMMARY, ACCORDION, QUEST_LOG, NODES, EDGES } from "./mockData";

export function DeepScan() {
  const { completed, toggleTask } = useHero();
  const [text, setText] = useState("Q3 board memo: revenue accelerating, supply-chain risk rising...");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [typed, setTyped] = useState("");
  const [openAcc, setOpenAcc] = useState<"growth" | "friction" | null>("growth");
  const [neuralMap, setNeuralMap] = useState(false);
  const [hoverNode, setHoverNode] = useState<string | null>(null);

  const execute = () => {
    if (!text.trim()) return;
    heroAudio.click();
    setLoading(true);
    setDone(false);
    setTyped("");
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  useEffect(() => {
    if (!done) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TACTICAL_SUMMARY.slice(0, i));
      if (i >= TACTICAL_SUMMARY.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [done]);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl font-black tracking-widest text-foreground">DEEP SCAN ASSISTANT</h2>
        {done && (
          <button
            onClick={() => { heroAudio.click(); setNeuralMap((v) => !v); }}
            className="glass-panel flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-display tracking-wide hover:border-secondary/60 hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition"
          >
            <Network className="h-4 w-4 text-secondary" /> Toggle Neural Net Map
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left input panel */}
        <div className="glass-panel rounded-2xl p-5 space-y-4 h-fit">
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Paste Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-black/40 border border-border p-3 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition resize-none"
            placeholder="Paste source intelligence here..."
          />
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Target URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-border p-3 text-sm outline-none focus:border-primary/60 transition"
            placeholder="https://target-source.io"
          />
          <button
            onClick={execute}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary/15 border border-primary/50 py-3 font-display text-sm tracking-widest text-primary hover:bg-primary/25 hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition"
          >
            <Zap className="h-4 w-4" /> EXECUTE DEEP SCAN
          </button>
        </div>

        {/* Right output panel */}
        <div className="glass-panel rounded-2xl p-5 min-h-[300px]">
          {loading && (
            <div className="grid place-items-center h-full py-16 text-primary">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-3 font-display text-xs tracking-widest animate-pulse">ANALYZING DATA STREAM...</p>
              </div>
            </div>
          )}

          {!loading && !done && (
            <p className="text-muted-foreground text-sm py-16 text-center">Output terminal idle — execute a scan to begin.</p>
          )}

          {!loading && done && !neuralMap && (
            <div className="space-y-5">
              {/* Tactical summary */}
              <div className="rounded-xl border-2 border-primary/60 bg-primary/5 p-4 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                <p className="font-display text-[10px] tracking-widest text-primary mb-2">TACTICAL SUMMARY</p>
                <p className="text-sm font-medium leading-relaxed">
                  {typed}<span className="animate-pulse text-primary">▋</span>
                </p>
              </div>

              {/* Accordions */}
              {(["growth", "friction"] as const).map((key) => (
                <div key={key} className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => { heroAudio.click(); setOpenAcc(openAcc === key ? null : key); }}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition"
                  >
                    <span className="font-display text-xs tracking-wide text-foreground">
                      {key === "growth" ? "Core Growth Drivers" : "Identified Market Friction Points"}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform text-muted-foreground", openAcc === key && "rotate-180")} />
                  </button>
                  {openAcc === key && (
                    <ul className="px-4 pb-3 space-y-1.5 animate-[fade-in_0.2s_ease-out]">
                      {ACCORDION[key].map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex gap-2">
                          <span className={key === "growth" ? "text-neon-green" : "text-destructive"}>▸</span>{item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Quest log */}
              <div>
                <p className="font-display text-[10px] tracking-widest text-secondary mb-2">MISSION QUEST LOG</p>
                <div className="space-y-2">
                  {QUEST_LOG.map((q) => (
                    <label key={q.id} className="flex items-start gap-3 rounded-xl border border-border bg-black/30 p-3 cursor-pointer hover:border-primary/40 transition">
                      <input
                        type="checkbox"
                        checked={completed.has(q.id)}
                        onChange={() => toggleTask(q.id)}
                        className="mt-0.5 h-4 w-4 accent-[var(--color-neon-green)]"
                      />
                      <span className={cn("text-sm", completed.has(q.id) ? "line-through text-muted-foreground" : "text-foreground")}>{q.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && done && neuralMap && (
            <div className="relative h-[320px] w-full">
              <svg className="absolute inset-0 h-full w-full">
                {EDGES.map(([a, b], i) => {
                  const na = NODES.find((n) => n.id === a)!;
                  const nb = NODES.find((n) => n.id === b)!;
                  return (
                    <line key={i} x1={`${na.x}%`} y1={`${na.y}%`} x2={`${nb.x}%`} y2={`${nb.y}%`}
                      stroke="var(--color-neon-purple)" strokeOpacity="0.4" strokeWidth="1" />
                  );
                })}
              </svg>
              {NODES.map((n) => (
                <div
                  key={n.id}
                  onMouseEnter={() => setHoverNode(n.id)}
                  onMouseLeave={() => setHoverNode(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="h-5 w-5 rounded-full bg-primary/30 border border-primary cursor-pointer hover:scale-125 transition shadow-[0_0_12px_rgba(0,242,254,0.7)]" />
                  {hoverNode === n.id && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-lg bg-black/90 border border-primary/40 px-2 py-1 text-xs text-primary font-display tracking-wide z-10">
                      {n.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
