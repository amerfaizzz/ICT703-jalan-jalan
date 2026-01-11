"use client";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
  children?: React.ReactNode;
  animated?: boolean;
  gradient?: boolean;
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  className,
  trackClassName,
  progressClassName,
  children,
  animated = true,
  gradient = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ "--progress": offset } as React.CSSProperties}
      >
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        )}

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn(
            "stroke-neutral-200 dark:stroke-neutral-700",
            trackClassName
          )}
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={gradient ? `url(#${gradientId})` : undefined}
          className={cn(
            !gradient && "stroke-indigo-500",
            animated && "transition-[stroke-dashoffset] duration-1000 ease-out",
            progressClassName
          )}
        />
      </svg>

      {/* Center Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

// Smaller variant for inline use
export function ProgressRingMini({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  return (
    <ProgressRing
      progress={progress}
      size={24}
      strokeWidth={3}
      className={className}
      gradient
    />
  );
}
