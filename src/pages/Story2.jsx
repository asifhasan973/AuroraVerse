// src/pages/Story2.jsx
import { useState } from "react";
import DialogueBox from "./DialogueBox";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Spinner from "../components/ui/Spinner";
import { useImagePreload } from "../hooks/useImagePreload";
import VocabularySlider from "../components/VocabularySlider";
import { useVocabulary } from "../hooks/useVocabulary";

/** 🔧 Set your image paths once (they never change) */
const BG = "images/Story2/story2_bg.png";
const COUPLE = "images/Story2/talk_c_a_stand.png"; // one image with both

/** 3 astronaut lines (click to advance) */
const LINES = [
  "We , the astronauts live in space in space station(inside space craft rocket).",
  "From here, we can see the Earth, satellites, and of course… the Sun.",
  "Lets go outside from the space station.",
];

export default function Story2() {
  const location = useLocation();
  const jumpToLast = Boolean(location.state?.jumpToLast);
  const [i, setI] = useState(jumpToLast ? LINES.length - 1 : 0);
  const [isVocabularySideBySide, setIsVocabularySideBySide] = useState(false);
  const canNext = i < LINES.length - 1;
  const canBack = i > 0;
  const navigate = useNavigate();

  // Preload background and couple image
  const { done: assetsReady, progress } = useImagePreload([BG, COUPLE]);

  // Get vocabulary for current dialogue
  const { vocabulary: currentVocabulary, hasVocabulary } = useVocabulary('story2', i, assetsReady);

  return (
    <div id="story2-root" className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Content Container - only this area becomes flex when side-by-side */}
      <div className={`${isVocabularySideBySide ? 'flex h-screen' : ''}`}>
        {/* Main Content Area */}
        <div className={`${isVocabularySideBySide ? 'flex-1 min-w-0 relative pt-20' : 'w-full pt-20'}`}>
          <LoadingOverlay show={!assetsReady} label={`Loading… ${progress}%`} />
          {/* Background (fixed) */}
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
            aria-hidden
          />
          <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/15 via-slate-900/20 to-black/60" />

          {/* One couple image (fixed) */}
          {assetsReady ? (
            <img
              src={COUPLE}
              alt="Astronaut talking with child"
              draggable={false}
              className="absolute w-80 left-1/4 bottom-[6vh] -translate-x-1/2 drop-shadow-[0_14px_48px_rgba(59,130,246,.45)]"
              width={1200}
              height={1200}
            />
          ) : (
            <div className="absolute w-80 left-1/4 bottom-[6vh] -translate-x-1/2 flex items-center justify-center" style={{ height: '20rem' }}>
              <Spinner size={36} />
            </div>
          )}

          {/* Dialogue (only thing that changes) */}
          <DialogueBox
            speaker="astro"
            text={LINES[i]}
            width={560}
            position={{ bottom: "55%", left: "41%" }}
            anchorCenterX
            loading={!assetsReady}
            onNext={() => {
              if (canNext) return setI((x) => x + 1);
              // Final line -> go to Story3
              navigate("/story3");
            }}
            showNext={true}
            onBack={() => {
              if (canBack) return setI((x) => x - 1);
              // At first line -> go back to Start last scene
              navigate("/start", { state: { jumpToLast: true } });
            }}
            canBack={true}
          />
        </div>

        {/* Vocabulary Slider */}
        <VocabularySlider
          vocabulary={currentVocabulary}
          isVisible={hasVocabulary}
          onLayoutChange={setIsVocabularySideBySide}
        />
      </div>
    </div>
  );
}