'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTickerStore } from "@/stores/ticker-filter"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BasicChart } from "@/stores/chart-list"
// import { StockTickerGrab } from "@/lib/actions/stock-ticker-grab"

export const NewChartTickerWrapped:React.FC<{chartId?: number, selectedVal?: string}> = (
  {chartId, selectedVal}
) => {
  const queryClient = new QueryClient()

  return(
    <QueryClientProvider client={queryClient}>
      <NewChartTickerFilter chartId={chartId} selectedVal={selectedVal}/>
    </QueryClientProvider>
  )
}



const NewChartTickerFilter:React.FC<{chartId?: number, selectedVal?: string}> = ({chartId, selectedVal}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedVal || '')
  const [searchValue, setSearchValue] = React.useState(selectedVal || '')

  let tickerFilterStore = useTickerStore()

  let urlString = ` https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue.toUpperCase()}&apikey=demo`

  const {isPending, error, data, isFetching} = useQuery({
      queryKey: ['listTickers', searchValue], 
      queryFn: async () => {
        const response = await fetch(
          urlString
        )
        return await response.json()
    },

  }
  )

  

  console.log(data)
  console.log(searchValue)
  console.log(urlString)

  const {addToTickers, removeFromTickers, listOfTickers} = useTickerStore()

  let router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {listOfTickers
            ? listOfTickers.find((listOfTickers) => listOfTickers === value)
            : "Select stock ticker..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] overflow-x-auto p-0">
        <Command>
          <CommandInput onValueChange={setSearchValue} placeholder="Search or add ticker..." className="h-9" onKeyDown={(event) => {
            if (event.key === 'Enter'){
              addToTickers(event.currentTarget.value)
            }
          }}/>
          <CommandList className="min-w-fit">
            <CommandEmpty >No ticker found. Press enter to add.</CommandEmpty>
            <CommandGroup>
            {listOfTickers.map((ticker) => (
                <CommandItem
                  key={ticker}
                  value={ticker}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                      tickerFilterStore.updateNewChartTicker(currentValue) 
                      addToTickers(currentValue)       
                  }}
                >
                  <span>{ticker}</span>
                  <span>Added</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ticker ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              {data?.bestMatches?.filter((entry) => {return(!tickerFilterStore.listOfTickers.includes(entry['1. symbol']))})
                .map((entry) => (
                <CommandItem 
                  key={entry['1. symbol']}
                  value={entry['1. symbol']}
                  onSelect={(currentValue) => {
                    console.log('selecedval')
                    console.log(currentValue)
                    setValue(currentValue)
                    addToTickers(currentValue)
                    setOpen(false)
                      tickerFilterStore.updateNewChartTicker(currentValue)        
                    console.log(tickerFilterStore.listOfTickers)
                  }}
                  >
                    <span>{entry['1. symbol']}</span>
                    <span>{entry['2. name']}</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === entry["1. symbol"] ? "opacity-100" : "opacity-0"
                      )}
                      />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
