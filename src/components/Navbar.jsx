// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 flex items-center justify-between
                 px-4 md:px-6 py-2
                
                 text-white"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span
          className="font-logo text-xl md:text-4xl drop-shadow-sm
                     bg-gradient-to-r from-fuchsia-300 via-violet-300 to-indigo-300
                     bg-clip-text  rubik-dirt-regular"
        >
          AuroraVerse
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-bold">
        <NavItem to="/">Home</NavItem>
        <NavItem to="https://u2204125.github.io/aurora-sentinel/">Aurora Lab</NavItem>
        <NavItem to="/quiz">Quiz</NavItem>
        <NavItem to="/aboutus">About Us</NavItem>
      </div>

      {/* Hamburger (mobile) */}
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden relative h-9 w-10 grid place-items-center"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            open ? "translate-y-1.5 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
            open ? "-translate-y-1.5 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="absolute top-full right-2 mt-2 w-44
                     rounded-xl border border-white/10
                     bg-black/60 backdrop-blur-md shadow-lg
                     p-2 md:hidden"
        >
          <MobileItem to="/" onClick={() => setOpen(false)}>Home</MobileItem>
          <MobileItem to="/aurora" onClick={() => setOpen(false)}>Aurora Lab</MobileItem>
          <MobileItem to="/quiz" onClick={() => setOpen(false)}>Quiz</MobileItem>
          <MobileItem to="/finale" onClick={() => setOpen(false)}>Finale</MobileItem>
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
        `transition-colors hover:text-fuchsia-300 ${
          isActive ? "text-fuchsia-200" : "text-white"
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