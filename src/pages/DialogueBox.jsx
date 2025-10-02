// src/components/DialogueBox.jsx
import { useEffect, useRef, useState } from "react";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

const pxOr = (v) => (typeof v === "number" ? `${v}px` : v);

export default function DialogueBox({
  speaker = "Narrator",
  text = "",
  width = "90%", // Changed to percentage for mobile
  maxWidth = 600, // Add max width for larger screens
  position = { bottom: 24, left: "50%" },
  anchorCenterX = true,
  showNext = true,
  onNext = () => { },
  onBack = null,
  canBack = false,
  loading = false,
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

  // Responsive positioning
  const getResponsivePosition = () => {
    const basePosition = { ...position };

    // On mobile, adjust positioning
    if (window.innerWidth < 768) {
      // Center horizontally with some margin
      basePosition.left = "50%";
      basePosition.right = undefined;
      // Give more space from bottom on mobile
      if (basePosition.bottom) {
        basePosition.bottom = typeof basePosition.bottom === 'number'
          ? Math.max(12, basePosition.bottom / 2)
          : basePosition.bottom;
      }
    }

    return Object.fromEntries(
      Object.entries(basePosition).map(([k, v]) => [k, pxOr(v)])
    );
  };

  const style = {
    width: typeof width === "number" ? pxOr(width) : width,
    maxWidth: pxOr(maxWidth),
    ...getResponsivePosition(),
    transform: anchorCenterX ? "translateX(-50%)" : undefined,
  };

  return (
    <div
      className="absolute z-20 rounded-xl sm:rounded-2xl 
                 border border-white/10 bg-black/40 backdrop-blur-md 
                 p-3 sm:p-4 md:p-6 shadow-lg
                 mx-2 sm:mx-0" // Add horizontal margin on mobile
      style={style}
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-xl sm:rounded-2xl">
          <Spinner size={40} />
        </div>
      )}
      {/* Speaker label */}
      <div className="mb-1.5 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide text-fuchsia-200">
        {labelFor(speaker)}
      </div>

      {/* Dialogue text */}
      <p className="min-h-[2.5rem] sm:min-h-[3lh] 
                    text-sm sm:text-base md:text-lg 
                    leading-relaxed text-white">
        {shown}
      </p>

      {/* Action buttons */}
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-between">
        {/* Back button (only if allowed) */}
        {canBack && onBack && (
          <Button
            onClick={onBack}
            className="w-full sm:w-auto 
                       text-sm sm:text-base
                       py-2 sm:py-2.5
                       bg-white/20 text-white hover:bg-white/30
                       order-2 sm:order-1" // On mobile, show Back below Next
          >
            ← Back
          </Button>
        )}

        {/* Next button */}
        {showNext && (
          <Button
            onClick={onNext}
            className="w-full sm:w-auto 
                       text-sm sm:text-base
                       py-2 sm:py-2.5
                       bg-fuchsia-500 hover:bg-fuchsia-400 
                       sm:ml-auto
                       order-1 sm:order-2" // On mobile, show Next on top
          >
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