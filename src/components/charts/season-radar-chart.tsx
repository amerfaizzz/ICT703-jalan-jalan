"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export type SeasonPreferenceDatum = {
  season: "Raya" | "CNY" | "Merdeka" | "Deepavali"
  value: number
}

type SeasonRadarChartProps = {
  data: SeasonPreferenceDatum[]
  maxValue?: number
}

export function SeasonRadarChart({ data, maxValue = 4 }: SeasonRadarChartProps) {
  const chartData = data.map((d) => ({
    season: d.season,
    value: d.value,
    fullMark: maxValue,
  }))

  return (
    <div className="h-64 w-full md:h-72 lg:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={chartData}
          margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
        >
          <PolarGrid
            stroke="#E5E7EB"
            radialLines={true}
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="season"
            tick={{ fill: "#4B5563", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}/${maxValue} members`, "Season"]}
            labelFormatter={(label: string) => label}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E5E7EB",
              boxShadow:
                "0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)",
            }}
          />
          <Radar
            name="Season Preference"
            dataKey="value"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}


