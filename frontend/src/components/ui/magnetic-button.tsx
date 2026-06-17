"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovering] = useState(false);

  // Position of mouse relative to center of button (-1 to 1)
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  // Map mouse position to actual pixel translation
  const x = useTransform(mouseX, [-1, 1], [-20 * strength, 20 * strength]);
  const y = useTransform(mouseY, [-1, 1], [-20 * strength, 20 * strength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize value from -1 to 1
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      {...props}
    >
      <motion.div
        style={{
          x: useTransform(mouseX, [-1, 1], [-10 * strength, 10 * strength]),
          y: useTransform(mouseY, [-1, 1], [-10 * strength, 10 * strength]),
        }}
        className="flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}