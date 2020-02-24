const config = require('../../config/vars');

const axios = require('axios');
const app = require("express")();
app.use(require("body-parser").text());
const Crypto = require('./crypto.model');
const Payment = require('../payment/payment.model');

module.exports = {
	getData,
  setGamePlayInfo,
  setGameScore,
  resultWinner
};

let chartData = [];
let repeatTime = 0;
let nowTime = 0;
let fetchingDataTimer = null;
async function getData() {
  if(fetchingDataTimer){
    if (chartData.length > 70) {
      chartData.splice(0, chartData.length - 70);
    }
    return chartData;
  }
  else {
    nowTime = new Date().getTime();
    fetchingDataTimer = setInterval(()=> {
      if (repeatTime < 1) {
        fetchApiData();
        repeatTime ++;
      } else {
        const values = chartData.map(item => item.value)
        setRandomPrice(values[values.length-2], values[values.length-1]);
        repeatTime ++;
        if (repeatTime > 20)
          repeatTime = 0;
      }
    }, 2000)
    return [];
  }
};

const fetchApiData = async () => {
	const newData = await fetchData(chartData.length > 0 ? chartData[chartData.length-1] : {});
	if (newData) {
    chartData = [...chartData, ...newData];
	}
	return chartData
};

const fetchData = async (lastInfo) => {
  const url = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USDT&limit=1&api_key=197089f2de9f79be0592ceac176b4956a68460bfc0b8fcfe76f0ccdd6b180491';
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
        if (item.time) {
          nowTime += 1000;
          newData.push({
            time: nowTime,
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
  let jackPot = 0;
  allData.forEach( member => {
    jackPot += member.betCoin;
  });

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
    const paymentInfo = await Payment.findOne({ name: res.playerName });
    Object.assign(paymentInfo, {amount: paymentInfo.amount + jackPot});
    await paymentInfo.save();
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

function setRandomPrice(lastData, lastData1) {
  nowTime += 1000;
  let shouldChangeDirection = false;
  const speed = lastData1 - lastData;
  if (Math.random() < Math.random() * 0.5) {
    shouldChangeDirection = true;
  }
  const ramdomValue = lastData1 + (lastData < lastData1 ? 1 : -1) * (2 + Math.random() * 3) * (shouldChangeDirection ? -1 : 1); 
  if (ramdomValue)
    chartData.push({
      time: nowTime,
      value: ramdomValue
    })
}