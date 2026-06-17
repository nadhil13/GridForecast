import type { Variants, Transition } from "framer-motion";

/* ============================================================
   Enhanced Motion System - Smooth, Modern, Bug-Free
   ============================================================ */

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== "undefined" 
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
  : false;

/** Ultra-smooth spring transition */
export const smoothSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Gentle ease for entrances */
export const gentleEase: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
};

/** Quick fade for micro-interactions */
export const quickFade: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

/* ---------- Page Transitions - SIMPLIFIED & BUG-FREE ---------- */

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/* ---------- Child Animations ---------- */

export const fadeUpChild: Variants = {
  initial: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 15 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeInChild: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

/* ---------- Scale & Pop Animations ---------- */

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: smoothSpring,
  },
};

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.5, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

/* ---------- Slide Animations ---------- */

export const slideFromLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: gentleEase,
  },
};

export const slideFromRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: gentleEase,
  },
};

export const slideFromBottom: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ---------- Hover Effects ---------- */

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

export const tapScale = {
  scale: 0.98,
};
