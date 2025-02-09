"use client"

//Chart taken from https://codesandbox.io/p/sandbox/recharts-candlesticks-8m6n8?file=%2Fsrc%2FChart.jsx

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/basic-candle-chart/candle-chart-objects"

import { ChartTickerFilter } from "../chart-ticker-filter"
import { ReturnDataIntraday } from "@/lib/actions/general-datagrab_intraday"
import { ReturnDataDaily } from "@/lib/actions/general-datagrab_daily"
import { ChartRemoveButton } from "../chart-remove-button"
import { useState } from "react"

type CandleStickProps = {
  fill: string,
  x: number,
  y: number,
  width: number,
  height: number,
  low: number,
  high: number,
  openClose: number[]
}

const Candlestick = (props: CandleStickProps) => {
  const {
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props;
  const isGrowing = open < close;
  const color = isGrowing ? 'green' : 'red';
  const ratio = Math.abs(height / (open - close));
  return (
    <g stroke={color} fill="none" strokeWidth="2">
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
  );
};

const prepareData = (data: ReturnDataIntraday[], date: string)  => {

  data = data.filter((entry) => {
    return(
      entry.date.slice(0,10) === date.slice(0,10)
    )
  })

  return (data.map(({ open, close, ...other }) => {
    const isGrowing = open < close;
    const color = isGrowing ? 'green' : 'red';
    return {
      ...other,
      openClose: [open, close],
      color: color,
    };
  }));
};

export const IntraDayCandleChart: React.FC<{chartData: ReturnDataIntraday[], date: string}> = ({chartData, date}) => {

  let [isOpen, useOpen] = useState(false)
  let [dateValue, setDateValue] = useState("")
 
  const data = prepareData(chartData, date);
  const minValue = data.reduce(
    (minValue: number | null, { low, openClose: [open, close] }) => {
      const currentMin = Math.min(low, open, close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null,
  );
  const maxValue = data.reduce(
    (maxValue, { high, openClose: [open, close] }) => {
      const currentMax = Math.max(high, open, close);
      return ( maxValue ? currentMax > maxValue ? currentMax : maxValue : currentMax);
    },
    minValue,
  );

  const chartConfig = {} satisfies ChartConfig

  
  return (
    <div>
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Basic Candlestick Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartContainer config={chartConfig} className="max-h-[300px]">
        <BarChart
          onClick={(payload) => {
            useOpen(true)
            setDateValue(payload?.activePayload![0].payload.date)
          }}
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis domain={[minValue!, maxValue!]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
        isAnimationActive={false}
        dataKey="openClose"
        fill="#8884d8"
        shape={ 
          (props: any) => {
            return(
            <Candlestick
              fill={props.fill}
              height={props.height}
              high={props.high}
              low={props.low}
              openClose={props.openClose}
              width={props.width}
              x={props.x}
              y={props.y}
              key={props.x + props.y + props.high}
            />)
          }
        }
      >
      </Bar>
      <ChartTooltip content={<ChartTooltipContent/>}/>
    </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  )
}
