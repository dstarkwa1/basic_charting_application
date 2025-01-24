import { StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday";
import { BasicLineChart } from "@/components/ui/basic-line-chart";
import { StockDataGrabDaily } from "@/lib/actions/general-datagrab_daily";
import { ChartTickerFilter } from "@/components/ui/chart-ticker-filter";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ChartAddButton } from "@/components/ui/chart-add-button";
import { BasicChart } from "@/stores/chart-list";
import { NewChartTickerFilter } from "@/components/ui/new-chart-ticker-filter";

type GetDataRequest = {
  ticker: string,
  charts: string,
}

const Home:React.FC<{params:string, searchParams:GetDataRequest}> = async ({params, searchParams}) => {

  const urlParams = await searchParams

  let listOfCharts = urlParams.charts? JSON.parse(urlParams.charts) as BasicChart[] : []

  console.log(listOfCharts)

  let dataList = [] 

  for (const entry of listOfCharts) {
    let data = await StockDataGrabDaily({
      function: 'TIME_SERIES_DAILY',
      symbol: entry.symbol
    })
    let pushValue = {
      data: data,
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
                <NewChartTickerFilter/>
              </div>
              <ChartAddButton variant={"outline"}>Add Chart to Page</ChartAddButton>
            </div>
          {dataList.map((entry) => {
            return(
              <BasicLineChart chartData={entry.data} id={entry.id} key={entry.id} selectedVal={entry.symbol}/>
            )
          })}
        </div>
      </main>
  );
}

export default Home