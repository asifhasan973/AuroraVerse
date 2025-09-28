import { useMemo } from "react";
import { getVocabularyForStory } from "../data/vocabulary";

/**
 * Universal vocabulary hook for all story pages
 * @param {string} storyName - The story name (e.g., 'start', 'story2', 'story3')
 * @param {string|number} dialogueKey - The dialogue key or index
 * @param {boolean} isVisible - Whether the vocabulary should be visible
 * @returns {Object} - { vocabulary, hasVocabulary }
 */
export const useVocabulary = (storyName, dialogueKey, isVisible = true) => {
    const vocabulary = useMemo(() => {
        if (!isVisible) return [];

        // Handle different dialogue key formats
        let key = dialogueKey;

        // If it's a number, convert to dialogue key format
        if (typeof dialogueKey === 'number') {
            const dialogueKeys = {
                'start': ['garden-1', 'garden-2', 'garden-3', 'garden-4', 'garden-5', 'garden-6', 'garden-7', 'take-off'],
                'story2': ['dialogue-1', 'dialogue-2', 'dialogue-3'],
                'story3': ['intro-calm', 'but-not-always', 'tap-instruction', 'sun-angry-explain', 'storms-named', 'storms-travel', 'child-question', 'explain-flare', 'explain-cme'],
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
