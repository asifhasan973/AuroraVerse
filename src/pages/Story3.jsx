import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DialogueBox from "./DialogueBox";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Spinner from "../components/ui/Spinner";
import { useImagePreload } from "../hooks/useImagePreload";
import VocabularySlider from "../components/VocabularySlider";
import { useVocabulary } from "../hooks/useVocabulary";

const SUN_BACKGROUNDS = {
  sun1: "/images/Story3/sun1.png",
  sun2: "/images/Story3/sun2.png",
  sun3: "/images/Story3/sun3.png",
  sun4: "/images/Story3/sun4.png",
};

const CHARACTERS = {
  both: "/images/Story3/see-sun-face-us.png",
};

const DIALOGUE_POSITIONS = {
  astro: {
    desktop: { bottom: "55vh", left: "25%" },
    mobile: { bottom: "20vh", left: "50%" }
  },
  child: {
    desktop: { bottom: "15vh", left: "65%" },
    mobile: { bottom: "15vh", left: "50%" }
  },
  narrator: {
    desktop: { bottom: "10vh", left: "50%" },
    mobile: { bottom: "10vh", left: "50%" }
  }
};

// 📝 Story script
const SCRIPT = [
  {
    id: "intro-calm",
    background: "sun1",
    canTapBackground: false,
    dialogue: {
      speaker: "astro",
      text: "See, the sun is in a good mood! It shines brightly and glows gently. Everything is peaceful on Earth as well.",
      // Optional: override default position for this specific dialogue
      // position: { bottom: "30vh", left: "70%" }
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "but-not-always",
    background: "sun1",
    canTapBackground: false,
    dialogue: {
      speaker: "astro",
      text: "But you know that the sun is not always calm. Sometimes, it gets angry.",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "tap-instruction",
    background: "sun1", // Will change to sun2, sun3, sun4 on taps
    canTapBackground: true,
    showTapHint: true,
    requireAllTaps: true, // Must tap through all sun states
    dialogue: {
      speaker: "astro",
      text: "Look! The sun is getting angry... Tap anywhere to see what happens!",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "sun-angry-explain",
    background: "sun4", // Keep at super angry
    canTapBackground: false,
    dialogue: {
      speaker: "astro",
      text: "When it gets angry, it changes the space weather. It throws out strong radiation and solar storms.",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "storms-named",
    background: "sun4",
    canTapBackground: false,
    dialogue: {
      speaker: "astro",
      text: "These storms are called solar flares or coronal mass ejections.",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "storms-travel",
    background: "sun4",
    canTapBackground: false,
    dialogue: {
      speaker: "astro",
      text: "These storms can travel all the way to us and everywhere in space!",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "child-question",
    background: "sun4",
    canTapBackground: false,
    dialogue: {
      speaker: "child",
      text: "Solar flare and coronal mass ejection?",
      // Child dialogue will use child's default position automatically
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "explain-flare",
    background: "sun4",
    canTapBackground: false,
    // showFlareOverlay: true, // Optional: show light ray overlay
    dialogue: {
      speaker: "astro",
      text: "Solar Flare: Light and X-rays travel at the speed of light → reaching Earth in just 8 minutes.",
      // Can override position for special cases
      // position: { bottom: "35vh", left: "60%" }
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },

  {
    id: "explain-cme",
    background: "sun4",
    canTapBackground: false,
    showCMEOverlay: true, // Optional: show particle overlay
    dialogue: {
      speaker: "astro",
      text: "Coronal Mass Ejections: A giant cloud of charged particles that takes 1-3 days to arrive.",
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
  {
    id: "solar-storms-harm-warning",
    background: "sun4",
    canTapBackground: false,
    // showFlareOverlay: true, // Optional: show light ray overlay
    dialogue: {
      speaker: "astro",
      text: "Solar storms can harm us. We need to save ourselves.",
      // Can override position for special cases
      // position: { bottom: "35vh", left: "60%" }
    },
    characters: {
      show: "both",
      position: { bottom: "10vh", left: "25%" },
    },
  },
];

// Hook for window size
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

// Helper function to get dialogue position
const getDialoguePosition = (dialogue, isMobile) => {
  // If specific position is provided for this dialogue, use it
  if (dialogue.position) {
    return dialogue.position;
  }

  // Otherwise, use default position based on speaker
  const speakerPositions = DIALOGUE_POSITIONS[dialogue.speaker] || DIALOGUE_POSITIONS.narrator;
  return isMobile ? speakerPositions.mobile : speakerPositions.desktop;
};

export default function Story3() {
  const [stepIndex, setStepIndex] = useState(0);
  const [currentBackground, setCurrentBackground] = useState("sun1");
  const [tapCount, setTapCount] = useState(0);
  const [allTapsComplete, setAllTapsComplete] = useState(false);
  const [isVocabularySideBySide, setIsVocabularySideBySide] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // State for custom position editing (for development/testing)
  const [customPositions, setCustomPositions] = useState({
    astro: { ...DIALOGUE_POSITIONS.astro },
    child: { ...DIALOGUE_POSITIONS.child }
  });
  const [showPositionEditor, _setShowPositionEditor] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  // Handle jumpToLast state from navigation
  useEffect(() => {
    if (location.state?.jumpToLast) {
      setStepIndex(SCRIPT.length - 1);
    }
  }, [location.state]);

  // Preload all scene assets (backgrounds + character image)
  const preloadUrls = [
    ...Object.values(SUN_BACKGROUNDS),
    CHARACTERS.both,
  ];
  const { done: assetsReady, progress } = useImagePreload(preloadUrls);

  // Get vocabulary for current step
  const { vocabulary: currentVocabulary, hasVocabulary } = useVocabulary('story3', stepIndex, assetsReady);

  const currentStep = SCRIPT[stepIndex];
  const canNext = stepIndex < SCRIPT.length - 1;
  const canBack = stepIndex > 0;

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && assetsReady) {
        // Don't advance if we need all taps and haven't completed them
        if (currentStep.requireAllTaps && !allTapsComplete) {
          return;
        }

        if (canNext) {
          setStepIndex(i => i + 1);
        } else {
          // Show loading immediately before navigation
          setIsTransitioning(true);
          // Go to next story part
          navigate("/story4");
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canNext, assetsReady, navigate, currentStep.requireAllTaps, allTapsComplete]);

  // Background tap sequence
  const backgroundSequence = ["sun1", "sun2", "sun3", "sun4"];

  // Handle background tap
  const handleBackgroundTap = () => {
    if (!assetsReady) return; // block interactions until assets are ready
    if (!currentStep.canTapBackground || allTapsComplete) return;

    const nextTapCount = tapCount + 1;

    if (nextTapCount < backgroundSequence.length) {
      setCurrentBackground(backgroundSequence[nextTapCount]);
      setTapCount(nextTapCount);

      // Check if we've reached the final state
      if (nextTapCount === backgroundSequence.length - 1) {
        setAllTapsComplete(true);
      }
    }
  };

  const handleNext = () => {
    if (!assetsReady) return; // block interactions until assets are ready
    // Don't advance if we need all taps and haven't completed them
    if (currentStep.requireAllTaps && !allTapsComplete) {
      return;
    }

    if (canNext) {
      setStepIndex(i => i + 1);
    } else {
      // Show loading immediately before navigation
      setIsTransitioning(true);
      // Go to next story part
      navigate("/story4");
    }
  };

  const handleBack = () => {
    if (!assetsReady) return; // block interactions until assets are ready
    if (canBack) {
      setStepIndex(i => i - 1);
    } else {
      // Go back to Story2 last dialogue
      navigate("/story2", { state: { jumpToLast: true } });
    }
  };

  // Reset state when step changes
  useEffect(() => {
    // Set the background for the current step
    if (!currentStep.canTapBackground) {
      setCurrentBackground(currentStep.background);
      setTapCount(0);
      setAllTapsComplete(false);
    } else if (stepIndex !== 2) { // Reset if not on tap instruction step
      setTapCount(0);
      setAllTapsComplete(false);
    }
  }, [stepIndex, currentStep]);

  // Update custom position for a speaker
  const updatePosition = (speaker, device, axis, value) => {
    setCustomPositions(prev => ({
      ...prev,
      [speaker]: {
        ...prev[speaker],
        [device]: {
          ...prev[speaker][device],
          [axis]: value
        }
      }
    }));
  };

  // Get current dialogue position (with custom overrides)
  const getCurrentDialoguePosition = () => {
    const dialogue = currentStep.dialogue;

    // If specific position is provided for this dialogue, use it
    if (dialogue.position) {
      return dialogue.position;
    }

    // Use custom positions if editor is active
    if (showPositionEditor) {
      const speakerPositions = customPositions[dialogue.speaker] || customPositions.astro;
      return isMobile ? speakerPositions.mobile : speakerPositions.desktop;
    }

    // Otherwise use default
    return getDialoguePosition(dialogue, isMobile);
  };

  // Determine if Next button should be shown/enabled
  const showNextButton = currentStep ? (!currentStep.requireAllTaps || allTapsComplete) : false;

  // Safety check - if currentStep is undefined, show loading
  if (!currentStep) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden text-white flex items-center justify-center">
        <div className="text-center">
          <Spinner size={60} />
          <p className="mt-4 text-lg">Loading story...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      onClick={handleBackgroundTap}
      style={{ cursor: currentStep.canTapBackground && !allTapsComplete ? 'pointer' : 'default' }}
    >
      {/* Content Container - only this area becomes flex when side-by-side */}
      <div className={`${isVocabularySideBySide ? 'flex h-screen' : ''}`}>
        {/* Main Content Area */}
        <div className={`${isVocabularySideBySide ? 'flex-1 min-w-0 relative pt-20' : 'w-full pt-20'}`}>
          {/* Global loading overlay for the scene */}
          <LoadingOverlay show={!assetsReady} label={`Preparing scene… ${progress}%`} />

          {/* Transition loading overlay */}
          <LoadingOverlay show={isTransitioning} label="Loading Story 4..." />
          {/* Background Image */}
          <div
            className="absolute inset-0 -z-30 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${SUN_BACKGROUNDS[currentBackground]})`,
            }}
          />

          {/* Optional gradient overlay for better text readability */}
          <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/10 via-transparent to-black/40" />



          {/* Position Editor Panel */}
          {showPositionEditor && (
            <div
              className="absolute top-16 right-4 z-40 bg-black/90 rounded-lg p-4 w-80 backdrop-blur-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold mb-3 text-white">Dialogue Position Editor</h3>

              {/* Astronaut Positions */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold mb-2 text-fuchsia-300">Astronaut Dialogue</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-300">Desktop Bottom:</label>
                    <input
                      type="text"
                      value={customPositions.astro.desktop.bottom}
                      onChange={(e) => updatePosition('astro', 'desktop', 'bottom', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Desktop Left:</label>
                    <input
                      type="text"
                      value={customPositions.astro.desktop.left}
                      onChange={(e) => updatePosition('astro', 'desktop', 'left', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Mobile Bottom:</label>
                    <input
                      type="text"
                      value={customPositions.astro.mobile.bottom}
                      onChange={(e) => updatePosition('astro', 'mobile', 'bottom', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Mobile Left:</label>
                    <input
                      type="text"
                      value={customPositions.astro.mobile.left}
                      onChange={(e) => updatePosition('astro', 'mobile', 'left', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Child Positions */}
              <div>
                <h4 className="text-xs font-semibold mb-2 text-blue-300">Child Dialogue</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-300">Desktop Bottom:</label>
                    <input
                      type="text"
                      value={customPositions.child.desktop.bottom}
                      onChange={(e) => updatePosition('child', 'desktop', 'bottom', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Desktop Left:</label>
                    <input
                      type="text"
                      value={customPositions.child.desktop.left}
                      onChange={(e) => updatePosition('child', 'desktop', 'left', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Mobile Bottom:</label>
                    <input
                      type="text"
                      value={customPositions.child.mobile.bottom}
                      onChange={(e) => updatePosition('child', 'mobile', 'bottom', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300">Mobile Left:</label>
                    <input
                      type="text"
                      value={customPositions.child.mobile.left}
                      onChange={(e) => updatePosition('child', 'mobile', 'left', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white/10 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-400">
                Current Speaker: <span className="text-white font-semibold">{currentStep.dialogue.speaker}</span>
              </div>
            </div>
          )}

          {/* Tap Hint - shows in center of screen */}
          {currentStep.showTapHint && !allTapsComplete && (
            <div className="fixed inset-0 flex items-start pt-20 justify-center z-30 pointer-events-none">
              <div className="text-center animate-pulse">
                <div className="text-2xl text-red-500 font-bold drop-shadow-lg">
                  Tap anywhere to make the sun angrier!
                </div>
                <div className="text-sm text-white/10 mt-2">
                  Tap {backgroundSequence.length - 1 - tapCount} more time{backgroundSequence.length - 1 - tapCount !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
          {currentStep.showFlareOverlay && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-0 animate-pulse-fast">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-screen bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent animate-flare-sweep" />
                <div className="absolute top-1/4 left-1/3 w-px h-screen bg-gradient-to-b from-transparent via-orange-400/30 to-transparent animate-flare-sweep-delay" />
                <div className="absolute top-1/4 left-2/3 w-px h-screen bg-gradient-to-b from-transparent via-yellow-300/30 to-transparent animate-flare-sweep-delay-2" />
              </div>
            </div>
          )}

          {/* CME Overlay (optional visual effect) */}
          {currentStep.showCMEOverlay && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 rounded-full bg-gradient-radial from-orange-500/20 via-red-500/10 to-transparent animate-expand-slow" />
              </div>
            </div>
          )}

          {/* Characters */}
          {currentStep.characters && (
            <div
              className="absolute z-20 pointer-events-none"
              style={currentStep.characters.position}
            >
              {!assetsReady ? (
                <div className="flex items-center justify-center" style={{ width: isMobile ? '200px' : '320px', height: isMobile ? '200px' : '320px' }}>
                  <Spinner size={40} />
                </div>
              ) : (
                <img
                  src={CHARACTERS[currentStep.characters.show] || CHARACTERS.both}
                  alt="Characters"
                  className="drop-shadow-[0_10px_40px_rgba(0,0,0,.8)]"
                  style={{
                    width: isMobile ? '200px' : '320px',
                    height: 'auto',
                  }}
                />
              )}
            </div>
          )}

          {/* Dialogue Box with Dynamic Position */}
          <div onClick={(e) => e.stopPropagation()}> {/* Prevent dialogue clicks from changing background */}
            <DialogueBox
              speaker={currentStep.dialogue.speaker}
              text={currentStep.dialogue.text}
              width={isMobile ? "80%" : 420}
              maxWidth={600}
              position={getCurrentDialoguePosition()}
              anchorCenterX={true}
              showNext={showNextButton}
              onNext={handleNext}
              onBack={handleBack}
              canBack={true}
              loading={!assetsReady}
            />
          </div>

          {/* Progress indicator for sun states */}
          {currentStep.canTapBackground && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {backgroundSequence.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${index <= tapCount
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
          )}

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