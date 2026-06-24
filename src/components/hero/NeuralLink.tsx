import { useEffect, useRef, useState } from "react";
import { Send, Swords, Briefcase, FlaskConical } from "lucide-react";
import { useHero, personaAccent, type Persona } from "./HeroContext";
import { heroAudio } from "@/lib/heroAudio";
import { cn } from "@/lib/utils";
import { COMMAND_CHIPS, heroReply } from "./mockData";

interface Msg { sender: "user" | "hero"; text: string; }

const PERSONAS: { id: Persona; label: string; icon: typeof Swords }[] = [
  { id: "tactical", label: "⚔️ Tactical", icon: Swords },
  { id: "corporate", label: "💼 Corporate", icon: Briefcase },
  { id: "scientist", label: "🧠 Mad Scientist", icon: FlaskConical },
];

export function NeuralLink() {
  const { persona, setPersona } = useHero();
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "hero", text: "Neural Link established. I am HERO. State your objective." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const accent = personaAccent[persona];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    heroAudio.click();
    setMessages((m) => [...m, { sender: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { sender: "hero", text: heroReply(persona, value) }]);
      heroAudio.navigate();
    }, 1000);
  };

  return (
    <section style={{ ["--accent" as string]: accent }}>
      <h2 className="font-display text-2xl font-black tracking-widest text-foreground mb-6">NEURAL LINK</h2>

      {/* Synapse tuning */}
      <div className="glass-panel rounded-2xl p-2 mb-4 flex gap-2">
        {PERSONAS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => { heroAudio.click(); setPersona(id); }}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-xs font-display tracking-wide transition-all",
              persona === id ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
            style={persona === id ? { backgroundColor: accent, boxShadow: `0 0 15px ${accent}` } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className="glass-panel rounded-2xl p-4 h-[400px] overflow-y-auto space-y-3"
        style={{ borderColor: `color-mix(in oklab, ${accent} 40%, transparent)` }}
      >
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.sender === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                persona === "scientist" && "font-mono",
                m.sender === "user" ? "bg-white/10 text-foreground" : "text-foreground",
              )}
              style={m.sender === "hero" ? { backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)`, border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)` } : undefined}
            >
              {m.sender === "hero" && <span className="block text-[10px] font-display tracking-widest mb-1" style={{ color: accent }}>HERO</span>}
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 flex gap-1.5" style={{ backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)` }}>
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 rounded-full animate-bounce" style={{ backgroundColor: accent, animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Command chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {COMMAND_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            className="rounded-full border px-3 py-1.5 text-xs transition hover:scale-105"
            style={{ borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`, color: accent }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Transmit message to HERO..."
          className={cn("flex-1 rounded-xl bg-black/40 border border-border p-3 text-sm outline-none transition", persona === "scientist" && "font-mono")}
          style={{ borderColor: `color-mix(in oklab, ${accent} 35%, transparent)` }}
        />
        <button
          type="submit"
          className="grid place-items-center rounded-xl px-4 text-background transition hover:scale-105"
          style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}` }}
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
