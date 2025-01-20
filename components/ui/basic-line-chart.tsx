"use client"

import { GitCommitVertical, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,

} from "@/components/ui/chart"

import { ChartTickerFilter } from "./chart-ticker-filter"
import { ReturnDataIntraday } from "@/lib/actions/general-datagrab_intraday"
import { ReturnDataDaily } from "@/lib/actions/general-datagrab_daily"

const chartConfig = {
  'open': {
    label: "open",
    color: "hsl(var(--chart-1))",
  },
  'close': {
    label: "close",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const BasicLineChart: React.FC<{chartData: ReturnDataIntraday[] | ReturnDataDaily[], id: number, selectedVal: string}> = ({chartData, id, selectedVal}) => {

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Basic Line Chart - Opening</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartTickerFilter chartId={id} selectedVal={selectedVal}/>
        <ChartContainer config={chartConfig} className="max-h-[300px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 16)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              isAnimationActive={false}
              dataKey="open"
              type="natural"
              stroke="var(--color-open)"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
