"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { FlowGuide } from "@/components/shared/flow-guide";
import {
  AnimatedBackground,
  UnifiedCard,
} from "@/components/shared/page-layout";
import { Sparkles, Plane, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [comfortCost, setComfortCost] = useState([50]);
  const [pacing, setPacing] = useState([50]);
  const [budget, setBudget] = useState("15000");

  const handleComplete = () => {
    router.push("/informatics/dashboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="vibrant" />

      <main className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex">
            <div className="size-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto shadow-xl shadow-violet-500/30 animate-float-bounce">
              <Sparkles className="size-10 text-white" />
            </div>
            <Badge className="absolute -top-1 -right-1 bg-violet-400 text-white border-0 shadow-lg">
              DNA
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-3">
            Define Your Travel DNA
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Help us understand your travel style to personalize your experience
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-6">
          {/* Comfort vs Cost Slider */}
          <UnifiedCard className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <TrendingUp className="size-5 text-white" />
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-100">Comfort vs. Cost</span>
            </div>

            <Slider
              value={comfortCost}
              onValueChange={setComfortCost}
              max={100}
              step={1}
              className="my-6"
            />

            <div className="flex justify-between text-sm">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all",
                  comfortCost[0] < 50
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                Value Saver
              </span>
              <span
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all",
                  comfortCost[0] >= 50
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                Luxury/Comfort
              </span>
            </div>
          </UnifiedCard>

          {/* Pacing Slider */}
          <UnifiedCard className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Plane className="size-5 text-white" />
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-100">Pacing</span>
            </div>

            <Slider
              value={pacing}
              onValueChange={setPacing}
              max={100}
              step={1}
              className="my-6"
            />

            <div className="flex justify-between text-sm">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all",
                  pacing[0] < 50
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                Relaxed
              </span>
              <span
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all",
                  pacing[0] >= 50
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                Packed Itinerary
              </span>
            </div>
          </UnifiedCard>

          {/* Budget Input */}
          <UnifiedCard gradient className="p-6">
            <label className="block font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
              Annual Travel Budget Goal
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-semibold">
                RM
              </span>
              <Input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
                className={cn(
                  "pl-12 h-14 text-xl font-bold",
                  "bg-white/50 dark:bg-neutral-800/50",
                  "border-neutral-200 dark:border-neutral-700",
                  "focus:border-violet-500 focus:ring-violet-500/20",
                  "transition-all duration-200"
                )}
                placeholder="15,000"
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
              This helps us track your spending patterns
            </p>
          </UnifiedCard>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <Button
            onClick={handleComplete}
            className={cn(
              "group w-full h-16 text-lg font-semibold",
              "bg-gradient-to-r from-violet-500 to-purple-500",
              "hover:from-violet-600 hover:to-purple-600",
              "text-white border-0",
              "shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40",
              "transition-all duration-300"
            )}
            size="lg"
          >
            <Sparkles className="size-5 mr-2" />
            Start My Journey
            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
            You can adjust these anytime in settings
          </p>
        </div>

        {/* Flow Guide */}
        <div className="mt-10">
          <FlowGuide
            variant="inline"
            title="Need help?"
            maxSuggestions={2}
          />
        </div>
      </main>
    </div>
  );
}

