export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-slate-900 to-slate-800 text-white pt-20 px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
          About Us
        </h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8 mb-8">
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
            This feature is coming soon! Learn about our team, mission, and the science behind
            space weather and auroras. We're passionate about making space science accessible
            and engaging for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-blue-300">Our Mission</h3>
            <p className="text-xs sm:text-sm text-white/70">
              Making space science accessible through interactive storytelling and education.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-300">Our Vision</h3>
            <p className="text-xs sm:text-sm text-white/70">
              Inspiring the next generation of space explorers and scientists.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-green-300">Our Values</h3>
            <p className="text-xs sm:text-sm text-white/70">
              Education, accessibility, and scientific accuracy in everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}