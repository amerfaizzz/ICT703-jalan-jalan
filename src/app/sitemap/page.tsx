"use client";

import Link from "next/link";
import { Navigation } from "@/components/shared/navigation";
import {
  MessageSquare,
  LayoutDashboard,
  PieChart,
  Users,
  Sparkles,
  Home,
  Search,
  Calendar,
  Wallet,
  Map,
  TrendingUp,
  Settings,
  User,
  Shield,
  BookOpen,
  PlusCircle,
  Flag,
  CheckCircle,
  CalendarDays,
  LogIn,
  UserPlus,
  ShieldCheck,
  FileText,
  SlidersHorizontal,
  ClipboardList,
  ArrowRight,
  ArrowDown,
  GitMerge,
  Navigation2
} from "lucide-react";
import { cn } from "@/lib/utils";

type RouteItem = {
  path: string;
  label: string;
  icon: React.ElementType;
  description: string;
  children?: RouteItem[];
};

type GroupConfig = {
  id: number;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  routes: RouteItem[];
  highlighted?: boolean;
  userFlow: {
    steps: { text: string; path?: string }[];
    entryPoints: string[];
  };
};

const groups: GroupConfig[] = [
  {
    id: 1,
    name: "AI Chat Assistant",
    description: "AI-powered travel planning assistant with quick actions",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    routes: [
      {
        path: "/chat",
        label: "AI Travel Assistant",
        icon: MessageSquare,
        description: "Interactive AI chat interface with quick action buttons for crowd checks, budget help, itinerary planning, weather info, local tips, and emergency assistance. Features conversation history sidebar and simulated AI responses."
      },
    ],
    userFlow: {
      steps: [
        { text: "Landing with AI avatar & quick actions", path: "/chat" },
        { text: "Select action: Crowds / Budget / Itinerary / Weather / Tips / Emergency", path: "/chat" },
        { text: "Chat interface opens with conversation history", path: "/chat" },
        { text: "AI responds with travel recommendations", path: "/chat" }
      ],
      entryPoints: ["Home CTA 'Talk to AI'", "Nav dropdown 'AI Assistant'"]
    }
  },
  {
    id: 2,
    name: "Wanderboard Dashboard",
    description: "Live destination data and travel analytics",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    routes: [
      {
        path: "/wanderboard",
        label: "Search Landing",
        icon: Search,
        description: "Search entry point where users input their destination, travel dates, and number of travelers. Validates input and redirects to the live dashboard with search parameters."
      },
      {
        path: "/dashboard",
        label: "Live Data Dashboard",
        icon: LayoutDashboard,
        description: "Main dashboard displaying 8 real-time data cards: Attractions, Price Comparison, Safety Info, Halal Spots, Weather Forecast, Trending Spots, Crowd & Traffic levels, and Budget Metrics. Includes search bar and CTA to check itinerary.",
        children: [
          {
            path: "/dashboard/budget",
            label: "Budget Overview",
            icon: Wallet,
            description: "Detailed budget breakdown showing estimated costs for accommodation, food, transport, and activities. Displays daily and total trip cost projections."
          },
          {
            path: "/dashboard/schedule",
            label: "Schedule & Updates",
            icon: Calendar,
            description: "Real-time schedule management with live updates on events, openings, and time-sensitive information for the destination."
          },
          {
            path: "/dashboard/itinerary",
            label: "Itinerary View",
            icon: Map,
            description: "Visual day-by-day itinerary planner with map integration, showing planned activities, timings, and travel routes between locations."
          },
        ]
      },
    ],
    userFlow: {
      steps: [
        { text: "Enter destination, travel dates, and number of travelers", path: "/wanderboard" },
        { text: "View live dashboard with 8 data cards", path: "/dashboard" },
        { text: "Explore: Attractions, Prices, Safety, Halal, Weather, Trending, Crowd, Budget", path: "/dashboard" },
        { text: "Navigate to detailed views: Schedule / Budget / Itinerary", path: "/dashboard/schedule" }
      ],
      entryPoints: ["Nav 'Dashboard'", "Home feature grid"]
    }
  },
  {
    id: 3,
    name: "Informatics (My Travel)",
    description: "Personal travel tracking and expense management",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    highlighted: true,
    routes: [
      {
        path: "/informatics",
        label: "Onboarding",
        icon: Sparkles,
        description: "First-time setup wizard where users define their travel style using sliders (comfort vs cost, travel pacing) and set their annual travel budget. Personalizes the entire informatics experience."
      },
      {
        path: "/informatics/dashboard",
        label: "Personal Dashboard",
        icon: PieChart,
        description: "Personal travel hub showing budget donut chart (yearly budget used), metric cards (trips taken, avg overspend, savings goal progress), active trip watchlist, and insights carousel with live currency exchange rates."
      },
      {
        path: "/informatics/insights",
        label: "Travel Insights",
        icon: TrendingUp,
        description: "Analytics page displaying spending patterns, travel statistics, cost comparisons across trips, and personalized recommendations based on travel history."
      },
      {
        path: "/informatics/planner",
        label: "Trip Planner",
        icon: ClipboardList,
        description: "Trip management interface to create, view, and organize upcoming and past trips. Shows trip cards with destination, dates, budget status, and quick actions."
      },
      {
        path: "/informatics/planner/[id]/expenses",
        label: "Expense Tracking",
        icon: Wallet,
        description: "Per-trip expense tracker to log spending by category (food, transport, accommodation, activities). Shows running total vs budget with visual progress indicators."
      },
      {
        path: "/informatics/reflection",
        label: "Travel Reflections",
        icon: BookOpen,
        description: "Post-trip reflection journal to record memories, lessons learned, ratings, and personal notes. Helps users improve future travel planning based on past experiences."
      },
      {
        path: "/informatics/settings",
        label: "Settings Hub",
        icon: Settings,
        description: "Settings hub for managing personal preferences, account details, and privacy controls. Central access point for profile and privacy sub-pages."
      },
      {
        path: "/informatics/settings/profile",
        label: "Edit Profile",
        icon: User,
        description: "Profile management page to update personal information, travel preferences, default currency, notification settings, and profile picture."
      },
      {
        path: "/informatics/settings/privacy",
        label: "Privacy Settings",
        icon: Shield,
        description: "Privacy controls for managing data sharing preferences, visibility of travel history, and account security options like two-factor authentication."
      },
    ],
    userFlow: {
      steps: [
        { text: "Complete onboarding: Set comfort vs cost, travel pacing, annual budget", path: "/informatics" },
        { text: "View personal dashboard with budget donut chart & trip metrics", path: "/informatics/dashboard" },
        { text: "Explore spending patterns and travel analytics", path: "/informatics/insights" },
        { text: "Plan and organize upcoming trips", path: "/informatics/planner" },
        { text: "Track expenses for each trip by category", path: "/informatics/planner/1/expenses" },
        { text: "Reflect on completed travels with journal entries", path: "/informatics/reflection" },
        { text: "Manage profile and privacy settings", path: "/informatics/settings" }
      ],
      entryPoints: ["Nav 'My Travel'", "Post-login redirect"]
    }
  },
  {
    id: 4,
    name: "Community",
    description: "Community stories, events, and user management",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    routes: [
      {
        path: "/community",
        label: "Community Hub",
        icon: Users,
        description: "Central community page featuring search bar, 'My Trips' section showing user's travel history, upcoming community events carousel, and featured community stories with verified badges.",
        children: [
          {
            path: "/community/stories",
            label: "Community Stories",
            icon: BookOpen,
            description: "Browseable feed of community travel stories with filters by destination, category, and popularity. Shows story cards with author, destination, preview, and engagement metrics.",
            children: [
              {
                path: "/community/stories/create",
                label: "Create Story",
                icon: PlusCircle,
                description: "Story creation form with rich text editor, image upload, destination tagging, category selection, and privacy options. Allows drafts and scheduled publishing."
              },
              {
                path: "/community/stories/[id]",
                label: "Story Detail",
                icon: FileText,
                description: "Full story view with author info, complete content, photo gallery, comments section, like/save actions, and related stories. Shows verified badge for trusted authors.",
                children: [
                  {
                    path: "/community/stories/[id]/report",
                    label: "Report Story",
                    icon: Flag,
                    description: "Report form to flag inappropriate content with category selection (spam, offensive, misinformation, etc.), description field, and optional evidence upload."
                  },
                  {
                    path: "/community/stories/[id]/report/success",
                    label: "Report Success",
                    icon: CheckCircle,
                    description: "Confirmation page shown after successfully submitting a report. Displays reference number and explains the review process timeline."
                  },
                ]
              },
            ]
          },
          {
            path: "/community/events",
            label: "Upcoming Events",
            icon: CalendarDays,
            description: "Calendar view of community events including meetups, travel workshops, destination showcases, and cultural celebrations. Allows RSVP and calendar integration."
          },
        ]
      },
      {
        path: "/login",
        label: "User Login",
        icon: LogIn,
        description: "Authentication page with email/password login form, 'Remember me' option, forgot password link, and social login buttons (Google, Facebook). Redirects to dashboard after success."
      },
      {
        path: "/register",
        label: "User Registration",
        icon: UserPlus,
        description: "New user signup form collecting name, email, password, and travel preferences. Includes terms acceptance, optional newsletter subscription, and email verification flow."
      },
      {
        path: "/admin",
        label: "Admin Dashboard",
        icon: ShieldCheck,
        description: "Administrative control panel showing pending reports, user statistics, content moderation queue, and platform health metrics. Restricted to admin role users.",
        children: [
          {
            path: "/admin/reports/[id]",
            label: "Report Detail",
            icon: FileText,
            description: "Detailed report review page showing reported content, reporter info, report reason, evidence, and action buttons (dismiss, warn user, remove content, ban user)."
          },
        ]
      },
    ],
    userFlow: {
      steps: [
        { text: "Browse community hub: My Trips, Events, Stories", path: "/community" },
        { text: "Read and interact with community stories", path: "/community/stories/1" },
        { text: "Create and share your own travel stories", path: "/community/stories/create" },
        { text: "Discover upcoming community events", path: "/community/events" },
        { text: "Report inappropriate content if needed", path: "/community/stories/1/report" },
        { text: "Admin: Review and manage reported content", path: "/admin" }
      ],
      entryPoints: ["Nav 'Community'", "Post-registration"]
    }
  },
  {
    id: 5,
    name: "Smart Predictions",
    description: "AI-powered trip planning and predictions",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    routes: [
      {
        path: "/predictions",
        label: "Trip Planning Start",
        icon: Sparkles,
        description: "First step of the planning wizard. Collects destination input, travel date range picker, and number of travelers selector. Validates and stores data in session before proceeding."
      },
      {
        path: "/predictions/preferences",
        label: "Travel Preferences",
        icon: SlidersHorizontal,
        description: "Second step collecting travel style preferences: budget range, accommodation type, activity interests (adventure, culture, relaxation, food), pace preference, and accessibility needs."
      },
      {
        path: "/predictions/plan",
        label: "AI-Generated Plan",
        icon: ClipboardList,
        description: "Final step displaying the AI-generated personalized itinerary based on inputs. Shows day-by-day plan with activities, estimated costs, time allocations, and alternative suggestions."
      },
    ],
    userFlow: {
      steps: [
        { text: "Enter destination, travel dates, number of travelers", path: "/predictions" },
        { text: "Select travel preferences and style", path: "/predictions/preferences" },
        { text: "Receive AI-generated personalized itinerary", path: "/predictions/plan" },
        { text: "Review and customize the plan", path: "/predictions/plan" }
      ],
      entryPoints: ["Home CTA 'Plan Your Trip'", "Nav 'Smart Planner'"]
    }
  },
];

