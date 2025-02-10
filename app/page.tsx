import { StockDataGrabDaily } from "@/lib/actions/general-datagrab_daily";
import { ChartAddButton } from "@/components/ui/chart-add-button";
import { BasicChart } from "@/stores/chart-list";
import { NewChartTickerWrapped } from "@/components/ui/new-chart-ticker-filter";
import { BasicCandleChart } from "@/components/ui/basic-candle-chart/basic-candle-chart";
import { StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday";
import { useTickerStore } from "@/stores/ticker-filter";

type GetDataRequest = {
  ticker: string,
  charts: string,
}

const Home:React.FC<{params:string, searchParams:GetDataRequest}> = async ({params, searchParams}) => {
  
  const urlParams = await searchParams

  let listOfCharts = urlParams.charts? JSON.parse(urlParams.charts) as BasicChart[] : []

  let dataList = [] 

  for (const entry of listOfCharts) {
    let dailyData = await StockDataGrabDaily({
      function: 'TIME_SERIES_DAILY',
      symbol: entry.symbol
    })
    let intraDayData = await StockDataGrabIntraday({
      function: 'TIME_SERIES_INTRADAY',
      symbol: entry.symbol,
      interval: '5min'
    })
    let pushValue = {
      dailyData: dailyData,
      intraDayData: intraDayData,
      symbol: entry.symbol,
      id: entry.id,
    }
    dataList.push(pushValue)
  }

  return (
      <main className="flex grow">
        <div className="flex flex-col grow min-w-full gap-4">
            <div className="flex grow gap-4 justify-start items-end">
              <div className="flex flex-col items-center gap-2">
              <span> Select your new chart's ticker </span>
                <NewChartTickerWrapped/>
              </div>
              <ChartAddButton variant={"outline"}>Add Chart to Page</ChartAddButton>
            </div>
          {dataList.map((entry) => {
            return(
              <BasicCandleChart chartData={entry.dailyData} drillData={entry.intraDayData} id={entry.id} key={entry.id} selectedVal={entry.symbol}/>
            )
          })}
        </div>
      </main>
  );
}

export default Home