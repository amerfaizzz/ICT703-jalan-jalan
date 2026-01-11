"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Minus,
  Plus,
  ArrowRight
} from "lucide-react";
import { FlowGuide } from "@/components/shared/flow-guide";

export default function PredictionsPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState(2);

  const canContinue = destination && travelDates;

  const handleContinue = () => {
    // Store form data in sessionStorage for next step
    sessionStorage.setItem("tripDetails", JSON.stringify({
      destination,
      travelDates,
      travelers
    }));
    router.push("/predictions/preferences");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <GroupLabel group={5} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
            <Sparkles className="w-10 h-10 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs">✦</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Plan Your Perfect Trip
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Tell us about your upcoming adventure and we&apos;ll create a personalized itinerary powered by AI
          </p>
        </div>

        {/* Trip Details Form */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-slate-900">Trip Details</h2>
                <p className="text-sm text-slate-500">Enter your travel information to get started</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Destination Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  Destination
                </label>
                <Input
                  type="text"
                  placeholder="Search Malaysian destinations..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              {/* Travel Dates Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Travel Dates
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Select travel dates"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    className="h-12 pl-12 bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Users className="w-4 h-4 text-teal-600" />
                  Number of Travelers
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="h-10 w-10 rounded-full border-slate-200"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-2xl font-semibold text-slate-900 min-w-[3rem] text-center">
                    {travelers}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTravelers(travelers + 1)}
                    className="h-10 w-10 rounded-full border-slate-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="mt-8">
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full h-14 text-base bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50"
            size="lg"
          >
            Continue to Preferences
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-center text-sm text-slate-400 mt-4">
            Please fill in all fields to continue
          </p>
        </div>

        {/* Flow Guide */}
        <div className="mt-8">
          <FlowGuide variant="inline" title="Need assistance?" />
        </div>
      </main>
    </div>
  );
}