function getExamplePath(path: string): string {
  // Replace dynamic segments with example values
  return path
    .replace("[id]", "1")
    .replace("[slug]", "example");
}

function RouteLink({ route, depth = 0 }: { route: RouteItem; depth?: number }) {
  const Icon = route.icon;
  const isDynamic = route.path.includes("[");
  const examplePath = getExamplePath(route.path);

  return (
    <div className={cn("flex flex-col", depth > 0 && "ml-6 border-l-2 border-slate-200 pl-4")}>
      <div className="py-3 border-b border-slate-100 last:border-b-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <Link
            href={examplePath}
            className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline"
          >
            {route.label}
          </Link>
          <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
            {route.path}
          </code>
          {isDynamic && (
            <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
              example: {examplePath}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1.5 ml-6 leading-relaxed">
          {route.description}
        </p>
      </div>
      {route.children?.map((child) => (
        <RouteLink key={child.path} route={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function GroupCard({ group }: { group: GroupConfig }) {
  const pageCount = countPages(group.routes);

  return (
    <div className={cn(
      "rounded-xl border-2 p-6 transition-all",
      group.borderColor,
      group.bgColor,
      group.highlighted && "ring-4 ring-violet-400 ring-offset-2 shadow-xl scale-[1.01]"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
            group.bgColor, group.color,
            group.highlighted && "ring-2 ring-violet-400"
          )}>
            {group.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={cn("text-lg font-semibold", group.color)}>
                Group {group.id}: {group.name}
              </h2>
              {group.highlighted && (
                <span className="px-2 py-0.5 text-xs font-bold bg-violet-600 text-white rounded-full animate-pulse">
                  CURRENT FOCUS
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{group.description}</p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          group.bgColor, group.color
        )}>
          {pageCount} pages
        </div>
      </div>

      {/* User Flow Section */}
      <div className={cn(
        "mb-4 p-4 rounded-lg border",
        group.highlighted ? "bg-violet-100 border-violet-300" : "bg-white/50 border-slate-200"
      )}>
        <h3 className={cn("text-sm font-semibold mb-3 flex items-center gap-2", group.color)}>
          <Navigation2 className="w-4 h-4" />
          User Flow
        </h3>
        <div className="space-y-2">
          {group.userFlow.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
                group.highlighted ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-600"
              )}>
                {index + 1}
              </div>
              <div className="flex-1">
                <span className="text-sm text-slate-700">{step.text}</span>
                {step.path && (
                  <Link
                    href={step.path}
                    className={cn(
                      "ml-2 text-xs px-2 py-0.5 rounded-full hover:underline inline-flex items-center gap-1",
                      group.highlighted
                        ? "bg-violet-200 text-violet-700 hover:bg-violet-300"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {step.path}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-1">Entry Points:</p>
          <div className="flex flex-wrap gap-2">
            {group.userFlow.entryPoints.map((entry, index) => (
              <span key={index} className={cn(
                "text-xs px-2 py-1 rounded-full",
                group.highlighted ? "bg-violet-200 text-violet-700" : "bg-slate-100 text-slate-600"
              )}>
                {entry}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Routes Section */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
          <Map className="w-4 h-4" />
          Routes
        </h3>
        {group.routes.map((route) => (
          <RouteLink key={route.path} route={route} />
        ))}
      </div>
    </div>
  );
}

function countPages(routes: RouteItem[]): number {
  return routes.reduce((count, route) => {
    return count + 1 + (route.children ? countPages(route.children) : 0);
  }, 0);
}

export default function SitemapPage() {
  const totalPages = groups.reduce((sum, g) => sum + countPages(g.routes), 0) + 3; // +3 for home, search, sitemap

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Jalan-Jalan Sitemap
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            ICT703 Travel Planning Platform - Route Structure by Group
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white rounded-full border border-slate-200 font-medium">
              {groups.length} Groups
            </span>
            <span className="px-4 py-2 bg-white rounded-full border border-slate-200 font-medium">
              {totalPages} Total Pages
            </span>
          </div>
        </div>

        {/* Shared Pages */}
        <div className="rounded-xl border-2 border-slate-200 bg-white p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Home className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-700">Shared Pages</h2>
              <p className="text-sm text-slate-500">Global pages accessible from anywhere</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="py-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-slate-500" />
                <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline">
                  Home / Landing Page
                </Link>
                <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">/</code>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 ml-6 leading-relaxed">
                Main landing page with hero section featuring 3-step onboarding explanation, feature grid showcasing all 5 groups with icons and descriptions, benefits listing, and primary CTAs linking to Smart Planner (Group 5) and AI Assistant (Group 1).
              </p>
            </div>
            <div className="py-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                <Link href="/search" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline">
                  Global Search
                </Link>
                <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">/search</code>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 ml-6 leading-relaxed">
                Universal search page accessible from navigation. Searches across destinations, community stories, events, and user content. Provides filtered results with quick links to relevant sections.
              </p>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-slate-500" />
                <Link href="/sitemap" className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline">
                  Sitemap (This Page)
                </Link>
                <code className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">/sitemap</code>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 ml-6 leading-relaxed">
                Self-documenting visualization of the entire platform structure. Displays all 5 groups with color-coded cards, hierarchical route structure, page descriptions, user flows, and convergence explanation.
              </p>
            </div>
          </div>
        </div>

        {/* Group Cards */}
        <div className="space-y-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* How Groups Converge */}
        <div className="mt-12 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <GitMerge className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">How Everything Converges</h2>
              <p className="text-sm text-slate-400">The unified travel planning experience</p>
            </div>
          </div>

          {/* Convergence Diagram */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Navigation Hub */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <Navigation2 className="w-4 h-4" />
                Unified Navigation Bar
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/" className="text-slate-400 hover:text-white hover:underline">Home</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/predictions" className="text-rose-400 hover:text-rose-300 hover:underline">Plan Trip</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 hover:underline">Dashboard</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/informatics/dashboard" className="text-violet-400 hover:text-violet-300 hover:underline">My Travel</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/community" className="text-orange-400 hover:text-orange-300 hover:underline">Community</Link>
                </div>
                <p className="text-slate-500 text-xs mt-2">All groups accessible from any page via shared navigation</p>
              </div>
            </div>

            {/* Data Flow */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Cross-Group Data Flow
              </h3>
              <div className="space-y-1 text-sm">
                <p><Link href="/predictions" className="text-rose-400 hover:text-rose-300 hover:underline">G5 Predictions</Link> <span className="text-slate-500">→ Creates trip details</span></p>
                <p><Link href="/dashboard" className="text-blue-400 hover:text-blue-300 hover:underline">G2 Dashboard</Link> <span className="text-slate-500">→ Shows live destination data</span></p>
                <p><Link href="/informatics/dashboard" className="text-violet-400 hover:text-violet-300 hover:underline">G3 Informatics</Link> <span className="text-slate-500">→ Tracks budget & expenses</span></p>
                <p><Link href="/community" className="text-orange-400 hover:text-orange-300 hover:underline">G4 Community</Link> <span className="text-slate-500">→ Shares travel experiences</span></p>
                <p><Link href="/chat" className="text-emerald-400 hover:text-emerald-300 hover:underline">G1 Chat</Link> <span className="text-slate-500">→ Assists across all planning</span></p>
              </div>
            </div>
          </div>

          {/* User Journey Paths */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="font-semibold text-yellow-400 mb-4">Recommended User Journeys</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-2">First-Time Visitor</p>
                <div className="flex flex-wrap items-center gap-1">
                  <Link href="/" className="px-2 py-1 bg-slate-700 rounded text-slate-200 hover:bg-slate-600 transition-colors">/</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/predictions" className="px-2 py-1 bg-rose-900/50 rounded text-rose-300 hover:bg-rose-800/50 transition-colors">/predictions</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/chat" className="px-2 py-1 bg-emerald-900/50 rounded text-emerald-300 hover:bg-emerald-800/50 transition-colors">/chat</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/dashboard" className="px-2 py-1 bg-blue-900/50 rounded text-blue-300 hover:bg-blue-800/50 transition-colors">/dashboard</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-2">Returning User</p>
                <div className="flex flex-wrap items-center gap-1">
                  <Link href="/login" className="px-2 py-1 bg-orange-900/50 rounded text-orange-300 hover:bg-orange-800/50 transition-colors">/login</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/informatics/dashboard" className="px-2 py-1 bg-violet-900/50 rounded text-violet-300 hover:bg-violet-800/50 transition-colors">/informatics</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/dashboard" className="px-2 py-1 bg-blue-900/50 rounded text-blue-300 hover:bg-blue-800/50 transition-colors">/dashboard</Link>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <Link href="/community" className="px-2 py-1 bg-orange-900/50 rounded text-orange-300 hover:bg-orange-800/50 transition-colors">/community</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center gap-2">
                <div className={cn("w-4 h-4 rounded", group.bgColor, "border", group.borderColor)} />
                <span className="text-slate-600">Group {group.id}</span>
                {group.highlighted && (
                  <span className="text-xs text-violet-600 font-medium">(Focus)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
