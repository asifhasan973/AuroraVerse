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
    bg7: "/images/Story4/7.png",
    bg8: "/images/Story4/8.png",
    bg9: "/images/Story4/9.png",
    bg10: "/images/Story4/10.png",
    bg11: "/images/Story4/11.png",
    bg12: "/images/Story4/screen_white.png",

};

// 👥 Character images
const CHARACTERS = {
    astro: "/images/Story4/astro.png",
    child: "/images/Story4/child.png",
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
        id: "intro",
        background: "bg0",
        dialogue: {
            speaker: "astro",
            text: "Solar storms can also shake up our spacecraft.That’s why we hide inside a storm shelter in our spacecraft to stay safe.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "spacecraft-storms",
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
        id: "child-question",
        background: "bg0", // Same background as previous (no change)
        dialogue: {
            speaker: "astro",
            text: "A storm shelter is like a super-safe hideout where you can stay safe from big storms, just like a superhero’s secret base!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "storm-shelter",
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
        id: "storm-shelter2",
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
        id: "equipment-damage",
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
        id: "equipment-damage2",
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
        id: "engineers-solution",
        background: "bg1", // space craft sloution background
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
        id: "satellite-effects",
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
        id: "gps-problems",
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
        id: "monitoring",
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
        id: "finale",
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
        id: "finale2",
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
        id: "finale3",
        background: "bg8", // power grid 
        dialogue: {
            speaker: "astro",
            text: "Mass people can’t talk on mobile phones and lose network connection. And power grids can even fail!",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
    },
    {
        id: "finale4",
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
        id: "conclusion",
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
        id: "conclusion2",
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
        id: "conclusion3",
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
        id: "conclusion4",
        background: "bg5",
        dialogue: {
            speaker: "astro",
            text: "These are beautiful lights in the sky when solar particles meet Earth’s atmosphere and magnetic field.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },
        
    },
    {
        id: "conclusion4",
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
        id: "conclusion5",
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
        id: "conclusion6",
        background: "bg12",
        dialogue: {
            speaker: "astro",
            text: "Of course, But you need to give an exciting quiz first then you can create your own aurora.",
        },
        characters: {
            show: "both",
            position: { bottom: "10vh", left: "25%" },
        },

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
    const [currentBackground, setCurrentBackground] = useState("bg1");
    const [isVocabularySideBySide, setIsVocabularySideBySide] = useState(false);

    const navigate = useNavigate();
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 768;

    // Preload all scene assets (backgrounds + character images)
    const preloadUrls = [
        ...Object.values(BACKGROUNDS),
        ...Object.values(CHARACTERS),
    ];
    const { done: assetsReady, progress } = useImagePreload(preloadUrls);

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

    const handleNext = () => {
        if (!assetsReady) return; // block interactions until assets are ready

        if (canNext) {
            setStepIndex(i => i + 1);
        } else {
            // Go to finale or next story part
            navigate("/finale");
        }
    };

    const handleBack = () => {
        if (!assetsReady) return; // block interactions until assets are ready
        if (canBack) {
            setStepIndex(i => i - 1);
        } else {
            // Go back to Story3
            navigate("/story3", { state: { jumpToLast: true } });
        }
    };

    // Get current dialogue position
    const getCurrentDialoguePosition = () => {
        const dialogue = currentStep.dialogue;
        return getDialoguePosition(dialogue, isMobile);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white">
            {/* Content Container - only this area becomes flex when side-by-side */}
            <div className={`${isVocabularySideBySide ? 'flex h-screen' : ''}`}>
                {/* Main Content Area */}
                <div className={`${isVocabularySideBySide ? 'flex-1 min-w-0 relative pt-20' : 'w-full pt-20'}`}>
                    {/* Global loading overlay for the scene */}
                    <LoadingOverlay show={!assetsReady} label={`Preparing scene… ${progress}%`} />

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
                            width={isMobile ? "90%" : 600}
                            maxWidth={600}
                            position={getCurrentDialoguePosition()}
                            anchorCenterX={true}
                            showNext={canNext}
                            onNext={handleNext}
                            onBack={handleBack}
                            canBack={true}
                            loading={!assetsReady}
                        />
                    </div>

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