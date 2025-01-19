'use client'

import {create} from 'zustand'

interface TickerState {
    listOfTickers: string[];
    addToTickers: (tickerString: string) => void;
    removeFromTickers: (tickerString: string) => void;

}

export const useTickerStore = create<TickerState>((set) => ({
    listOfTickers: ['IBM'] as string[],
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
    }

}))