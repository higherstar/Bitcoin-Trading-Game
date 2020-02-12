import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import makeStyles from '@material-ui/styles/makeStyles';
import { connect } from 'react-redux';
import { getUserInfo, setTradeToken } from 'redux/actions/user';
import { bindActionCreators } from 'redux';
import { CustomButton } from 'components/elements';
import { createLineChart } from '../components/chart/TradingChart';
import { fetchData, getCryptoData } from '../components/chart/TradingAPI';
import PauseImage from 'assets/image/pause_btn.png'
import ClockImage from 'assets/image/clock.png'
import httpService from '../../../services/http.service';
import { errorMessage } from '../../../utils'
import { CustomAlert } from 'components/elements';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  tradingView: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  headerBar: {
    width: '100%',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'end',
    padding: 20
  },
  userStakeInfoStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    marginRight: 30,
    display: 'flex',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: theme.palette.primary.buttonBottomBorder,
    borderStyle: 'solid',
    '& p': {
      fontWeight: 'bold',
      fontFamily: theme.font.CeliasMedium,
      color: 'white',
      fontSize: 25,
      margin: 0
    }
  },
  jackpotInfoStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,    
    display: 'flex',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: theme.palette.primary.buttonBottomBorder,
    borderStyle: 'solid',
    marginRight: 60,
    '& p': {
      fontFamily: theme.font.CeliasMedium,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      margin: 0
    }
  },
  gameTime : {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: 20,
    right: '7vw',
    zIndex: 2,
    '& img': {
      width: 70
    },
    '& p': {
      fontSize: 12,
      color: '#fff',
      textAlign: 'center',
      margin: 0,
      paddingTop: 5
    }
  },
  pauseGameStyle: {
    position: 'absolute',
    left: '5vw',
    top: 20,
    '& img': {
      width: 70
    }
  },
  joinedUserList: {
    display: 'flex',
    padding: 15,
    minHeight: 190,
    justifyContent: 'flex-start',
    borderWidth: 5,
    borderRadius: 15,
    borderColor: theme.palette.primary.buttonTopBorder,
    borderStyle: 'double',
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 20
  },
  joinedUserStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    '& p': {
      textAlign: 'center',
      margin: 0,
      color: theme.palette.base.white,
      fontFamily: theme.font.CeliasMedium,
      fontSize: 20,
      paddingTop: 20,
      fontWeight: 'bold'
    },
    '& svg': {
      fontSize: 40
    }
  },
  waitingScreenStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000008f',
    position: 'absolute',
    zIndex: 25,
    '& p': {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 50,
      margin: 0,
      textAlign: 'center'
    }
  },
  takeWinStyle:{
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    bottom: '8vh',
    right: '10vw',
    zIndex: 20,
  }
}));

