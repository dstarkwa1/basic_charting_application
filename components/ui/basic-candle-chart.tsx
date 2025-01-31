"use client"

//Chart taken from https://codesandbox.io/p/sandbox/recharts-candlesticks-8m6n8?file=%2Fsrc%2FChart.jsx


import { GitCommitVertical, TrendingUp } from "lucide-react"
import { Bar, BarChart, BarProps, CartesianGrid, Cell, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { ChartRemoveButton } from "./chart-remove-button"
import { ActiveShape } from "recharts/types/util/types"

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
    fill,
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
  console.log(props);
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

const prepareData = (data: ReturnDataIntraday[] | ReturnDataDaily[])  => {
  return data.map(({ open, close, ...other }) => {
    return {
      ...other,
      openClose: [open, close],
    };
  });
};

export const BasicCandleChart: React.FC<{chartData: ReturnDataIntraday[] | ReturnDataDaily[], id: number, selectedVal: string}> = ({chartData, id, selectedVal}) => {

  const data = prepareData(chartData);
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

  const colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ];

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

  
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Basic Line Chart</CardTitle>
        <ChartRemoveButton chartId={id}>Delete Chart</ChartRemoveButton>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ChartTickerFilter chartId={id} selectedVal={selectedVal}/>
        <ChartContainer config={chartConfig} className="max-h-[300px]">
        <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis domain={[minValue!, maxValue!]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar
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
        // label={{ position: 'top' }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
