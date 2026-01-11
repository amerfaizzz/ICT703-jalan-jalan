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
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { Search, Users, Calendar, ChevronDown } from "lucide-react";
import { FlowGuide } from "@/components/shared/flow-guide";

export default function DashboardPage() {
  const [attractionFilter, setAttractionFilter] = useState<"All" | "Open">("All");
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc">("asc");
  const [halalSortBy, setHalalSortBy] = useState<"rating" | "distance">("rating");
  const [budgetSortOrder, setBudgetSortOrder] = useState<"asc" | "desc">("desc");

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navigation />
      <GroupLabel group={2} />

      <main className="container mx-auto px-6 lg:px-24 py-8">
        {/* Search Bar + CTA Card Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Left: Search inputs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Destination Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm min-w-[180px] max-w-[225px]">
              <Search className="size-5 text-[#64748B]" />
              <input
                type="text"
                defaultValue="Kuala Lumpur"
                className="flex-1 text-sm bg-transparent outline-none text-[#64748B]"
              />
            </div>

            {/* Pax Selector */}
            <div className="flex items-center gap-2 px-2 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
              <Users className="size-5 text-[#64748B]" />
              <span className="text-sm text-[#737373]">1</span>
              <ChevronDown className="size-4 text-[#A3A3A3]" />
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-2 px-2 py-2 bg-white border border-[#E2E8F0] rounded-lg shadow-sm">
              <Calendar className="size-5 text-[#64748B]" />
              <span className="text-sm text-[#64748B]">23/01/25</span>
            </div>

            {/* Search Button */}
            <Button className="bg-[#0F172A] text-[#F8FAFC] px-4 h-9 text-sm font-semibold rounded-lg">
              Search
            </Button>
          </div>

          {/* Right: CTA Card */}
          <Card className="border-[#9333EA] shadow-sm bg-white">
            <CardContent className="flex items-center gap-8 p-4">
              <p className="text-base text-[#334155]">
                Check the itinerary that we plan for you!
              </p>
              <Link href="/dashboard/schedule">
                <Button className="bg-[#0F172A] text-[#F8FAFC] px-4 text-sm font-semibold rounded-lg">
                  Schedule & Updates
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Page Title */}
        <h2 className="text-2xl md:text-[30px] font-semibold text-[#334155] leading-tight tracking-tight mb-6">
          Data found for your destination:
        </h2>

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
        <div className="mt-8">
          <FlowGuide
            variant="card"
            title="Continue Your Journey"
            maxSuggestions={2}
          />
        </div>
      </main>
    </div>
  );
}
