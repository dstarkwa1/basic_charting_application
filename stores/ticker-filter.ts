'use client'

import {create} from 'zustand'

interface TickerState {
    listOfTickers: string[];
    currentTicker: string;
    addToTickers: (tickerString: string) => void;
    removeFromTickers: (tickerString: string) => void;
    updateNewChartTicker: (tickerString: string) => void;
}

export const useTickerStore = create<TickerState>((set) => ({
    currentTicker: '' as string,
    listOfTickers: [] as string[],
    addToTickers: (tickerString: string) => {
        tickerString = tickerString.toUpperCase()
        set((state) => ({
            listOfTickers: [...state.listOfTickers.filter((tickerEntry) => tickerEntry !== tickerString), tickerString]
        }))
    },
    removeFromTickers: (tickerString: string) => {
        set((state) => ({
            listOfTickers: state.listOfTickers.filter((tickerEntry) => tickerEntry !== tickerString )
        }))
    },
    updateNewChartTicker: (tickerString: string) => {
        set(() => ({
            currentTicker: tickerString
        }))
    }
    
}))