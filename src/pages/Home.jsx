// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video properties immediately
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Aggressive play function with multiple retry attempts
    const forcePlay = async () => {
      try {
        // Reset video to beginning
        video.currentTime = 0;
        
        // Force play with Promise handling
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log("Video playing successfully");
        }
      } catch (error) {
        console.log("Play attempt failed, retrying...", error);
        
        // Multiple aggressive retries with different delays
        const retryDelays = [50, 100, 200, 500, 1000];
        
        retryDelays.forEach((delay, index) => {
          setTimeout(async () => {
            try {
              video.currentTime = 0;
              await video.play();
              console.log(`Video started on retry ${index + 1}`);
            } catch (retryError) {
              if (index === retryDelays.length - 1) {
                console.log("All retry attempts failed");
              }
            }
          }, delay);
        });
      }
    };

    // Try immediately when component mounts
    forcePlay();

    // Multiple event listeners for different loading states
    const handleLoadStart = () => forcePlay();
    const handleLoadedMetadata = () => forcePlay();
    const handleLoadedData = () => forcePlay();
    const handleCanPlay = () => forcePlay();
    const handleCanPlayThrough = () => forcePlay();

    // Silent user interaction handler (no console logs)
    const handleUserInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Add all event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // User interaction listeners
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('keydown', handleUserInteraction, { passive: true });
    document.addEventListener('mousemove', handleUserInteraction, { passive: true });

    // Intersection Observer to play when video comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            forcePlay();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // Cleanup
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover scale-x-[-1]"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        controls={false}
        poster="/video-poster.jpg"
        preload="auto"
        webkit-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
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
          <p className="mt-4 text-2xl text-white/80 font-bold">
            Every Flare Tells a Story Worth Exploring.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/start">
              <Button
                size="lg"
                className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-lg transform hover:scale-110 transition duration-300"
              >
                <span className="font-bold text-lg">Start Journey</span>
              </Button>
            </Link>
            <Link to="https://u2204125.github.io/aurora-sentinel/">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 shadow-lg transform hover:scale-110 transition duration-300"
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
        </div>
      </div>
    </div>
  );
}