"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AttractionCard,
  PriceComparisonCard,
  SafetyCard,
  WeatherCard,
  TrendingCard,
  CrowdTrafficCard,
  HalalSpotsCard,
  BudgetMetricsCard,
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { FlowGuide } from "@/components/shared/flow-guide";
import {
  AnimatedBackground,
  UnifiedCard,
  PageSection,
} from "@/components/shared/page-layout";
import { Search, Users, Calendar, ChevronDown, LayoutDashboard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [attractionFilter, setAttractionFilter] = useState<"All" | "Open">("All");
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc">("asc");
  const [halalSortBy, setHalalSortBy] = useState<"rating" | "distance">("rating");
  const [budgetSortOrder, setBudgetSortOrder] = useState<"asc" | "desc">("desc");

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={2} />
      <AnimatedBackground variant="subtle" />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-8">
        {/* Search Bar + CTA Card Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Left: Search inputs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Destination Input */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-3",
              "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm",
              "border border-neutral-200 dark:border-neutral-700",
              "rounded-xl shadow-lg shadow-black/5",
              "min-w-[180px] max-w-[225px]",
              "transition-all duration-200 hover:shadow-xl"
            )}>
              <Search className="size-5 text-neutral-400" />
              <input
                type="text"
                defaultValue="Kuala Lumpur"
                className="flex-1 text-sm bg-transparent outline-none text-neutral-700 dark:text-neutral-200"
              />
            </div>

            {/* Pax Selector */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-3",
              "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm",
              "border border-neutral-200 dark:border-neutral-700",
              "rounded-xl shadow-lg shadow-black/5",
              "transition-all duration-200 hover:shadow-xl cursor-pointer"
            )}>
              <Users className="size-5 text-blue-500" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200 font-medium">1</span>
              <ChevronDown className="size-4 text-neutral-400" />
            </div>

            {/* Date Picker */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-3",
              "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm",
              "border border-neutral-200 dark:border-neutral-700",
              "rounded-xl shadow-lg shadow-black/5",
              "transition-all duration-200 hover:shadow-xl cursor-pointer"
            )}>
              <Calendar className="size-5 text-blue-500" />
              <span className="text-sm text-neutral-700 dark:text-neutral-200">23/01/25</span>
            </div>

            {/* Search Button */}
            <Button
              className={cn(
                "h-12 px-6 font-semibold",
                "bg-gradient-to-r from-blue-500 to-indigo-500",
                "hover:from-blue-600 hover:to-indigo-600",
                "text-white border-0",
                "shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40",
                "transition-all duration-300"
              )}
            >
              Search
            </Button>
          </div>

          {/* Right: CTA Card */}
          <UnifiedCard gradient className="group p-4">
            <div className="flex items-center gap-6">
              <p className="text-base text-neutral-700 dark:text-neutral-200">
                Check the itinerary that we plan for you!
              </p>
              <Link href="/dashboard/schedule">
                <Button
                  className={cn(
                    "font-semibold",
                    "bg-gradient-to-r from-blue-500 to-indigo-500",
                    "hover:from-blue-600 hover:to-indigo-600",
                    "text-white border-0",
                    "shadow-lg shadow-blue-500/25",
                    "transition-all duration-300"
                  )}
                >
                  Schedule & Updates
                  <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </UnifiedCard>
        </div>

        {/* Page Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float-bounce">
            <LayoutDashboard className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              Data found for your destination
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Live travel insights for Kuala Lumpur
            </p>
          </div>
        </div>

        {/* Main Dashboard Layout - Left grid + Right column */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - 2 column grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1 */}
            <AttractionCard
              filter={attractionFilter}
              onFilterChange={setAttractionFilter}
            />
            <PriceComparisonCard
              sortOrder={priceSortOrder}
              onSortChange={() =>
                setPriceSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            />

            {/* Row 2 */}
            <SafetyCard />
            <HalalSpotsCard
              sortBy={halalSortBy}
              onSortChange={() =>
                setHalalSortBy((prev) => (prev === "rating" ? "distance" : "rating"))
              }
            />

            {/* Row 3 */}
            <WeatherCard />
            <TrendingCard />
          </div>

          {/* Right Section - Single column */}
          <div className="w-full lg:w-[408px] flex flex-col gap-6">
            <CrowdTrafficCard />
            <BudgetMetricsCard
              sortOrder={budgetSortOrder}
              onSortChange={() =>
                setBudgetSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            />
          </div>
        </div>

        {/* Flow Guide */}
        <div className="mt-10">
          <FlowGuide
            variant="banner"
            title="Continue Your Journey"
            maxSuggestions={3}
          />
        </div>
      </main>
    </div>
  );
}
