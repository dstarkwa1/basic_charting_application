'server only'

import fetch from 'node-fetch';

export const testing_api = async () => {

    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

    const response = await fetch(url);
    const data = await response.json();

    return(data)
}