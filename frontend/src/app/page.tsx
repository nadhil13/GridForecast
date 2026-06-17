"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StaggeredText } from "@/components/ui/staggered-text";

const HomeFeatures = dynamic(() => import("./home-features"), {
  ssr: false,
});

/* ============================================================
   / — Clean, Professional Landing Page
   ============================================================ */

export default function HomePage() {
  return (
    <PageWrapper className="max-w-none px-0 py-0 lg:py-0 lg:px-0">
      <div className="relative w-full overflow-hidden">
        
        {/* ── Subtle Backgrounds ── */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-speckled mix-blend-multiply dark:mix-blend-screen" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-ring-particles opacity-30" />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-[0.05]" />
        <div className="pointer-events-none fixed inset-0 z-0 gradient-glow opacity-40 mix-blend-screen dark:opacity-10" />

        {/* ── Hero Section (Clean Flow, No Sticky Overlaps) ── */}
        <section className="relative z-20 flex min-h-screen flex-col items-center justify-center text-center px-6 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default mb-10"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-background/50 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-secondary hover:text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                National Grid Forecasting Engine
              </span>
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight"
            >
              National Electricity{" "}
              <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-800 dark:from-zinc-200 dark:to-zinc-500">
                Demand Forecasting
              </span>
            </motion.h1>

            <div className="mt-8 w-full max-w-[60ch] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-muted-foreground [text-wrap:pretty]">
              <StaggeredText text="Leverage machine-learning models trained on historical grid data to forecast national energy consumption — empowering data-driven decisions for a sustainable future." delay={0.2} />
            </div>

            {/* CTA buttons */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row relative z-50 pointer-events-auto"
            >
              <MagneticButton strength={0.3} className="group relative inline-flex h-[clamp(3rem,8vw,3.5rem)] w-full items-center justify-center gap-[0.4rem] overflow-hidden rounded-full bg-foreground px-[1.5em] py-[0.6em] text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 hover:shadow-xl hover:-translate-y-1 sm:w-auto">
                <Link href="/forecast" className="relative z-10 flex items-center gap-[0.25em] w-full h-full justify-center transition-[gap] duration-150 ease-in group-hover:gap-[0.5em]">
                  Start Predicting
                  <ArrowRight className="h-[clamp(1rem,3vw,1.25rem)] w-[clamp(1rem,3vw,1.25rem)] transition-transform duration-300" />
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={0.2} className="group relative inline-flex h-[clamp(3rem,8vw,3.5rem)] w-full items-center justify-center gap-[0.4rem] rounded-full border border-border/40 bg-background/50 px-[1.5em] py-[0.6em] text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-accent hover:shadow-md hover:-translate-y-1 sm:w-auto">
                <Link href="/analytics" className="relative z-10 w-full h-full flex items-center justify-center">
                  View Analytics
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ── Dynamically Loaded Content Sections ── */}
        <HomeFeatures />

      </div>
    </PageWrapper>
  );
}
