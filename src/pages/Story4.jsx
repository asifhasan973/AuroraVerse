// src/pages/Story4.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "./DialogueBox";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Spinner from "../components/ui/Spinner";
import { useImagePreload } from "../hooks/useImagePreload";
import VocabularySlider from "../components/VocabularySlider";
import { useVocabulary } from "../hooks/useVocabulary";

// 🖼️ Background images that change with dialogue
const BACKGROUNDS = {
    bg0: "/images/Story4/screen_off.png",
    bg1: "/images/Story4/1.png",
    bg2: "/images/Story4/2.png",
    bg3: "/images/Story4/3.png",
    bg4: "/images/Story4/4.png",
    bg5: "/images/Story4/5.png",
    bg6: "/images/Story4/6.png",
    bg8: "/images/Story4/8.png",
    bg9: "/images/Story4/9.png",
    bg10: "/images/Story4/10.png",
    bg11: "/images/Story4/11.png",
    bg12: "/images/Story4/screen_white.png",
};

// 👥 Character images
const CHARACTERS = {
    both: "/images/Story4/talk_c_a_stand.png",
};

// 💬 Default dialogue positions for different speakers
const DIALOGUE_POSITIONS = {
    astro: {
        desktop: { bottom: "64vh", left: "20%" },
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

// 📝 Story script - each dialogue step can have its own background
const SCRIPT = [
    {
        id: "solar-storms-spacecraft-intro",
        background: "bg0",
        dialogue: {
            speaker: "astro",
            text: "Solar storms can also shake up our spacecraft.That's why we hide inside a storm shelter in our spacecraft to stay safe.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "child-asks-about-storm-shelter",
        background: "bg0",
        dialogue: {
            speaker: "child",
            text: "Storm shelter?",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "explain-storm-shelter-superhero",
        background: "bg0", // Same background as previous (no change)
        dialogue: {
            speaker: "astro",
            text: "A storm shelter is like a super-safe hideout where you can stay safe from big storms, just like a superhero's secret base!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "ask-to-see-solar-storm-power",
        background: "bg0",
        dialogue: {
            speaker: "astro",
            text: "Do you want to see how powerful and amazing a solar storm can be?",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "child-excited-to-see-storm",
        background: "bg0",
        dialogue: {
            speaker: "child",
            text: "Yes, show me!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "explain-storm-effects-computers",
        background: "bg0",
        dialogue: {
            speaker: "astro",
            text: "Storms can confuse computers, mess with signals, and even damage equipment. Let's see in the monitor.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "radiation-damages-electronics",
        background: "bg10",
        dialogue: {
            speaker: "astro",
            text: "These radiations can damage Spacecraft electronics.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },

    {
        id: "engineers-build-protections",
        background: "bg1",
        dialogue: {
            speaker: "astro",
            text: "Luckily, our engineers build special protections to keep everything working.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "storms-affect-satellites",
        background: "bg2",
        dialogue: {
            speaker: "astro",
            text: "Strong storms can even affect our satellites in space!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "gps-communication-problems",
        background: "bg3",
        dialogue: {
            speaker: "astro",
            text: "They can mess up GPS signals and communication systems on Earth.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "nasa-monitors-sun-24-7",
        background: "bg11",
        dialogue: {
            speaker: "astro",
            text: "That's why scientists of NASA watch the sun 24/7 to warn us about incoming storms.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "safe-space-exploration",
        background: "bg11",
        dialogue: {
            speaker: "astro",
            text: "With proper protection and warnings, we can explore space safely!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "pilots-fishermen-navigation-problems",
        background: "bg4", // pilot
        dialogue: {
            speaker: "astro",
            text: "Pilots also face direction problems and fishermen also have trouble with navigation due to solar storms.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "mobile-phones-power-grid-failures",
        background: "bg8", // power grid 
        dialogue: {
            speaker: "astro",
            text: "Mass people can't talk on mobile phones and lose network connection. And power grids can even fail!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "engineers-preventive-measures",
        background: "bg9", // power grid solution
        dialogue: {
            speaker: "astro",
            text: "Now engineers have discovered preventive measures against this problem.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },

    {
        id: "child-fears-sun",
        background: "bg9",
        dialogue: {
            speaker: "child",
            text: "Oh God! The sun is so cruel. Scary sun!!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "sun-creates-magical-auroras",
        background: "bg5",
        dialogue: {
            speaker: "astro",
            text: "No, the sun is not always dangerous.Its storms can also create something magical-AURORAS.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

    },
    {
        id: "child-asks-about-aurora",
        background: "bg5",
        dialogue: {
            speaker: "child",
            text: "What is aurora?",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

    },
    {
        id: "explain-aurora-formation",
        background: "bg5",
        dialogue: {
            speaker: "astro",
            text: "These are beautiful lights in the sky when solar particles meet Earth's atmosphere and magnetic field.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

    },
    {
        id: "ask-to-make-aurora",
        background: "bg5",
        dialogue: {
            speaker: "astro",
            text: "Do you want to make an aurora now?",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

    },
    {
        id: "child-excited-about-making-aurora",
        background: "bg5",
        dialogue: {
            speaker: "child",
            text: "Yes, Can it be possible?",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

    },

    {
        id: "quiz-before-aurora-creation",
        background: "bg12",
        dialogue: {
            speaker: "astro",
            text: "Of course, But you need to give an exciting quiz first then you can create your own aurora.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
        showQuizButton: true
    }

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

export default function Story4() {
    const [stepIndex, setStepIndex] = useState(0);
    const [currentBackground, setCurrentBackground] = useState("bg0");
    const [isVocabularySideBySide, setIsVocabularySideBySide] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [isNavigatingToQuiz, setIsNavigatingToQuiz] = useState(false);
    const [isNavigatingToFinale, setIsNavigatingToFinale] = useState(false);

    const navigate = useNavigate();
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 768;

    // Preload all scene assets (backgrounds + character images)
    const preloadUrls = [
        ...Object.values(BACKGROUNDS),
        ...Object.values(CHARACTERS),
    ];
    const { done: assetsReady, progress } = useImagePreload(preloadUrls);

    // Preload Quiz component when assets are ready
    useEffect(() => {
        if (assetsReady) {
            // Preload the Quiz component by importing it
            import('../pages/Quiz');
        }
    }, [assetsReady]);

    // Get vocabulary for current step
    const { vocabulary: currentVocabulary, hasVocabulary } = useVocabulary('story4', stepIndex, assetsReady);

    const currentStep = SCRIPT[stepIndex];
    const canNext = stepIndex < SCRIPT.length - 1;
    const canBack = stepIndex > 0;

    // Update background when step changes
    useEffect(() => {
        if (currentStep) {
            setCurrentBackground(currentStep.background);
        }
    }, [stepIndex, currentStep]);

    // Handle keyboard events
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && assetsReady) {
                if (canNext) {
                    setStepIndex(i => i + 1);
                } else {
                    // Show loading immediately before navigation
                    setIsNavigatingToFinale(true);
                    // Go to finale or next story part
                    navigate("/finale");
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [canNext, assetsReady, navigate]);

    const handleNext = () => {
        if (!assetsReady) return; // block interactions until assets are ready

        if (canNext) {
            setStepIndex(i => i + 1);
        } else {
            // Show loading immediately before navigation
            setIsNavigatingToFinale(true);
            // Go to finale or next story part
            navigate("/finale");
        }
    };

    const handleBack = () => {
        if (!assetsReady) return; // block interactions until assets are ready
        if (canBack) {
            setStepIndex(i => i - 1);
        } else {
            // Go back to Story3 last dialogue
            navigate("/story3", { state: { jumpToLast: true } });
        }
    };

    // Get current dialogue position
    const getCurrentDialoguePosition = () => {
        const dialogue = currentStep.dialogue;
        return getDialoguePosition(dialogue, isMobile);
    };

    return (
        <>
            {/* Custom CSS for button animations */}
            <style jsx>{`
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                }
                .animation-delay-200 { animation-delay: 200ms; }
                .animation-delay-300 { animation-delay: 300ms; }
                .animation-delay-500 { animation-delay: 500ms; }
            `}</style>
            <div className="relative min-h-screen w-full overflow-hidden text-white">
                {/* Content Container - only this area becomes flex when side-by-side */}
                <div className={`${isVocabularySideBySide ? 'flex h-screen' : ''}`}>
                    {/* Main Content Area */}
                    <div className={`${isVocabularySideBySide ? 'flex-1 min-w-0 relative pt-20' : 'w-full pt-20'}`}>
                        {/* Global loading overlay for the scene */}
                        <LoadingOverlay show={!assetsReady} label={`Preparing scene… ${progress}%`} />

                        {/* Quiz navigation overlay */}
                        {isNavigatingToQuiz && (
                            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-yellow-400 text-xl font-bold">Launching Quiz! 🚀</p>
                                </div>
                            </div>
                        )}

                        {/* Finale navigation overlay */}
                        {isNavigatingToFinale && (
                            <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-purple-400 text-xl font-bold">Loading Finale... 🎉</p>
                                </div>
                            </div>
                        )}

                        {/* Background Image - changes with dialogue */}
                        <div
                            className="absolute inset-0 -z-30 bg-cover bg-center transition-all duration-1000"
                            style={{
                                backgroundImage: `url(${BACKGROUNDS[currentBackground]})`,
                            }}
                        />

                        {/* Optional gradient overlay for better text readability */}
                        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

                        {/* Characters */}
                        {currentStep.characters && (
                            <div
                                className="absolute z-20 pointer-events-none"
                                style={currentStep.characters.position}
                            >
                                {!assetsReady ? (
                                    <div className="flex items-center justify-center" style={{ width: isMobile ? '250px' : '350px', height: isMobile ? '250px' : '350px' }}>
                                        <Spinner size={isMobile ? 40 : 60} />
                                    </div>
                                ) : (
                                    <img
                                        src={CHARACTERS[currentStep.characters.show] || CHARACTERS.both}
                                        alt="Characters"
                                        className="drop-shadow-[0_10px_40px_rgba(0,0,0,.8)]"
                                        style={{
                                            width: isMobile ? '250px' : '350px',
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
                                showNext={canNext && !currentStep.showQuizButton}
                                onNext={handleNext}
                                onBack={handleBack}
                                canBack={true}
                                loading={!assetsReady}
                            />
                        </div>

                        {/* Quiz Button - Only show on the last dialogue */}
                        {currentStep.showQuizButton && (
                            <div className="absolute z-30 flex justify-center items-center"
                                style={{
                                    bottom: isMobile ? "15vh" : "60vh",
                                    left: isMobile ? "50%" : "73%",
                                    transform: "translateX(-50%)"
                                }}>
                                <button
                                    onClick={() => {
                                        setIsNavigatingToQuiz(true);
                                        setTimeout(() => navigate("/quiz"), 200);
                                    }}
                                    onMouseEnter={() => setButtonHovered(true)}
                                    onMouseLeave={() => setButtonHovered(false)}
                                    className={`group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-full shadow-2xl transform transition-all duration-500 border-2 sm:border-4 border-yellow-300 ${buttonHovered
                                        ? 'scale-110 rotate-3 animate-pulse'
                                        : 'animate-bounce scale-100'
                                        }`}
                                    style={{
                                        background: buttonHovered
                                            ? 'linear-gradient(45deg, #FF6B6B, #FFD93D, #6BCF7F, #4D96FF)'
                                            : 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347)',
                                        boxShadow: buttonHovered
                                            ? '0 15px 35px rgba(255, 107, 107, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
                                            : '0 8px 25px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
                                        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
                                        fontFamily: 'Comic Sans MS, cursive',
                                        animation: buttonHovered ? 'rainbow 2s linear infinite' : 'bounce 2s infinite'
                                    }}
                                >
                                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                        <span className="animate-spin text-sm sm:text-base md:text-lg">🚀</span>
                                        <span className="animate-pulse">Start Quiz!</span>
                                        <span className="animate-bounce text-sm sm:text-base md:text-lg">🌟</span>
                                    </span>

                                    {/* Multiple shine effects */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform -skew-x-12 group-hover:animate-ping"></div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-l from-transparent via-yellow-200 to-transparent opacity-30 transform skew-x-12 group-hover:animate-ping animation-delay-200"></div>

                                    {/* Glow effects */}
                                    <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 rounded-full bg-pink-300 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-700"></div>

                                    {/* Sparkle effects */}
                                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-yellow-300 rounded-full animate-ping"></div>
                                    <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-pink-300 rounded-full animate-ping animation-delay-300"></div>
                                    <div className="absolute top-1/2 -right-2 sm:-right-3 md:-right-4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-300 rounded-full animate-ping animation-delay-500"></div>
                                </button>
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
        </>
    );
}