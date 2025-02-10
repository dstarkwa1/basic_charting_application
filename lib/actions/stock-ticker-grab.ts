// import fetch from 'node-fetch';
// import { env } from 'process';

// type APIReturnData = {
//     bestMatches: BaseDataEntry[]
// }

// type BaseDataEntry = {

//     "1. symbol": string,
//     "2. name": string,
//     "3. type": string,
//     "4. region": string,
//     "5. marketOpen": string,
//     "6. marketClose": string,
//     "7. timezone": string,
//     "8. currency": string,
//     "9. matchScore": string,

// }

// type BaseReturnData = {
//     symbol: number,
//     name: number,
//     matchScore: number,
// }

// //grabbed from alphavantage's site here:
// //https://www.alphavantage.co/documentation/#intraday
// export type TickerSearchParams = {
//     searchString: string
// }

// export const StockTickerGrab = async (params: TickerSearchParams) => {

//     console.log(params.searchString)
//     // let apiKey = process.env.ALPHA_VANTAGE_API_KEY

//     let apiKey = 'demo'

//     // console.log(params)
    
//     var url = `https://www.alphavantage.co/query?SYMBOL_SEARCH&keywords=${params.searchString}&apikey=demo`;
    
//     const response = await fetch(url);

//     // let returnData = [] as BaseReturnData[]

//     // Object.keys(data['bestMatches']).forEach((key) => {


//     //     let pushObj = {
//     //         symbol: key["1. symbol"],
//     //         name: key["2. name"],
//     //         matchScore: key["9. matchScore"]
//     //     } as BaseReturnData

//     //     returnData.push(pushObj)
//     // }) 

//     // returnData.sort((a,b) => {
//     //     return(a.matchScore - b.matchScore)
//     // })

//     return(await response.json())
// }