import { IAggs, restClient } from '@polygon.io/client-js';

export type TickerDataGrabParams = {
    toDate: string,
    fromDate: string,
    ticker: string,
    timespan: string,
    multiplier: number,
    intraDay?: boolean,
}

type Results = {
    c: number,
    h: number,
    l: number,
    n: number,
    o: number,
    t: number,
    v: number,
    vw: number,
    T: string,
}

export type TickerBarAggResponse = {
    adjusted: string,
    next_url: string,
    queryCount: number,
    request_id: string,
    results: Results[]
}

export const TickerDataGrab = async (params: TickerDataGrabParams) => {

    const rest = restClient(process.env.POLY_API_KEY);
    
    const data = rest.stocks.aggregates(
        params.ticker, 
        params.multiplier,
        params.timespan,
        params.fromDate,
        params.toDate,
        {
            adjusted: "true",
            sort: "asc",
            limit: 50000 
        }
    ).then((data) => {
        return data
    }).catch(e => {
        console.error('An error occured', e);
    });

    let returnValue: IAggs | void= await data

    if (params.intraDay){
        returnValue?.results?.forEach(
            (entry) => entry.T = (new Date(entry.t!))
                .toLocaleDateString(
                    'en',
                    {
                        month: '2-digit', 
                        day: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'America/New_York'}
                    )
        )
    } else {
        returnValue?.results?.forEach(
            (entry) => entry.T = (new Date(entry.t!))
                .toLocaleDateString(
                    'en',
                    {
                        month: '2-digit', 
                        day: '2-digit', 
                        year: 'numeric', 
                        timeZone: 'America/New_York'}
                    ).slice(0,10)
        )
    }


   return(returnValue)


}