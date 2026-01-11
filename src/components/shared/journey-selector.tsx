"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, RotateCcw, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groupConfig, userJourneys, type JourneyType } from "@/lib/flow-config";

// ============================================================================
// Journey Selector - Animated Path Selection
// ============================================================================

interface JourneySelectorProps {
  className?: string;
}

export function JourneySelector({ className }: JourneySelectorProps) {
  const [journeyType, setJourneyType] = useState<JourneyType>("first-time");

  const journeyOptions = {
    "first-time": {
      label: "I'm new here",
      description: "Start your adventure",
      icon: Sparkles,
      cta: { label: "Start Planning", href: "/predictions" },
    },
    returning: {
      label: "Welcome back",
      description: "Continue your journey",
      icon: RotateCcw,
      cta: { label: "My Travel", href: "/informatics/dashboard" },
    },
  };

  const currentOption = journeyOptions[journeyType];
  const journeySteps = userJourneys[journeyType];

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "quest-glass",
        "shadow-xl shadow-indigo-500/10",
        className
      )}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-full opacity-60"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.25) 0%, transparent 40%),
              radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute top-4 right-8 w-20 h-20 rounded-full animate-float-bounce opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-8 left-4 w-16 h-16 rounded-full animate-float-bounce opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            animationDelay: "1s",
          }}
        />
      </div>

      <CardContent className="relative z-10 p-6 md:p-8">
        {/* Journey Type Tabs */}
        <Tabs
          value={journeyType}
          onValueChange={(v) => setJourneyType(v as JourneyType)}
          className="mb-8"
        >
          <TabsList className="w-full h-14 bg-black/5 dark:bg-white/5 p-1.5 rounded-xl">
            <TabsTrigger
              value="first-time"
              className="flex-1 h-full gap-2.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-md transition-all"
            >
              <Sparkles className="size-4" />
              <div className="text-left">
                <div className="font-semibold text-sm">I&apos;m new here</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  Start fresh
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="returning"
              className="flex-1 h-full gap-2.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:shadow-md transition-all"
            >
              <RotateCcw className="size-4" />
              <div className="text-left">
                <div className="font-semibold text-sm">Welcome back</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  Continue
                </div>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Journey Path Visualization */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="size-4 text-indigo-500" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Recommended Path
            </p>
            <Badge
              variant="outline"
              className="ml-auto border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-[10px]"
            >
              {journeySteps.length} steps
            </Badge>
          </div>

          {/* Path Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 rounded-full" />

            {/* Steps */}
            <div className="relative flex items-start justify-between">
              {journeySteps.map((step, index) => {
                const config = groupConfig[step.group];
                const isFirst = index === 0;

                return (
                  <Link
                    key={step.path}
                    href={step.path}
                    className="group flex flex-col items-center w-20 md:w-24"
                  >
                    {/* Step Circle */}
                    <div
                      className={cn(
                        "relative size-12 rounded-full flex items-center justify-center",
                        "bg-gradient-to-br shadow-lg transition-all duration-300",
                        config.gradient,
                        "group-hover:scale-110 group-hover:shadow-xl",
                        "animate-bounce-in"
                      )}
                      style={{
                        boxShadow: `0 8px 24px -8px ${config.glowColor}`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {isFirst ? (
                        <Sparkles className="size-5 text-white" />
                      ) : (
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      )}

                      {/* Pulse ring on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
                          "animate-pulse-glow"
                        )}
                        style={{
                          boxShadow: `0 0 0 0 ${config.glowColor}`,
                        }}
                      />
                    </div>

                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-xs md:text-sm text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        {step.label}
                      </div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className={cn(
            "group w-full h-14 text-base",
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
            "text-white border-0",
            "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
            "shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40",
            "transition-all duration-300"
          )}
        >
          <Link href={currentOption.cta.href}>
            <currentOption.icon className="size-5 mr-2 group-hover:animate-pulse" />
            {currentOption.cta.label}
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Journey Progress Component
// ============================================================================

interface JourneyProgressProps {
  currentStep?: number;
  totalSteps?: number;
  journeyType?: JourneyType;
  className?: string;
}

export function JourneyProgress({
  currentStep = 1,
  totalSteps,
  journeyType = "first-time",
  className,
}: JourneyProgressProps) {
  const steps = userJourneys[journeyType];
  const total = totalSteps || steps.length;
  const progress = Math.round((currentStep / total) * 100);

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl",
        "quest-glass shadow-md",
        className
      )}
    >
      {/* Progress Ring */}
      <div className="relative size-14">
        <svg className="size-14 transform -rotate-90" viewBox="0 0 56 56">
          {/* Track */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            strokeWidth="4"
            className="stroke-neutral-200 dark:stroke-neutral-700"
          />
          {/* Progress */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={150.8}
            strokeDashoffset={150.8 - (150.8 * progress) / 100}
            className="stroke-indigo-500 transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {currentStep}/{total}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="font-semibold text-neutral-800 dark:text-neutral-100">
          Journey Progress
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {currentStep === total ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="size-4" /> Complete!
            </span>
          ) : (
            `${total - currentStep} steps remaining`
          )}
        </div>
      </div>

      {/* Percentage */}
      <Badge
        className={cn(
          "text-sm font-bold",
          progress === 100
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
        )}
      >
        {progress}%
      </Badge>
    </div>
  );
}
