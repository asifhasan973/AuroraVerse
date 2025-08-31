// src/pages/Start.jsx
import { useEffect, useMemo, useState } from "react";
import DialogueBox from "./DialogueBox";

// Helper: allow numbers (px) or strings ("50%", "10vw")
const pxOr = (v) => (typeof v === "number" ? `${v}px` : v);
const styleFromPos = (pos = {}) => {
  const style = {};
  if (pos.top != null) style.top = pxOr(pos.top);
  if (pos.bottom != null) style.bottom = pxOr(pos.bottom);
  if (pos.left != null) style.left = pxOr(pos.left);
  if (pos.right != null) style.right = pxOr(pos.right);
  if (pos.z != null) style.zIndex = pos.z;
  return style;
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
        scale: 0.35,
        pos: { bottom: 0, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: "Hi there! I’m Stelly.",
      box: { width: 450, pos: { bottom: 250, left: "65%" }, anchorCenterX: true },
    },
  },
  {
    // garden 2
    id: "garden-2",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_hi.png",
        visible: true,
        pose: "hi",
        scale: 0.43,
        pos: { bottom: -35, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_listen2.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Hi! Who are you?",
      box: { width: 450, pos: { bottom: 150, left: "35%" }, anchorCenterX: true },
    },
  },
  {
    // garden 3
    id: "garden-3",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit.png",
        visible: true,
        pose: "sit",
        scale: 0.35,
        pos: { bottom: 0, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: "I’m an astronaut.",
      box: { width: 450, pos: { bottom: 250, left: "65%" }, anchorCenterX: true },
    },
  },
  {
    // garden 4
    id: "garden-4",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit_wow.png",
        visible: true,
        pose: "hi",
        scale: 0.43,
        pos: { bottom: -35, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_listen2.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Astronaut? What is it?",
      box: { width: 450, pos: { bottom: 150, left: "35%" }, anchorCenterX: true },
    },
  },
  {
    // garden 5
    id: "garden-5",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_talk2.png",
        visible: true,
        pose: "hi",
        scale: 0.43,
        pos: { bottom: -35, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_talk.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: `An astronaut is a space explorer!`,
      box: { width: 450, pos: { bottom: 250, left: "65%" }, anchorCenterX: true },
    },
  },
  {
    // garden 6 - Do you wanna explore
    id: "garden-6",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_sit_wow.png",
        visible: true,
        pose: "hi",
        scale: 0.43,
        pos: { bottom: -35, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "astro",
      text: `Do you wanna explore the space?`,
      box: { width: 450, pos: { bottom: 250, left: "65%" }, anchorCenterX: true },
    },
  },
  {
    // garden 7 - YES
    id: "garden-7",
    bg: "images/GamePage/bg1.png",
    characters: {
      child: {
        src: "/images/GamePage/c_happy.png",
        visible: true,
        pose: "hi",
        scale: 0.40,
        pos: { bottom: 20, left: "30%", z: 2 },
        anchorCenterX: true,
      },
      astro: {
        src: "/images/GamePage/a_hi.png",
        visible: true,
        pose: "enter-top",
        scale: 0.5,
        pos: { top: -250, left: "105%", z: 3 },
        anchorCenterX: true,
      },
    },
    dialogue: {
      speaker: "child",
      text: "Yes...",
      box: { width: 450, pos: { bottom: 150, left: "35%" }, anchorCenterX: true },
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
          duration: 4000,         // <-- speed control (ms)
          delay: 0,
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
        // child idle sprite (sitting/happy/etc.)
        child: {
          src: "/images/GamePage/c_happy.png",
          scale: 0.40,
          pos: { bottom: 20, left: "30%", z: 2 },
          anchorCenterX: true,
        },
        // astronaut sprite used during approach
        astro: {
          src: "/images/GamePage/a_hi.png",
          scale: 0.5,
          anchorCenterX: true,
        },
      },

      // Phase 1: Both fly away at ~45°
      fly: {
       child: {
            src: "/images/GamePage/flip_image.png",
            scale: 0.63,
            pos: { bottom: 0, left: "32%", z: 2 },
            anchorCenterX: true,
            fly45: { distance: "115vh", duration: 5000, delay: 0, direction: "right" },
           
        },
    
      },
    },

    dialogue: {
      speaker: "astro",
      text: "Hold my hand, let's fly! 🚀",
      box: { width: 480, pos: { bottom: 200, left: "60%" }, anchorCenterX: true },
    },
  },
];

export default function Start() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0 = approach, 1 = fly (only for take-off)
  const step = SCRIPT[stepIndex];
  const canNext = stepIndex < SCRIPT.length - 1;

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

    // Phase 1: 45° flight
    const f = step.phases.fly;
    return {
      astro: { ...(f.astro || {}), pose: "fly-45" },
      child: { ...(f.child || {}), pose: "fly-45" },
    };
  }, [step, phase]);

  return (
    <div id="story-root" className="relative min-h-screen overflow-hidden text-white">
      <Background bg={step.bg} bgVideo={step.bgVideo} />

      <CharactersLayer characters={activeCharacters} />

      {/* Dialogue – size + position controlled from script */}
      <DialogueBox
        speaker={step.dialogue?.speaker}
        text={step.dialogue?.text}
        width={step.dialogue?.box?.width}
        position={step.dialogue?.box?.pos}
        anchorCenterX={step.dialogue?.box?.anchorCenterX}
        onNext={() => canNext && setStepIndex((i) => i + 1)}
        showNext={canNext}
        onBack={() => stepIndex > 0 && setStepIndex((i) => i - 1)}
        canBack={stepIndex > 0}
      />
    </div>
  );
}

function Background({ bg, bgVideo }) {
  return (
    <>
      {bgVideo ? (
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          autoPlay loop muted playsInline poster={bg || "/video-poster.jpg"}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
      )}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/20 via-purple-950/30 to-black/60" />
    </>
  );
}

/* ⬇️ understands sit/float/fly-up (old), move-to (new), fly-45 (new) */
function CharactersLayer({ characters = {} }) {
  const { child, astro } = characters;

  const commonStyle = (char) => ({
    ...styleFromPos(char.pos),
    "--tx": char.anchorCenterX ? "-50%" : "0",
    "--base-scale": char.scale ?? 1,

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
        `scale(${char.scale || 1})`,
    ].filter(Boolean).join(" "),
    transformOrigin: "center bottom",
    height: "auto",
    maxWidth: char.maxWidth ?? "40vw",
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
          style={commonStyle(astro)}
        />
      )}
      {child?.visible !== false && (
        <img
          src={child.src}
          alt="Child"
          draggable={false}
          className={cx(child, "drop-shadow-[0_10px_40px_rgba(124,58,237,.6)]")}
          style={{ ...commonStyle(child), maxWidth: "36vw" }}
        />
      )}
    </div>
  );
}