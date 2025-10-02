import { useState, useEffect, useMemo } from "react";
import { X, BookOpen, Sparkles, Sidebar, Maximize2 } from "lucide-react";
import VocabularyCard from "./VocabularyCard";
import Spinner from "./ui/Spinner";
import { useImagePreload } from "../hooks/useImagePreload";

export default function VocabularySlider({ vocabulary = [], isVisible = false, onLayoutChange, isLoading = false }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSideBySide, setIsSideBySide] = useState(false);

    // Extract image URLs from vocabulary for preloading
    const imageUrls = useMemo(() => {
        return vocabulary
            .flatMap(item => item.media || [])
            .filter(media => media.type === 'image')
            .map(media => media.src)
            .filter(Boolean);
    }, [vocabulary]);

    // Preload images
    const { done: imagesLoaded, progress: imageProgress } = useImagePreload(imageUrls);

    const handleLayoutToggle = () => {
        const newSideBySide = !isSideBySide;
        setIsSideBySide(newSideBySide);
        onLayoutChange?.(newSideBySide);
    };

    // Close slider when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isExpanded && !isSideBySide) {
                const slider = event.target.closest('[data-vocabulary-slider]');
                if (!slider) {
                    setIsExpanded(false);
                }
            }
        };

        if (isExpanded && !isSideBySide) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isExpanded, isSideBySide]);

    if (!vocabulary.length || !isVisible) return null;

    const containerPos = isSideBySide ? "relative" : "fixed right-0 top-0";
    const containerSize = isSideBySide ? "h-full" : "h-full";
    const expandedWidth = "w-80 sm:w-96";
    const collapsedWidth = "w-0";

    return (
        <>
            {isExpanded && !isSideBySide && (
                <div
                    className="fixed inset-0  z-20 transition-opacity duration-300"
                    aria-hidden
                />
            )}

            <div
                data-vocabulary-slider
                className={[
                    containerPos,
                    containerSize,
                    "z-30 transition-all duration-300 ease-in-out",
                    isExpanded ? expandedWidth : collapsedWidth,
                ].join(" ")}
            >
                <div
                    className={[
                        "relative h-full bg-gradient-to-b from-slate-900/95 to-black/95",
                        "border-l border-white/20 shadow-2xl",
                        "transition-transform duration-300",
                        isExpanded ? "translate-x-0" : "translate-x-full",
                    ].join(" ")}
                >
                    <div className=" flex items-center justify-between p-3 sm:p-4 border-b border-white/20 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20">
                        <div className="flex items-center gap-2 mt-12">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-300" />
                            <h2 className="text-sm sm:text-lg font-bold text-white">Know More</h2>
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                        </div>

                        <div className="flex items-center gap-1 mt-12">
                            <button
                                onClick={handleLayoutToggle}
                                className={[
                                    "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105",
                                    isSideBySide
                                        ? "text-fuchsia-300 hover:text-fuchsia-200 bg-fuchsia-500/20 hover:bg-fuchsia-500/30"
                                        : "text-white/70 hover:text-white hover:bg-white/10",
                                ].join(" ")}
                                aria-label={isSideBySide ? "Switch to overlay mode" : "Switch to side-by-side mode"}
                                title={isSideBySide ? "Overlay mode" : "Side-by-side mode"}
                            >
                                {isSideBySide ? (
                                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                ) : (
                                    <Sidebar className="w-4 h-4 sm:w-5 sm:h-5" />
                                )}
                                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                                    {isSideBySide ? "Overlay" : "Split View"}
                                </span>
                            </button>

                            <button
                                onClick={() => setIsExpanded((v) => !v)}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110"
                                aria-label={isExpanded ? "Collapse vocabulary" : "Expand vocabulary"}
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="h-full overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
                        {isLoading || (!imagesLoaded && imageUrls.length > 0) ? (
                            <div className="flex items-center justify-center h-32">
                                <div className="text-center">
                                    <Spinner size={48} className="text-fuchsia-300 mx-auto mb-4" />
                                    <p className="text-white/70 text-sm">
                                        {isLoading ? 'Loading vocabulary...' : `Loading images... ${imageProgress}%`}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            vocabulary.map((item, index) => (
                                <VocabularyCard
                                    key={`${item.word}-${index}`}
                                    word={item.word}
                                    explanation={item.explanation}
                                    media={item.media}
                                    showMore={item.showMore}
                                />
                            ))
                        )}
                    </div>
                </div>

                {!isExpanded && (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className={` absolute right-0 top-1/3 -translate-y-1/2 ${isSideBySide ? '-left-10 sm:-left-24' : '-left-16 sm:-left-24'
                            } bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-400 hover:to-purple-400 text-white p-4 sm:p-5 rounded-l-xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-fuchsia-500/25 group`}
                        aria-label="Show vocabulary"
                    >
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 group-hover:animate-pulse" />
                            <span className="hidden sm:block text-sm font-semibold"></span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/80 rounded-full flex items-center justify-center">
                            {isSideBySide ? (
                                <Sidebar className="w-1 h-1 text-fuchsia-500" />
                            ) : (
                                <Maximize2 className="w-1 h-1 text-fuchsia-500" />
                            )}
                        </div>
                    </button>
                )}
            </div>
        </>
    );
}