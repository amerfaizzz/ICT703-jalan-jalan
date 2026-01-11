"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { groupConfig, type GroupNumber } from "@/lib/flow-config";

// ============================================================================
// Flow CTA - Primary Action Button with Animations
// ============================================================================

interface FlowCTAProps {
  href: string;
  label: string;
  description?: string;
  group: GroupNumber;
  primary?: boolean;
  className?: string;
}

export function FlowCTA({
  href,
  label,
  description,
  group,
  primary = false,
  className,
}: FlowCTAProps) {
  const config = groupConfig[group];
  const Icon = config.icon;

  if (primary) {
    return (
      <Button
        asChild
        size="lg"
        className={cn(
          "group relative overflow-hidden w-full h-auto py-4 px-5",
          "bg-gradient-to-r",
          config.gradient,
          "text-white border-0",
          "hover:scale-[1.02] hover:shadow-xl transition-all duration-300",
          "shadow-lg",
          className
        )}
        style={{
          boxShadow: `0 10px 40px -10px ${config.glowColor}`,
        }}
      >
        <Link href={href}>
          <div className="flex items-center gap-4 w-full">
            {/* Animated Icon */}
            <div className="size-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:animate-float-bounce transition-transform">
              <Icon className="size-5" />
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <span className="font-semibold text-base block">{label}</span>
              {description && (
                <p className="text-sm text-white/80 mt-0.5">{description}</p>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Shimmer overlay */}
          <div
            className={cn(
              "absolute inset-0 animate-shimmer",
              "bg-gradient-to-r from-transparent via-white/10 to-transparent",
              "bg-[length:200%_100%]",
              "pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          />
        </Link>
      </Button>
    );
  }

  // Secondary variant with hover effects
  return (
    <Button
      asChild
      variant="ghost"
      size="lg"
      className={cn(
        "group relative w-full h-auto py-3 px-4",
        "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
        "border border-black/5 dark:border-white/10",
        "hover:border-transparent hover:bg-white dark:hover:bg-neutral-800",
        "hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-3 w-full">
          {/* Icon with glow */}
          <div
            className={cn(
              "size-9 rounded-lg flex items-center justify-center",
              "bg-gradient-to-br transition-all duration-300",
              config.gradient,
              "group-hover:scale-110 group-hover:shadow-lg"
            )}
            style={{
              boxShadow: `0 4px 20px -4px ${config.glowColor}`,
            }}
          >
            <Icon className="size-4 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-left">
            <span className="font-medium text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors block">
              {label}
            </span>
            {description && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>

          {/* Arrow */}
          <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </Button>
  );
}

// ============================================================================
// Flow CTA Inline - Compact Animated Badge
// ============================================================================

export function FlowCTAInline({
  href,
  label,
  group,
  className,
}: {
  href: string;
  label: string;
  group: GroupNumber;
  className?: string;
}) {
  const config = groupConfig[group];
  const Icon = config.icon;

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 py-1.5 px-3 rounded-full",
        "bg-gradient-to-r",
        config.gradient,
        "text-white text-sm font-medium",
        "hover:scale-105 hover:shadow-lg transition-all duration-200",
        "shadow-md",
        className
      )}
      style={{
        boxShadow: `0 4px 14px -4px ${config.glowColor}`,
      }}
    >
      <Icon className="size-3.5 group-hover:animate-pulse" />
      <span>{label}</span>
      <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

// ============================================================================
// Flow CTA Mini - Icon Only with Animation
// ============================================================================

export function FlowCTAMini({
  href,
  group,
  className,
}: {
  href: string;
  group: GroupNumber;
  className?: string;
}) {
  const config = groupConfig[group];
  const Icon = config.icon;

  return (
    <Link
      href={href}
      className={cn(
        "size-10 rounded-full flex items-center justify-center",
        "bg-gradient-to-br",
        config.gradient,
        "text-white",
        "hover:scale-110 hover:shadow-lg transition-all duration-200",
        "shadow-md animate-pulse-glow",
        className
      )}
      style={{
        boxShadow: `0 4px 20px -4px ${config.glowColor}`,
      }}
    >
      <Icon className="size-4" />
    </Link>
  );
}
