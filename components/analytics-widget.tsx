"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AnalyticsWidgetProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  data?: Array<{ value: number }>
  className?: string
}

export function AnalyticsWidget({ title, value, change, trend, data, className }: AnalyticsWidgetProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          <Badge variant={trend === "up" ? "secondary" : "destructive"} className="text-xs">
            {change}
          </Badge>
          {data && (
            <div className="h-8 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={trend === "up" ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
