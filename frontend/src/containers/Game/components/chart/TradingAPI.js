import axios from 'axios';

export const fetchData = async (cryptoParams) => {
  const { url, apiKey, fsym, tsym, limit, aggregate } = cryptoParams;
  const timeUnit = aggregate < 60 ? 'minute' : aggregate < 1440 ? 'hour' : 'day';
  const aggregateNew = aggregate < 60 ? aggregate : aggregate < 1440 ? aggregate / 60 : aggregate > 1440 ? 7 : 1;
  const request1 = `${url[0]}${timeUnit}?fsym=${fsym}&tsym=${tsym}&aggregate=${aggregateNew}&limit=${limit}&api_key=${apiKey}`;
  const request2 = `${url[1]}?fsym=${fsym}&tsym=${tsym}&limit=${50}&api_key=${apiKey}`;
  const candleData = await axios
    .get(request1)
    .then((res) => {
      return res;
    }) 
    .catch((err) => {
      console.log(err);
      return false;
    });
  const depthData = await axios
    .get(request2)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!candleData || !depthData) {
    return { candleData: false, depthData: false };
  }

  // calc ma7, 30, 60
  const maAddedData = candleData.data.Data;
  for (let j = 0; j < maAddedData.length; j++) {
    let ma7 = 0;
    let ma30 = 0;
    let ma60 = 0;

    // previous 7 days
    for (let k = j - 1; k >= (j > 6 ? j - 7 : 0); k--) {
      ma7 += maAddedData[k].close;
    }
    maAddedData[j].ma7 = ma7 / (j > 6 ? 7 : j);

    // previous 30 days
    for (let k = j - 1; k >= (j > 29 ? j - 30 : 0); k--) {
      ma30 += maAddedData[k].close;
    }
    maAddedData[j].ma30 = ma30 / (j > 29 ? 30 : j);

    // previous 60 days
    for (let k = j - 1; k >= (j > 59 ? j - 60 : 0); k--) {
      ma60 += maAddedData[k].close;
    }
    maAddedData[j].ma60 = ma60 / (j > 59 ? 60 : j);
  }
  maAddedData[0].ma7 = maAddedData[0].close;
  maAddedData[0].ma30 = maAddedData[0].close;
  maAddedData[0].ma60 = maAddedData[0].close;

  return { candleData: maAddedData, depthData: depthData.data.Data };
};

export const parseCandleData = (data) => {
  const cryptoData = data;
  let candleChartData = [];
  let volumeChartData = [];
  cryptoData.forEach((item) => {
    candleChartData = [...candleChartData, item];
    volumeChartData = [
      ...volumeChartData,
      {
        time: item.time,
        value: item.volumefrom,
        color: item.open - item.close < 0 ? 'rgba(0,140,79,0.5)' : 'rgba(186,4,61,0.5)',
      },
    ];
  });
  return { candleChartData, volumeChartData };
};

export const parseDepthData = (data) => {
  let bids = [];
  let asks = [];
  data.bids.forEach((item) => {
    let bid = item.split('~');
    // @ts-ignore
    bid = [parseFloat(bid[0]), parseFloat(bid[1])];
    bids = [...bids, bid];
  });
  data.asks.forEach((item) => {
    let ask = item.split('~');
    // @ts-ignore
    ask = [parseFloat(ask[0]), parseFloat(ask[1])];
    asks = [...asks, ask];
  });
  bids = bids.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  asks = asks.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  return { bids, asks };
};

export const getDataOnTimeRange = (data, timeRange) => {
  return data.filter((item) => {
    return item.time >= timeRange.start && item.time <= timeRange.end;
  });
};

export const getMaxMinValueOnTimeRange = (data) => {
  const { high, low, ma7, ma30, ma60 } = data[data.length - 1];
  let max = Math.max(high, low, ma7, ma30, ma60);
  let min = Math.min(high, low, ma7, ma30, ma60);
  data.forEach((item) => {
    max = Math.max(max, Math.max(item.high, item.ma7, item.ma30, item.ma60));
    min = Math.min(min, Math.min(item.low, item.ma7, item.ma30, item.ma60));
  });
  return { max, min };
};

export const getCoinApi = async () => {
  await axios
    .get(
      'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=1MIN&apikey=F2F34C02-3125-42BD-A219-1B844CBD8000',
    )
    .then((res) => {
      console.log('========== https://rest.coinapi.io ==========');
      console.log(res.data);
    });
};

export const getCoinMarketCap = async () => {
  await axios
    .get('https://api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin')
    .then((res) => {
      console.log('========== https://api.coincap.io ==========');
      console.log(res.data);
    });
};
