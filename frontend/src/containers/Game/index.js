import React, { useState, useEffect, useCallback, useRef } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomAlert, Loading } from 'components/elements';
import UserIcon from './components/UserIcon'
import TradeToken from './components/TradeToken'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { chargeStripe, getPaymentInfo, buyInStacke, getLeaderBoardScore } from 'redux/actions/payment';
import { getUserInfo } from 'redux/actions/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import BuyIn from './components/BuyIn';
import BuyModal from './components/BuyModal';
import MainSettingImage from 'assets/image/main_setting.png'
import LeaderBoardImage from 'assets/image/leader_board.png'
import AddAmountDialog from './components/AddAmountDialog'
import DashBoard from './components/DashBoard'
import Setting from './components/Setting'
import AmountInput from './components/AmountInput';
import { changeAmountUnit } from '../../utils'
import backgroundLine from 'assets/image/back_line.png';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyInContainer: {
    display: 'flex',
    flexDirection: (props) => props.isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tradeTokenSection: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  howToPlay: {
    marginTop: 20,
  },
  link: {
    textDecoration: 'none',
    fontFamily: theme.font.CeliasMedium,
  },
  title: {
    fontSize: (props) => props.isMobile ? 30 : '7vw',
    color: theme.palette.base.white,
    fontWeight: 'bold',
    marginTop: (props) => props.isMobile ? '5vh' : '10vh',
    marginBottom: '6vh',
    fontFamily: theme.font.CeliasMedium,
  },
  userSection :{
    position: 'absolute',
    top: 20,
    left: 20
  },
  mainSettingStyle: {
    position: 'absolute',
    cursor: 'pointer',
    bottom: 20,
    left: 20,
    '& img': {
      width: (props) => props.isMobile ? 50 : 75
    }
  },
  leaderBoardStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    '& img': {
      width: (props) => props.isMobile ? 40 : 75
    },
    '& p': {
      fontSize: (props) => props.isMobile ? 15 : 29,
      fontFamily: theme.font.CeliasMedium,
      margin: 0,
      color: theme.palette.primary.mainMenuButtonColor
    },
  },
  gameMenuTitle: {
    fontSize: (props) => props.isMobile ? 35 : '3vw',
    color: theme.palette.primary.mainMenuButtonColor,
    fontWeight: 'bold',
    marginTop: 0,
    fontFamily: theme.font.CeliasMedium,
  },
  amountModalContentStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (props) => props.isMobile ? 30 : 50,
    fontFamily: theme.font.CeliasMedium,
  },
  amountInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.font.CeliasMedium,
  },
  amountParent: {
    display: 'flex',
    position: 'absolute',
    top: (props) => props.isMobile ? '40vw' : 20,
    padding: '0 1vw 0 1vw',
    borderRadius: 8,
    borderColor: theme.palette.primary.buttonBottomBorder,
    borderWidth: 3,
    borderStyle: 'solid',
    width: (props) => props.isMobile ? '40vw' : '19vw',
    height: (props) => props.isMobile ? '10vw' : '10vh',
    alignItems: 'center',
    '& p': {
      fontSize: (props) => props.isMobile ? '5vw' : '3vw',
      padding: 0,
      margin: 0,
      color: 'white',
      fontFamily: theme.font.CeliasMedium,
    },
    '& h1': {
      fontSize: (props) => props.isMobile ? '5vw' : '3vw',
      width: '100%',
      padding: 0,
      paddingRight: 15,
      margin: 0,
      color: 'white',
      fontFamily: theme.font.CeliasMedium,
    },
    '& h2': {
      padding: 0,
      paddingLeft: '1vw',
      fontSize: (props) => props.isMobile ? '7vw' : '5vw',
      margin: 0,
      fontWeight: 'bold',
      color: 'white',
      fontWeight: 'bold',fontFamily: theme.font.CeliasMedium,
      cursor: 'pointer',
    },
  },
  hourlySession: {
    fontSize: (props) => props.isMobile ? 30 : 60,
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  tokenTime: {
    color: '#10abde',
    textAlign: 'center',
    fontSize: (props) => props.isMobile ? 16 : 24,

    '& p': {
      margin: 0,
    }
  },  
  backgroundLine: {
    position: 'absolute',
    bottom: (props) => props.isMobile ? '30vh' : '10vh',
    left: 0,
    width: '100%',
    height: 'auto',
    zIndex: -1,
    opacity: 0.6,
  }
}));

