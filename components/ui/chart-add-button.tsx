'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useChartStore } from "@/stores/chart-list"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ChartAddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    
    const searchParams = useSearchParams()
    let chartStore = useChartStore()
    let router = useRouter()
    let pathName = usePathname()
    let ticker = searchParams.get('ticker')
    
    return (
      <Comp
        onClick={
            () => {
                let listOfCharts = chartStore.addToCharts(
                    {
                        function: 'TIME_SERIES_DAILY',
                        symbol: ticker || 'empty',
                        outputSize: 'full',
                        id: chartStore.numberOfCharts
                    }, chartStore.listOfCharts)
                    
                    let params = new URLSearchParams(searchParams.toString())
                    params.set('ticker',ticker || '')

                    params.set('charts', JSON.stringify(listOfCharts))

                    let paramsString = params.toString()

                    router.push(pathName+'?'+ paramsString)
                  }
                    
        }
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ChartAddButton.displayName = "Button"

export { ChartAddButton, buttonVariants }
