"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Loader2 } from "lucide-react"
import { analyticsApi } from "@/src/lib/api"
import { toast } from "@/components/ui/use-toast"

interface ChartData {
  month: string
  total_collected: number
  payment_count: number
}

export function Overview() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true)
        const response = await analyticsApi.getFinancialAnalytics()
        const monthlyData = response.data.monthly_collection || []

        // Transform data for chart
        const chartData = monthlyData.map((item: any) => ({
          name: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
          total: item.total_collected || 0,
        }))

        setData(chartData)
      } catch (error) {
        console.error('Error fetching financial data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch financial overview data",
          variant: "destructive",
        })

        // Fallback to sample data
        setData([
          { name: "Jan", total: 1200 },
          { name: "Feb", total: 1900 },
          { name: "Mar", total: 1500 },
          { name: "Apr", total: 1700 },
          { name: "May", total: 2300 },
          { name: "Jun", total: 2100 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFinancialData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading chart data...</span>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, 'Revenue']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
