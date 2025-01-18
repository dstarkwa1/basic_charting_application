'server only'

import fetch from 'node-fetch';

type BaseData = {
    'Meta Data': Object,
    'Time Series (5min)': Record<string, BaseDataEntry>
}

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

export type ReturnData = {
    'date': string,
} & BaseReturnData

export const testing_api = async () => {

    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

    const response = await fetch(url);
    let data = await response.json() as BaseData;

    let returnData = [] as ReturnData[]

    Object.keys(data['Time Series (5min)']).forEach((key) => {

        let entryData = data['Time Series (5min)'][key]

        let pushObj = {
            date: key,
            open: parseFloat(entryData['1. open']),
            high: parseFloat(entryData['2. high']),
            low: parseFloat(entryData['3. low']),
            close: parseFloat(entryData['4. close']),
            volume: parseFloat(entryData['5. volume']),
        } as ReturnData

        

        returnData.push(pushObj)
    }) 

    returnData.sort((a,b) => {
        return(a.date.localeCompare(b.date))
    })

    return(returnData)
}