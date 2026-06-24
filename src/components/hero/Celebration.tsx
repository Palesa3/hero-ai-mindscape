import { useHero } from "./HeroContext";

export function Celebration() {
  const { celebrate } = useHero();
  if (!celebrate) return null;
  const pieces = Array.from({ length: 40 });
  const colors = ["var(--color-neon-cyan)", "var(--color-neon-purple)", "var(--color-neon-green)"];
  return (
    <div className="fixed inset-0 z-50 pointer-events-none grid place-items-center overflow-hidden">
      <div className="text-center animate-[scale-in_0.3s_ease-out]">
        <div className="font-display text-5xl md:text-7xl font-black text-neon-green drop-shadow-[0_0_25px_rgba(57,255,20,0.8)]">
          100% AUTOMATED
        </div>
        <p className="mt-3 font-display tracking-[0.3em] text-primary text-sm">MISSION ACCOMPLISHED, HERO</p>
      </div>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-3 w-3 rounded-sm animate-[fade-in_2s_ease-in]"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % 3],
            transform: `translateY(${Math.random() * 100}vh) rotate(${Math.random() * 360}deg)`,
            boxShadow: `0 0 10px ${colors[i % 3]}`,
            transition: "transform 3s ease-in",
          }}
        />
      ))}
    </div>
  );
}
