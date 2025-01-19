import { StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday";
import { BasicLineChart } from "@/components/ui/basic-line-chart";
import { StockDataGrabDaily } from "@/lib/actions/general-datagrab_daily";
import { ChartTickerFilter } from "@/components/ui/chart-ticker-filter";
import { ReadonlyURLSearchParams } from "next/navigation";

interface GetDataRequest {
  ticker: string;
}

const Home:React.FC<{params:string, searchParams:GetDataRequest}> = async ({params, searchParams}) => {

  const urlParams = await searchParams

  console.log(urlParams)
  
  let ibmIntraday60MinData = await StockDataGrabIntraday(
    {
      function: 'TIME_SERIES_INTRADAY',
      interval: '5min',
      symbol: urlParams.ticker || 'IBM',
    }
  )

  let ibmDailyData = await StockDataGrabDaily(
    {
      function: 'TIME_SERIES_DAILY',
      symbol: urlParams.ticker || 'IBM',
    }
  )

  // let tscoLonDailyData = await StockDataGrabDaily(
  //   {
  //     function: 'TIME_SERIES_DAILY',
  //     symbol: 'IBM',
  //     outputsize: urlParams.ticker || 'full'
  //   }
  // )


  return (
      <main className="flex grow">
        <div className="flex flex-col grow min-w-full gap-4">
          <ChartTickerFilter></ChartTickerFilter>
          <BasicLineChart chartData={ibmIntraday60MinData}/>
          <BasicLineChart chartData={ibmDailyData}/>
          {/* <BasicLineChart chartData={tscoLonDailyData}/> */}
        </div>
      </main>
  );
}

export default Home