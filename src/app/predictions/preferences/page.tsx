"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { FlowGuide } from "@/components/shared/flow-guide";
import {
  AnimatedBackground,
  UnifiedCard,
} from "@/components/shared/page-layout";
import {
  Sparkles,
  ChevronLeft,
  DollarSign,
  Users,
  Shield,
  Bell,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all shadow-lg",
                currentStep > step.num
                  ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-rose-500/25"
                  : currentStep === step.num
                  ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-rose-500/25"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 shadow-none"
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
                currentStep >= step.num ? "text-rose-600 dark:text-rose-400" : "text-neutral-400 dark:text-neutral-500"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-1 mx-2 rounded-full transition-all",
                currentStep > step.num ? "bg-gradient-to-r from-rose-500 to-pink-500" : "bg-neutral-200 dark:bg-neutral-700"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Radio Option Component
function RadioOption({
  selected,
  onSelect,
  title,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20"
          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected ? "border-rose-500 bg-rose-500" : "border-neutral-300 dark:border-neutral-600"
          )}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-neutral-100">{title}</p>
          {description && <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
        </div>
      </div>
    </button>
  );
}

// Checkbox Option Component
function CheckboxOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all flex items-center gap-3",
        checked
          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25"
          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded flex items-center justify-center transition-all",
          checked ? "bg-white" : "border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
        )}
      >
        {checked && <Check className="w-3 h-3 text-rose-500" />}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function PreferencesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  // Form state
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [crowdPreference, setCrowdPreference] = useState("avoid");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  // Safety Options
  const [avoidLateNight, setAvoidLateNight] = useState(true);
  const [preferWellLit, setPreferWellLit] = useState(true);
  const [verifiedTransport, setVerifiedTransport] = useState(true);

  // Alert Preferences
  const [highCrowd, setHighCrowd] = useState(true);
  const [weatherDisruptions, setWeatherDisruptions] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);
  const [safetyWarnings, setSafetyWarnings] = useState(true);

  const loadingSteps = [
    "Analyzing your travel preferences...",
    "Finding the best routes and attractions...",
    "Optimizing your itinerary...",
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Navigate to plan page after completion
            setTimeout(() => {
              router.push("/predictions/plan");
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSteps.length - 1) return prev;
          return prev + 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [isLoading, router, loadingSteps.length]);

  const handleGeneratePlan = () => {
    // Store preferences
    sessionStorage.setItem(
      "travelPreferences",
      JSON.stringify({
        travelStyle,
        crowdPreference,
        budget: { min: minBudget, max: maxBudget },
        safetyOptions: { avoidLateNight, preferWellLit, verifiedTransport },
        alertPreferences: { highCrowd, weatherDisruptions, priceDrops, safetyWarnings },
      })
    );
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <Navigation />
      <GroupLabel group={5} />
      <AnimatedBackground variant="subtle" />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={2} />

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
            Your Travel Preferences
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">Customize your travel experience</p>
        </div>

        {/* Preferences Form */}
        <UnifiedCard gradient className="p-6 md:p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Travel Style */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <DollarSign className="size-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-100">Travel Style</span>
                </div>
                  <div className="space-y-3">
                    <RadioOption
                      selected={travelStyle === "low-budget"}
                      onSelect={() => setTravelStyle("low-budget")}
                      title="Low Budget"
                      description="Save money, maximize experiences"
                    />
                    <RadioOption
                      selected={travelStyle === "balanced"}
                      onSelect={() => setTravelStyle("balanced")}
                      title="Balanced"
                      description="Mix of comfort and value"
                    />
                    <RadioOption
                      selected={travelStyle === "comfortable"}
                      onSelect={() => setTravelStyle("comfortable")}
                      title="Comfortable"
                      description="Prioritize comfort and convenience"
                    />
                  </div>
                </div>

                {/* Crowd Preference */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Users className="size-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">Crowd Preference</span>
                  </div>
                  <div className="space-y-3">
                    <RadioOption
                      selected={crowdPreference === "avoid"}
                      onSelect={() => setCrowdPreference("avoid")}
                      title="Avoid crowds as much as possible"
                      description=""
                    />
                    <RadioOption
                      selected={crowdPreference === "some"}
                      onSelect={() => setCrowdPreference("some")}
                      title="Okay with some crowd"
                      description=""
                    />
                    <RadioOption
                      selected={crowdPreference === "no-preference"}
                      onSelect={() => setCrowdPreference("no-preference")}
                      title="No preference"
                      description=""
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <DollarSign className="size-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">Budget (per person)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">RM</span>
                      <Input
                        type="text"
                        placeholder="Min"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className="w-24 h-10 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                      />
                    </div>
                    <span className="text-neutral-400">to</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">RM</span>
                      <Input
                        type="text"
                        placeholder="Max"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className="w-24 h-10 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Safety Options */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Shield className="size-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">Safety Options</span>
                  </div>
                  <div className="space-y-3">
                    <CheckboxOption
                      checked={avoidLateNight}
                      onChange={setAvoidLateNight}
                      label="Avoid late-night activities"
                    />
                    <CheckboxOption
                      checked={preferWellLit}
                      onChange={setPreferWellLit}
                      label="Prefer well-lit / busy areas at night"
                    />
                    <CheckboxOption
                      checked={verifiedTransport}
                      onChange={setVerifiedTransport}
                      label="Only show verified transport providers"
                    />
                  </div>
                </div>

                {/* Alert Preferences */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Bell className="size-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">Alert Preferences</span>
                  </div>
                  <div className="space-y-3">
                    <CheckboxOption
                      checked={highCrowd}
                      onChange={setHighCrowd}
                      label="High crowd predictions"
                    />
                    <CheckboxOption
                      checked={weatherDisruptions}
                      onChange={setWeatherDisruptions}
                      label="Weather disruptions"
                    />
                    <CheckboxOption
                      checked={priceDrops}
                      onChange={setPriceDrops}
                      label="Price drops"
                    />
                    <CheckboxOption
                      checked={safetyWarnings}
                      onChange={setSafetyWarnings}
                      label="Safety warnings"
                    />
                  </div>
                </div>
              </div>
            </div>
        </UnifiedCard>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 h-12 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Back
          </Button>
          <Button
            onClick={handleGeneratePlan}
            className={cn(
              "group flex-1 h-12 font-semibold",
              "bg-gradient-to-r from-rose-500 to-pink-500",
              "hover:from-rose-600 hover:to-pink-600",
              "text-white border-0",
              "shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40",
              "transition-all duration-300"
            )}
          >
            Generate Travel Plan
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Flow Guide */}
        <FlowGuide
          variant="inline"
          title="Need assistance?"
          maxSuggestions={2}
        />
      </main>

      {/* Loading Dialog */}
      <Dialog open={isLoading} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false} className="sm:max-w-md bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col items-center text-center py-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl shadow-rose-500/30 animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              Generating Your Travel Plan
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6">
              Our AI is analyzing your preferences and creating a personalized itinerary...
            </p>

            {/* Loading Steps */}
            <div className="w-full space-y-3 mb-6">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all",
                    index <= loadingStep
                      ? "bg-rose-50 dark:bg-rose-900/20"
                      : "opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index <= loadingStep ? "bg-rose-500" : "bg-neutral-300 dark:bg-neutral-600"
                    )}
                  />
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">{step}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Progress</span>
                <span className="text-rose-600 dark:text-rose-400 font-medium">{loadingProgress}%</span>
              </div>
              <Progress value={loadingProgress} className="h-2 bg-neutral-200 dark:bg-neutral-700 [&>div]:bg-gradient-to-r [&>div]:from-rose-500 [&>div]:to-pink-500" />
            </div>

            {/* Powered by AI */}
            <div className="flex items-center gap-2 mt-6 text-sm text-neutral-400 dark:text-neutral-500">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

