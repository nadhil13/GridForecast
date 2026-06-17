"use client";

import { motion } from "framer-motion";
import { fadeInChild } from "@/lib/motion";
import { siteConfig } from "@/config/site";

/* ============================================================
   Footer — centered, professional
   ============================================================ */

export function Footer() {
  return (
    <motion.footer
      variants={fadeInChild}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-border/40"
    >
      <div className="mx-auto flex h-14 max-w-7xl flex-col items-center justify-center gap-0.5 px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-[11px] text-muted-foreground/50">
          AI-Powered Energy Analytics
        </p>
      </div>
    </motion.footer>
  );
}
