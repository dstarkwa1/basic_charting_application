'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {create} from 'zustand'

export type BasicChart = {
    function: string,
    interval?: string,
    symbol: string,
    outputSize?: string,
    id: number,
}

interface ChartListState {
    listOfCharts: BasicChart[];
    numberOfCharts: number,
    addToCharts: (newChartEntry: BasicChart, oldListOfCharts: BasicChart[]) => BasicChart[];
    removeFromCharts: (chartId: number, oldListOfCharts: BasicChart[]) => BasicChart[];
    updateCharts: (basicCharts: BasicChart[]) => void;
}

export const useChartStore = create<ChartListState>((set) => ({
    listOfCharts: [] as BasicChart[],
    numberOfCharts: 0,
    addToCharts: (newChartEntry: BasicChart, oldListOfCharts: BasicChart[]) => {
        set((state) => ({
            listOfCharts: [...state.listOfCharts, newChartEntry],
            numberOfCharts: state.numberOfCharts + 1,
        }));
        console.log(oldListOfCharts)
        oldListOfCharts.push(newChartEntry)
        return oldListOfCharts
                
    },
    removeFromCharts: (chartId: number, oldListOfCharts: BasicChart[]) => {
        set((state) => ({
            listOfCharts: [...state.listOfCharts.filter((chartEntry) => {
                return(chartEntry.id !== chartId)
            })]
        }));
        let filteredCharts = oldListOfCharts.filter((chartEntry) => {return(chartEntry.id !== chartId)})

        console.log(filteredCharts)
        return filteredCharts
    },
    updateCharts: (basicCharts: BasicChart[]) => {
        set((state) => ({
            listOfCharts: basicCharts
        })
        )
    }

}))