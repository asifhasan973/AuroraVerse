// src/pages/Home.jsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useImagePreload } from "../hooks/useImagePreload";

export default function Home() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const location = useLocation();
  const { done: imgsReady, progress } = useImagePreload([
    "/images/astranaut2.png",
  ]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let playAttempts = 0;
    const maxAttempts = 5;

    const markReady = () => setVideoReady(true);

    const tryPlay = async () => {
      if (!v || playAttempts >= maxAttempts) return;

      playAttempts++;

      try {
        // Reset video to ensure fresh start
        v.currentTime = 0;
        v.muted = true; // Ensure muted for autoplay to work

        await v.play();
        setVideoReady(true);
        console.log('Video playing successfully');
      } catch (error) {
        console.log(`Play attempt ${playAttempts} failed:`, error);

        // Retry after a short delay
        if (playAttempts < maxAttempts) {
          setTimeout(tryPlay, 500);
        } else {
          // Final fallback: wait for user interaction
          const onFirstInteraction = () => {
            v.play().finally(() => {
              setVideoReady(true);
              document.removeEventListener("click", onFirstInteraction);
              document.removeEventListener("touchstart", onFirstInteraction);
            });
          };
          document.addEventListener("click", onFirstInteraction, { once: true });
          document.addEventListener("touchstart", onFirstInteraction, { once: true });
        }
      }
    };

    // Try to play when video is ready
    const handleCanPlay = () => {
      tryPlay();
    };

    // Try to play when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && v.paused) {
        tryPlay();
      }
    };

    // Try to play when window gets focus
    const handleFocus = () => {
      if (v.paused) {
        tryPlay();
      }
    };

    // Add event listeners
    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("loadedmetadata", handleCanPlay);
    v.addEventListener("playing", markReady);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Initial play attempt with small delay to ensure DOM is ready
    setTimeout(() => {
      tryPlay();
    }, 100);

    // If coming from login (you can check location.state if you're passing it from login)
    if (location.state?.fromLogin) {
      // Force play attempt after login
      setTimeout(() => {
        tryPlay();
      }, 300);
    }

    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("loadedmetadata", handleCanPlay);
      v.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [location]);

  // Additional effect to handle play/pause based on page visibility
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handlePageHide = () => {
      if (!v.paused) {
        v.pause();
      }
    };

    const handlePageShow = () => {
      if (v.paused && videoReady) {
        v.play().catch(() => {
          // Silently fail if autoplay is blocked
        });
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [videoReady]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <LoadingOverlay show={!(videoReady && imgsReady)} label={`Loading… ${progress ?? 0}%`} />
      {/* Background video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover scale-x-[-1]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        poster=""
      >
        <source src="/videos/1851190-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-purple-900/60 via-indigo-900/60 to-black/80" />

      {/* Split layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE: Text + Buttons */}
        <div className="flex flex-col items-center lg:items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 text-center lg:text-left xl:ps-32 pt-20 lg:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold tracking-wide drop-shadow-lg leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent animate-pulse moo-lah-lah-regular">
              Solar <br /> Storms
              to
              <br /> Auroras
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white/80 font-bold max-w-2xl">
            Every Flare Tells a Story Worth Exploring.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/start" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-lg transform hover:scale-110 transition duration-300"
              >
                <span className="font-bold text-base sm:text-lg">Start Journey</span>
              </Button>
            </Link>
            <Link to="/aurora" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 shadow-lg transform hover:scale-110 transition duration-300"
              >
                <span className="font-bold text-base sm:text-lg">Aurora Lab</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Characters */}
        <div className="relative flex items-center justify-center order-first lg:order-last">
          {/* Astronaut floating from top */}
          <img
            src="/images/astranaut2.png"
            alt="Astronaut Stelly"
            className="absolute top-10 sm:top-20 lg:top-40 right-4 sm:right-8 lg:right-40 h-[25vh] sm:h-[35vh] lg:h-[90vh] w-auto animate-float drop-shadow-[0_10px_30px_rgba(59,130,246,.6)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}