import { useState, useEffect } from "react";
import { useImagePreload } from "../hooks/useImagePreload";
import Spinner from "./ui/Spinner";

export default function TVScreen({
    slides = [],
    currentSlideIndex = 0,
    isVisible = false,
    position = { top: "20%", left: "50%", transform: "translateX(-50%)" },
    size = { width: "60%", height: "40%" }
}) {
    const [isLoading, setIsLoading] = useState(true);

    // Preload all slide images
    const slideUrls = slides.map(slide => slide.image);
    const { done: imagesLoaded, progress } = useImagePreload(slideUrls);

    useEffect(() => {
        if (imagesLoaded) {
            setIsLoading(false);
        }
    }, [imagesLoaded]);

    if (!isVisible || slides.length === 0) return null;

    const currentSlide = slides[currentSlideIndex];

    return (
        <div
            className="absolute z-20 pointer-events-none"
            style={{
                ...position,
                width: size.width,
                height: size.height,
            }}
        >
            {/* TV Frame */}
            <div className="relative w-full h-full">
                {/* TV Screen Background */}
                <div className="w-full h-full bg-black rounded-lg border-4 border-gray-600 shadow-2xl">
                    {/* TV Screen Content */}
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="text-center">
                                    <Spinner size={40} className="text-white mb-2" />
                                    <p className="text-white text-sm">Loading presentation...</p>
                                </div>
                            </div>
                        ) : currentSlide ? (
                            <>
                                {/* Slide Image */}
                                <img
                                    src={currentSlide.image}
                                    alt={currentSlide.alt || `Slide ${currentSlideIndex + 1}`}
                                    className="w-full h-full object-contain"
                                />

                                {/* Slide Number Indicator */}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {currentSlideIndex + 1} / {slides.length}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-white">
                                <p>No slide available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* TV Stand/Base */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-600 rounded-b-lg"></div>

                {/* Optional TV Antenna */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-1 h-4 bg-gray-400"></div>
                    <div className="w-1 h-4 bg-gray-400"></div>
                </div>
            </div>
        </div>
    );
}
