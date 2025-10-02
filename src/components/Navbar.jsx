// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('nav')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 flex items-center justify-between
                 px-3 sm:px-4 md:px-6 py-2
                 
                 text-white"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <span
          className="font-logo text-lg sm:text-xl md:text-4xl drop-shadow-sm
                     bg-gradient-to-r from-fuchsia-300 via-violet-300 to-indigo-300
                     bg-clip-text rubik-dirt-regular"
        >
          AuroraVerse
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-bold">
        <NavItem to="/forecast">Aurora Forecast</NavItem>
        <NavItem to="/kindex">Mood Meter</NavItem>
        <NavItem to="/electrons">Electron Storms</NavItem>
        <NavItem to="/games">Games</NavItem>
        <NavItem to="/ai-qa">AI Assistant</NavItem>
        <NavItem to="/data">Data</NavItem>
        <NavItem to="/quiz">Quiz</NavItem>
        <NavItem to="https://u2204125.github.io/aurora-sentinel/">Aurora Lab</NavItem>
        <StartJourneyButton />
      </div>

      {/* Hamburger (mobile) */}
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden relative h-8 w-8 grid place-items-center z-50"
      >
        <span
          className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""
            }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white my-1 transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"
            }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
        />
      </button>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-2 mx-2
                     rounded-xl border border-white/10
                     bg-black/80 backdrop-blur-md shadow-lg
                     p-3 md:hidden"
        >
          <div className="space-y-1">
            <MobileItem to="/forecast" onClick={() => setOpen(false)}>Aurora Forecast</MobileItem>
            <MobileItem to="/kindex" onClick={() => setOpen(false)}>Mood Meter</MobileItem>
            <MobileItem to="/electrons" onClick={() => setOpen(false)}>Electron Storms</MobileItem>
            <MobileItem to="/games" onClick={() => setOpen(false)}>Games</MobileItem>
            <MobileItem to="/ai-qa" onClick={() => setOpen(false)}>AI Assistant</MobileItem>
            <MobileItem to="/data" onClick={() => setOpen(false)}>Data</MobileItem>
            <MobileItem to="/quiz" onClick={() => setOpen(false)}>Quiz</MobileItem>
            <MobileItem to="https://u2204125.github.io/aurora-sentinel/" onClick={() => setOpen(false)}>Aurora Lab</MobileItem>
            <div className="pt-2 border-t border-white/10">
              <MobileStartJourneyButton onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition-colors hover:text-fuchsia-300 ${isActive ? "text-fuchsia-200" : "text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block w-full rounded-lg px-3 py-2 text-sm
         hover:bg-white/10 hover:text-fuchsia-200
         ${isActive ? "bg-white/10 text-fuchsia-200" : "text-white"}`
      }
    >
      {children}
    </NavLink>
  );
}

function StartJourneyButton() {
  return (
    <Link
      to="/start"
      className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700
                 text-white font-bold py-2 px-4 rounded-lg
                 transition-all duration-300 transform hover:scale-105
                 shadow-lg hover:shadow-fuchsia-500/25
                 border border-fuchsia-400/30"
    >
      Start Journey
    </Link>
  );
}

function MobileStartJourneyButton({ onClick }) {
  return (
    <Link
      to="/start"
      onClick={onClick}
      className="block w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700
                 text-white font-bold py-3 px-4 rounded-lg text-center
                 transition-all duration-300
                 shadow-lg hover:shadow-fuchsia-500/25
                 border border-fuchsia-400/30"
    >
      Start Journey
    </Link>
  );
}