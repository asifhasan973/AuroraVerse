// src/pages/Start.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DialogueBox from "./DialogueBox";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useImagePreload } from "../hooks/useImagePreload";
import VocabularySlider from "../components/VocabularySlider";
import { useVocabulary } from "../hooks/useVocabulary";

// Hook to track window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Helper: allow numbers (px) or strings ("50%", "10vw")
const pxOr = (v) => (typeof v === "number" ? `${v}px` : v);

const styleFromPos = (pos = {}, isMobile = false) => {
  const style = {};

  // Convert percentage-based positions for mobile
  if (isMobile && pos.left && typeof pos.left === 'string' && pos.left.includes('%')) {
    const percentage = parseInt(pos.left);
    // Adjust percentages for mobile to keep elements visible
    style.left = `${Math.min(Math.max(percentage, 10), 90)}%`;
  } else if (pos.left != null) {
    style.left = pxOr(pos.left);
  }

  if (pos.top != null) style.top = pxOr(pos.top);
  if (pos.bottom != null) style.bottom = pxOr(pos.bottom);
  if (pos.right != null) style.right = pxOr(pos.right);
  if (pos.z != null) style.zIndex = pos.z;

  return style;
};

// Helper to get responsive scale
const getResponsiveScale = (scale, windowWidth) => {
  if (!scale) return 1;

  if (typeof scale === 'object') {
    if (windowWidth < 640) return scale.mobile || scale.base * 0.6;
    if (windowWidth < 768) return scale.tablet || scale.base * 0.75;
    if (windowWidth < 1024) return scale.base * 0.85;
    return scale.base || 1;
  }

  // If scale is a number, apply responsive multipliers
  if (windowWidth < 640) return scale * 0.6;
  if (windowWidth < 768) return scale * 0.75;
  if (windowWidth < 1024) return scale * 0.85;
  return scale;
};

// Helper to get responsive width
const getResponsiveWidth = (width, windowWidth) => {
  if (typeof width === 'object') {
    if (windowWidth < 640) return width.mobile || "90%";
    if (windowWidth < 768) return width.tablet || width.base * 0.85;
    return width.base || width;
  }

  // For mobile, constrain width to viewport
  if (windowWidth < 768) {
    return Math.min(width || 450, windowWidth * 0.9);
  }

  return width || 450;
};

