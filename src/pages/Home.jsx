// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background video */}
     <video
  className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover scale-x-[-1]"
  autoPlay
  loop
  muted
  playsInline
  poster="/video-poster.jpg"
>
  <source src="/videos/1851190-uhd_3840_2160_25fps.mp4" type="video/mp4" />
</video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-purple-900/60 via-indigo-900/60 to-black/80" />

      {/* Split layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* LEFT SIDE: Text + Buttons */}
        <div className="flex flex-col items-center md:items-start justify-center px-8 md:px-16 text-center md:text-left lg:ps-32">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-wide drop-shadow-lg">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent animate-pulse moo-lah-lah-regular">
              From Solar Storms to Auroras
            </span>
          </h1>
          <p className="mt-4  text-2xl text-white/80 font-bold">
            Every Flare Tells a Story Worth Exploring.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/start">
              <Button
                size="lg"
                className=" bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-lg transform hover:scale-110 transition duration-300"
              >
               
                <span className="font-bold text-lg"> Start Journey</span>
              </Button>
            </Link>
            <Link to="https://u2204125.github.io/aurora-sentinel/">
              <Button
                size="lg"
                variant="secondary"
                className=" bg-white/20 text-white hover:bg-white/30 shadow-lg transform hover:scale-110 transition duration-300"
              >
                <span className="font-bold text-lg">Aurora Lab</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Characters */}
        <div className="relative flex items-center justify-center">
          {/* Astronaut floating from top */}
          <img
            src="/images/astranaut2.png"
            alt="Astronaut Stelly"
            className="absolute top-20 right-40 md:top-40 h-[35vh] md:h-[90vh] w-auto animate-float drop-shadow-[0_10px_30px_rgba(59,130,246,.6)]"
            draggable={false}
          />
          {/* Child bouncing from bottom */}
          {/* <img
            src="/src/assets/images/child.png"
            alt="Child Explorer"
            className="absolute bottom-0 left-10 h-[30vh] md:h-[40vh] w-auto animate-bounce-slow drop-shadow-[0_10px_30px_rgba(124,58,237,.6)]"
            draggable={false}
          /> */}
        </div>
      </div>
    </div>
  );
}

