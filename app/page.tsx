import { ChartAddButton } from "@/components/ui/chart-add-button";
import { BasicChart } from "@/stores/chart-list";
import { NewChartTickerWrapped } from "@/components/ui/new-chart-ticker-filter";
import { BasicCandleChart } from "@/components/ui/basic-candle-chart/basic-candle-chart";
import { TickerDataGrab } from "@/lib/actions/ticker-bar-aggregates-polygon";

type GetDataRequest = {
  ticker: string,
  charts: string,
}

const Home:React.FC<{params:string, searchParams:GetDataRequest}> = async ({params, searchParams}) => {
  
  const urlParams = await searchParams

  let listOfCharts = urlParams.charts? JSON.parse(urlParams.charts) as BasicChart[] : []

  let dataList = [] 


  // let a = await TickerDataGrab({
  //   ticker:"AAPL", 
  //   multiplier:1,
  //   timespan:"day",
  //   fromDate:"2024-03-01",
  //   toDate:"2024-04-14",
  //   })


  for (const entry of listOfCharts) {
    let dailyData = await TickerDataGrab({
      ticker:entry.symbol, 
      multiplier: 1,
      timespan:"day",
      fromDate:"2024-03-01",
      toDate:"2024-04-14",
      }
    )
    
    let intraDayData = await TickerDataGrab({
      ticker: entry.symbol, 
      multiplier: 5,
      timespan:"minute",
      fromDate:"2024-03-01",
      toDate:"2024-04-14",
      intraDay: true,
      }
    )

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