// --- SCRIPT: fully controllable per step ---
const SCRIPT = [
  {
    id: "garden-1",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit.png",
        visible: true,
        pose: "sit",
        scale: { base: 0.35, mobile: 0.21, tablet: 0.28 },
        pos: { bottom: 0, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: "Hi there! I'm Stelly.",
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "25vh", left: "65%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 2
    id: "garden-2",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_hi.png",
        visible: true,
        pose: "hi",
        scale: { base: 0.43, mobile: 0.26, tablet: 0.34 },
        pos: { bottom: "-5vh", left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_listen2.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Hi! Who are you?",
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "15vh", left: "35%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 3
    id: "garden-3",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit.png",
        visible: true,
        pose: "sit",
        scale: { base: 0.35, mobile: 0.21, tablet: 0.28 },
        pos: { bottom: 0, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: "I'm an astronaut.",
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "25vh", left: "65%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 4
    id: "garden-4",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit_wow.png",
        visible: true,
        pose: "hi",
        scale: { base: 0.43, mobile: 0.26, tablet: 0.34 },
        pos: { bottom: "-5vh", left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_listen2.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Astronaut? What is it?",
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "15vh", left: "35%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 5
    id: "garden-5",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_talk2.png",
        visible: true,
        pose: "hi",
        scale: { base: 0.43, mobile: 0.26, tablet: 0.34 },
        pos: { bottom: "-5vh", left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_talk.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: `An astronaut is a space explorer!`,
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "25vh", left: "65%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 6 - Do you wanna explore
    id: "garden-6",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit_wow.png",
        visible: true,
        pose: "hi",
        scale: { base: 0.43, mobile: 0.26, tablet: 0.34 },
        pos: { bottom: "-5vh", left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: `Do you wanna explore the space?`,
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "25vh", left: "65%" },
        anchorCenterX: true
      },
    },
  },
  {
    // garden 7 - YES
    id: "garden-7",
    bg: "/images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_happy.png",
        visible: true,
        pose: "hi",
        scale: { base: 0.40, mobile: 0.24, tablet: 0.32 },
        pos: { bottom: "2vh", left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
        pos: { top: "-15vh", left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Yes...",
      box: {
        width: { base: 320, mobile: "75%", tablet: 280 },
        pos: { bottom: "15vh", left: "35%" },
        anchorCenterX: true
      },
    },
  },

  /* ========= ONLY THIS LAST SCENE CHANGED: approach THEN fly ========= */
  {
    id: "take-off",
    bg: "/images/GamePage/bg1.png",

    /* Two-phase configuration */
    phases: {
      // Phase 0: Astronaut approaches from above-right to the child
      approach: {
        // starting absolute position (off-screen top-right)
        astroStart: { top: "-25%", left: "105%" },
        // offset to move to reach near the child (left is negative, down is positive)
        move: {
          toX: "-80vw",
          toY: "28vh",
          duration: 3000, // <-- speed control (ms)
          delay: 0,
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
        // child idle sprite (sitting/happy/etc.)
        child: {
          src: "/images/GamePage/c_happy.png",
          scale: { base: 0.40, mobile: 0.24, tablet: 0.32 },
          pos: { bottom: "2vh", left: "30%", z: 2 },
          anchorCenterX: true,
        },
        // astronaut sprite used during approach
        astro: {
          src: "/images/GamePage/a_hi.png",
          scale: { base: 0.5, mobile: 0.3, tablet: 0.4 },
          anchorCenterX: true,
        },
      },

      // Phase 1: Both fly away at ~45° 
      // Note: flip_image.png  is the image of both child and astro. 
      fly: {
        child: {
          src: "/images/GamePage/flip_image.png",
          scale: { base: 0.63, mobile: 0.38, tablet: 0.5 },
          pos: { bottom: 0, left: "32%", z: 2 },
          anchorCenterX: true,
          fly45: { distance: "115vh", duration: 5000, delay: 0, direction: "right" },
        },
      },
    },

    dialogue: {
      speaker: "astro",
      text: "Hold my hand, let's fly! 🚀",
      box: {
        width: { base: 340, mobile: "75%", tablet: 300 },
        pos: { bottom: "20vh", left: "60%" },
        anchorCenterX: true
      },
    },
  },
];

export default function Start() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0 = approach, 1 = fly (only for take-off)
  const [isVocabularySideBySide, setIsVocabularySideBySide] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  const step = SCRIPT[stepIndex];
  const canNext = stepIndex < SCRIPT.length - 1;
  const isLast = !canNext;

  // Preload assets for the current step (bg + character sprites used in this step)
  const stepImageUrls = useMemo(() => {
    const urls = new Set();
    if (step?.bg) urls.add(step.bg);
    const addChar = (c) => c?.src && urls.add(c.src);
    if (step?.characters) {
      addChar(step.characters.astro);
      addChar(step.characters.child);
    }
    if (step?.id === 'take-off') {
      // include special phase sprites
      const ap = step.phases?.approach;
      const fl = step.phases?.fly;
      addChar(ap?.astro);
      addChar(ap?.child);
      addChar(fl?.astro);
      addChar(fl?.child);
    }
    return Array.from(urls);
  }, [step]);

  const { done: assetsReady, progress } = useImagePreload(stepImageUrls);

  // Get vocabulary for current step
  const { vocabulary: currentVocabulary, hasVocabulary } = useVocabulary('start', step?.id, assetsReady);

  // If we came back from Story2 with jumpToLast flag, jump to last scene
  useEffect(() => {
    if (location.state?.jumpToLast) {
      setStepIndex(SCRIPT.length - 1);
      // Clean the state so re-renders don't repeat
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When we enter the take-off step, run phase 0 then phase 1 automatically
  useEffect(() => {
    setPhase(0);
    if (step?.id !== "take-off") return;

    // duration of approach = move.duration + delay (fallback 1600)
    const dur =
      (step.phases?.approach?.move?.duration ?? 1600) +
      (step.phases?.approach?.move?.delay ?? 0);

    const t = setTimeout(() => setPhase(1), dur + 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && assetsReady) {
        if (canNext) {
          setStepIndex((i) => i + 1);
        } else if (isLast) {
          navigate("/story2");
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canNext, isLast, assetsReady, navigate]);

  // Build characters for the active step (special handling for "take-off")
  const activeCharacters = useMemo(() => {
    if (step?.id !== "take-off") return step.characters;

    if (phase === 0) {
      const a = step.phases.approach;
      return {
        // Astronaut moving from start -> (start + offset) with speed
        astro: {
          ...a.astro,
          pose: "move-to",
          pos: { ...(a.astroStart || {}), z: 3 },
          move: { ...(a.move || {}) },
        },
        // Child idle on the ground
        child: { ...(a.child || {}) },
      };
    }

    // Phase 1: 45° flight - only child (flip_image.png contains both characters)
    const f = step.phases.fly;
    return {
      astro: { visible: false }, // Hide astronaut since flip_image.png contains both
      child: { ...(f.child || {}), pose: "fly-45" },
    };
  }, [step, phase]);

  return (
    <div
      id="story-root"
      className={`
        relative min-h-screen overflow-hidden text-white
        ${isMobile ? 'touch-manipulation' : ''}
      `}
      style={{
        maxHeight: '100vh',
        touchAction: isMobile ? 'pan-y' : 'auto',
      }}
    >
      {/* Content Container - only this area becomes flex when side-by-side */}
      <div className={`${isVocabularySideBySide ? 'flex h-screen' : ''}`}>
        {/* Main Content Area */}
        <div className={`${isVocabularySideBySide ? 'flex-1 min-w-0 relative pt-20' : 'w-full pt-20'}`}>
          <LoadingOverlay show={!assetsReady} label={`Loading… ${progress}%`} />
          <Background bg={step.bg} bgVideo={step.bgVideo} />

          <CharactersLayer
            characters={activeCharacters}
            windowSize={windowSize}
          />

          {/* Dialogue – size + position controlled from script */}
          <DialogueBox
            speaker={step.dialogue?.speaker}
            text={step.dialogue?.text}
            width={getResponsiveWidth(step.dialogue?.box?.width, windowSize.width)}
            position={step.dialogue?.box?.pos}
            anchorCenterX={step.dialogue?.box?.anchorCenterX}
            loading={!assetsReady}
            onNext={() => {
              if (!assetsReady) return;
              if (canNext) return setStepIndex((i) => i + 1);
              if (isLast) navigate("/story2");
            }}
            showNext={canNext || isLast}
            onBack={() => {
              if (!assetsReady) return;
              if (stepIndex > 0) setStepIndex((i) => i - 1);
            }}
            canBack={stepIndex > 0}
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

function Background({ bg, bgVideo }) {
  return (
    <>
      {bgVideo ? (
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={bg || ""}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      ) : (
        <div
          className="inset-0 -z-30 bg-cover bg-center"
          style={{ position: "absolute", backgroundImage: `url(${bg})` }}
        />
      )}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/20 via-purple-950/30 to-black/60" />
    </>
  );
}

/* ⬇️ understands sit/float/fly-up (old), move-to (new), fly-45 (new) */
function CharactersLayer({ characters = {}, windowSize }) {
  const { child, astro } = characters;
  const isMobile = windowSize.width < 768;

  const commonStyle = (char) => ({
    ...styleFromPos(char.pos, isMobile),
    "--tx": char.anchorCenterX ? "-50%" : "0",
    "--base-scale": getResponsiveScale(char.scale, windowSize.width),

    /* Approach movement (phase 0) */
    "--to-x": char.move?.toX ?? undefined,
    "--to-y": char.move?.toY ?? undefined,
    "--move-duration": char.move?.duration ? `${char.move.duration}ms` : undefined,
    "--move-delay": char.move?.delay ? `${char.move.delay}ms` : undefined,
    "--move-ease": char.move?.easing ?? undefined,

    /* 45° flight (phase 1) */
    "--diag-distance": char.fly45?.distance ?? undefined,
    "--diag-duration": char.fly45?.duration ? `${char.fly45.duration}ms` : undefined,
    "--diag-delay": char.fly45?.delay ? `${char.fly45.delay}ms` : undefined,
    "--diag-dir": char.fly45?.direction === "left" ? -1 : 1,

    /* legacy vertical lift still supported */
    "--lift-duration": char.lift?.duration ? `${char.lift.duration}ms` : undefined,
    "--lift-delay": char.lift?.delay ? `${char.lift.delay}ms` : undefined,
    "--lift-distance": char.lift?.distance || undefined,

    transform: [
      char.anchorCenterX ? "translateX(-50%)" : null,
      char.flipX ? "scaleX(-1)" : null,
      `scale(${getResponsiveScale(char.scale, windowSize.width)})`,
    ]
      .filter(Boolean)
      .join(" "),
    transformOrigin: "center bottom",
    height: "auto",
    maxWidth: isMobile ? "60vw" : char.maxWidth ?? "40vw",
  });

  const cx = (char, extras = "") =>
    [
      "absolute",
      extras,
      // old poses
      char.pose === "sit" && "animate-bounce-slow",
      char.pose === "float" && "animate-float",
      char.pose === "fly-up" && "animate-lift",
      // new poses
      char.pose === "move-to" && "animate-move",
      char.pose === "fly-45" && "animate-fly-45",
      char.anchorCenterX && "-translate-x-1/2",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {astro?.visible !== false && (
        <img
          src={astro.src}
          alt="Astronaut"
          draggable={false}
          className={cx(astro, "drop-shadow-[0_10px_40px_rgba(59,130,246,.6)]")}
          style={{ position: "absolute", ...commonStyle(astro) }}
          width={800}
          height={800}
        />
      )}
      {child?.visible !== false && (
        <img
          src={child.src}
          alt="Child"
          draggable={false}
          className={cx(child, "drop-shadow-[0_10px_40px_rgba(124,58,237,.6)]")}
          style={{
            position: "absolute",
            ...commonStyle(child),
            maxWidth: isMobile ? "55vw" : "36vw"
          }}
          width={800}
          height={800}
        />
      )}
    </div>
  );
}