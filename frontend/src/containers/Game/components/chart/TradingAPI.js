import axios from 'axios';

export const fetchData = async (cryptoParams) => {
  // const { url, apiKey, fsym, tsym, limit, aggregate } = cryptoParams;
  // const timeUnit = aggregate < 60 ? 'minute' : aggregate < 1440 ? 'hour' : 'day';
  // const aggregateNew = aggregate < 60 ? aggregate : aggregate < 1440 ? aggregate / 60 : aggregate > 1440 ? 7 : 1;
  // const request1 = `${url[0]}${timeUnit}?fsym=${fsym}&tsym=${tsym}&aggregate=${aggregateNew}&limit=${limit}&api_key=${apiKey}`;
  // const request2 = `${url[1]}?fsym=${fsym}&tsym=${tsym}&limit=${50}&api_key=${apiKey}`;
  return { time: Date.now(), value: 100 * Math.random() };
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
