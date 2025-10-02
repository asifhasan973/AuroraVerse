import { useState, useEffect, useRef, useCallback } from 'react';

export default function StormSafe() {
    const [gameState, setGameState] = useState('menu');
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedArea, setSelectedArea] = useState(null);
    const [isShaking, setIsShaking] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [stormAlarm, setStormAlarm] = useState(false);
    const [astronautPosition, setAstronautPosition] = useState('center');
    const [astronautAnimation, setAstronautAnimation] = useState('idle');
    const [stormIntensity, setStormIntensity] = useState(0);
    const [particles, setParticles] = useState([]);
    const [spacecraftRotation, setSpacecraftRotation] = useState(0);
    const [warningLights, setWarningLights] = useState(false);
    const [shelterGlow, setShelterGlow] = useState(false);
    const [areaPositions, setAreaPositions] = useState({});
    const [isMoving, setIsMoving] = useState(false);
    const [shuffledAreas, setShuffledAreas] = useState([]);

    const animationRef = useRef(null);
    const mountedRef = useRef(true);
    const lastTime = useRef(0);
    const gameAreaRef = useRef(null);
    const positionRef = useRef({});

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const spacecraftAreas = [
        { id: 'cockpit', name: 'Cockpit', icon: '🚀', width: 100, height: 80 },
        { id: 'window', name: 'Observation Window', icon: '🪟', width: 120, height: 90 },
        { id: 'storage', name: 'Storage Room', icon: '📦', width: 110, height: 85 },
        { id: 'shelter', name: 'Storm Shelter', icon: '🛡️', width: 130, height: 95, correct: true },
        { id: 'lab', name: 'Science Lab', icon: '🔬', width: 120, height: 90 },
        { id: 'engine', name: 'Engine Room', icon: '⚙️', width: 125, height: 85 },
    ];

    const shuffleArray = useCallback((array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // Initialize positions with proper shuffling
    const initializePositions = useCallback(() => {
        if (!gameAreaRef.current) return;

        const container = gameAreaRef.current;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const padding = 60;
        const newPositions = {};

        // Shuffle the areas first
        const shuffled = shuffleArray(spacecraftAreas);
        setShuffledAreas(shuffled);

        shuffled.forEach((area, index) => {
            // Create a grid-like pattern but with random variations
            const cols = 3;
            const rows = 2;
            const col = index % cols;
            const row = Math.floor(index / cols);

            // Base position in grid
            const baseX = (containerWidth / cols) * col + (containerWidth / cols - area.width) / 2;
            const baseY = (containerHeight / rows) * row + (containerHeight / rows - area.height) / 2;

            // Add random variation to make it look shuffled
            const randomOffsetX = (Math.random() - 0.5) * 80;
            const randomOffsetY = (Math.random() - 0.5) * 60;

            const x = Math.max(padding, Math.min(containerWidth - area.width - padding, baseX + randomOffsetX));
            const y = Math.max(padding, Math.min(containerHeight - area.height - padding, baseY + randomOffsetY));

            // Random velocity for movement with varied speeds
            const speed = 0.3 + Math.random() * 0.4; // Varied speeds for more natural movement
            const angle = Math.random() * Math.PI * 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            newPositions[area.id] = {
                x,
                y,
                vx,
                vy,
                targetX: x,
                targetY: y,
                smoothX: x,
                smoothY: y
            };
        });

        setAreaPositions(newPositions);
        positionRef.current = newPositions;
    }, [spacecraftAreas, shuffleArray]);

    // Smoother movement with interpolation
    const moveAreas = useCallback((deltaTime) => {
        if (!gameAreaRef.current) return;

        const container = gameAreaRef.current;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const padding = 50;
        const deltaSeconds = deltaTime / 1000; // Convert to seconds
        const smoothingFactor = 0.15; // For interpolation

        setAreaPositions(prev => {
            const next = {};
            spacecraftAreas.forEach(area => {
                const current = prev[area.id];
                if (!current) return;

                let { x, y, vx, vy, smoothX = x, smoothY = y } = current;

                // Apply smooth movement based on delta time
                x += vx * deltaSeconds * 60; // 60 for 60fps baseline
                y += vy * deltaSeconds * 60;

                // Smooth boundary collision with better physics
                const dampening = 0.95;
                const bounceRandomness = 0.1;

                if (x <= padding) {
                    x = padding;
                    vx = Math.abs(vx) * dampening + (Math.random() - 0.5) * bounceRandomness;
                } else if (x >= containerWidth - area.width - padding) {
                    x = containerWidth - area.width - padding;
                    vx = -Math.abs(vx) * dampening + (Math.random() - 0.5) * bounceRandomness;
                }

                if (y <= padding) {
                    y = padding;
                    vy = Math.abs(vy) * dampening + (Math.random() - 0.5) * bounceRandomness;
                } else if (y >= containerHeight - area.height - padding) {
                    y = containerHeight - area.height - padding;
                    vy = -Math.abs(vy) * dampening + (Math.random() - 0.5) * bounceRandomness;
                }

                // Add subtle orbital movement for more natural feel
                const time = Date.now() * 0.001;
                const orbitInfluence = 0.05;
                vx += Math.sin(time + area.id.charCodeAt(0)) * orbitInfluence;
                vy += Math.cos(time + area.id.charCodeAt(0)) * orbitInfluence;

                // Clamp velocities to prevent too fast movement
                const maxSpeed = 1.5;
                const currentSpeed = Math.sqrt(vx * vx + vy * vy);
                if (currentSpeed > maxSpeed) {
                    vx = (vx / currentSpeed) * maxSpeed;
                    vy = (vy / currentSpeed) * maxSpeed;
                }

                // Smooth interpolation for display positions
                smoothX += (x - smoothX) * smoothingFactor;
                smoothY += (y - smoothY) * smoothingFactor;

                next[area.id] = {
                    x,
                    y,
                    vx,
                    vy,
                    smoothX,
                    smoothY
                };
            });

            positionRef.current = next;
            return next;
        });
    }, [spacecraftAreas]);

    // Optimized particle creation
    const createParticle = useCallback(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: -5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.8 + 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        color: Math.random() > 0.5 ? '#ff6b6b' : '#4ecdc4',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
    }), []);

    // High-performance animation loop with proper frame timing
    useEffect(() => {
        if (gameState !== 'playing') return;

        let previousTime = performance.now();
        let particleTimer = 0;

        const animate = (currentTime) => {
            if (!mountedRef.current) return;

            const deltaTime = Math.min(currentTime - previousTime, 33.33); // Cap at 30fps minimum
            previousTime = currentTime;

            // Move areas with delta time for smooth movement
            if (isMoving && !showResult) {
                moveAreas(deltaTime);
            }

            // Update particles with delta time
            particleTimer += deltaTime;
            if (stormIntensity > 0) {
                setParticles(prev => {
                    const updated = prev
                        .map(p => ({
                            ...p,
                            x: p.x + p.vx * deltaTime * 0.06,
                            y: p.y + p.vy * deltaTime * 0.06,
                            opacity: p.opacity - 0.001 * deltaTime * 0.06,
                            rotation: p.rotation + p.rotationSpeed * deltaTime * 0.06
                        }))
                        .filter(p => p.y < 105 && p.opacity > 0);

                    // Add new particles based on timer
                    if (particleTimer > 100 && updated.length < 20 && Math.random() < stormIntensity * 0.3) {
                        updated.push(createParticle());
                        particleTimer = 0;
                    }

                    return updated;
                });
            }

            // Update spacecraft rotation smoothly
            if (isShaking) {
                setSpacecraftRotation(prev => {
                    const targetRotation = (Math.sin(currentTime * 0.01) * 2);
                    return prev + (targetRotation - prev) * 0.1;
                });
            } else {
                setSpacecraftRotation(prev => prev * 0.95); // Smooth return to normal
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [gameState, isMoving, showResult, stormIntensity, isShaking, moveAreas, createParticle]);

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (gameState === 'playing') {
                initializePositions();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [gameState, initializePositions]);

    // Timer effect
    useEffect(() => {
        if (gameState !== 'playing' || showResult) return;
        if (timeLeft <= 0) {
            handleWrongAnswer('Time is up! The storm hits!');
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [gameState, showResult, timeLeft]);

    // Warning lights effect
    useEffect(() => {
        if (!stormAlarm) return;
        const interval = setInterval(() => setWarningLights(p => !p), 400);
        return () => clearInterval(interval);
    }, [stormAlarm]);

    const startGame = () => {
        setGameState('playing');
        setLives(3);
        setScore(0);
        setRound(1);
        setTimeLeft(15);
        setSelectedArea(null);
        setShowResult(false);
        setIsShaking(false);
        setStormAlarm(true);
        setStormIntensity(0.3);
        setAstronautAnimation('warning');
        setParticles([]);
        setSpacecraftRotation(0);
        setWarningLights(false);
        setShelterGlow(false);
        setAstronautPosition('center');
        setIsMoving(true);

        // Initialize positions after a short delay to ensure container is ready
        setTimeout(() => {
            initializePositions();
        }, 100);
    };

    const handleAreaClick = (area) => {
        if (selectedArea || showResult || gameState !== 'playing') return;
        setSelectedArea(area.id);
        setAstronautAnimation('pointing');
        if (area.correct) handleCorrectAnswer();
        else handleWrongAnswer('Wrong choice! The storm hits!');
    };

    const handleCorrectAnswer = () => {
        setIsCorrect(true);
        setResultMessage('Safe! Great job protecting the crew!');
        setScore(s => s + 10 * round);
        setShowResult(true);
        setStormAlarm(false);
        setStormIntensity(0);
        setAstronautAnimation('thumbsup');
        setShelterGlow(true);
        setAstronautPosition('shelter');
        setIsMoving(false);

        setTimeout(() => {
            if (!mountedRef.current) return;
            nextRound();
        }, 2000);
    };

    const handleWrongAnswer = (msg) => {
        setIsCorrect(false);
        setResultMessage(msg);
        setLives(prevLives => {
            const newLives = prevLives - 1;
            setIsShaking(true);
            setShowResult(true);
            setStormAlarm(false);
            setStormIntensity(0.8);
            setAstronautAnimation('panic');
            setAstronautPosition('center');
            setIsMoving(false);

            setTimeout(() => {
                if (!mountedRef.current) return;
                setIsShaking(false);
                setStormIntensity(0);
                if (newLives <= 0) setGameState('gameOver');
                else nextRound();
            }, 2000);
            return newLives;
        });
    };

    const nextRound = () => {
        if (round >= 5) {
            setGameState('victory');
            return;
        }
        setRound(r => {
            const newRound = r + 1;
            setTimeLeft(Math.max(8, 15 - r * 2));
            setSelectedArea(null);
            setShowResult(false);
            setStormAlarm(true);
            setStormIntensity(0.3 + r * 0.1);
            setAstronautAnimation('warning');
            setAstronautPosition('center');
            setShelterGlow(false);
            setIsMoving(true);

            // Shuffle and reposition areas for new round
            setTimeout(() => {
                initializePositions();
            }, 100);

            return newRound;
        });
    };

    const restartGame = () => {
        setGameState('menu');
        setSelectedArea(null);
        setShowResult(false);
        setIsShaking(false);
        setStormAlarm(false);
        setStormIntensity(0);
        setAstronautAnimation('idle');
        setAstronautPosition('center');
        setParticles([]);
        setSpacecraftRotation(0);
        setWarningLights(false);
        setShelterGlow(false);
        setIsMoving(false);
    };

    const renderMenu = () => (
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
            <div className="space-y-6">
                <div className="relative">
                    <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                        StormSafe
                    </h1>
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🚀</div>
                </div>
                <div className="space-y-4">
                    <p className="text-xl md:text-2xl text-gray-200 font-semibold">A solar storm is approaching!</p>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Help the astronaut find the safest place to hide during the solar storm.
                        The components will move around - click on the Storm Shelter before time runs out!
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="text-6xl animate-bounce">👨‍🚀</div>
                </div>
            </div>

            <div className="space-y-6">
                <button
                    onClick={startGame}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
                >
                    🚀 Launch Mission
                </button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm text-gray-300">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="font-semibold">Find Storm Shelter</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-2xl mb-2">❤️</div>
                        <p className="font-semibold">3 Lives</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-2xl mb-2">⏰</div>
                        <p className="font-semibold">Time Challenge</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-2xl mb-2">🏆</div>
                        <p className="font-semibold">5 Rounds</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGame = () => (
        <div className="h-screen w-screen relative overflow-hidden">
            {/* Header - Overlay on top */}
            <div className="pt-20 absolute top-0 left-0 right-0 z-50 flex justify-between items-center backdrop-blur-md p-4 border-b border-white/10">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-red-400 text-xl">❤️</span>
                        <span className="text-white font-bold text-xl">{lives}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span className="text-white font-bold text-xl">{score}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-blue-400 text-sm">Round</span>
                        <span className="text-white font-bold text-xl">{round}/5</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-orange-400 text-xl">⏰</span>
                    <span className={`text-white font-bold text-xl ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : ''}`}>
                        {timeLeft}
                    </span>
                </div>
            </div>

            {/* Astronaut Message - Overlay on top */}
            <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 z-50 text-center p-4 bg-gradient-to-r from-blue-900/80 to-purple-900/80 rounded-xl border-2 backdrop-blur-sm ${stormAlarm ? 'border-red-500 animate-pulse shadow-red-500/50 shadow-lg' : 'border-blue-500'
                }`}>
                <div className={`text-4xl mb-2 transition-all duration-500 ${astronautAnimation === 'warning' ? 'animate-bounce' :
                    astronautAnimation === 'pointing' ? 'animate-pulse' :
                        astronautAnimation === 'thumbsup' ? 'animate-bounce' :
                            astronautAnimation === 'panic' ? 'animate-pulse' : ''
                    }`}>
                    {astronautAnimation === 'thumbsup' ? '👍' : '👨‍🚀'}
                </div>
                <p className="text-lg text-white font-semibold mb-1">
                    "Where do we hide during a solar storm?"
                </p>
                {stormAlarm && (
                    <p className="text-red-400 font-bold text-sm animate-pulse">
                        ⚠️ STORM ALERT! ⚠️
                    </p>
                )}
            </div>

            {/* Full Screen Game Area */}
            <div
                ref={gameAreaRef}
                className="h-screen w-screen absolute inset-0 bg-gradient-to-br from-gray-800/30 to-blue-900/30 overflow-hidden"
                style={{
                    transform: isShaking ? `rotate(${spacecraftRotation}deg)` : 'none',
                    transition: 'none' // Remove transition for smoother animation
                }}
            >
                {/* Background particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full pointer-events-none z-10"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size * 2}px`,
                            height: `${p.size * 2}px`,
                            backgroundColor: p.color,
                            opacity: p.opacity,
                            transform: `rotate(${p.rotation}deg)`,
                        }}
                    />
                ))}

                {/* Moving Spacecraft Areas - Using transform for smoother movement */}
                {shuffledAreas.map((area) => {
                    const pos = areaPositions[area.id];
                    if (!pos) return null;

                    const isSelected = selectedArea === area.id;
                    const correct = !!area.correct;
                    const pickedWrong = isSelected && !correct;
                    const pickedRight = isSelected && correct;
                    const glowShelter = shelterGlow && correct && !selectedArea;

                    return (
                        <button
                            key={area.id}
                            onClick={() => handleAreaClick(area)}
                            disabled={!!selectedArea || showResult}
                            className={`absolute rounded-xl border-2 z-20 ${pickedRight
                                ? 'border-green-400 bg-green-500/30 shadow-green-400/50 shadow-xl'
                                : pickedWrong
                                    ? 'border-red-400 bg-red-500/30 shadow-red-400/50 shadow-xl'
                                    : glowShelter
                                        ? 'border-green-400 bg-green-500/20 shadow-green-400/30 shadow-lg animate-pulse'
                                        : 'border-gray-500 bg-gray-700/50 hover:border-blue-400 hover:bg-blue-600/30'
                                } ${selectedArea ? 'opacity-50' : 'opacity-100'}`}
                            style={{
                                transform: `translate(${pos.smoothX}px, ${pos.smoothY}px)`,
                                width: area.width,
                                height: area.height,
                                transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
                                willChange: 'transform',
                                background: pickedRight
                                    ? 'linear-gradient(135deg, #10b981, #059669)'
                                    : pickedWrong
                                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                        : glowShelter
                                            ? 'linear-gradient(135deg, #10b981, #059669)'
                                            : 'linear-gradient(135deg, #374151, #4b5563)',
                            }}
                            aria-label={area.name}
                        >
                            <div className="flex flex-col items-center justify-center h-full text-white p-2 transition-transform duration-200 hover:scale-110">
                                <div className="text-2xl mb-1">{area.icon}</div>
                                <div className="text-xs font-semibold text-center leading-tight">
                                    {area.name}
                                </div>
                            </div>
                        </button>
                    );
                })}

                {/* Astronaut at shelter */}
                {astronautPosition === 'shelter' && areaPositions.shelter && (
                    <div
                        className="absolute text-3xl animate-bounce pointer-events-none z-30"
                        style={{
                            transform: `translate(${areaPositions.shelter.smoothX + 65}px, ${areaPositions.shelter.smoothY - 20}px)`
                        }}
                    >
                        👨‍🚀
                    </div>
                )}
            </div>

            {/* Result Display - Overlay */}
            {showResult && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 text-center p-4 rounded-xl border-2 backdrop-blur-sm ${isCorrect
                    ? 'bg-green-900/80 border-green-400 shadow-green-400/30 shadow-xl'
                    : 'bg-red-900/80 border-red-400 shadow-red-400/30 shadow-xl'
                    }`}>
                    <div className="text-4xl mb-2 animate-bounce">
                        {isCorrect ? '✅' : '❌'}
                    </div>
                    <p className={`text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {resultMessage}
                    </p>
                </div>
            )}
        </div>
    );

    const renderGameOver = () => (
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
            <div className="space-y-6">
                <div className="text-8xl animate-bounce">😢</div>
                <h2 className="text-5xl font-bold text-red-400 animate-pulse">Game Over</h2>
                <p className="text-2xl text-gray-300">
                    The solar storm was too strong! The crew couldn't find safety in time.
                </p>
                <div className="text-2xl text-yellow-400 font-bold">Final Score: {score} points</div>
                <div className="text-lg text-gray-400">👨‍🚀 "We need to be faster next time..."</div>
            </div>
            <button
                onClick={restartGame}
                className="px-12 py-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold text-2xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25"
            >
                🚀 Try Again
            </button>
        </div>
    );

    const renderVictory = () => (
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
            <div className="space-y-6">
                <div className="text-8xl animate-bounce">🎉</div>
                <h2 className="text-5xl font-bold text-green-400 animate-pulse">Victory!</h2>
                <p className="text-2xl text-gray-300">
                    Excellent work! You successfully protected the crew from all solar storms!
                </p>
                <div className="text-2xl text-yellow-400 font-bold">Final Score: {score} points</div>
                <div className="text-xl text-blue-400 font-semibold">
                    👨‍🚀 "Thank you for keeping us safe! You're a true space hero!"
                </div>
                <div className="flex justify-center space-x-4 text-4xl">
                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>🚀</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🛡️</span>
                </div>
            </div>
            <button
                onClick={restartGame}
                className="px-12 py-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-2xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
            >
                🚀 Play Again
            </button>
        </div>
    );

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
            {/* Background stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${(i * 131) % 100}%`,
                            top: `${(i * 71) % 100}%`,
                            animationDelay: `${(i % 6) * 0.3}s`,
                            animationDuration: `${2 + ((i * 17) % 3)}s`,
                        }}
                    />
                ))}
            </div>

            <div className="h-full relative z-10 flex items-center justify-center">
                {gameState === 'menu' && renderMenu()}
                {gameState === 'playing' && renderGame()}
                {gameState === 'gameOver' && renderGameOver()}
                {gameState === 'victory' && renderVictory()}
            </div>
        </div>
    );
}