import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Spinner from "./ui/Spinner";

export default function VocabularyCard({ word, explanation, media = [], showMore }) {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [imageLoadingStates, setImageLoadingStates] = useState({});
    const hasMultipleMedia = media.length > 1;

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const handleImageLoad = (index) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [index]: 'loaded'
        }));
    };

    const handleImageError = (index) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [index]: 'error'
        }));
    };

    const isImageLoading = (index) => {
        return imageLoadingStates[index] === undefined || imageLoadingStates[index] === 'loading';
    };

    // Initialize loading state for current media when it changes
    useEffect(() => {
        if (media.length > 0 && media[currentMediaIndex]?.type === 'image') {
            setImageLoadingStates(prev => ({
                ...prev,
                [currentMediaIndex]: 'loading'
            }));
        }
    }, [currentMediaIndex, media]);

    const renderMedia = (mediaItem, index) => {
        if (mediaItem.type === "image") {
            const isLoading = isImageLoading(index);

            return (
                <div key={index} className="relative">
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
                            <Spinner size={32} className="text-fuchsia-300" />
                        </div>
                    )}

                    {/* Image */}
                    <img
                        src={mediaItem.src}
                        alt={mediaItem.alt}
                        className={`w-full h-32 sm:h-40 object-cover rounded-lg transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                            handleImageError(index);
                            e.target.style.display = 'none';
                        }}
                    />

                    {/* External Link */}
                    {mediaItem.externalLink && !isLoading && (
                        <div className="mt-2">
                            <span className="text-xs text-white/70">Source: </span>
                            <a
                                href={mediaItem.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-fuchsia-300 hover:text-fuchsia-200 underline transition-colors"
                            >
                                {mediaItem.sourceText || "View full image"}
                            </a>
                        </div>
                    )}
                </div>
            );
        } else if (mediaItem.type === "video") {
            return (
                <div key={index}>
                    <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden">
                        <iframe
                            src={mediaItem.src}
                            title={mediaItem.title || "Video"}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {mediaItem.externalLink && (
                        <div className="mt-2 ">
                            <span className="text-xs text-white/70">Source: </span>
                            <a
                                href={mediaItem.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-fuchsia-300 hover:text-fuchsia-200 underline transition-colors"
                            >
                                {mediaItem.sourceText || "View full video"}
                            </a>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-4 border border-white/20 shadow-lg">
            {/* Word Title */}
            <h3 className="text-sm sm:text-lg font-bold text-white mb-2 capitalize">{word}</h3>

            {/* Media Carousel */}
            {media.length > 0 && (
                <div className="relative mb-3">
                    <div className="overflow-hidden rounded-lg">
                        {renderMedia(media[currentMediaIndex], currentMediaIndex)}
                    </div>

                    {/* Carousel Navigation */}
                    {hasMultipleMedia && (
                        <>
                            <button
                                onClick={prevMedia}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                                aria-label="Previous media"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextMedia}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                                aria-label="Next media"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Media Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                {media.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentMediaIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                        aria-label={`Go to media ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Explanation */}
            <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3 leading-relaxed">{explanation}</p>

            {/* Show More Button */}
            {showMore && (
                <a
                    href={showMore.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-fuchsia-300 hover:text-fuchsia-200 transition-colors"
                >
                    {showMore.text}
                    <ExternalLink className="w-3 h-3" />
                </a>
            )}
        </div>
    );
}
