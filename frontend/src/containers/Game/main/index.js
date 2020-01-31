import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { connect } from 'react-redux';
import { getUserInfo, setTradeToken } from 'redux/actions/user';
import { bindActionCreators } from 'redux';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { createLegendChart, setLegendChartStyle, setLegendChartData } from '../components/TradingChart';
import { createLineChart } from '../components/chart/TradingChart';
import { fetchData } from '../components/chart/TradingAPI';
import { JoinedUserMockData } from 'MockData';

const useStyles = makeStyles(() => ({
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: 20
  },
  userStakeInfoStyle: {
    padding: 10,
    display: 'flex',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#000',
    borderStyle: 'solid',
    '& p': {
      fontWeight: 'bold',
      fontSize: 20,
      margin: 0
    }
  },
  jackpotInfoStyle: {
    padding: 15,
    display: 'flex',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#000',
    borderStyle: 'solid',
    marginRight: 60,
    '& p': {
      fontWeight: 'bold',
      fontSize: 23,
      margin: 0
    }
  },
  gameTime : {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: 20,
    left: 20,
    zIndex: 2,
    '& svg': {
      borderRadius: 1,
      borderWidth:2,
      borderStyle: 'solid',
      borderColor: '#fff',
      fontSize: 50,
      color: '#fff'
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
    '& svg': {
      fontSize: 50
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
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: 20,
    right: 20,
    zIndex: 2,
    borderRadius: 2,
    borderWidth: 3,
    borderColor: '#000',
    borderStyle: 'solid',
    '& p': {
      margin: 0,
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10
    }
  }
}));

const cryptoParams = {
  url: ['https://min-api.cryptocompare.com/data/histo', 'https://min-api.cryptocompare.com/data/ob/l2/snapshot'],
  apiKey: process.env.REACT_APP_CRYPTO_API_KEY,
  fsym: 'BTC',
  tsym: 'USDT',
  limit: 300,
  aggregate: 1
};

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
    // const { chart } = createLegendChart();
    // const { areaSeries } = setLegendChartStyle(chart);
    // setLegendChartData(areaSeries);
    if (!paymentInfo.betCoin) {
      history.push('/game');
    } else {
      setTradeToken(-1);
      
      // for chart
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
    const data = await fetchData();
    chartData.push(data);
    lineSeries.setData(chartData);
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
          <p>{`Stake: $ ${paymentInfo.betCoin}`}</p>
        </div>
        <div className={classes.jackpotInfoStyle}>
          <p>{`Jackpot: $ 40,000`}</p>
        </div>
        <div className={classes.pauseGameStyle}>
          <PauseCircleFilledIcon />
        </div>
      </div>
      <div className={classes.tradingView} id='line-chart'>
        <div className={classes.gameTime}>
          <QueryBuilderIcon />
          <p>{`${gamePlayMin}:${gamePlaySec}`}</p>
        </div>
        <div className={classes.takeWinStyle}>
          <p>Take Win</p>
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
