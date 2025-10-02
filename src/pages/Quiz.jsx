import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QUESTIONS from "../data/quiz.json";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const SND_NEXT =
  "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA";
const SND_GOOD =
  "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA";
const SND_BAD =
  "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA";

function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#120a3a] to-[#0b1020]" />
      <div className="absolute inset-0 opacity-50">
        {[...Array(80)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const size = Math.random() * 2 + 1;
          const dur = 6 + Math.random() * 10;
          const delay = Math.random() * 6;
          return (
            <span
              key={i}
              className="absolute block rounded-full bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                animation: `twinkle ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: .2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
      `}</style>
    </div>
  );
}

/* Simple emoji burst for correct answers */
function EmojiBurst({ fire }) {
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    if (fire) {
      setBurst((b) => b + 1);
      const t = setTimeout(() => setBurst((b) => b + 1), 400);
      return () => clearTimeout(t);
    }
  }, [fire]);
  if (!fire) return null;
  const emojis = ["✨", "🌟", "🚀", "🛰️", "🌌", "🪐"];
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const x = Math.random() * 100;
        const y = 50 + Math.random() * 10;
        const d = 600 + Math.random() * 600;
        const rot = (Math.random() * 40 - 20) | 0;
        const delay = (i % 10) * 25;
        return (
          <div
            key={`${burst}-${i}`}
            className="absolute text-2xl md:text-3xl will-change-transform"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: `burst ${d}ms ease-out ${delay}ms 1 forwards`,
            }}
          >
            {emojis[i % emojis.length]}
            <style>{`
              @keyframes burst {
                0% { transform: translate(-50%,0) rotate(0deg); opacity: 1; }
                100% { transform: translate(-50%,-180px) rotate(${rot}deg); opacity: 0; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

/* Circular countdown ring */
function RingTimer({ seconds, fraction, warn }) {
  const size = 60;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const dash = C * (1 - fraction);
  return (
    <div className="relative w-14 h-14">
      <svg viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="transparent"
          stroke="rgba(255,255,255,.15)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="transparent"
          stroke={warn ? "rgba(255,80,80,.95)" : "rgba(99,102,241,.95)"}
          strokeWidth={stroke}
          strokeDasharray={C}
          strokeDashoffset={dash}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset,stroke] duration-300"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-sm font-bold">
        {seconds}
      </div>
    </div>
  );
}

export default function Quiz() {
  const nav = useNavigate();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintShown, setHintShown] = useState(false);
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [skipUsed, setSkipUsed] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);

  const total = QUESTIONS.length;
  const q = QUESTIONS[index];

  /* Timer per question */
  const QUESTION_TIME = 20;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  useEffect(() => {
    if (locked) return;
    if (timeLeft <= 0) {
      setLocked(true);
      setSelected(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, locked]);

  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
    setHintShown(false);
    setDisabledOptions([]);
    setFiftyUsed(false);
  }, [index]);

  /* Sounds */
  const sNext = useRef(null);
  const sGood = useRef(null);
  const sBad = useRef(null);
  useEffect(() => {
    sNext.current = new Audio(SND_NEXT);
    sGood.current = new Audio(SND_GOOD);
    sBad.current = new Audio(SND_BAD);
  }, []);
  const play = (ref) => {
    try {
      ref?.current && (ref.current.currentTime = 0, ref.current.play());
    } catch { }
  };

  /* Progress */
  const progress = useMemo(() => Math.round((index / total) * 100), [index, total]);

  /* Keyboard controls */
  useEffect(() => {
    const onKey = (e) => {
      if (locked) {
        if (e.key === "Enter") handleNext();
        return;
      }
      const map = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (q?.options && map[e.key] != null && map[e.key] < q.options.length) {
        if (!disabledOptions.includes(map[e.key])) setSelected(map[e.key]);
      }
      if (e.key === "Enter") handleSubmit();
      if (e.key.toLowerCase() === "h") handleHint();
      if (e.key.toLowerCase() === "f") handleFifty();
      if (e.key.toLowerCase() === "s") handleSkip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, q, selected, disabledOptions, hintShown, fiftyUsed, skipUsed]);

  function handleSubmit() {
    if (!q || selected == null || locked) return;
    setLocked(true);
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) {
      play(sGood);
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      play(sBad);
      setStreak(0);
    }
  }

  function handleNext() {
    if (!locked) return;
    const next = clamp(index + 1, 0, total);
    if (next >= total) {
      nav("/finale", { state: { score, total } });
    } else {
      play(sNext);
      setIndex(next);
      setSelected(null);
      setLocked(false);
    }
  }

  function handleFifty() {
    if (locked || fiftyUsed || !q) return;
    const wrong = q.options
      .map((_, i) => i)
      .filter((i) => i !== q.correctIndex);
    const toDisable = shuffle(wrong).slice(0, Math.max(0, wrong.length - 1));
    setDisabledOptions(toDisable);
    setFiftyUsed(true);
    if (toDisable.includes(selected)) setSelected(null);
  }

  function handleHint() {
    if (locked || hintShown) return;
    setHintShown(true);
  }

  function handleSkip() {
    if (locked || skipUsed) return;
    setSkipUsed(true);
    setLocked(true);
    handleNext();
  }

  const isCorrectChoice = (i) => locked && i === q.correctIndex;
  const isWrongChosen = (i) => locked && selected === i && i !== q.correctIndex;

  const warnTime = timeLeft <= 5;
  const showFact = locked && q?.fact;

  return (
    <div className="relative min-h-screen text-white pt-20 sm:pt-32 md:pt-40">
      <Starfield />
      <EmojiBurst fire={locked && selected === q?.correctIndex} />

      {/* Header / HUD */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-white/10 bg-black/30">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between pt-12 sm:pt-16 md:pt-12">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center shadow-[0_0_20px_rgba(168,85,247,.4)]">
                <span className="text-sm sm:text-xl">🛰️</span>
              </div>
              <div>
                <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-wide">
                  Space Weather Quiz
                </h1>
                <p className="text-xs sm:text-xs md:text-sm text-white/70">
                  Q{index + 1}/{total}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    Streak
                  </div>
                  <div className="text-lg font-bold">{streak}🔥</div>
                </div>
              </div>
              <RingTimer
                seconds={timeLeft}
                fraction={Math.max(0, timeLeft) / QUESTION_TIME}
                warn={warnTime && !locked}
              />
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-white/60">
                  Score
                </div>
                <div className="text-lg sm:text-2xl font-bold text-amber-300 drop-shadow">
                  {score}
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-2 sm:mt-3 w-full h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(99,102,241,0.12)]">
            <div className="absolute -inset-px rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {q?.question}
                </span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-2">
                Use 1–4 to select, Enter to {locked ? "continue" : "submit"}
              </p>
            </div>

            {/* Lifelines */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <button
                onClick={handleFifty}
                disabled={fiftyUsed || locked}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border transition
                  ${fiftyUsed || locked
                    ? "opacity-50 cursor-not-allowed border-white/10 bg-white/5"
                    : "hover:scale-[1.03] border-indigo-400/40 bg-indigo-500/10 hover:bg-indigo-500/20"}`}
                title="Remove two wrong options (F)"
                aria-label="Use fifty-fifty lifeline"
              >
                50:50
              </button>
              <button
                onClick={handleHint}
                disabled={hintShown || locked}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border transition
                  ${hintShown || locked
                    ? "opacity-50 cursor-not-allowed border-white/10 bg-white/5"
                    : "hover:scale-[1.03] border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/20"}`}
                title="Reveal a hint (H)"
                aria-label="Show hint"
              >
                Hint
              </button>
              <button
                onClick={handleSkip}
                disabled={skipUsed || locked}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border transition
                  ${skipUsed || locked
                    ? "opacity-50 cursor-not-allowed border-white/10 bg-white/5"
                    : "hover:scale-[1.03] border-fuchsia-400/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/20"}`}
                title="Skip this question (S)"
                aria-label="Skip question"
              >
                Skip
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q?.options?.map((opt, i) => {
                const isChosen = selected === i;
                const isCorrect = isCorrectChoice(i);
                const isWrong = isWrongChosen(i);
                const disabledBy50 = disabledOptions.includes(i);

                const base =
                  "w-full p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";
                const state = isCorrect
                  ? "bg-emerald-500/15 border-emerald-400/70 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,.25)]"
                  : isWrong
                    ? "bg-rose-500/15 border-rose-400/70 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,.2)]"
                    : isChosen
                      ? "bg-indigo-500/15 border-indigo-400/70 text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,.25)]"
                      : "bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/10";
                const scale = !locked ? "hover:scale-[1.01]" : "cursor-not-allowed";
                const dimmed = disabledBy50 ? "opacity-40 grayscale" : "";

                return (
                  <button
                    key={i}
                    onClick={() => !locked && !disabledBy50 && setSelected(i)}
                    disabled={locked || disabledBy50}
                    className={`${base} ${state} ${scale} ${dimmed}`}
                    aria-pressed={isChosen}
                    aria-disabled={locked || disabledBy50}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full grid place-items-center text-xs sm:text-sm font-bold flex-shrink-0
                          ${isCorrect
                            ? "bg-emerald-500 text-white"
                            : isWrong
                              ? "bg-rose-500 text-white"
                              : isChosen
                                ? "bg-indigo-500 text-white"
                                : "bg-white/15 text-white/80"}`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm sm:text-base md:text-lg">{opt}</span>
                      {locked && isCorrect && (
                        <span className="ml-auto text-xl sm:text-2xl">✓</span>
                      )}
                      {locked && isWrong && (
                        <span className="ml-auto text-xl sm:text-2xl">✗</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Fact */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              {hintShown && !locked && (
                <div className="p-2 sm:p-3 rounded-xl border border-sky-400/30 bg-sky-500/10">
                  <p className="text-sky-100 text-xs sm:text-sm">
                    Hint: Think about{" "}
                    <span className="font-semibold">key terms</span> in the story you just learned.
                  </p>
                </div>
              )}
              {showFact && (
                <div className="p-3 sm:p-4 rounded-xl border border-amber-400/30 bg-amber-500/10">
                  <p className="text-amber-100 text-xs sm:text-sm md:text-base">
                    Did you know? {q?.fact}
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              {!locked ? (
                <button
                  onClick={handleSubmit}
                  disabled={selected == null}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 shadow-[0_12px_30px_rgba(99,102,241,.25)] hover:shadow-[0_16px_40px_rgba(99,102,241,.35)] transition-all hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  aria-label="Submit answer"
                >
                  Submit Answer ↵
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_12px_30px_rgba(16,185,129,.25)] hover:shadow-[0_16px_40px_rgba(16,185,129,.35)] transition-all hover:scale-[1.03] text-sm sm:text-base"
                  aria-label={index === total - 1 ? "Finish quiz" : "Next question"}
                >
                  {index === total - 1 ? "Finish Quiz" : "Next Question →"}
                </button>
              )}
            </div>
          </div>

          {/* Legend / Shortcuts */}
          <div className="mx-auto max-w-4xl text-center text-xs sm:text-xs md:text-sm text-white/60 mt-4 sm:mt-6">
            Shortcuts: 1–4 choose • Enter submit/next • F = 50:50 • H = Hint • S = Skip
          </div>
        </div>
      </div>
    </div>
  );
}