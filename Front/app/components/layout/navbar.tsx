"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about_me", label: "About" },
  { href: "/my_project", label: "Projects" },
  { href: "/contact_me", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Drop in the navbar gracefully on initial load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-100 w-full backdrop-blur-2xl bg-black/40 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] invisible-first-render transition-all duration-300"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center gap-2 text-xl font-black tracking-tight transition-colors text-white overflow-hidden"
        >
          <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
            <img
              src="/logo.svg"
              alt="Meow Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-white/3 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-5 py-1 rounded-full transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500/80 to-cyan-400/80 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)] z-0"></div>
                )}
                <span className="relative z-10">{label}</span>

                {/* Hover state background (only visible if not active) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side action / placeholder */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact_me"
            className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors relative z-50"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-4 text-sm font-medium">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? "text-white font-bold bg-linear-to-r from-blue-500/20 to-cyan-400/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)] border border-cyan-500/30"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                )}
                {!isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                )}
                {label}
              </Link>
            );
          })}

          <div className="my-2 border-t border-white/10"></div>

          <Link
            href="/contact_me"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl bg-white text-black text-center font-bold hover:bg-cyan-400 transition-colors duration-300"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
