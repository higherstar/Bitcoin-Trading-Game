import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { connect } from 'react-redux';
import { getUserInfo, setTradeToken } from 'redux/actions/user';
import { bindActionCreators } from 'redux';
import { CustomButton } from 'components/elements';
import { createLineChart } from '../components/chart/TradingChart';
import { fetchData } from '../components/chart/TradingAPI';
import PauseImage from 'assets/image/pause_btn.png'
import ClockImage from 'assets/image/clock.png'

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
    zIndex: 5,
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

const sendDataType = {
  server: 0,
  gameData: 1,
  joinPing: 2
};

const gameServerStatus = {
  pending: 0,
  server: 1,
  client: 2
}

let globalStatus = 0;
let globalGameTime = 30;

const SocketURL = process.env.REACT_APP_SOCKET
function MainGameScreen(props) {
  const { setTradeToken, paymentInfo, history, userInfo } = props;
  const [ waitingTime, setWaitingTime ] = useState(30);
  const [ gameTime, setGameTime ] = useState(90);
  const ws = new WebSocket(SocketURL)
  const [ gameData, setGameData ] = useState([]);
  const classes = useStyles();
  let waitingTimerId = useRef(null);
  let gamePlayTimeId = useRef(null);
  let apiFetchTimerId = useRef(null);
  let serverSocketSendId = useRef(null);
  let chartWrapper = null;
  let lineSeries = null;
  let chartData = [];
  useEffect(async () => {
    if (!paymentInfo || !paymentInfo.betCoin) {
      history.push('/game');
    } else {
      setTradeToken(-1);
      
      ws.onopen = () => {
        sendJoinStatus();
      }
      ws.onmessage = evt => {
        console.log(JSON.parse(evt.data))
        const message = JSON.parse(evt.data);
        if (message.type === sendDataType.server) {
          if (globalStatus === gameServerStatus.pending) {
            changeGameData(message);
            globalStatus = gameServerStatus.client;
          }
          setWaitingTime(parseInt(message.message));
          if (parseInt(message.message) === 1)
            setTimeout(()=> {
              setWaitingTime((preState)=>preState-1);
            }, 1000)
        }
        if (message.type !== sendDataType.server)
          changeGameData(message);
      }
  
      ws.onclose = () => {
        console.log('disconnected')
      }
      // drawing chart
      const res = createLineChart();
      chartWrapper = res.chart;
      lineSeries = res.lineSeries;
      handleWindowResize();
      apiFetchTimerId.current = setInterval(fetchApiData, 1000);
    }
    setTimeout (()=> {
      if (globalStatus === gameServerStatus.pending) {
        globalStatus = gameServerStatus.server;
        serverSocketSendId.current = setInterval(()=> {
          sendServerData();
        }, 300);
        startGame();
      }
    }, 2000);
    window.addEventListener('resize', handleWindowResize);

  }, []);


  useEffect(()=> {
    if (waitingTime === 0 ) {
      clearInterval(waitingTimerId.current);
      clearInterval(serverSocketSendId.current);
      gamePlayTimeCountDown();
    }
    
  }, [waitingTime])

  useEffect(()=> {
    if (gameTime === 0)
    clearInterval(gamePlayTimeId.current);  
  }, [gameTime])

  const startGame = () => {
    waitingUserTimeCountDown();
  }

  const changeGameData = (message) => {
    let tempArray = []
    tempArray.push(message);
    setGameData(prevState => ([...tempArray, ...prevState]));
  }

  const sendJoinStatus = () => {
    const message = { name: userInfo.name, message: 'join', type: sendDataType.joinPing }
    ws.send(JSON.stringify(message));
  }

  const sendMyGameData = messageString => {
    const message = { name: userInfo.name, message: messageString, type: sendDataType.gameData }
    ws.send(JSON.stringify(message))
  }

  const sendServerData = () => {
    const message = { name: userInfo.name, message: globalGameTime, type: sendDataType.server }
    ws.send(JSON.stringify(message))
  }

  const handleWindowResize = () => {
    const htmlWrapper = document.getElementById('line-chart');
    if (!htmlWrapper || !chartWrapper) return;
    chartWrapper.resize(htmlWrapper.clientHeight, htmlWrapper.clientWidth);
  }

  const fetchApiData = async () => {
    const newData = await fetchData(chartData.length > 0 ? chartData[chartData.length-1] : {});
    if (newData) {
      chartData = [...chartData, ...newData];
      lineSeries.setData(chartData);
    }
  };

  const waitingUserTimeCountDown = () => {
    waitingTimerId.current = setInterval(()=> {
      setWaitingTime((t)=> t-1);
      globalGameTime -=1;
    }, 1000);
  }

  const gamePlayTimeCountDown = () => {
    gamePlayTimeId.current = setInterval(()=> {
      setGameTime((t)=>t-1);
    }, 1000);
  }

  const onClickTakeWin = () => {
    sendMyGameData('join me!!!!!');
  }

  let tmpGameTime = gameTime > 90 ? 90 : gameTime;
  const min = Math.floor(tmpGameTime / 60);
  const sec = tmpGameTime - 60 * min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if(sec < 10) gamePlaySec = `0${sec}`;
  if(min < 10) gamePlayMin = `0${min}`
  const joinedUsers = gameData.filter(item=>item.type !== sendDataType.gameData && item.name !== userInfo.name)
  return (
    <div className={classes.container} >
      <div className={classes.headerBar}>
        <div className={classes.userStakeInfoStyle}>
          <p>{`Stake : $ ${paymentInfo.betCoin}`}</p>
        </div>
        <div className={classes.jackpotInfoStyle}>
          <p>{`Jackpot : $ 40,000`}</p>
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
              <p>{item.name}</p>
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
