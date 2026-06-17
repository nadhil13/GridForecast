"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================
   PageWrapper — Enhanced Animated Page Container
   ============================================================
   Smooth, bug-free page transitions with reduced-motion support
   ============================================================ */

interface PageWrapperProps extends HTMLMotionProps<"main"> {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({
  children,
  className,
  ...props
}: PageWrapperProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-8 lg:py-16",
        className
      )}
      {...props}
    >
      {children}
    </motion.main>
  );
}
