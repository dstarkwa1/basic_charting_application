import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { BasicCandleChart } from "./basic-candle-chart";
import { IntraDayCandleChart } from "./intra-day-candle-chart";
import { ReturnDataIntraday, StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday-alphavantage";

type DailyCandleChartProps = {
  date: string;
  openStatus: boolean;
  closeDialog: () => void;
  chartData: ReturnDataIntraday[];
}

export const DialogDailyCandleChart = ({date, openStatus, closeDialog, chartData}:DailyCandleChartProps) => {  

  return (
    <Dialog open={openStatus} onOpenChange={closeDialog}>
      <DialogContent className="min-w-[80%] h-fit">
        <IntraDayCandleChart chartData={chartData} date={date}/>
      </DialogContent>
    </Dialog>
  )
}
