"use client";

import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlowCTA, FlowCTAInline } from "./flow-cta";
import { getNextSteps, type NextStep } from "@/lib/flow-config";

// ============================================================================
// Gradient Background Component (Group 1 style)
// ============================================================================

function GradientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <div
        className="absolute w-full h-full opacity-60"
        style={{
          background: `
            radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
}

// ============================================================================
// FlowGuide Component
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

  // Inline variant - compact badges
  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Compass className="size-4" />
          {title}
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

  // Banner variant - full width with gradient background
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
          "border border-black/5 dark:border-white/10",
          "shadow-xl shadow-black/5",
          className
        )}
      >
        <GradientBackground />

        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="size-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Compass className="size-4 text-white" />
            </div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              {title}
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </div>
    );
  }

  // Card variant (default) - glass-morphism card
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
        "border border-black/5 dark:border-white/10",
        "shadow-lg shadow-black/5",
        className
      )}
    >
      <GradientBackground />

      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <div className="size-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Compass className="size-3.5 text-white" />
          </div>
          <span className="text-neutral-700 dark:text-neutral-200">{title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 pt-0 space-y-2">
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
// FlowGuideMini - Single suggestion
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
        "inline-flex items-center gap-2 py-2 px-3 rounded-full",
        "bg-white/60 dark:bg-white/10 backdrop-blur-sm",
        "border border-black/5 dark:border-white/10",
        className
      )}
    >
      <span className="text-sm text-neutral-500">Next:</span>
      <FlowCTAInline href={step.path} label={step.label} group={step.group} />
    </div>
  );
}
