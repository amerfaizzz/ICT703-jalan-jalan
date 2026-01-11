"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PageLayout,
  PageHeader,
  UnifiedCard,
} from "@/components/shared/page-layout";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Minus,
  Plus,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PredictionsPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState(2);

  const canContinue = destination && travelDates;

  const handleContinue = () => {
    sessionStorage.setItem("tripDetails", JSON.stringify({
      destination,
      travelDates,
      travelers
    }));
    router.push("/predictions/preferences");
  };

  return (
    <PageLayout
      group={5}
      background="vibrant"
      maxWidth="md"
      flowGuideVariant="inline"
      flowGuideTitle="Need assistance?"
    >
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="relative inline-flex">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto shadow-xl shadow-rose-500/30 animate-float-bounce">
            <Sparkles className="size-10 text-white" />
          </div>
          <Badge className="absolute -top-1 -right-1 bg-amber-400 text-amber-900 border-0 shadow-lg">
            AI
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-3">
          Plan Your Perfect Trip
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          Tell us about your upcoming adventure and we&apos;ll create a personalized itinerary powered by AI
        </p>
      </div>

      {/* Trip Details Form */}
      <UnifiedCard gradient className="p-6 md:p-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/25">
            <Sparkles className="size-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-100">
              Trip Details
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Enter your travel information to get started
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Destination Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <div className="size-6 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <MapPin className="size-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              Destination
            </label>
            <Input
              type="text"
              placeholder="Search Malaysian destinations..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={cn(
                "h-14 text-base",
                "bg-white/50 dark:bg-neutral-800/50",
                "border-neutral-200 dark:border-neutral-700",
                "focus:border-rose-500 focus:ring-rose-500/20",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Travel Dates Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <div className="size-6 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <Calendar className="size-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              Travel Dates
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Select travel dates"
                value={travelDates}
                onChange={(e) => setTravelDates(e.target.value)}
                className={cn(
                  "h-14 pl-12 text-base",
                  "bg-white/50 dark:bg-neutral-800/50",
                  "border-neutral-200 dark:border-neutral-700",
                  "focus:border-rose-500 focus:ring-rose-500/20",
                  "transition-all duration-200"
                )}
              />
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              <div className="size-6 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <Users className="size-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              Number of Travelers
            </label>
            <div className="flex items-center gap-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="size-12 rounded-full border-neutral-200 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-300 transition-all"
              >
                <Minus className="size-5" />
              </Button>
              <span className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 min-w-[4rem] text-center tabular-nums">
                {travelers}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTravelers(travelers + 1)}
                className="size-12 rounded-full border-neutral-200 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-300 transition-all"
              >
                <Plus className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </UnifiedCard>

      {/* Continue Button */}
      <div className="mt-8">
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className={cn(
            "group w-full h-16 text-lg font-semibold",
            "bg-gradient-to-r from-rose-500 to-pink-500",
            "hover:from-rose-600 hover:to-pink-600",
            "text-white border-0",
            "shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40",
            "disabled:opacity-50 disabled:shadow-none",
            "transition-all duration-300"
          )}
          size="lg"
        >
          Continue to Preferences
          <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
          Please fill in all fields to continue
        </p>
      </div>
    </PageLayout>
  );
}
