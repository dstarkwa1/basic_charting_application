import { StockDataGrabIntraday } from "@/lib/actions/general-datagrab_intraday";
import { BasicLineChart } from "@/components/ui/basic-line-chart";
import { StockDataGrabDaily } from "@/lib/actions/general-datagrab_daily";
import { ChartTickerFilter } from "@/components/ui/chart-ticker-filter";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ChartAddButton } from "@/components/ui/chart-add-button";
import { BasicChart } from "@/stores/chart-list";

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
    dataList.push(data)
  }

  console.log(dataList.length)

  return (
      <main className="flex grow">
        <div className="flex flex-col grow min-w-full gap-4">
            <div className="flex grow justify-between">
              <ChartTickerFilter/>
              <ChartAddButton/>
            </div>
          {dataList.map((entry) => {
            return(
              <BasicLineChart chartData={entry}/>
            )
          })}
        </div>
      </main>
  );
}

export default Home