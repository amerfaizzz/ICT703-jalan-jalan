"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Check, BookOpen, Calendar } from "lucide-react";
import { FlowGuide } from "@/components/shared/flow-guide";

interface Trip {
  id: number;
  name: string;
  destination: string;
  country: string;
  dates: string;
  image: string;
  budgetData: {
    category: string;
    planned: number;
    actual: number;
  }[];
}

const trips: Trip[] = [
  {
    id: 1,
    name: "Europe 2024",
    destination: "Europe",
    country: "Multiple Countries",
    dates: "Sep 5 - Sep 20",
    image: "✈️",
    budgetData: [
      { category: "Flights", planned: 3000, actual: 2800 },
      { category: "Hotels", planned: 4000, actual: 4500 },
      { category: "Food", planned: 2000, actual: 2800 },
      { category: "Transport", planned: 1000, actual: 1200 },
      { category: "Activities", planned: 1500, actual: 1800 },
    ],
  },
  {
    id: 2,
    name: "Penang Trip",
    destination: "Penang",
    country: "Malaysia",
    dates: "Aug 12 - Aug 14",
    image: "🍜",
    budgetData: [
      { category: "Transport", planned: 200, actual: 180 },
      { category: "Hotels", planned: 300, actual: 280 },
      { category: "Food", planned: 250, actual: 320 },
      { category: "Activities", planned: 150, actual: 120 },
    ],
  },
  {
    id: 3,
    name: "Johor Getaway",
    destination: "Johor Bahru",
    country: "Malaysia",
    dates: "Jul 5 - Jul 7",
    image: "🏖️",
    budgetData: [
      { category: "Transport", planned: 150, actual: 140 },
      { category: "Hotels", planned: 400, actual: 380 },
      { category: "Food", planned: 300, actual: 350 },
      { category: "Activities", planned: 200, actual: 180 },
    ],
  },
  {
    id: 4,
    name: "Melaka Heritage",
    destination: "Melaka",
    country: "Malaysia",
    dates: "Jun 8 - Jun 10",
    image: "🏛️",
    budgetData: [
      { category: "Transport", planned: 100, actual: 90 },
      { category: "Hotels", planned: 250, actual: 240 },
      { category: "Food", planned: 200, actual: 180 },
      { category: "Activities", planned: 50, actual: 60 },
    ],
  },
];

const tags = ["Hidden Fees", "Impulse Buy", "Transport", "Emergency", "Dining Out", "Shopping"];

export default function ReflectionPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [selectedTripId, setSelectedTripId] = useState<number>(1);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) || trips[0];
  const budgetData = selectedTrip.budgetData;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const maxValue = Math.max(...budgetData.flatMap((d) => [d.planned, d.actual]));

  const handleSave = () => {
    router.push("/informatics/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Trip Report</h1>
            <p className="text-sm text-muted-foreground">{selectedTrip.name}</p>
          </div>
        </div>

        {/* Trip Selection */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Select Trip</p>
          <div className="grid grid-cols-2 gap-2">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className={`text-left transition-all rounded-xl p-3 border ${
                  selectedTripId === trip.id
                    ? "border-2 border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{trip.image}</span>
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {trip.destination}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground truncate">{trip.country}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{trip.dates}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Trip Info */}
      <div className="px-6 mb-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
              {selectedTrip.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{selectedTrip.destination}</h3>
              <p className="text-sm text-muted-foreground">{selectedTrip.country}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {selectedTrip.dates}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bar Chart */}
      <div className="px-6 mb-6">
        <Card className="p-5">
          <h3 className="font-medium text-foreground mb-4 text-sm">Budget vs Actual Spend</h3>

          <div className="space-y-4">
            {budgetData.map((item, index) => {
              const plannedWidth = (item.planned / maxValue) * 100;
              const actualWidth = (item.actual / maxValue) * 100;
              const isOver = item.actual > item.planned;

              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                    <span
                      className={`text-xs font-medium ${isOver ? "text-yellow-600" : "text-green-600"}`}
                    >
                      {isOver ? "+" : ""}
                      {(((item.actual - item.planned) / item.planned) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative h-6 flex gap-1">
                    {/* Planned Bar */}
                    <div
                      className="h-full bg-secondary rounded-md transition-all duration-500"
                      style={{ width: `${plannedWidth}%` }}
                    />
                    {/* Actual Bar */}
                    <div
                      className={`h-full rounded-md transition-all duration-700 ${
                        isOver ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${actualWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-secondary" />
              <span className="text-xs text-muted-foreground">Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-xs text-muted-foreground">Under</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500" />
              <span className="text-xs text-muted-foreground">Over</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Reason Tags */}
      <div className="px-6 mb-6">
        <h3 className="font-medium text-foreground mb-3 text-sm">
          Why did you exceed the budget?
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {selectedTags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Note to Future Self */}
      <div className="px-6 mb-6">
        <h3 className="font-medium text-foreground mb-3 text-sm">Note to future self</h3>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What would you do differently next time?"
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Save Button */}
      <div className="px-6 mb-6">
        <Button onClick={handleSave} className="w-full" size="lg">
          <BookOpen className="w-4 h-4 mr-2" />
          Save Lesson to Profile
        </Button>
      </div>

      {/* Flow Guide */}
      <div className="px-6 mb-6">
        <FlowGuide
          variant="card"
          title="Share Your Experience"
          maxSuggestions={2}
        />
      </div>

    </div>
  );
}

