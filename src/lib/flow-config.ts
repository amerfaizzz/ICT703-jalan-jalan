import {
  Sparkles,
  MessageSquare,
  LayoutDashboard,
  PieChart,
  Users,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type GroupNumber = 1 | 2 | 3 | 4 | 5;
export type JourneyType = "first-time" | "returning";

export type GroupConfig = {
  name: string;
  shortName: string;
  icon: typeof Sparkles;
  gradient: string;
  accentColor: string;
};

export type FlowStep = {
  path: string;
  label: string;
  description: string;
  group: GroupNumber;
};

export type NextStep = {
  path: string;
  label: string;
  description: string;
  group: GroupNumber;
  primary?: boolean;
};

// ============================================================================
// Group Configuration
// ============================================================================

export const groupConfig: Record<GroupNumber, GroupConfig> = {
  1: {
    name: "AI Chat Assistant",
    shortName: "AI Chat",
    icon: MessageSquare,
    gradient: "from-emerald-500 to-teal-500",
    accentColor: "emerald",
  },
  2: {
    name: "Travel Dashboard",
    shortName: "Dashboard",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-indigo-500",
    accentColor: "blue",
  },
  3: {
    name: "My Travel",
    shortName: "My Travel",
    icon: PieChart,
    gradient: "from-violet-500 to-purple-500",
    accentColor: "violet",
  },
  4: {
    name: "Community",
    shortName: "Community",
    icon: Users,
    gradient: "from-orange-500 to-amber-500",
    accentColor: "orange",
  },
  5: {
    name: "Smart Planner",
    shortName: "Planner",
    icon: Sparkles,
    gradient: "from-rose-500 to-pink-500",
    accentColor: "rose",
  },
};

// ============================================================================
// User Journeys
// ============================================================================

export const userJourneys: Record<JourneyType, FlowStep[]> = {
  "first-time": [
    { path: "/", label: "Home", description: "Start here", group: 5 },
    { path: "/predictions", label: "Plan", description: "Create trip", group: 5 },
    { path: "/chat", label: "AI Help", description: "Get assistance", group: 1 },
    { path: "/dashboard", label: "Dashboard", description: "Live data", group: 2 },
  ],
  returning: [
    { path: "/login", label: "Login", description: "Welcome back", group: 4 },
    { path: "/informatics/dashboard", label: "My Travel", description: "Your hub", group: 3 },
    { path: "/dashboard", label: "Dashboard", description: "Live data", group: 2 },
    { path: "/community", label: "Community", description: "Share & connect", group: 4 },
  ],
};

// ============================================================================
// Next Steps by Path
// ============================================================================

const nextStepsMap: Record<string, NextStep[]> = {
  "/": [
    { path: "/predictions", label: "Start Planning", description: "Create your perfect trip", group: 5, primary: true },
    { path: "/chat", label: "Talk to AI", description: "Get instant help", group: 1 },
  ],
  "/predictions": [
    { path: "/chat", label: "Need Help?", description: "Ask our AI assistant", group: 1 },
  ],
  "/predictions/preferences": [
    { path: "/chat", label: "Need Help?", description: "Ask our AI assistant", group: 1 },
  ],
  "/predictions/plan": [
    { path: "/dashboard", label: "View Live Data", description: "Real-time destination info", group: 2, primary: true },
    { path: "/informatics/dashboard", label: "Track Budget", description: "Monitor expenses", group: 3 },
    { path: "/chat", label: "Refine with AI", description: "Get suggestions", group: 1 },
  ],
  "/chat": [
    { path: "/predictions", label: "Plan a Trip", description: "Create your itinerary", group: 5, primary: true },
    { path: "/dashboard", label: "Check Dashboard", description: "View live data", group: 2 },
  ],
  "/dashboard": [
    { path: "/informatics/dashboard", label: "Track Expenses", description: "Monitor your budget", group: 3, primary: true },
    { path: "/community", label: "Share Experience", description: "Connect with travelers", group: 4 },
  ],
  "/dashboard/schedule": [
    { path: "/informatics/planner", label: "Log Expenses", description: "Track spending", group: 3, primary: true },
  ],
  "/dashboard/itinerary": [
    { path: "/informatics/planner", label: "Log Expenses", description: "Track spending", group: 3, primary: true },
  ],
  "/informatics/dashboard": [
    { path: "/dashboard", label: "Check Live Data", description: "Destination info", group: 2, primary: true },
    { path: "/predictions", label: "Plan New Trip", description: "Start planning", group: 5 },
  ],
  "/informatics/reflection": [
    { path: "/community/stories/create", label: "Share Your Story", description: "Inspire others", group: 4, primary: true },
  ],
  "/community": [
    { path: "/predictions", label: "Plan Your Trip", description: "Start your adventure", group: 5, primary: true },
    { path: "/community/stories/create", label: "Share a Story", description: "Tell your tale", group: 4 },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getNextSteps(currentPath: string, max: number = 3): NextStep[] {
  // Exact match
  let steps = nextStepsMap[currentPath];

  // Parent path match
  if (!steps) {
    const parts = currentPath.split("/").filter(Boolean);
    while (parts.length > 0 && !steps) {
      steps = nextStepsMap["/" + parts.join("/")];
      parts.pop();
    }
  }

  // Dynamic route patterns
  if (!steps) {
    if (/^\/community\/stories\/\d+$/.test(currentPath)) {
      steps = [
        { path: "/predictions", label: "Plan Similar Trip", description: "Get inspired", group: 5, primary: true },
        { path: "/community/stories/create", label: "Share Your Story", description: "Tell your tale", group: 4 },
      ];
    } else if (/^\/informatics\/planner\/\d+\/expenses$/.test(currentPath)) {
      steps = [
        { path: "/informatics/reflection", label: "Add Reflection", description: "Record memories", group: 3, primary: true },
      ];
    }
  }

  return (steps || []).slice(0, max);
}

export function getGroupForPath(path: string): GroupNumber | null {
  if (path.startsWith("/chat")) return 1;
  if (path.startsWith("/dashboard") || path.startsWith("/wanderboard")) return 2;
  if (path.startsWith("/informatics")) return 3;
  if (path.startsWith("/community") || path.startsWith("/admin") || path === "/login" || path === "/register") return 4;
  if (path.startsWith("/predictions")) return 5;
  return null;
}
