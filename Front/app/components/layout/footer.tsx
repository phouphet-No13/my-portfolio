"use client";

import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1DdESZS7QB/?mibextid=wwXIfr",
    icon: "/home/icon/contact/ic_outline-facebook.svg",
    hoverBg: "hover:bg-cyan-500",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/meowdesign_13?igsh=MTlkaTdtOGRiOW9ndA%3D%3D&utm_source=qr",
    icon: "/home/icon/contact/mingcute_instagram-fill.svg",
    hoverBg: "hover:bg-cyan-400",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/phouphet-chanthalungsy-b1b2a6293",
    icon: "/home/icon/contact/mdi_linkedin.svg",
    hoverBg: "hover:bg-cyan-400",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@meowdesigner13?is_from_webapp=1&sender_device=pc",
    icon: "/home/icon/contact/streamline-logos_tiktok-logo-block.svg",
    hoverBg: "hover:bg-cyan-400",
  },
];

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about_me" },
  { label: "Projects", href: "/my_project" },
  { label: "Contact", href: "/contact_me" },
];

export default function Footer() {
  const footerRef = useGsapReveal<HTMLDivElement>({
    distance: 30,
    duration: 0.8,
  });

  return (
    <footer className="relative border-t border-white/20 w-full bg-black text-white py-12 md:py-16 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div
        ref={footerRef}
        className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center gap-10"
      >
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 border-b border-white/10 pb-10">
          {/* Logo & description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link
              href="/"
              className="group relative flex items-center gap-2 text-2xl font-black tracking-tight transition-colors text-white overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all duration-300">
                <span className="text-black font-bold">M</span>
              </div>
              <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                Meow
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
              Crafting minimalistic, clean, and user-friendly web solutions in
              San Francisco.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group ${s.hoverBg}`}
                aria-label={s.label}
              >
                <img
                  src={s.icon}
                  alt={s.label}
                  width={18}
                  height={18}
                  className="brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-between w-full flex-col md:flex-row gap-4 text-xs md:text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Meow Designer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
