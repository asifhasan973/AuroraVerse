// src/components/DialogueBox.jsx
import { useEffect, useRef, useState } from "react";
import Button from "../components/ui/Button";


const pxOr = (v) => (typeof v === "number" ? `${v}px` : v);

export default function DialogueBox({
  speaker = "Narrator",
  text = "",
  width = 600,
  position = { bottom: 24, left: "50%" },
  anchorCenterX = true,
  showNext = true,
  onNext = () => {},
  onBack = null,          // <-- add back handler
  canBack = false,        // <-- enable/disable back
}) {
  const [shown, setShown] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    setShown("");
    idxRef.current = 0;
    const t = setInterval(() => {
      idxRef.current += 1;
      setShown(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [text]);

  const style = {
    width: typeof width === "number" ? pxOr(width) : width,
    ...Object.fromEntries(
      Object.entries(position || {}).map(([k, v]) => [k, pxOr(v)])
    ),
    transform: anchorCenterX ? "translateX(-50%)" : undefined,
  };

  return (
    <div
      className="absolute z-20 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md 
                 p-4 md:p-6 shadow-lg"
      style={style}
    >
      <div className="mb-2 text-sm uppercase tracking-wide text-fuchsia-200">
        {labelFor(speaker)}
      </div>
      <p className="min-h-[3lh] text-base md:text-lg leading-relaxed text-white">{shown}</p>

      <div className="mt-4 flex justify-between">
        {/* Back button (only if allowed) */}
        {canBack && onBack && (
          <Button
            onClick={onBack}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            ← Back
          </Button>
        )}

        {showNext && (
          <Button onClick={onNext} className="bg-fuchsia-500 hover:bg-fuchsia-400 ml-auto">
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}

function labelFor(s) {
  if (s === "astro") return "Stelly (Astronaut)";
  if (s === "child") return "You";
  return "Narrator";
}