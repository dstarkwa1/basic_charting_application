import { StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday";
import { BasicLineChart } from "@/components/ui/basic-line-chart";
import { NextPage } from "next";
import Image from "next/image";
import { StockDataGrabDaily } from "@/lib/actions/general-datagrab_daily";

const Home:React.FC = async () => {

  let ibmIntraday60MinData = await StockDataGrabIntraday(
    {
      function: 'TIME_SERIES_INTRADAY',
      interval: '5min',
      symbol: 'IBM',
    }
  )

  let ibmDailyData = await StockDataGrabDaily(
    {
      function: 'TIME_SERIES_DAILY',
      symbol: 'IBM',
    }
  )

  let tscoLonDailyData = await StockDataGrabDaily(
    {
      function: 'TIME_SERIES_DAILY',
      symbol: 'IBM',
      outputsize: 'full'
    }
  )


  return (
      <main className="flex grow">
        <div className="flex flex-col grow min-w-full gap-4">
          <BasicLineChart chartData={ibmIntraday60MinData}/>
          <BasicLineChart chartData={ibmDailyData}/>
          <BasicLineChart chartData={tscoLonDailyData}/>
        </div>
      </main>
  );
}

export default Home