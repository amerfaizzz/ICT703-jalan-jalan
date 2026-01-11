"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groupConfig, userJourneys, type JourneyType } from "@/lib/flow-config";

interface JourneySelectorProps {
  className?: string;
}

export function JourneySelector({ className }: JourneySelectorProps) {
  const [journeyType, setJourneyType] = useState<JourneyType>("first-time");

  const journeyOptions = {
    "first-time": {
      label: "I'm new here",
      icon: Sparkles,
      cta: { label: "Start Planning", href: "/predictions" },
    },
    returning: {
      label: "Welcome back",
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
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
        "border border-black/10 dark:border-white/10",
        "shadow-xl shadow-black/5",
        className
      )}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-full opacity-50"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <CardContent className="relative z-10 p-6">
        {/* Journey Type Tabs */}
        <Tabs
          value={journeyType}
          onValueChange={(v) => setJourneyType(v as JourneyType)}
          className="mb-6"
        >
          <TabsList className="w-full bg-black/5 dark:bg-white/5 p-1">
            <TabsTrigger
              value="first-time"
              className="flex-1 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
            >
              <Sparkles className="size-4" />
              I&apos;m new here
            </TabsTrigger>
            <TabsTrigger
              value="returning"
              className="flex-1 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
            >
              <RotateCcw className="size-4" />
              Welcome back
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Journey Path */}
        <div className="mb-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
            Recommended journey:
          </p>
          <div className="flex items-center justify-between py-4 px-2 bg-black/5 dark:bg-white/5 rounded-xl">
            {journeySteps.map((step, index) => {
              const config = groupConfig[step.group];
              return (
                <div key={step.path} className="flex items-center">
                  <Link
                    href={step.path}
                    className="flex flex-col items-center group"
                  >
                    <div
                      className={cn(
                        "size-10 rounded-full flex items-center justify-center text-sm font-bold text-white mb-1.5",
                        "bg-gradient-to-br",
                        config.gradient,
                        "group-hover:scale-110 transition-transform",
                        "shadow-md"
                      )}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                      {step.label}
                    </span>
                  </Link>
                  {index < journeySteps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-3 bg-gradient-to-r from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded-full min-w-[24px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className={cn(
            "w-full h-12",
            "bg-gradient-to-r from-emerald-500 to-teal-500",
            "text-white border-0",
            "hover:from-emerald-600 hover:to-teal-600",
            "shadow-lg shadow-emerald-500/25"
          )}
        >
          <Link href={currentOption.cta.href}>
            {currentOption.cta.label}
            <ArrowRight className="size-5 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
