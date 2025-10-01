import React, { useState, useEffect, useRef } from 'react';

const Earth3D = () => {
    const [northImages, setNorthImages] = useState([]);
    const [southImages, setSouthImages] = useState([]);
    const [northCurrentIndex, setNorthCurrentIndex] = useState(0);
    const [southCurrentIndex, setSouthCurrentIndex] = useState(0);
    const [northIsPlaying, setNorthIsPlaying] = useState(false);
    const [southIsPlaying, setSouthIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [northPlaybackSpeed, setNorthPlaybackSpeed] = useState(8); // Speed scale 1-10
    const [southPlaybackSpeed, setSouthPlaybackSpeed] = useState(8); // Speed scale 1-10
    const northIntervalRef = useRef(null);
    const southIntervalRef = useRef(null);
    const baseUrl = 'https://services.swpc.noaa.gov';

    // Convert speed (1-10) to milliseconds (50-1000ms) - More sensitive scaling
    const speedToMs = (speed) => {
        // More dramatic speed scaling: Speed 1 = 1000ms, Speed 5 = 200ms, Speed 10 = 50ms
        // This makes higher speeds much faster than before
        const normalizedSpeed = (speed - 1) / 9; // 0 to 1
        const exponentialSpeed = Math.pow(normalizedSpeed, 0.6); // Exponential curve for more sensitivity
        return Math.round(1000 - exponentialSpeed * 950);
    };

    // Fetch NASA aurora data for both hemispheres
    const fetchAuroraData = async () => {
        try {
            setIsLoading(true);

            // Fetch both Northern and Southern hemisphere data
            const [northResponse, southResponse] = await Promise.all([
                fetch('https://services.swpc.noaa.gov/products/animations/ovation_north_24h.json'),
                fetch('https://services.swpc.noaa.gov/products/animations/ovation_south_24h.json')
            ]);

            const northData = await northResponse.json();
            const southData = await southResponse.json();

            // Reverse arrays to show recent images first
            setNorthImages(northData.reverse());
            setSouthImages(southData.reverse());
        } catch (error) {
            console.error('Error fetching aurora data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Individual play/pause for Northern Hemisphere
    const toggleNorthPlayPause = () => {
        if (northIsPlaying) {
            clearInterval(northIntervalRef.current);
            setNorthIsPlaying(false);
        } else {
            setNorthIsPlaying(true);
            northIntervalRef.current = setInterval(() => {
                setNorthCurrentIndex((prevIndex) => {
                    return (prevIndex + 1) % northImages.length;
                });
            }, speedToMs(northPlaybackSpeed));
        }
    };

    // Individual play/pause for Southern Hemisphere
    const toggleSouthPlayPause = () => {
        if (southIsPlaying) {
            clearInterval(southIntervalRef.current);
            setSouthIsPlaying(false);
        } else {
            setSouthIsPlaying(true);
            southIntervalRef.current = setInterval(() => {
                setSouthCurrentIndex((prevIndex) => {
                    return (prevIndex + 1) % southImages.length;
                });
            }, speedToMs(southPlaybackSpeed));
        }
    };

    // Reset functions
    const resetNorth = () => {
        clearInterval(northIntervalRef.current);
        setNorthIsPlaying(false);
        setNorthCurrentIndex(0);
    };

    const resetSouth = () => {
        clearInterval(southIntervalRef.current);
        setSouthIsPlaying(false);
        setSouthCurrentIndex(0);
    };

    // Speed change functions
    const handleNorthSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value);
        setNorthPlaybackSpeed(newSpeed);

        if (northIsPlaying) {
            clearInterval(northIntervalRef.current);
            northIntervalRef.current = setInterval(() => {
                setNorthCurrentIndex((prevIndex) => {
                    return (prevIndex + 1) % northImages.length;
                });
            }, speedToMs(newSpeed));
        }
    };

    const handleSouthSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value);
        setSouthPlaybackSpeed(newSpeed);

        if (southIsPlaying) {
            clearInterval(southIntervalRef.current);
            southIntervalRef.current = setInterval(() => {
                setSouthCurrentIndex((prevIndex) => {
                    return (prevIndex + 1) % southImages.length;
                });
            }, speedToMs(newSpeed));
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (northIntervalRef.current) {
                clearInterval(northIntervalRef.current);
            }
            if (southIntervalRef.current) {
                clearInterval(southIntervalRef.current);
            }
        };
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchAuroraData();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="text-center mb-3 sm:mb-4 px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">3D Aurora Forecast</h2>
                <p className="text-gray-300 text-xs sm:text-sm">Last 24 Hours - Live Data from NOAA Space Weather Prediction Center</p>
                <button
                    onClick={() => window.open('https://www.swpc.noaa.gov/products/aurora-30-minute-forecast', '_blank', 'noopener')}
                    className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base"
                >
                    Open Official Page ↗
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 h-full">
                {/* Northern Hemisphere */}
                <div className="flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center mb-3 sm:mb-4">Northern Hemisphere</h3>

                    {/* Big Northern Player */}
                    <div className="relative w-full flex-1 bg-black rounded-lg overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <img
                                    src="https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"
                                    alt="Loading Northern Aurora Forecast"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="text-white text-sm sm:text-base md:text-lg">Loading Northern Data...</div>
                                </div>
                            </div>
                        ) : northImages.length > 0 ? (
                            <>
                                <img
                                    src={baseUrl + northImages[northCurrentIndex]?.url}
                                    alt={`Northern Aurora Forecast - ${northImages[northCurrentIndex]?.time_tag}`}
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                                    {northImages[northCurrentIndex]?.time_tag ?
                                        new Date(northImages[northCurrentIndex].time_tag).toLocaleString() :
                                        'Loading...'
                                    }
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-white text-sm sm:text-base">
                                No Northern data available
                            </div>
                        )}
                    </div>

                    {/* Northern Controls */}
                    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                        <div className="flex justify-center space-x-2 sm:space-x-3">
                            <button
                                onClick={toggleNorthPlayPause}
                                className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${northIsPlaying
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                                disabled={isLoading || northImages.length === 0}
                            >
                                {northIsPlaying ? '⏸️ Pause' : '▶️ Play'}
                            </button>
                            <button
                                onClick={resetNorth}
                                className="px-3 sm:px-4 md:px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm"
                                disabled={isLoading || northImages.length === 0}
                            >
                                🔄 Reset
                            </button>
                        </div>
                        <div className="max-w-xs mx-auto">
                            <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-center">
                                Speed: {northPlaybackSpeed}/10
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={northPlaybackSpeed}
                                onChange={handleNorthSpeedChange}
                                className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Slow</span>
                                <span>Fast</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Southern Hemisphere */}
                <div className="flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center mb-3 sm:mb-4">Southern Hemisphere</h3>

                    {/* Big Southern Player */}
                    <div className="relative w-full flex-1 bg-black rounded-lg overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <img
                                    src="https://services.swpc.noaa.gov/images/animations/ovation/south/latest.jpg"
                                    alt="Loading Southern Aurora Forecast"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="text-white text-sm sm:text-base md:text-lg">Loading Southern Data...</div>
                                </div>
                            </div>
                        ) : southImages.length > 0 ? (
                            <>
                                <img
                                    src={baseUrl + southImages[southCurrentIndex]?.url}
                                    alt={`Southern Aurora Forecast - ${southImages[southCurrentIndex]?.time_tag}`}
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                                    {southImages[southCurrentIndex]?.time_tag ?
                                        new Date(southImages[southCurrentIndex].time_tag).toLocaleString() :
                                        'Loading...'
                                    }
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-white text-sm sm:text-base">
                                No Southern data available
                            </div>
                        )}
                    </div>

                    {/* Southern Controls */}
                    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                        <div className="flex justify-center space-x-2 sm:space-x-3">
                            <button
                                onClick={toggleSouthPlayPause}
                                className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${southIsPlaying
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                                disabled={isLoading || southImages.length === 0}
                            >
                                {southIsPlaying ? '⏸️ Pause' : '▶️ Play'}
                            </button>
                            <button
                                onClick={resetSouth}
                                className="px-3 sm:px-4 md:px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm"
                                disabled={isLoading || southImages.length === 0}
                            >
                                🔄 Reset
                            </button>
                        </div>
                        <div className="max-w-xs mx-auto">
                            <label className="block text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-center">
                                Speed: {southPlaybackSpeed}/10
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={southPlaybackSpeed}
                                onChange={handleSouthSpeedChange}
                                className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Slow</span>
                                <span>Fast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earth3D;