"use client";

import { usePathname } from "next/navigation";
import { Compass, Sparkles, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlowCTA, FlowCTAInline } from "./flow-cta";
import { getNextSteps, type NextStep } from "@/lib/flow-config";

// ============================================================================
// Animated Gradient Background
// ============================================================================

function GradientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Primary gradient orbs */}
      <div
        className="absolute w-full h-full opacity-60"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)
          `,
        }}
      />
      {/* Animated accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ============================================================================
// FlowGuide Component with Animations
// ============================================================================

interface FlowGuideProps {
  variant?: "card" | "banner" | "inline";
  title?: string;
  nextSteps?: NextStep[];
  maxSuggestions?: number;
  className?: string;
}

export function FlowGuide({
  variant = "card",
  title = "Continue Your Journey",
  nextSteps: customNextSteps,
  maxSuggestions = 3,
  className,
}: FlowGuideProps) {
  const pathname = usePathname();
  const steps = customNextSteps || getNextSteps(pathname, maxSuggestions);

  if (steps.length === 0) return null;

  const primaryStep = steps.find((s) => s.primary);
  const secondarySteps = steps.filter((s) => !s.primary);

  // ============================================================================
  // Inline Variant - Compact Animated Pills
  // ============================================================================
  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        <span className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Map className="size-4 animate-float-bounce" />
          <span className="font-medium">{title}</span>
        </span>
        {steps.map((step) => (
          <FlowCTAInline
            key={step.path}
            href={step.path}
            label={step.label}
            group={step.group}
          />
        ))}
      </div>
    );
  }

  // ============================================================================
  // Banner Variant - Full Width with Animations
  // ============================================================================
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "quest-glass",
          "shadow-xl shadow-indigo-500/5",
          className
        )}
      >
        <GradientBackground />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-float-bounce">
              <Compass className="size-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">
                {title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Choose your next step
              </p>
            </div>
            <Badge
              variant="secondary"
              className="ml-auto bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-0"
            >
              <Sparkles className="size-3 mr-1" />
              {steps.length} available
            </Badge>
          </div>

          {/* Steps Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {primaryStep && (
              <div className="sm:col-span-2 lg:col-span-1">
                <FlowCTA
                  href={primaryStep.path}
                  label={primaryStep.label}
                  description={primaryStep.description}
                  group={primaryStep.group}
                  primary
                />
              </div>
            )}
            {secondarySteps.map((step) => (
              <FlowCTA
                key={step.path}
                href={step.path}
                label={step.label}
                description={step.description}
                group={step.group}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // Card Variant (Default) - Glass-morphism with Animations
  // ============================================================================
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "quest-glass",
        "shadow-lg shadow-indigo-500/5",
        className
      )}
    >
      <GradientBackground />

      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="flex items-center gap-3 text-base font-bold">
          <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/30 animate-float-bounce">
            <Compass className="size-4 text-white" />
          </div>
          <span className="text-neutral-700 dark:text-neutral-200">{title}</span>
          {steps.length > 1 && (
            <Badge
              variant="outline"
              className="ml-auto border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-[10px]"
            >
              {steps.length} options
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 pt-0 space-y-3">
        {primaryStep && (
          <FlowCTA
            href={primaryStep.path}
            label={primaryStep.label}
            description={primaryStep.description}
            group={primaryStep.group}
            primary
          />
        )}
        {secondarySteps.map((step) => (
          <FlowCTA
            key={step.path}
            href={step.path}
            label={step.label}
            description={step.description}
            group={step.group}
          />
        ))}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// FlowGuideMini - Single Suggestion with Animation
// ============================================================================

export function FlowGuideMini({
  step: customStep,
  className,
}: {
  step?: NextStep;
  className?: string;
}) {
  const pathname = usePathname();
  const steps = getNextSteps(pathname, 1);
  const step = customStep || steps[0];

  if (!step) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 py-2.5 px-4 rounded-full",
        "quest-glass shadow-md",
        className
      )}
    >
      <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
        Next:
      </span>
      <FlowCTAInline
        href={step.path}
        label={step.label}
        group={step.group}
      />
    </div>
  );
}
