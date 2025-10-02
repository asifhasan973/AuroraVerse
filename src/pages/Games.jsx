import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Shield, Zap, Target, Timer, Star, Rocket } from 'lucide-react';

export default function Games() {
    const navigate = useNavigate();
    const [hoveredGame, setHoveredGame] = useState(null);

    const games = [
        {
            id: 'stormsafe',
            title: 'StormSafe',
            description: 'Help the astronaut find the safest place to hide during a solar storm. Navigate through moving spacecraft components and click on the Storm Shelter before time runs out!',
            icon: '🛡️',
            route: '/stormsafe',
            features: [
                'Find Storm Shelter',
                '3 Lives',
                'Time Challenge',
                '5 Rounds'
            ],
            difficulty: 'Easy',
            duration: '2-5 minutes',
            color: 'from-red-500 to-orange-500',
            bgColor: 'from-red-900/20 to-orange-900/20',
            borderColor: 'border-red-400/30'
        },
        {
            id: 'space-defense',
            title: 'Space Defense',
            description: 'Defend Earth from alien invaders! Use arrow keys to move and spacebar to shoot. Survive for 10 seconds to complete the mission and collect power-ups for advantages.',
            icon: '🚀',
            route: '/space-defense',
            features: [
                'Arrow Keys/WASD to move',
                'Spacebar to shoot',
                'Power-ups available',
                'Survive 10 seconds'
            ],
            difficulty: 'Medium',
            duration: '1-3 minutes',
            color: 'from-cyan-500 to-purple-500',
            bgColor: 'from-cyan-900/20 to-purple-900/20',
            borderColor: 'border-cyan-400/30'
        }
    ];

    const handleGameSelect = (game) => {
        navigate(game.route);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`
                        }}
                    />
                ))}
                {/* Floating space debris */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`debris-${i}`}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 pt-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        🎮 Space Games 🎮
                    </h1>
                    <p className="text-lg md:text-xl text-cyan-200 max-w-3xl mx-auto">
                        Choose your adventure! Play exciting space-themed games and test your skills in different cosmic challenges.
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105`}
                            onMouseEnter={() => setHoveredGame(game.id)}
                            onMouseLeave={() => setHoveredGame(null)}
                            onClick={() => handleGameSelect(game)}
                        >
                            {/* Card Background */}
                            <div className={`relative bg-gradient-to-br ${game.bgColor} backdrop-blur-md rounded-2xl p-8 border-2 ${game.borderColor} shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300`}>
                                {/* Glow effect on hover - only for Space Defense */}
                                {hoveredGame === game.id && game.id === 'space-defense' && (
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${game.color} rounded-2xl blur opacity-10 animate-pulse`}></div>
                                )}

                                {/* Game Icon */}
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4 animate-bounce">
                                        {game.icon}
                                    </div>
                                    <h2 className={`text-3xl font-bold bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                                        {game.title}
                                    </h2>
                                </div>

                                {/* Game Description */}
                                <p className="text-cyan-100 text-center mb-6 leading-relaxed">
                                    {game.description}
                                </p>

                                {/* Game Features */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Features
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {game.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-cyan-200">
                                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Game Stats */}
                                <div className="flex justify-between items-center mb-6 text-sm">
                                    <div className="flex items-center gap-2 text-cyan-300">
                                        <Target className="w-4 h-4" />
                                        <span>Difficulty: {game.difficulty}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-cyan-300">
                                        <Timer className="w-4 h-4" />
                                        <span>{game.duration}</span>
                                    </div>
                                </div>

                                {/* Play Button */}
                                <button className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${game.color} hover:opacity-90 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-lg`}>
                                    <Play className="w-6 h-6" />
                                    Play {game.title}
                                </button>

                                {/* Hover effect overlay */}
                                {hoveredGame === game.id && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-br from-slate-800/30 via-purple-900/20 to-indigo-800/30 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center justify-center gap-2">
                            <Rocket className="w-8 h-8" />
                            Game Instructions
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <div>
                                <h4 className="text-lg font-semibold text-cyan-200 mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    StormSafe
                                </h4>
                                <ul className="space-y-2 text-cyan-100 text-sm">
                                    <li>• Click on the Storm Shelter to protect the crew</li>
                                    <li>• Components move around - be quick!</li>
                                    <li>• You have 3 lives and 5 rounds</li>
                                    <li>• Time decreases with each round</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-cyan-200 mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Space Defense
                                </h4>
                                <ul className="space-y-2 text-cyan-100 text-sm">
                                    <li>• Use arrow keys or WASD to move</li>
                                    <li>• Press spacebar to shoot at enemies</li>
                                    <li>• Collect power-ups for advantages</li>
                                    <li>• Survive 10 seconds to win!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
