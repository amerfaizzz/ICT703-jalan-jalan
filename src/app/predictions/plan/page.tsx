"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import {
  Sparkles,
  ChevronLeft,
  MapPin,
  Calendar,
  Users,
  Share2,
  Check,
  Star,
  Users as CrowdIcon,
  CloudRain,
  Tag,
  Shield,
  Clock,
  Lightbulb,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowGuide } from "@/components/shared/flow-guide";

// Step Indicator Component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Trip Details" },
    { num: 2, label: "Preferences" },
    { num: 3, label: "Your Plan" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                currentStep > step.num
                  ? "bg-teal-500 text-white"
                  : currentStep === step.num
                  ? "bg-teal-500 text-white"
                  : "bg-slate-200 text-slate-500"
              )}
            >
              {currentStep > step.num ? (
                <Check className="w-5 h-5" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 font-medium",
                currentStep >= step.num ? "text-teal-600" : "text-slate-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-1 mx-2 rounded-full transition-all",
                currentStep > step.num ? "bg-teal-500" : "bg-slate-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Plan Card Component
function PlanCard({
  plan,
  selected,
  onSelect,
  recommended,
}: {
  plan: {
    id: string;
    title: string;
    description: string;
    price: number;
    crowdLevel: string;
    crowdColor: string;
    features?: string[];
  };
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative w-full p-5 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-teal-500 bg-white shadow-lg"
          : "border-slate-200 hover:border-slate-300 bg-white"
      )}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-teal-500 text-white px-3 py-1 text-xs flex items-center gap-1">
            <Star className="w-3 h-3" />
            Recommended
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-900">{plan.title}</h3>
        {selected && (
          <Badge className="bg-teal-500 text-white">Selected</Badge>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-4">{plan.description}</p>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-2xl font-bold text-slate-900">
          RM {plan.price.toLocaleString()}
        </span>
        <span className="text-sm text-slate-500">/ person</span>
      </div>

      <Badge
        className={cn(
          "text-xs font-medium",
          plan.crowdColor === "green"
            ? "bg-green-100 text-green-700"
            : plan.crowdColor === "yellow"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-orange-100 text-orange-700"
        )}
      >
        {plan.crowdLevel}
      </Badge>

      {plan.features && selected && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-teal-500" />
              {feature}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

// Alert Card Component
function AlertCard({
  type,
  title,
  location,
  badge,
  badgeColor,
  details,
  suggestion,
  icon: Icon,
  iconBgColor,
}: {
  type: string;
  title: string;
  location: string;
  badge: string;
  badgeColor: string;
  details: { icon: typeof Clock; text: string }[];
  suggestion: string;
  icon: typeof CrowdIcon;
  iconBgColor: string;
}) {
  return (
    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="pt-5">
        <div className="flex items-start gap-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBgColor)}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-slate-900">{title}</h4>
              <Badge
                className={cn(
                  "text-xs font-medium",
                  badgeColor === "red"
                    ? "bg-red-500 text-white"
                    : badgeColor === "orange"
                    ? "bg-orange-500 text-white"
                    : "bg-green-500 text-white"
                )}
              >
                {badge}
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mb-3">{location}</p>

            <div className="space-y-1 mb-3">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-500">
                  <detail.icon className="w-4 h-4" />
                  {detail.text}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-start gap-2 text-sm text-teal-600 italic">
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Tip Card Component
function TipCard({ tipNumber, text }: { tipNumber: number; text: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
      <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <span className="text-teal-600 font-semibold">Tip {tipNumber}: </span>
        <span className="text-slate-700">{text}</span>
      </div>
    </div>
  );
}

export default function PlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("balanced");
  const [alertFilter, setAlertFilter] = useState("all");
  const [tripDetails, setTripDetails] = useState({
    destination: "Langkawi, Kedah",
    dates: "Dec 18, 2025 to Dec 20, 2025",
    travelers: 2,
    estimatedCost: 1050,
  });

  useEffect(() => {
    // Try to get trip details from sessionStorage
    const stored = sessionStorage.getItem("tripDetails");
    if (stored) {
      const data = JSON.parse(stored);
      setTripDetails({
        destination: data.destination || "Langkawi, Kedah",
        dates: data.travelDates || "Dec 18, 2025 to Dec 20, 2025",
        travelers: data.travelers || 2,
        estimatedCost: 1050,
      });
    }
  }, []);

  const plans = [
    {
      id: "low-crowd",
      title: "Low Crowd Plan",
      description: "Avoid peak hours & crowded spots",
      price: 1200,
      crowdLevel: "LOW-MEDIUM Crowd",
      crowdColor: "green",
    },
    {
      id: "balanced",
      title: "Balanced Plan",
      description: "Mix of popular & hidden gems",
      price: 1050,
      crowdLevel: "MED-HIGH Crowd",
      crowdColor: "orange",
      features: ["Best of both worlds", "Flexible timing", "Well-rounded experience"],
    },
    {
      id: "budget-saver",
      title: "Budget Saver Plan",
      description: "Cheapest flights + mid-range hotel",
      price: 900,
      crowdLevel: "MEDIUM Crowd",
      crowdColor: "yellow",
    },
  ];

  const alerts = [
    {
      type: "crowd",
      title: "Crowd Forecast",
      location: "Cenang Beach",
      badge: "HIGH",
      badgeColor: "red",
      icon: CrowdIcon,
      iconBgColor: "bg-orange-100 text-orange-600",
      details: [
        { icon: Calendar, text: "Sat, 13 Apr · 5-8 PM" },
        { icon: Clock, text: "Long waiting time expected" },
      ],
      suggestion:
        "AI Suggestion: Cenang Beach will be quite busy during this time. Your Balanced Plan allows flexibility - you can either visit earlier (9-11 AM) for a quieter experience, or embrace the evening crowd for a more vibrant atmosphere.",
    },
    {
      type: "weather",
      title: "Weather Alert",
      location: "Island Hopping",
      badge: "WARNING",
      badgeColor: "orange",
      icon: CloudRain,
      iconBgColor: "bg-blue-100 text-blue-600",
      details: [
        { icon: Calendar, text: "13 Apr · Afternoon" },
        { icon: MapPin, text: "Affects: Island hopping activity" },
      ],
      suggestion:
        "AI Suggestion: Thunderstorms may affect your island hopping. With your Balanced Plan's flexible scheduling, I recommend moving this activity to Day 2 morning when weather conditions are more favorable and you can still enjoy the experience.",
    },
    {
      type: "price",
      title: "Price Drop",
      location: "Hotel ABC",
      badge: "SAVE RM 80",
      badgeColor: "green",
      icon: Tag,
      iconBgColor: "bg-green-100 text-green-600",
      details: [
        { icon: Clock, text: "Valid until: Tonight, 11:59 PM" },
      ],
      suggestion:
        "AI Suggestion: This price drop on Hotel ABC is a great opportunity for your Balanced Plan! It offers a perfect mix of comfort and value, located near both popular attractions and hidden gems - exactly what your plan emphasizes.",
    },
    {
      type: "safety",
      title: "Safety Notice",
      location: "Area X",
      badge: "CAUTION",
      badgeColor: "orange",
      icon: Shield,
      iconBgColor: "bg-red-100 text-red-600",
      details: [
        { icon: MapPin, text: "Night time" },
        { icon: Shield, text: "Use main road / different area" },
      ],
      suggestion:
        "AI Suggestion: Area X should be avoided at night. Your Balanced Plan includes well-lit areas, so consider exploring this area during daylight hours (10 AM - 6 PM) when it's safer and you can still discover its hidden gems.",
    },
  ];

  const tips = [
    "Mix your itinerary: visit popular spots like Cenang Beach in the morning, then explore hidden gems like Durian Perangin Waterfall in the afternoon.",
    "Take advantage of flexible timing - many attractions offer discounted rates during off-peak hours while still being enjoyable.",
    "Consider staying near the main area but in a quieter side street for the best of both worlds.",
  ];

  const filteredAlerts =
    alertFilter === "all"
      ? alerts
      : alerts.filter((alert) => alert.type === alertFilter);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <GroupLabel group={5} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={3} />

        {/* AI-Generated Travel Plan Header */}
        <Card className="shadow-sm border-slate-200 mb-8">
          <CardContent className="py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-slate-900">AI-Generated Travel Plan</h1>
                    <Badge className="bg-teal-100 text-teal-700 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      AI Powered
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tripDetails.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {tripDetails.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tripDetails.travelers} travelers
                    </span>
                    <span className="font-medium text-slate-900">
                      Est. cost: RM {tripDetails.estimatedCost.toLocaleString()} / person
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-slate-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Choose Your Plan */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                recommended={plan.id === "balanced"}
              />
            ))}
          </div>
        </div>

        {/* AI Travel Predictions & Alerts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-slate-900">AI Travel Predictions & Alerts</h2>
              <Badge className="bg-teal-100 text-teal-700 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Real-time
              </Badge>
            </div>
            <Select value={alertFilter} onValueChange={setAlertFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Alerts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="crowd">Crowd</SelectItem>
                <SelectItem value="weather">Weather</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredAlerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        </div>

        {/* AI Personalized Suggestions */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-slate-900">AI Personalized Suggestions</h2>
            <Badge className="bg-teal-100 text-teal-700 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Smart Tips
            </Badge>
          </div>

          <Card className="shadow-sm border-teal-200 bg-teal-50/30">
            <CardContent className="py-5 space-y-4">
              {tips.map((tip, index) => (
                <TipCard key={index} tipNumber={index + 1} text={tip} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="h-14 px-12 bg-teal-500 hover:bg-teal-600 text-white text-lg"
          >
            Confirm & Save Plan
          </Button>
        </div>

        {/* Flow Guide - What's Next */}
        <div className="mt-12">
          <FlowGuide
            variant="banner"
            title="What's Next?"
            maxSuggestions={3}
          />
        </div>
      </main>
    </div>
  );
}

