import { useHero } from "./HeroContext";
import { Cpu, Zap, ShieldCheck, Activity } from "lucide-react";

export function PowerStats() {
  const { tasksPct, hasData, completed } = useHero();
  const stats = [
    { icon: Activity, label: "Tasks Automated", value: `${tasksPct}%`, color: "text-neon-green" },
    { icon: Cpu, label: "Data Matrix", value: hasData ? "ONLINE" : "STANDBY", color: "text-primary" },
    { icon: Zap, label: "Quests Cleared", value: `${completed.size}`, color: "text-secondary" },
    { icon: ShieldCheck, label: "Compliance", value: "100%", color: "text-neon-green" },
  ];
  return (
    <section>
      <h2 className="font-display text-2xl font-black tracking-widest text-foreground mb-6">POWER STATS</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass-panel rounded-2xl p-5 flex flex-col gap-3 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition">
            <Icon className={`h-6 w-6 ${color}`} />
            <span className={`font-display text-2xl font-black ${color}`}>{value}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
      <div className="glass-panel rounded-2xl p-6 mt-6">
        <p className="font-display text-sm tracking-widest text-muted-foreground mb-4 uppercase">Neural Throughput (24h)</p>
        <div className="flex items-end gap-1.5 h-40">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-secondary/40 to-primary"
              style={{ height: `${20 + Math.abs(Math.sin(i * 0.6)) * 80}%`, opacity: 0.5 + (i / 80) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
