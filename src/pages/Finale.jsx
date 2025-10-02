import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Finale() {
  const { state } = useLocation();
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const [animatedScore, setAnimatedScore] = useState(0);

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 20;
      const counter = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(counter);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(counter);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-16">
      {/* Header */}
      <div className="backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-xl">🚀</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Quiz Complete</h1>
              <p className="text-xs sm:text-sm text-gray-300">Mission accomplished!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-green-500/20 border border-green-400/40 mb-6 sm:mb-8">
            <span className="text-xl sm:text-2xl">🎉</span>
            <span className="text-base sm:text-lg font-semibold text-green-300">Mission Complete!</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text leading-tight">
            Congratulations!
          </h1>

          {/* Score Display */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400 mb-2">
              {animatedScore}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4">
              out of {total} questions
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
              {pct}% Correct
            </div>
          </div>

          {/* Achievement Message */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {pct >= 80 ? (
                <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                  Space Expert!
                </span>
              ) : pct >= 60 ? (
                <span className="text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                  Space Explorer!
                </span>
              ) : pct >= 40 ? (
                <span className="text-transparent bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text">
                  Space Learner!
                </span>
              ) : (
                <span className="text-transparent bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text">
                  Space Adventurer!
                </span>
              )}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              {pct >= 80
                ? "Outstanding work! You've mastered the mysteries of space and solar storms."
                : pct >= 60
                  ? "Great job! You're well on your way to becoming a space expert."
                  : pct >= 40
                    ? "Nice work! Keep exploring and learning about our amazing universe."
                    : "Good effort! The universe is full of wonders waiting to be discovered."
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              to="/quiz"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl
                       hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              Play Again
            </Link>
            <Link
              to="/aurora"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20
                       hover:bg-white/20 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              Aurora Lab
            </Link>
            <Link
              to="/"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20
                       hover:bg-white/20 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}