const REFRESH_TIME = 300;

function Game(props) {
  const [isHourlySession, setIsHourlySession] = useState(false);
  const [cookies, setCookie] = useCookies(['id', 'token']);
  const { chargeStripe, userInfo, paymentInfo, getPaymentInfo, history, getUserInfo, buyInStacke, getLeaderBoardScore, isMobile } = props;
  const classes = useStyles({isMobile});
  const [amountModalView, setAmountModalView] = useState(false);
  const [buyInModalView, setBuyInModalView] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState(0);
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error', type: 'error'});
  const [loading, setLoading] = useState(false);
  const [buyInSelect, setBuyInSelect] = useState(0);
  const [openDashBoard, setOpenDashBoard] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [tokenTime, setTokenTime] = useState(0);
  const tokenInterval = useRef(null);

  const buyInCoast = [
    {
      level: 'Easy',
      value: 20,
      color: '#ffffff',
    },
    {
      level: 'Medium',
      value: 50,
      color: '#1d9edc',
    },
    {
      level: 'Hard',
      value: 100,
      color: '#d70c8c',
    }
  ];

  const profileImage = '/Users/user1.png';//ProfileUserImage();

  const [userTradeToken, setUserTradeToken] = useState(0);

  const isUnMounted = useRef(false);
  useEffect(() => {
    isUnMounted.current = false;
    return () => {
      isUnMounted.current = true;
      if (tokenInterval.current) {
        clearInterval(tokenInterval.current);
      }
    };
  }, []);

  const increateTokens = useCallback(() => {
    const tokenStr = localStorage.getItem(cookies.id);
    const old_tokens = tokenStr ? parseInt(JSON.parse(tokenStr)) : 5;
    
    const tokenWaitTimeStr = localStorage.getItem('token_time');
    let tokenWaitTime = tokenWaitTimeStr ? parseInt(JSON.parse(tokenWaitTimeStr)) : REFRESH_TIME;
    console.log('????????????????????????????????????????????????????????', tokenWaitTime);
    if (tokenWaitTime > 0) {
      if (old_tokens < 5) {
        tokenWaitTime--;
        setTokenTime(tokenWaitTime);
        localStorage.setItem('token_time', JSON.stringify(tokenWaitTime));
      }
    } else {
      if (old_tokens < 5) {
        localStorage.setItem(cookies.id, JSON.stringify(old_tokens + 1));
        setUserTradeToken(old_tokens + 1);
        localStorage.setItem('token_update', JSON.stringify(new Date().getTime()));      
        setTokenTime(REFRESH_TIME);
        localStorage.setItem('token_time', JSON.stringify(REFRESH_TIME))
      }
    }
    
    localStorage.setItem('token_interval', 'true');
  }, []);

  const checkTokens = useCallback(() => {
    const tokenStr = localStorage.getItem(cookies.id);
    const tokens = tokenStr ? parseInt(JSON.parse(tokenStr)) : 5;
    console.log('<<<<', tokens);
    setUserTradeToken(tokens);
  }, []); 

  const checkHourlySession = useCallback(() => {
    const utcMins = new Date().getUTCMinutes();
    const utcDate = new Date().getUTCDate();

    const hourlySessionMins = (utcDate % 7) * 7 + 15;
    if (utcMins >= hourlySessionMins && utcMins <= hourlySessionMins + 2) {
      setIsHourlySession(true);
    } else {
      setIsHourlySession(false);
    }
  }, []);

  useEffect(() => {
    tokenInterval.current = setInterval(() => {
      checkTokens();
      checkHourlySession();
      increateTokens(); 
    }, 1000)
  }, [])

  useEffect(()=>{
    if(paymentInfo.amount) {
      setAmount(paymentInfo.amount);
      setAmountInput(paymentInfo.amount);
    }
  }, [paymentInfo]);

  useEffect(()=>{
    setLoading(true);
    getLeaderBoardScore();
    if(!userInfo._id) {
      if(cookies.id){
        localStorage.setItem('kc_token', cookies.token);
        getUserInfo(cookies.id)
          .then(()=>{
            getPaymentInfo()
              .then(()=>{
                setLoading(false);
                localStorage.setItem('token_update', JSON.stringify(new Date().getTime()));
              })
              .catch((error)=> {
                setErrorShow({show:true, message: error, type: 'error'});
                gotoLogIn();
              })
          })
          .catch(()=>{
            gotoLogIn();
          });

      } else gotoLogIn();
    } else {
      const tokenStr = localStorage.getItem(cookies.id);  
      const tokens = tokenStr ? parseInt(JSON.parse(tokenStr)) : 5;
      setUserTradeToken(tokens);

      localStorage.setItem('token_update', JSON.stringify(new Date().getTime()));

      if (tokens === 5) {
        localStorage.setItem(cookies.id, JSON.stringify(5));
      }

      getPaymentInfo()
      .then((res)=>{
        setLoading(false);
      })
      .catch((error)=> {
        setErrorShow({show:true, message: error, type: 'error'});
        gotoLogIn();
      });
    }
  }, []);

  const onClickStart = () => {
    if (userTradeToken > 0) {
      if (isHourlySession) {
        buyInStacke(10).then(()=>{
          history.push('/game/main');
        }).catch((error)=>{
          setErrorShow({show:true, message: error ? error : 'Net Error', type: 'error'});
        });
      } else {
        setBuyInModalView(true);
      }
    }
  };
  const onBuyInModalClose = () => {
    setBuyInModalView(false);
  };
  const onClickHowToPlay = () => {  
  };
  const gotoLogIn = () => {
    history.push('/home');
  };
  const onClickAmount = () => {
    setAmountModalView(true);
  };
  const onAmountModalClose = () => {
    setAmountModalView(false);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleBuyInClick = () => {
    const buyInCoasts = buyInCoast.map((cost) => cost.value);
    buyInStacke(buyInCoasts[buyInSelect]).then(()=>{
      history.push('/game/main');
    }).catch((error)=>{
      setErrorShow({show:true, message: error ? error : 'Net Error', type: 'error'});
    });
  }
  const handleAmountChargeClick = () => {
    chargeStripe({
      id: userInfo._id,
      amount: amount
    }).then(()=>{
      setErrorShow({show:true, message: 'Buy Success', type: 'success'});
      setAmountModalView(false);
      setAmount(0);
    }).catch((error)=>{
      setErrorShow({show:true, message: error ? error : 'Net Error', type: 'error'});
    });
  }
  const handleBuyInSelect = (value) => {
    setBuyInSelect(value);
  }
  const handleOpenDashBoard = () => {
    setOpenDashBoard(true);
  }
  const handleCloseDashBoard = () => {
    setOpenDashBoard(false);
  }
  const amountModalContent = (
    <div className={classes.amountModalContentStyle}>
      <AmountInput
        className={classes.amountInput}
        type="number"
        fontSize={isMobile ? "40px" : "75px"}
        width={isMobile ? "90%" : "70%"}
        handleChange={handleChangeAmount}
      />
    </div>
  );
  const buyInModalContent = (
    <div className={classes.buyInContainer}>
      {
        buyInCoast.map((item, index)=> 
          <BuyIn 
            value={item.value} 
            label={item.level} 
            color={item.color}
            width={isMobile ? '125px' : '12vw'}
            height={isMobile ? '50px' : '6vw'}
            isMobile={isMobile}
            key={index} 
            active={index === buyInSelect} 
            onSelect={handleBuyInSelect}
          /> )
      }
    </div>
  );

  const handleOpenSetting = () => {
    setOpenSetting(true);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  }
  if (loading) { return <Loading />; }

  const sec2Time = (secs) => {
    if (userTradeToken === 5) {
      return '';
    }
    
    const min = `${Math.floor(tokenTime / 60)}`;
    const sec = `${tokenTime % 60}`;
    return `${min.length === 1 ? '0' : ''}${min} : ${sec.length === 1 ? '0' : ''}${sec}`
  } 

  return (
    <div className={classes.container}>
      <img className={classes.backgroundLine} src={backgroundLine} alt="background line"/> 
      <div className={classes.userSection}>
        <UserIcon name={userInfo.name} image={profileImage} isMobile={isMobile}/>
      </div>
      <div className={classes.tradeTokenSection}>
        <TradeToken name={userTradeToken.toString()} isMobile={isMobile}/>
        <div className={classes.tokenTime}>
          <p>{sec2Time(tokenTime)}</p>
        </div>
      </div>
      <div className={classes.mainSettingStyle} onClick={()=>handleOpenSetting()}>
        <img src={MainSettingImage}/>
      </div>
      <div className={classes.leaderBoardStyle} onClick={()=>handleOpenDashBoard()}>
        <img src={LeaderBoardImage}/>
        <p>LeaderBoard</p>
      </div>
      <div className={classes.amountParent}>
        <h1>$</h1>
        <p>{changeAmountUnit(amountInput)}</p>
        <h2 onClick={onClickAmount}>
					+
        </h2>
      </div>
      {isHourlySession && <p className={classes.hourlySession}>Hourly Session</p>}
      <p className={classes.title}>BITCOIN TRADING</p>
      <div className={classes.buttonContainer}>
        <Link to={`/game${ paymentInfo.betCoin > 0 ? '/main' : ''}`} className={classes.link}>
          <p className={classes.gameMenuTitle} onClick={onClickStart}>Enter Game</p>
        </Link>
        {/* <Link to="/game" className={classes.link}>
          <p className={classes.gameMenuTitle} onClick={onClickHowToPlay}>How to Play</p>
        </Link> */}
      </div>
      <AddAmountDialog
        opened={amountModalView}
        handleClose={onAmountModalClose}
        content={amountModalContent}
        title="Add Amount"
        buttonTitle="BUY"
        handleOK={handleAmountChargeClick}
        isMobile={isMobile}
      />
      <BuyModal
        opened={buyInModalView}
        handleClose={onBuyInModalClose}
        content={buyInModalContent}
        title="Select Stacks"
        buttonTitle="BUY-IN"
        handleOK={handleBuyInClick}
        isMobile={isMobile}
      />
      <CustomAlert 
        title={errorShow.message}
        open={errorShow.show}
        handleClose={()=>setErrorShow(false)}
        type={errorShow.type}/>
      <DashBoard
        opened={openDashBoard}
        handleClose={handleCloseDashBoard}
        isMobile={isMobile}
        />
      <Setting
        opened={openSetting}
        handleClose={handleCloseSetting}
        isMobile={isMobile}
        />
    </div>
  );
}

Game.TypeProps = {
  isHourlySession: PropTypes.bool.isRequired,
  chargeStripe: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  paymentInfo: PropTypes.object.isRequired,
  getPaymentInfo: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  buyInStacke: PropTypes.func.isRequired,
  getLeaderBoardScore: PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({
  userInfo: store.userData.userInfo,
  paymentInfo: store.paymentData.paymentInfo,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  chargeStripe,
  getPaymentInfo,
  getUserInfo,
  buyInStacke,
  getLeaderBoardScore
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Game);
