"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  /** Animation direction: fade from bottom (default), left, right, or top */
  from?: "bottom" | "left" | "right" | "top";
  /** Stagger delay between children (seconds). 0 = animate all at once */
  stagger?: number;
  /** Duration of each tween (seconds) */
  duration?: number;
  /** Distance offset (px) */
  distance?: number;
  /** GSAP easing */
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** Animate children instead of the container itself */
  scrub?: boolean;
}

/**
 * Attach this ref to a container element.
 * All direct children (or the container itself) will animate
 * when scrolled into view.
 */
export function useGsapReveal<T extends HTMLElement>(
  opts: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = "bottom",
      stagger = 0,
      duration = 0.8,
      distance = 50,
      ease = "power3.out",
      start = "top 85%",
    } = opts;

    const fromVars: gsap.TweenVars = { opacity: 0, ease };
    if (from === "bottom") fromVars.y = distance;
    else if (from === "top") fromVars.y = -distance;
    else if (from === "left") fromVars.x = -distance;
    else if (from === "right") fromVars.x = distance;

    const targets = stagger > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...fromVars,
        duration,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