const markColorList = [
  '#ee4035',
  '#f37736',
  '#fdf498',
  '#7bc043',
  '#0392cf',
  '#fe9c8f',
  '#f9caa7',
  'fe8a71'
]
const SocketURL = process.env.REACT_APP_SOCKET
const client = new W3CWebSocket(SocketURL);
const contentDefaultMessage = [];
const totalGameTime = 300;
const gameWatingTime = 30;
function MainGameScreen(props) {
  const { setTradeToken, paymentInfo, history, userInfo } = props;
  const [ waitingTime, setWaitingTime ] = useState(gameWatingTime);
  const [ gameTime, setGameTime ] = useState(totalGameTime);
  const [ currentGameData, setCurrentGameData] = useState({
    currentUsers: [],
    userActivity: [],
    userName: null,
    data: [],
    startGameTime: -1
  });
  const [ jackPot, setJackPot ] = useState(0);
  const classes = useStyles();
  let waitingTimerId = useRef(null);
  let gamePlayTimeId = useRef(null);
  let apiFetchTimerId = useRef(null);
  let chartWrapper = null;
  let lineSeries = useRef(null);
  let chartData = useRef([]);
  let startingGame = useRef(false);
  let takeTokenCount = useRef(2);
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error', type: 'error'});

  useEffect(() => {
    if (!paymentInfo || !paymentInfo.betCoin) {
      clearInterval(waitingTimerId.current);
      clearInterval(gamePlayTimeId.current);
      history.push('/game');
    } else {
      setTradeToken(-1);
      //socket connection
      client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      receiveGameData();
      loginGameRoom();
      // drawing chart
      const res = createLineChart();
      chartWrapper = res.chart;
      lineSeries.current = res.lineSeries;
      handleWindowResize();
      apiFetchTimerId.current = setInterval(fetchApiData, 2000);
      window.addEventListener('resize', handleWindowResize);
    }
  }, []);


  useEffect(()=> {
    if (waitingTime === 0 ) {
      clearInterval(waitingTimerId.current);
      gamePlayTimeCountDown();
    }
  }, [waitingTime])

  useEffect(()=> {
    if (gameTime === 0)
    clearInterval(gamePlayTimeId.current);  
  }, [gameTime])


  const loginGameRoom = () => {
    const username = userInfo.name;
    if (username.trim()) {
      setCurrentGameData({
        ...currentGameData,
        userName: username
      })
      client.send(JSON.stringify({
        text: '',
        username: username,
        type: "userevent",
        betCoin: paymentInfo.betCoin
      }));
    }
  }

  const receiveGameData = () => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      stateToChange.data = [];
      stateToChange.userName = userInfo.name;
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
        stateToChange.data = dataFromServer.data.editorContent || contentDefaultMessage;
        stateToChange.startGameTime = dataFromServer.data.startGameTime || -1;
        const startSec = gameWatingTime - Math.floor((Date.now() - stateToChange.startGameTime)/1000);
        console.log(dataFromServer.data.totalBetCoin);
        setJackPot(dataFromServer.data.totalBetCoin);
        if (!startingGame.current) {
          startingGame.current=true;
          startGame(startSec);
        }
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.data = dataFromServer.data.editorContent || contentDefaultMessage;
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      stateToChange.startGameTime = dataFromServer.data.startGameTime || -1;
      if (stateToChange.data.length > 0) {
        const getMarkerInfo = stateToChange.data.reduce((prev, item)=> {
          const parseItem = JSON.parse(item);
          if ( chartData.current.filter(chartItem=>chartItem.time === parseItem.time).length > 0 )
            return [
              ...prev,
              {
              time:  parseItem.time,
              position: 'aboveBar',
              color: userInfo.name === parseItem.name ? markColorList[0] : parseItem.color,
              shape: 'arrowDown',
              text: 'text'
            }
          ];
        }, []);
        lineSeries.current.setMarkers(getMarkerInfo);
      }
      setCurrentGameData({
        ...stateToChange
      })
    };
  }

  const startGame = (startTime) => {
    waitingUserTimeCountDown(startTime);
  }

  const handleWindowResize = () => {
    const htmlWrapper = document.getElementById('line-chart');
    if (!htmlWrapper || !chartWrapper) return;
    chartWrapper.resize(htmlWrapper.clientHeight, htmlWrapper.clientWidth);
  }

  const fetchApiData = async () => {
    const cryptoData = await getCryptoData();
    if (cryptoData) {
      chartData.current = cryptoData;
      lineSeries.current.setData(cryptoData);
    }
  };

  const waitingUserTimeCountDown = (startTime) => {
    setWaitingTime(startTime);
    waitingTimerId.current = setInterval(()=> {
      setWaitingTime((t)=> t-1);
    }, 1000);
  }

  const gamePlayTimeCountDown = () => {
    gamePlayTimeId.current = setInterval(()=> {
      setGameTime((t)=>t-1);
    }, 1000);
  }

  const setGameScore = async (body) => {
    const getCryptoData = httpService
    .post('/crypto/recordscore', body)
      .then(() => {return true})
      .catch(() => {
        return false;
      }
    );
    return getCryptoData
  }

  const onClickTakeWin = async () => {
    if (takeTokenCount.current < 1) {
      setErrorShow({show:true, message: 'There is no Token', type: 'warning'});
      return;
    }

    const currentData = chartData.current[chartData.current.length-1];
    const chooseTime = currentData.time;
    const sendData = JSON.stringify({
      time : chooseTime,
      name : currentGameData.userName,
      color: markColorList[Math.floor(Math.random() * 7 + 1)]
    })

    const saveData = await setGameScore({
      score: currentData.value,
      name: userInfo.name
    });
    if (saveData) {
      takeTokenCount.current -= 1;
      client.send(JSON.stringify({
        type: "contentchange",
        username: currentGameData.userName,
        content: sendData
      }));
    }
    else setErrorShow({show:true, message: 'Your score did not update! Try again.', type: 'error'});
  }

  let tmpGameTime = gameTime > totalGameTime ? totalGameTime : gameTime;
  const min = Math.floor(tmpGameTime / 60);
  const sec = tmpGameTime - 60 * min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if(sec < 10) gamePlaySec = `0${sec}`;
  if(min < 10) gamePlayMin = `0${min}`
  const joinedUsers = currentGameData.currentUsers
  return (
    <div className={classes.container} >
      <div className={classes.headerBar}>
        <div className={classes.userStakeInfoStyle}>
          <p>{`Stake : $ ${paymentInfo.betCoin}`}</p>
        </div>
        <div className={classes.jackpotInfoStyle}>
          <p>{`Jackpot : $ ${jackPot}`}</p>
        </div>
        <div className={classes.pauseGameStyle}>
          <img src={PauseImage}/>
        </div>
      </div>
      <div className={classes.tradingView} id='line-chart'>
        <div className={classes.gameTime}>
          <img src={ClockImage}/>
          <p>{`${gamePlayMin}:${gamePlaySec}`}</p>
        </div>
        <div className={classes.takeWinStyle}>
          <CustomButton
            onClick={onClickTakeWin} 
            width={200}
            height={80} 
            label="TAKE WIN"/>
        </div>
      </div>
      <div className={classes.joinedUserList}>
        {
          joinedUsers.map((item, index) => (
            <div key={index} className={classes.joinedUserStyle}>
              <img src={`/Users/user${index+1}.png`} />
              <p>{item.username}</p>
            </div>
          ))
        }
      </div>
      {
        waitingTime > 0 &&
        <div className={classes.waitingScreenStyle}>
          <p>Waiting Users...</p>
          <p>{waitingTime}</p>
        </div>
      }
      <CustomAlert 
        title={errorShow.message}
        open={errorShow.show}
        handleClose={()=>setErrorShow(false)}
        type={errorShow.type}/>
    </div>
  );
}

MainGameScreen.propTypes = {
  setTradeToken: PropTypes.func.isRequired,
  paymentInfo: PropTypes.object,
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

MainGameScreen.defaultProps = {
  paymentInfo: {}
};

const mapStateToProps = (store) => ({
  paymentInfo: store.paymentData.paymentInfo,
  userInfo: store.userData.userInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTradeToken
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainGameScreen);
