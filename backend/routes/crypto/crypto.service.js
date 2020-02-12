const config = require('../../config/vars');

const axios = require('axios');
const app = require("express")();
app.use(require("body-parser").text());
const Crypto = require('./crypto.model');

module.exports = {
	getData,
	setGameStatus
};

let chartData = [];

async function getData() {
	const cryptoData = await fetchApiData();
	if (cryptoData) {
		return await cryptoData;
	} else throw "Can not get the Crypto Data";
};

const fetchApiData = async () => {
	const newData = await fetchData(chartData.length > 0 ? chartData[chartData.length-1] : {});
	if (newData) {
		chartData = [...chartData, ...newData];
	}
	return chartData
};

const fetchData = async (lastInfo) => {
  const url = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USDT&limit=60&api_key=f5377b79b4b87040f9a8fffdcdcc45b575a54377308b7a9018d65949059fa0cf';
  const data = await axios
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw false
    });
  if (data) {
    let newData = [];
    data.data.Data.Data.forEach(item => {
      if (item.time * 1000 > lastInfo.time || !lastInfo.time) {
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

async function setGameStatus (res) {
	const newCriptoData = new Crypto({
		roomId: 123,
		playerName: res.name,
		score: res.score
	})
	return await newCriptoData.save();
}