"use client";

import { Search, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { EventCard } from "@/components/community/event-card";
import { FlowGuide } from "@/components/shared/flow-guide";
import Link from "next/link";

// Trip Card component
function TripCard({ title, dates, status }: { title: string; dates: string; status: "Active" | "Upcoming" }) {
  return (
    <Card className="w-full border border-purple-950 shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 space-y-1">
        <h3 className="font-semibold text-slate-700">{title}</h3>
        <p className="text-sm text-slate-500">{dates}</p>
      </div>
      <div className="p-6 flex items-center justify-between">
        <Badge variant="outline" className="rounded-lg border-purple-950">{status}</Badge>
        <span className="font-semibold text-slate-700">View More</span>
      </div>
    </Card>
  );
}

// Story Card component
function StoryCard({
  id,
  location,
  place,
  author,
  authorBadge,
  tags,
  bgColor
}: {
  id: number;
  location: string;
  place: string;
  author: string;
  authorBadge?: string;
  tags: string[];
  bgColor: string;
}) {
  return (
    <Link href={`/community/stories/${id}`}>
      <Card className="w-full border border-purple-950 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer gap-0 py-0">
        <div className="p-6 space-y-1 min-h-[88px] flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <MapPin className="w-6 h-6" />
            <span className="font-semibold text-slate-700">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{author}</span>
            {authorBadge && <Badge variant="outline" className="rounded-lg border-purple-950">{authorBadge}</Badge>}
          </div>
        </div>
        <div className={`h-64 md:h-64 lg:h-64 ${bgColor} relative`}>
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="rounded-lg border-purple-950 bg-white/90 backdrop-blur-sm">{tag}</Badge>
              ))}
            </div>
            <span className="text-sm font-semibold text-white">{place}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GroupLabel group={4} />

      {/* Search Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-slate-700 mb-6" style={{ letterSpacing: "-0.03em" }}>
          Get live data from your destination.
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-8 lg:gap-12">
          <div className="relative flex-1 max-w-[536px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              placeholder="Where are you travelling to?"
              className="pl-10 py-2 border border-purple-950 shadow-sm rounded-lg"
            />
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg">
            Search
          </Button>
        </div>
        {/* Flow Guide */}
        <div className="mt-6">
          <FlowGuide variant="inline" title="Ready to plan?" />
        </div>
      </section>

      {/* My Trip Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700" style={{ letterSpacing: "-0.03em" }}>
            My Trip
          </h2>
          <span className="text-base md:text-lg lg:text-xl font-semibold text-slate-700">Create New Trip</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <TripCard 
            title="Tokyo, Japan" 
            dates="25th December - 31 December 2025" 
            status="Active" 
          />
          <TripCard 
            title="Tokyo, Japan" 
            dates="25th December - 31 December 2025" 
            status="Upcoming" 
          />
          <TripCard 
            title="Tokyo, Japan" 
            dates="25th December - 31 December 2025" 
            status="Upcoming" 
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700" style={{ letterSpacing: "-0.03em" }}>
            Upcoming Events
          </h2>
          <Link href="/community/events" className="text-base md:text-lg lg:text-xl font-semibold text-slate-700">
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <EventCard
            title="Jom Cuti Sekolah 2025"
            subtitle="School holiday travel deals and family activities"
            date="12 - 15 January 2025"
            location="Kuala Lumpur"
            type="Promotion Event"
            badges={["Family-friendly", "School Holiday"]}
            imageGradient="bg-gradient-to-br from-yellow-200 to-orange-300"
          />
          <EventCard
            title="Cuti Cuti Muslim-Friendly Fair"
            subtitle="Muslim-friendly travel packages and experiences"
            date="18- 20 January 2025"
            location="Kuala Lumpur"
            type="Travel Fair"
            badges={["Muslim-friendly", "Travel Deals"]}
            imageGradient="bg-gradient-to-br from-green-200 to-teal-300"
          />
          <EventCard
            title="Play Your Way to Joy Festival"
            subtitle="Interactive activities and attractions for all ages"
            date="5- 7 February"
            location="Sunway Lagoon, Selangor"
            type="Festival"
            badges={["Family-friendly", "Popular Event"]}
            imageGradient="bg-gradient-to-br from-purple-200 to-pink-300"
          />
        </div>
      </section>

      {/* Community Story Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[90px] py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700" style={{ letterSpacing: "-0.03em" }}>
            Community Story
          </h2>
          <Link href="/community/stories" className="text-base md:text-lg lg:text-xl font-semibold text-slate-700">
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <StoryCard
            id={1}
            location="Kuala Lumpur, Malaysia"
            place="Kuala Lumpur City Centre"
            author="Imran Rosli"
            authorBadge="Verified Local"
            tags={["#LocalTourist", "#KLCC"]}
            bgColor="bg-gradient-to-br from-blue-400 to-purple-500"
          />
          <StoryCard
            id={2}
            location="Langkawi Island, Malaysia"
            place="Langkawi Island Bridge"
            author="Farah Shazwanie"
            authorBadge="Frequent Traveller"
            tags={["#Langkawi"]}
            bgColor="bg-gradient-to-br from-cyan-400 to-blue-500"
          />
          <StoryCard
            id={3}
            location="Macau, Hong Kong"
            place="Lisboeta, Macau"
            author="Saranya Mohabatten"
            authorBadge="Verified Local"
            tags={["#Macau", "#Local", "#Tourist"]}
            bgColor="bg-gradient-to-br from-orange-400 to-red-500"
          />
        </div>
      </section>
    </div>
  );
}
