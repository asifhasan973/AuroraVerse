// src/pages/Quiz.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QUESTIONS from "../data/quiz.json"; 

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function Quiz() {
  const nav = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const total = QUESTIONS.length;
  const q = QUESTIONS[index];

  const progress = useMemo(() => Math.round((index / total) * 100), [index, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (locked) {
        if (e.key === "Enter") handleNext();
        return;
      }
      const map = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (q?.options && map[e.key] != null && map[e.key] < q.options.length) {
        setSelected(map[e.key]);
      }
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, q, selected]);

  function handleSubmit() {
    if (!q || selected == null) return;
    setLocked(true);
    if (selected === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (!locked) return;
    const next = clamp(index + 1, 0, total);
    if (next >= total) {
      nav("/finale", { state: { score, total } });
    } else {
      setIndex(next);
      setSelected(null);
      setLocked(false);
    }
  }

  const swoosh = useRef(null);
  useEffect(() => {
    if (!swoosh.current) {
      const a = new Audio();
      a.src = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAA"; // tiny placeholder
      swoosh.current = a;
    }
  }, []);
  useEffect(() => {
    if (index > 0 && swoosh.current) {
      try { swoosh.current.currentTime = 0; swoosh.current.play(); } catch {}
    }
  }, [index]);

  const correct = selected === q?.correctIndex;

  return (
    <div className="relative pt-12 min-h-[100dvh]  text-white">
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
      <div className="absolute inset-0 -z-10 [background:radial-gradient(1px_1px_at_10px_10px,_white_40%,_transparent_41%)_0_0/24px_24px,_radial-gradient(1px_1px_at_5px_15px,_#c4b5fd_40%,_transparent_41%)_0_0/32px_32px,_transparent] opacity-20" />

      {/* Top bar */}
      <div className="container mx-auto px-4 pt-4 flex items-center justify-between">
        <div></div>
        <div className="text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10">
          Quiz • {index + 1} / {total}
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 mt-6">
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="container mx-auto px-4 py-6 md:py-10 grid place-items-center">
        <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8">
          {/* Sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 md:opacity-100"
            style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,.06) 20%, transparent 45%)" }}
          />

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">
            <span className="bg-gradient-to-br from-fuchsia-300 via-violet-200 to-indigo-300 bg-clip-text text-transparent">
              Quiz Time 🧑‍🚀
            </span>
          </h2>
          <p className="mt-2 text-center text-white/80 text-sm md:text-base">
            Answer the question to power up your spaceship!
          </p>

          {/* Question */}
          <div className="mt-6 md:mt-8 text-balance text-lg md:text-xl font-semibold">
            {q?.question}
          </div>

          {/* Options */}
          <div className="mt-5 grid gap-3">
            {q?.options?.map((opt, i) => {
              const isChosen = selected === i;
              const isCorrect = locked && i === q.correctIndex;
              const isWrong = locked && isChosen && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => !locked && setSelected(i)}
                  className={[
                    "w-full text-left px-4 py-3 rounded-2xl border transition relative",
                    "focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40",
                    isCorrect
                      ? "bg-emerald-500/15 border-emerald-400/40"
                      : isWrong
                      ? "bg-rose-500/15 border-rose-400/40"
                      : isChosen
                      ? "bg-white/10 border-fuchsia-400/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md mr-3 align-middle text-sm
                    bg-white/10 border border-white/15">
                    {i + 1}
                  </span>
                  <span>{opt}</span>
                  {locked && isCorrect && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">✅</span>
                  )}
                  {locked && isWrong && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">❌</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback + Controls */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-white/80 min-h-[1.5rem]">
              {locked ? q?.fact : "Tip: Use 1-4 to choose, Enter to submit"}
            </div>

            {!locked ? (
              <button
                onClick={handleSubmit}
                disabled={selected == null}
                className="px-5 py-2 rounded-full bg-fuchsia-500 text-white font-semibold
                           hover:bg-fuchsia-400 disabled:opacity-40 disabled:hover:bg-fuchsia-500
                           shadow-lg shadow-fuchsia-500/25"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-full bg-emerald-500 text-white font-semibold
                           hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                {index === total - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        </div>

        {/* Score bubble */}
        <div className="mt-4 text-sm px-3 py-1 rounded-full bg-white/10 border border-white/10">
          Score: <span className="font-bold">{score}</span> / {total}
        </div>
      </div>
    </div>
  );
}