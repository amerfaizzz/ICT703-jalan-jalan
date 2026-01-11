"use client";

import { useState, useEffect } from "react";
import { Calendar, TrendingDown, TrendingUp, Lightbulb, RefreshCw, ChevronLeft, ChevronRight, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DonutChart, MetricCard, WatchlistCard } from "@/components/informatics";
import { FlowGuide } from "@/components/shared/flow-guide";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  AnimatedBackground,
  UnifiedCard,
  PageHeader,
} from "@/components/shared/page-layout";
import { cn } from "@/lib/utils";

const insights = [
  {
    text: "You tend to overspend on food by 20%. We have adjusted your next budget recommendation.",
  },
  {
    text: "You missed typical local events during your last travel period. Consider checking local calendars next time.",
  },
  {
    text: "You travelled during the peak period. If you had travelled a week earlier, you could have saved around RM 50.00.",
  },
  {
    text: "Your accommodation costs have decreased by 15% compared to last year. Great job finding better deals!",
  },
  {
    text: "You typically book flights 3 weeks before departure. Booking 6 weeks early could save you up to 25%.",
  },
];

const currencyRates = [
  { currency: "EUR", rate: 4.72, change: 0.02, flag: "🇪🇺" },
  { currency: "GBP", rate: 5.58, change: -0.03, flag: "🇬🇧" },
  { currency: "CHF", rate: 4.89, change: 0.01, flag: "🇨🇭" },
];

export default function InformaticsDashboardPage() {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
      setIsAnimating(false);
    }, 300);
    setIsPaused(true);
  };

  const goToPrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
      setIsAnimating(false);
    }, 300);
    setIsPaused(true);
  };

  const goToInsight = (index: number) => {
    if (index === currentInsight) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentInsight(index);
      setIsAnimating(false);
    }, 300);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [isPaused, currentInsight]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={3} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl shadow-violet-500/30 animate-float-bounce">
            <PieChart className="size-7 text-white" />
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Welcome back, Traveler</p>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              My Travel Pulse
            </h1>
          </div>
        </div>

        {/* Donut Chart Section */}
        <UnifiedCard gradient className="p-6 mb-6">
          <DonutChart percentage={65} label="Yearly Budget Used" total="RM 15,000" />
        </UnifiedCard>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <UnifiedCard className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <Calendar className="size-4 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">4</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Trips Taken</p>
          </UnifiedCard>

          <UnifiedCard className="p-4 border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <TrendingUp className="size-4 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">12%</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Avg. Overspend</p>
          </UnifiedCard>

          <UnifiedCard className="p-4 border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <TrendingDown className="size-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">88%</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Savings Goal</p>
          </UnifiedCard>
        </div>

        {/* Watchlist */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-4">
            Active Trip Watchlist
          </h2>
          <div className="space-y-3">
            <WatchlistCard
              destination="London"
              country="United Kingdom"
              priceStatus="falling"
              change={-8}
              avgPrice="RM 3,200"
            />
            <WatchlistCard
              destination="Tokyo"
              country="Japan"
              priceStatus="rising"
              change={5}
              avgPrice="RM 4,500"
            />
          </div>
        </div>

        {/* Insight Box with Currency Exchange */}
        <div className="flex gap-4 mb-8">
          {/* Insight Section */}
          <UnifiedCard gradient className="flex-1 p-5">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
                <Lightbulb className="size-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-neutral-800 dark:text-neutral-100">Insight</p>
                    <Badge variant="secondary" className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-0 text-xs">
                      AI
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                      onClick={goToPrevious}
                      disabled={insights.length <= 1}
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                      onClick={goToNext}
                      disabled={insights.length <= 1}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "transition-all duration-300",
                    isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  )}
                >
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {insights[currentInsight].text}
                  </p>
                </div>
                {/* Progress dots */}
                <div className="flex gap-1.5 mt-4">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToInsight(index)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === currentInsight
                          ? "w-6 bg-violet-500"
                          : "w-1.5 bg-violet-200 dark:bg-violet-800 hover:bg-violet-300 dark:hover:bg-violet-700"
                      )}
                      aria-label={`Go to insight ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </UnifiedCard>

          {/* Currency Exchange Section */}
          <UnifiedCard className="w-36 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">EUR/MYR</span>
              <RefreshCw className="size-3.5 text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors" />
            </div>
            <div className="space-y-2.5">
              {currencyRates.map((rate) => (
                <div key={rate.currency} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{rate.flag}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{rate.currency}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100">
                      {rate.rate.toFixed(2)}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] ml-1 font-medium",
                        rate.change >= 0 ? "text-emerald-600" : "text-red-500"
                      )}
                    >
                      {rate.change >= 0 ? "+" : ""}
                      {rate.change.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-neutral-400 mt-3 text-center">Live rates</p>
          </UnifiedCard>
        </div>

        {/* Flow Guide */}
        <FlowGuide
          variant="card"
          title="Explore More"
          maxSuggestions={2}
        />
      </main>
    </div>
  );
}
