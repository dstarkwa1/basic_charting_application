'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
import { BasicChart, useChartStore } from "@/stores/chart-list"

export const ChartTickerFilter:React.FC<{chartId?: number, selectedVal?: string}> = ({chartId, selectedVal}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedVal || '')

  const {addToTickers, removeFromTickers, listOfTickers, } = useTickerStore()

  const chartList = useChartStore()

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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search or add ticker..." className="h-9" onKeyDown={(event) => {
            if (event.key === 'Enter'){
              addToTickers(event.currentTarget.value)
            }
          }}/>
          <CommandList>
            <CommandEmpty >No ticker found. Press enter to add.</CommandEmpty>
            <CommandGroup>
              {listOfTickers.map((ticker) => (
                <CommandItem
                  key={ticker}
                  value={ticker}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    let params = new URLSearchParams(searchParams.toString())

                   
                    let charts: BasicChart[] = JSON.parse(params.get('charts')|| '')
                    
                    let idx = charts.findIndex((entry: BasicChart) => entry.id === chartId)

                    charts[idx].symbol = currentValue

                    params.set('charts', JSON.stringify([...charts]))
                    chartList.updateCharts(charts)

                    let paramsString = params.toString()
                    
                    router.push(pathName+'?'+ paramsString)
                      
                  }}
                >
                  {ticker}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ticker ? "opacity-100" : "opacity-0"
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
