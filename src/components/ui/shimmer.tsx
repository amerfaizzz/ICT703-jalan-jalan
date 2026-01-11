"use client";

import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

export function Shimmer({ className, children }: ShimmerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <div
        className={cn(
          "absolute inset-0 animate-shimmer shimmer-bg",
          "pointer-events-none"
        )}
      />
    </div>
  );
}

// Button shimmer effect
export function ShimmerButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ShimmerProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-xl px-6 py-3",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "text-white font-semibold",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25",
        className
      )}
      {...props}
    >
      {children}
      <div
        className={cn(
          "absolute inset-0 animate-shimmer",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "bg-[length:200%_100%]",
          "pointer-events-none"
        )}
      />
    </button>
  );
}

// Card shimmer border effect
export function ShimmerBorder({
  className,
  children,
}: ShimmerProps) {
  return (
    <div className={cn("relative rounded-2xl p-[2px]", className)}>
      {/* Animated border */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          "animate-shimmer bg-[length:200%_100%]",
          "opacity-70"
        )}
      />
      {/* Inner content */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-[14px]">
        {children}
      </div>
    </div>
  );
}

// Text shimmer effect
export function ShimmerText({
  className,
  children,
}: ShimmerProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "animate-shimmer bg-[length:200%_100%]",
        className
      )}
    >
      {children}
    </span>
  );
}
