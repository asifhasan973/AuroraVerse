export default function AuroraLab() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white pt-20 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Aurora Lab 🌌
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
          Here you will create your own aurora with sliders.
        </p>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-white/70">
            This feature is coming soon! You'll be able to create beautiful aurora displays
            by adjusting various parameters like solar wind speed, magnetic field strength,
            and atmospheric conditions.
          </p>
        </div>
      </div>
    </div>
  );
}