import { useMemo } from "react";
import { getVocabularyForStory } from "../data/vocabulary";

export const useVocabulary = (storyName, dialogueKey, isVisible = true) => {
    const vocabulary = useMemo(() => {
        if (!isVisible) return [];

        let key = dialogueKey;

        if (typeof dialogueKey === 'number') {
            const dialogueKeys = {
                'start': ['garden-1', 'garden-2', 'garden-3', 'garden-4', 'garden-5', 'garden-6', 'garden-7', 'take-off'],
                'story2': ['dialogue-1', 'dialogue-2', 'dialogue-3'],
                'story3': ['intro-calm', 'but-not-always', 'tap-instruction', 'sun-angry-explain', 'storms-named', 'storms-travel', 'child-question', 'explain-flare', 'explain-cme', 'solar-storms-harm-warning'],
                'story4': ['solar-storms-spacecraft-intro', 'child-asks-about-storm-shelter', 'explain-storm-shelter-superhero', 'ask-to-see-solar-storm-power', 'child-excited-to-see-storm', 'explain-storm-effects-computers', 'radiation-damages-electronics', 'engineers-build-protections', 'storms-affect-satellites', 'gps-communication-problems', 'nasa-monitors-sun-24-7', 'safe-space-exploration', 'pilots-fishermen-navigation-problems', 'mobile-phones-power-grid-failures', 'engineers-preventive-measures', 'child-fears-sun', 'sun-creates-magical-auroras', 'child-asks-about-aurora', 'explain-aurora-formation', 'ask-to-make-aurora', 'child-excited-about-making-aurora', 'quiz-before-aurora-creation'],
            };
            key = dialogueKeys[storyName]?.[dialogueKey] || `dialogue-${dialogueKey + 1}`;
        }

        return getVocabularyForStory(storyName, key);
    }, [storyName, dialogueKey, isVisible]);

    const hasVocabulary = vocabulary.length > 0;

    return {
        vocabulary,
        hasVocabulary
    };
};
