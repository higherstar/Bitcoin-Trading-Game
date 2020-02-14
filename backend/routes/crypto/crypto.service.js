const config = require('../../config/vars');

const axios = require('axios');
const app = require("express")();
app.use(require("body-parser").text());
const Crypto = require('./crypto.model');

module.exports = {
	getData,
  setGamePlayInfo,
  setGameScore,
  resultWinner
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

async function setGamePlayInfo (res) {
	const newCriptoData = new Crypto(res)
	return await newCriptoData.save();
}

async function resultWinner(res) {
  const allData = await Crypto.find({roomId: res.roomId});
  const myData = await Crypto.findOne({playerName : res.playerName});
  const myScore = (myData.score1 > myData.score2 ? myData.score1 : myData.score2);
  let result = false;
  allData.forEach(item => {
    result = (item.score1 > item.score2 ? item.score1 : item.score2) > myScore ? false : true
  })
  return result
}

async function setGameScore(res) {
  const player = await Crypto.findOne({ playerName : res.playerName})
  if (player) {
    Object.assign(player, {
      roomId: player.roomId,
      playerName: player.playerName,
      betCoin: player.betCoin,
      score1: player.score1 === 0 ? res.score : player.score1,
      score2: player.score1 !== 0 ? res.score : player.score2
    });
    return await player.save();
  } else throw "There is no User";
}