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
let fetchingDataTimer = null;
async function getData() {
  if(fetchingDataTimer)
    return chartData;
  else {
    fetchingDataTimer = setInterval(()=> {
      fetchApiData();
    }, 2000)
    return [];
  }
};

const fetchApiData = async () => {
	const newData = await fetchData(chartData.length > 0 ? chartData[chartData.length-1] : {});
	if (newData) {
    chartData = [...chartData, ...newData];
    if (chartData.length > 200) {
      chartData.splice(0, chartData.length - 200);
    }
	}
	return chartData
};

const fetchData = async (lastInfo) => {
  const url = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USDT&limit=60&api_key=585142d902ea6c7b46f56502ce21a6afd2f0122bc68a7d1c17884db9d36035af';
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
    if (data.data.Data.Data && data.data.Data.Data.length > 0)
      data.data.Data.Data.forEach(item => {
        if (item.time * 1000 > lastInfo.time || !lastInfo.time) {
          newData.push({
            time: item.time * 1000,
            value: item.open
          });  
        }
      });
    else return [];
    return newData;
  }
  return [];
};

async function setGamePlayInfo (res) {
	const newCriptoData = new Crypto(res)
	return await newCriptoData.save();
}

async function resultWinner(res) {
  const allData = await Crypto.find({roomId: res.roomId});
  let myData = [];
  myData = allData.filter(item=> item.playerName === res.playerName);
  const otherData = allData.filter(item=> item.playerName !== res.playerName);
  if(myData.length === 0) {
    return false;
  }
  const myScore = (myData[0].score1 > myData[0].score2 ? myData[0].score1 : myData[0].score2);
  
  let maxScore = 0;
  otherData.forEach(item => {
    const itemMax = (item.score1 > item.score2 ? item.score1 : item.score2);
    maxScore = itemMax > maxScore ? itemMax : maxScore
  })
  if (myScore >= maxScore) {
    return true;
  }
  return false
}

async function setGameScore(res) {
  const player = await Crypto.findOne({ roomId: res.roomId, playerName : res.playerName})
  if (player) {
    Object.assign(player, {
      playerName: player.playerName,
      betCoin: player.betCoin,
      score1: player.score1 === 0 ? res.score : player.score1,
      score2: player.score1 !== 0 ? res.score : player.score2
    });
    return await player.save();
  } else throw "There is no User";
}