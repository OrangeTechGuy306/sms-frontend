import type React from "react"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter as RechartsScatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar as RechartsBar,
  LineChart,
  Line as RechartsLine,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: any) => string
  xAxisKey?: string
  yAxisKey?: string
  sizeKey?: string
  colorKey?: string
  showLegend?: boolean
  axisConfig?: {
    xAxis?: {
      min?: number
      max?: number
      tickCount?: number
      label?: string
    }
    yAxis?: {
      min?: number
      max?: number
      tickCount?: number
      label?: string
    }
  }
  legendProps?: {
    itemNameFormatter?: (name: string) => string
  }
  showXGrid?: boolean
  showYGrid?: boolean
}

export const Scatter: React.FC<ChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  sizeKey,
  colorKey,
  showLegend = false,
  valueFormatter,
  axisConfig,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey={xAxisKey}
          name={axisConfig?.xAxis?.label || xAxisKey}
          domain={[axisConfig?.xAxis?.min || "dataMin", axisConfig?.xAxis?.max || "dataMax"]}
          tickCount={axisConfig?.xAxis?.tickCount}
        />
        <YAxis
          type="number"
          dataKey={yAxisKey}
          name={axisConfig?.yAxis?.label || yAxisKey}
          domain={[axisConfig?.yAxis?.min || "dataMin", axisConfig?.yAxis?.max || "dataMax"]}
          tickCount={axisConfig?.yAxis?.tickCount}
        />
        <Tooltip formatter={valueFormatter ? (value, name) => [valueFormatter(value), name] : undefined} />
        {showLegend && <Legend />}
        <RechartsScatter data={data} fill="#8884d8" dataKey={colorKey} size={sizeKey} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export const Bar: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth,
  showLegend = false,
  showXGrid = true,
  showYGrid = true,
  legendProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {showXGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={index} />
        <YAxis width={yAxisWidth} />
        <Tooltip formatter={valueFormatter ? (value, name) => [valueFormatter(value), name] : undefined} />
        {showLegend && <Legend {...legendProps} />}
        {categories.map((category, i) => (
          <RechartsBar key={category} dataKey={category} fill={colors[i]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export const Line: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth,
  showLegend = false,
  showXGrid = true,
  showYGrid = true,
  legendProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {showXGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={index} />
        <YAxis width={yAxisWidth} />
        <Tooltip formatter={valueFormatter ? (value, name) => [valueFormatter(value), name] : undefined} />
        {showLegend && <Legend {...legendProps} />}
        {categories.map((category, i) => (
          <RechartsLine key={category} type="monotone" dataKey={category} stroke={colors[i]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export const Radar: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = false,
  legendProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <PolarGrid />
        <PolarAngleAxis dataKey={index} />
        <PolarRadiusAxis />
        <Tooltip formatter={valueFormatter ? (value, name) => [valueFormatter(value), name] : undefined} />
        {showLegend && <Legend {...legendProps} />}
        {categories.map((category, i) => (
          <RechartsRadar key={category} dataKey={category} stroke={colors[i]} fill={colors[i]} fillOpacity={0.6} />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}
