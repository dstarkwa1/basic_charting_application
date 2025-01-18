'server only'

import fetch from 'node-fetch';
import { env } from 'process';

type FunctionLabelFromApi = {
    [index: string]: Record<string, BaseDataEntry>
}

type MetaData = {
    'Meta Data': Object,
}

type BaseData = FunctionLabelFromApi & MetaData

type BaseDataEntry = {
    '1. open': string,
    '2. high': string,
    '3. low': string,
    '4. close': string,
    '5. volume': string,
}

type BaseReturnData = {
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
}

export type ReturnDataIntraday = {
    'date': string,
} & BaseReturnData

//grabbed from alphavantage's site here:
//https://www.alphavantage.co/documentation/#intraday
export type IntradayDataGrabParams = {
    function: string,
    symbol: string,
    interval: string,
    adjusted?: string,
    extended_hr?: string,
    month?: string,
    outputsize?:string,
}

export const StockDataGrabIntraday = async (params: IntradayDataGrabParams) => {

    // let apiKey = process.env.ALPHA_VANTAGE_API_KEY

    let apiKey = 'demo'

    
    var url = `https://www.alphavantage.co/query?function=${params.function}&symbol=${params.symbol}&interval=${params.interval}&apikey=${apiKey}`;

    console.log(url)
    
    const response = await fetch(url);
    let data = await response.json() as BaseData;

    console.log(data)
    let returnData = [] as ReturnDataIntraday[]

    Object.keys(data['Time Series ('+ params.interval +')']).forEach((key) => {

        let entryData = data['Time Series ('+ params.interval +')'][key]

        let pushObj = {
            date: key,
            open: parseFloat(entryData['1. open']),
            high: parseFloat(entryData['2. high']),
            low: parseFloat(entryData['3. low']),
            close: parseFloat(entryData['4. close']),
            volume: parseFloat(entryData['5. volume']),
        } as ReturnDataIntraday

        

        returnData.push(pushObj)
    }) 

    returnData.sort((a,b) => {
        return(a.date.localeCompare(b.date))
    })

    return(returnData)
}