"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glareOpacity?: number;
  tiltAmount?: number;
}

export function TiltSpotlightCard({ 
  children, 
  className = "",
  glareOpacity = 0.07,
  tiltAmount = 10
}: TiltSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position normalized (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth 3D tilt with better physics
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  // Calculate rotation with configurable tilt amount
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);

  // Spotlight position
  const mouseXpx = useMotionValue(0);
  const mouseYpx = useMotionValue(0);
  const spotlightX = useSpring(mouseXpx, { stiffness: 300, damping: 30 });
  const spotlightY = useSpring(mouseYpx, { stiffness: 300, damping: 30 });

  // Dynamic background with enhanced gradient
  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${spotlightX}px ${spotlightY}px, 
      rgba(255,255,255,${glareOpacity}), 
      transparent 50%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalize for 3D tilt
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);

    // Pixels for spotlight
    mouseXpx.set(e.clientX - rect.left);
    mouseYpx.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative group", className)}
    >
      {/* Spotlight Gradient Overlay with enhanced fade */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
          transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      
      {/* Subtle border glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      
      {/* Content wrapper with 3D pop */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative z-20 h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
