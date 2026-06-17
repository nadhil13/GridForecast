"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== "undefined" 
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
  : false;

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.98
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
