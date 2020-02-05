import axios from 'axios';

const getDateTime = (time) => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = '0' + (date.getUTCMonth() + 1);
  const day = '0' + (date.getUTCMonth() + 1);
  const hours = '0' + date.getUTCHours();
  const minutes = '0' + date.getUTCMinutes();
  return year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':00';
};

export const fetchData = async (lastInfo) => {
  const url = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USDT&limit=60&api_key=f5377b79b4b87040f9a8fffdcdcc45b575a54377308b7a9018d65949059fa0cf';
  const data = await axios
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return false;
    });
  if (data) {
    let newData = [];
    data.data.Data.Data.forEach(item => {
      if (item.time > lastInfo.time || !lastInfo.time) {
        newData.push({
          time: item.time * 1000,
          value: item.open
        });  
      }
    });
    return newData;
  }
  return false;
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
