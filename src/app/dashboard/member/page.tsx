"use client"

import * as React from "react"
import { Navigation } from "@/components/shared/navigation"
import TabBar from "@/components/ui/TabBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Wallet,
  CalendarDays,
  Mountain,
  Camera,
  ShoppingBag,
  Moon,
  Waves,
  UtensilsCrossed,
  Building2,
  Zap,
} from "lucide-react"
import {
  SeasonRadarChart,
  type SeasonPreferenceDatum,
} from "@/components/charts/season-radar-chart"

type InterestData = {
  name: string
  percentage: number
  color: string
  icon: React.ReactNode
}

type SeasonData = {
  name: string
  count: number
  total: number
}

type Member = {
  id: string
  name: string
  avatar: string
  budgetRange: string
  avgBudget: string
  preferredSeasons: string[]
  crowdPreference: string
}

function PieChartVisualization({ data }: { data: InterestData[] }) {
  // Simple pie chart visualization using CSS
  const total = data.reduce((sum, item) => sum + item.percentage, 0)
  let currentAngle = 0

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-auto">
        {data.map((item, index) => {
          const angle = (item.percentage / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          currentAngle += angle

          const startAngleRad = ((startAngle - 90) * Math.PI) / 180
          const endAngleRad = ((endAngle - 90) * Math.PI) / 180

          const x1 = 100 + 70 * Math.cos(startAngleRad)
          const y1 = 100 + 70 * Math.sin(startAngleRad)
          const x2 = 100 + 70 * Math.cos(endAngleRad)
          const y2 = 100 + 70 * Math.sin(endAngleRad)

          const largeArcFlag = angle > 180 ? 1 : 0

          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`,
          ].join(" ")

          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              stroke="#fff"
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900">100%</div>
          <div className="text-xs text-slate-500">Total</div>
        </div>
      </div>
    </div>
  )
}


export default function MembersPage() {
  const interestData: InterestData[] = [
    {
      name: "Beach",
      percentage: 17,
      color: "#3B82F6",
      icon: <Waves className="size-4" />,
    },
    {
      name: "Culture",
      percentage: 17,
      color: "#8B5CF6",
      icon: <Building2 className="size-4" />,
    },
    {
      name: "Food",
      percentage: 17,
      color: "#EC4899",
      icon: <UtensilsCrossed className="size-4" />,
    },
    {
      name: "Adventure",
      percentage: 17,
      color: "#F59E0B",
      icon: <Zap className="size-4" />,
    },
    {
      name: "Nature",
      percentage: 8,
      color: "#10B981",
      icon: <Mountain className="size-4" />,
    },
    {
      name: "Photography",
      percentage: 8,
      color: "#06B6D4",
      icon: <Camera className="size-4" />,
    },
    {
      name: "Shopping",
      percentage: 8,
      color: "#EF4444",
      icon: <ShoppingBag className="size-4" />,
    },
    {
      name: "Nightlife",
      percentage: 8,
      color: "#6366F1",
      icon: <Moon className="size-4" />,
    },
  ]

  const seasonData: SeasonData[] = [
    { name: "Raya", count: 3, total: 4 },
    { name: "CNY", count: 2, total: 4 },
    { name: "Merdeka", count: 2, total: 4 },
    { name: "Deepavali", count: 1, total: 4 },
  ]

  // Transform seasonData for SeasonRadarChart
  const radarChartData: SeasonPreferenceDatum[] = seasonData.map((item) => ({
    season: item.name as "Raya" | "CNY" | "Merdeka" | "Deepavali",
    value: item.count,
  }))

  const members: Member[] = [
    {
      id: "1",
      name: "Nurul Aisyah",
      avatar: "",
      budgetRange: "RM1,000 - RM2,000",
      avgBudget: "RM1,500",
      preferredSeasons: ["Raya", "CNY"],
      crowdPreference: "Avoid Crowds",
    },
    {
      id: "2",
      name: "Wong Wei Ming",
      avatar: "",
      budgetRange: "RM1,500 - RM3,000",
      avgBudget: "RM2,250",
      preferredSeasons: ["Merdeka", "Deepavali"],
      crowdPreference: "Avoid Crowds",
    },
    {
      id: "3",
      name: "Priya Devi",
      avatar: "",
      budgetRange: "RM800 - RM1,500",
      avgBudget: "RM1,150",
      preferredSeasons: ["CNY", "Raya"],
      crowdPreference: "Okay with Crowds",
    },
    {
      id: "4",
      name: "Ahmad Zaki",
      avatar: "",
      budgetRange: "RM2,000 - RM4,000",
      avgBudget: "RM3,000",
      preferredSeasons: ["Merdeka", "Raya"],
      crowdPreference: "No Preference",
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-slate-100">
      <Navigation />
      <TabBar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-8">
        <div className="flex flex-col gap-6">
          {/* Group Preferences Overview */}
          <Card className="border-[#AD46FF] bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Group Preferences Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interest Distribution */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">
                    Interest Distribution
                  </h3>
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <PieChartVisualization data={interestData} />
                    <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                      {interestData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className="size-4 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-700">
                            {item.name} {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {interestData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50"
                      >
                        {item.icon}
                        <span className="text-sm font-medium text-slate-700">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Season Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-700">
                    Season Preferences
                  </h3>
                  <SeasonRadarChart data={radarChartData} maxValue={4} />
                  <div className="space-y-2">
                    {seasonData.map((season, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-violet-50"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {season.name}
                        </span>
                        <span className="text-sm text-slate-500">
                          {season.count}/{season.total} members
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Member Details */}
          <Card className="border-[#AD46FF] bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold leading-tight">
                Individual Member Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-base font-normal text-slate-700">
                        Member
                      </th>
                      <th className="text-left py-3 px-4 text-base font-normal text-slate-700">
                        Budget Range
                      </th>
                      <th className="text-left py-3 px-4 text-base font-normal text-slate-700">
                        Avg Budget
                      </th>
                      <th className="text-left py-3 px-4 text-base font-normal text-slate-700">
                        Preferred Seasons
                      </th>
                      <th className="text-left py-3 px-4 text-base font-normal text-slate-700">
                        Crowd Preference
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr
                        key={member.id}
                        className={`border-b border-slate-100 ${
                          index % 2 === 0 ? "bg-slate-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-violet-100 text-violet-700 text-sm font-medium">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-base font-normal text-slate-900">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-700">
                            {member.budgetRange}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-bold text-slate-900">
                            {member.avgBudget}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-2">
                            {member.preferredSeasons.map((season) => (
                              <Badge
                                key={season}
                                className="bg-violet-100 text-violet-800 border-0 px-2 py-1 text-xs font-normal"
                              >
                                {season}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`${
                              member.crowdPreference === "Avoid Crowds"
                                ? "bg-pink-100 text-pink-800 border-0"
                                : member.crowdPreference === "Okay with Crowds"
                                  ? "bg-violet-100 text-violet-800 border-0"
                                  : "bg-slate-100 text-slate-700 border-0"
                            } px-2 py-1 text-xs font-normal`}
                          >
                            {member.crowdPreference}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Group Aggregate */}
          <Card className="border-[#AD46FF] bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold leading-tight">
                Group Aggregate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Average Budget */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Wallet className="size-5 text-green-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Average Budget
                    </h4>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    RM1,975
                  </div>
                  <div className="text-sm text-slate-500">
                    Range: RM1,325 - RM2,625
                  </div>
                </div>

                {/* Popular Seasons */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-violet-100">
                      <CalendarDays className="size-5 text-violet-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Popular Seasons
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {seasonData.map((season, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-700">
                          {season.name}
                        </span>
                        <span className="text-sm text-slate-500">
                          {season.count}/{season.total} members
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crowd Preference */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-pink-100">
                      <Users className="size-5 text-pink-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      Crowd Preference
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        Avoid Crowds
                      </span>
                      <span className="text-sm text-slate-500">2/4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        Okay with Crowds
                      </span>
                      <span className="text-sm text-slate-500">1/4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        No Preference
                      </span>
                      <span className="text-sm text-slate-500">1/4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
