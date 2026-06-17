"use client";

import { cn } from "@/lib/utils";

/* ============================================================
   Skeleton — shimmer loading placeholder
   ============================================================
   Matches shadcn's pulse aesthetic with a subtle sweep effect.
   Supports arbitrary dimensions via className overrides.
   ============================================================ */

interface SkeletonProps {
  className?: string;
  /** Render as a circle instead of rounded rect */
  circle?: boolean;
  /** Inline styles for dynamic sizing */
  style?: React.CSSProperties;
}

export function Skeleton({ className, circle, style }: SkeletonProps) {
  return (
    <div
      style={style}
      className={cn(
        "animate-pulse bg-muted/60 dark:bg-muted/40",
        circle ? "rounded-full" : "rounded-lg",
        className
      )}
    />
  );
}

/* Skeleton variants for common patterns */

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-36" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>
      <Skeleton className="mt-4 h-3 w-full" />
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/40 bg-card p-6 shadow-sm",
        className
      )}
    >
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-1.5 h-3 w-56" />
      <div className="mt-5 flex h-72 items-end gap-1.5">
        {[40, 55, 45, 65, 50, 70, 60, 75, 65, 80, 72, 85].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-sm rounded-b-none opacity-60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
