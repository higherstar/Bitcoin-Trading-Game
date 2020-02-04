import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { connect } from 'react-redux';
import { getUserInfo, setTradeToken } from 'redux/actions/user';
import { bindActionCreators } from 'redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { CustomButton } from 'components/elements';
import { createLineChart } from '../components/chart/TradingChart';
import { fetchData } from '../components/chart/TradingAPI';
import PauseImage from 'assets/image/pause_btn.png'
import ClockImage from 'assets/image/clock.png'
import { JoinedUserMockData } from 'MockData';

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
    alignItems: 'center',
    padding: 20
  },
  userStakeInfoStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
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
    padding: 15
  },
  joinedUserStyle: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginRight: 20,
    marginLeft: 20,
    '& p': {
      textAlign: 'center',
      margin: 0
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

function MainGameScreen(props) {
  const { setTradeToken, paymentInfo, history } = props;
  const [ waitingTime, setWaitingTime ] = useState(1);
  const [ gameTime, setGameTime ] = useState(1);

  const classes = useStyles();
  let waitingTimerId = useRef(null);
  let gamePlayTimeId = useRef(null);
  let apiFetchTimerId = useRef(null);
  let chartWrapper = null;
  let lineSeries = null;
  let chartData = [];

  useEffect(async () => {
    if (!paymentInfo.betCoin) {
      history.push('/game');
    } else {
      setTradeToken(-1);
      
      // drawing chart
      const res = createLineChart();
      chartWrapper = res.chart;
      lineSeries = res.lineSeries;
      handleWindowResize();
      apiFetchTimerId.current = setInterval(fetchApiData, 1000);

      waitingUserTimeCountDown();
      gamePlayTimeCountDown();
    }

    window.addEventListener('resize', handleWindowResize);
  }, []);

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
    }, 1000);
  }

  const gamePlayTimeCountDown = () => {
    gamePlayTimeId.current = setInterval(()=> {
      setGameTime((t)=>t-1);
    }, 1000);
  }

  const onClickTakeWin = () => {}

  if(waitingTime == 0) {
    clearInterval(waitingTimerId.current);
  }

  if(gameTime == 0) {
    clearInterval(gamePlayTimeId.current);
  }
  let tmpGameTime = gameTime > 90 ? 90 : gameTime;
  const min = Math.floor(tmpGameTime / 60);
  const sec = tmpGameTime - 60 * min;
  let gamePlayMin = min;
  let gamePlaySec = sec;
  if(sec < 10) gamePlaySec = `0${sec}`;
  if(min < 10) gamePlayMin = `0${min}`
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
          JoinedUserMockData.map((item, index) => (
            <div key={index} className={classes.joinedUserStyle}>
              <AccountCircleIcon />
              <p>{item}</p>
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
  history: PropTypes.func.isRequired
};

MainGameScreen.defaultProps = {
  paymentInfo: {}
};

const mapStateToProps = (store) => ({
  paymentInfo: store.paymentData.paymentInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTradeToken
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainGameScreen);
