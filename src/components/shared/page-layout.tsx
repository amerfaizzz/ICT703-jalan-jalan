"use client";

import { cn } from "@/lib/utils";
import { Navigation } from "./navigation";
import { GroupLabel } from "./group-label";
import { FlowGuide } from "./flow-guide";
import type { GroupNumber } from "@/lib/flow-config";

// ============================================================================
// Animated Background Component
// ============================================================================

interface AnimatedBackgroundProps {
  variant?: "subtle" | "vibrant" | "minimal";
  className?: string;
}

export function AnimatedBackground({
  variant = "subtle",
  className,
}: AnimatedBackgroundProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    );
  }

  if (variant === "vibrant") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute w-full h-full opacity-60"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
            `,
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute top-20 right-20 w-40 h-40 rounded-full animate-float-bounce opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-40 left-10 w-32 h-32 rounded-full animate-float-bounce opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
      </div>
    );
  }

  // Subtle (default)
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="absolute w-full h-full opacity-40"
        style={{
          background: `
            radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)
          `,
        }}
      />
      {/* Single floating accent */}
      <div
        className="absolute top-32 right-16 w-24 h-24 rounded-full animate-glow-pulse opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ============================================================================
// Page Header Component
// ============================================================================

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-8", className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-float-bounce">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {title}
          </h1>
          {subtitle && (
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// ============================================================================
// Page Section Component
// ============================================================================

interface PageSectionProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export function PageSection({
  title,
  subtitle,
  action,
  children,
  className,
  columns,
  gap = "md",
}: PageSectionProps) {
  const gapClass = {
    sm: "gap-3",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8",
  }[gap];

  const gridClass = columns
    ? {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      }[columns]
    : undefined;

  return (
    <section className={cn("mb-8 md:mb-12", className)}>
      {(title || action) && (
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            {title && (
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn(gridClass && `grid ${gridClass}`, gapClass)}>
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// Unified Card Component
// ============================================================================

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function UnifiedCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
}: UnifiedCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
        "border border-black/5 dark:border-white/10",
        "shadow-lg shadow-black/5",
        hover && "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
        glow && "animate-pulse-glow",
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div
            className="absolute w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// Page Layout Component
// ============================================================================

interface PageLayoutProps {
  children: React.ReactNode;
  group?: GroupNumber;
  background?: "subtle" | "vibrant" | "minimal";
  showFlowGuide?: boolean;
  flowGuideVariant?: "card" | "banner" | "inline";
  flowGuideTitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function PageLayout({
  children,
  group,
  background = "subtle",
  showFlowGuide = true,
  flowGuideVariant = "card",
  flowGuideTitle,
  maxWidth = "xl",
  className,
}: PageLayoutProps) {
  const maxWidthClass = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    "2xl": "max-w-[1400px]",
    full: "max-w-none",
  }[maxWidth];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      {group && <GroupLabel group={group} />}

      <AnimatedBackground variant={background} />

      <main
        className={cn(
          "relative z-10",
          "px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12",
          "mx-auto",
          maxWidthClass,
          className
        )}
      >
        {children}

        {showFlowGuide && (
          <div className="mt-12">
            <FlowGuide
              variant={flowGuideVariant}
              title={flowGuideTitle}
              maxSuggestions={3}
            />
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================================
// Page Layout Full (Edge to Edge)
// ============================================================================

interface PageLayoutFullProps {
  children: React.ReactNode;
  group?: GroupNumber;
  background?: "subtle" | "vibrant" | "minimal";
  className?: string;
}

export function PageLayoutFull({
  children,
  group,
  background = "subtle",
  className,
}: PageLayoutFullProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      {group && <GroupLabel group={group} />}

      <AnimatedBackground variant={background} />

      <main className={cn("relative z-10", className)}>{children}</main>
    </div>
  );
}
