// src/pages/Finale.jsx
import { Link, useLocation } from "react-router-dom";

export default function Finale() {
  const { state } = useLocation();
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden text-white">
      {/* Cosmic backdrop */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            radial-gradient(1200px 600px at 80% -10%, oklch(0.35 0.18 300 / .55), transparent 60%),
            radial-gradient(800px 400px at 10% 10%, oklch(0.28 0.12 350 / .5), transparent 55%),
            radial-gradient(900px 500px at 50% 110%, oklch(0.30 0.10 280 / .55), transparent 60%),
            linear-gradient(180deg, oklch(0.16 0.05 310), oklch(0.12 0.04 310))
          `,
        }}
      />
      <div className="absolute inset-0 -z-10 [background:radial-gradient(1px_1px_at_10px_10px,_white_40%,_transparent_41%)_0_0/24px_24px,_radial-gradient(1px_1px_at_5px_15px,_#c4b5fd_40%,_transparent_41%)_0_0/32px_32px,_transparent] opacity-25" />

      <div className="container mx-auto px-6 py-16 grid place-items-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm backdrop-blur">
            🌟 Mission Complete
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-black">
            <span className="bg-gradient-to-br from-emerald-300 via-lime-200 to-yellow-200 bg-clip-text text-transparent">
              You finished the journey!
            </span>
          </h1>

          <p className="mt-3 text-white/80 md:text-lg">
            Score: <span className="font-extrabold text-emerald-300">{score}</span> / {total} ({pct}%)
          </p>

          {/* Medal */}
          <div className="mt-8 inline-flex items-center justify-center">
            <div className="size-32 md:size-40 rounded-full bg-white/10 border border-white/10 grid place-items-center shadow-[0_0_60px_rgba(168,85,247,.35)]">
              <div className="size-24 md:size-28 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 grid place-items-center">
                <span className="text-4xl md:text-5xl">🏅</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quiz"
              className="px-5 py-2 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 shadow-lg shadow-fuchsia-500/25 font-semibold"
            >
              Play Again
            </Link>
            <Link
              to="https://u2204125.github.io/aurora-sentinel/"
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 font-semibold"
            >
              Aurora Lab
            </Link>
            <Link
              to="/"
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 font-semibold"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-20vh] h-[40vh] blur-2xl opacity-60"
        style={{ backgroundImage: "radial-gradient(60% 60% at 50% 0%, oklch(0.7 0.2 310 / .35), transparent 70%)" }}
      />
    </div>
  );
}