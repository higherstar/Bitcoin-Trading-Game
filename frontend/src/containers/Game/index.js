import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomAlert, Loading } from 'components/elements';
import UserIcon from './components/UserIcon'
import TradeToken from './components/TradeToken'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { chargeStripe, getPaymentInfo, buyInStacke } from 'redux/actions/payment';
import { getUserInfo } from 'redux/actions/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import BuyIn from './components/BuyIn';
import BuyModal from './components/BuyModal';
import MainSettingImage from 'assets/image/main_setting.png'
import LeaderBoardImage from 'assets/image/leader_board.png'
import AddAmountDialog from './components/AddAmountDialog'
import AmountInput from './components/AmountInput';
import { ProfileUserImage } from './components/UserImage'
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
    fontSize: '7vw',
    color: theme.palette.base.white,
    fontWeight: 'bold',
    marginTop: '20vh',
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
    bottom: 20,
    left: 20,
    '& img': {
      width: 75
    }
  },
  leaderBoardStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    '& img': {
      width: 75
    },
    '& p': {
      fontSize: 29,
      fontFamily: theme.font.CeliasMedium,
      margin: 0,
      color: theme.palette.primary.mainMenuButtonColor
    },
  },
  gameMenuTitle: {
    fontSize: '3vw',
    color: theme.palette.primary.mainMenuButtonColor,
    fontWeight: 'bold',
    marginTop: 0,
    fontFamily: theme.font.CeliasMedium,
  },
  amountModalContentStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
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
    top: 20,
    padding: '0 1vw 0 1vw',
    borderRadius: 8,
    borderColor: theme.palette.primary.buttonBottomBorder,
    borderWidth: 3,
    borderStyle: 'solid',
    width: '19vw',
    height: '10vh',
    alignItems: 'center',
    '& p': {
      fontSize: '3vw',
      padding: 0,
      margin: 0,
      color: 'white',
      fontFamily: theme.font.CeliasMedium,
    },
    '& h1': {
      fontSize: '3vw',
      width: '100%',
      padding: 0,
      paddingRight: 15,
      margin: 0,
      color: 'white',
      fontFamily: theme.font.CeliasMedium,
    },
    '& h2': {
      padding: 0,
      paddingLeft: 15,
      fontSize: '5vw',
      margin: 0,
      fontWeight: 'bold',
      color: 'white',
      fontWeight: 'bold',fontFamily: theme.font.CeliasMedium,
      cursor: 'pointer',
    },
  },
}));

function Game(props) {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['id', 'token']);
  const { chargeStripe, userInfo, paymentInfo, getPaymentInfo, history, getUserInfo, buyInStacke, userTradeToken } = props;
  const [amountModalView, setAmountModalView] = useState(false);
  const [buyInModalView, setBuyInModalView] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState(0);
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error', type: 'error'});
  const [loading, setLoading] = useState(false);
  const [buyInSelect, setBuyInSelect] = useState(0);
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
  useEffect(()=>{
    if(paymentInfo.amount) {
      setAmount(paymentInfo.amount);
      setAmountInput(paymentInfo.amount);
    }
  }, [paymentInfo]);

  useEffect(()=>{
    setLoading(true);
    if(!userInfo.id) {
      if(cookies.id){
        localStorage.setItem('kc_token', cookies.token);
        getUserInfo(cookies.id)
          .then(()=>{
            getPaymentInfo()
              .then(()=>{
                setLoading(false);
              })
          })
          .catch(()=>{
            gotoLogIn();
          });

      } else gotoLogIn();
    } else {
      getPaymentInfo()
      .then(()=>{
        setLoading(false);
      })
      .catch((error)=> {
        setLoading(false);
        setErrorShow({show:true, message: error, type: 'error'});
      });
    }
  }, []);

  const onClickStart = () => {
    setBuyInModalView(true);
  };
  const onBuyInModalClose = () => {
    setBuyInModalView(false);
  };
  const onClickHowToPlay = () => {
    console.log('signupButtonClicked');
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
  const amountModalContent = (
    <div className={classes.amountModalContentStyle}>
      <AmountInput
        className={classes.amountInput}
        type="number"
        fontSize="75px"
        width="70%"
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
            width={'12vw'}
            height={'6vw'}
            key={index} 
            active={index === buyInSelect} 
            onSelect={handleBuyInSelect}
          /> )
      }
    </div>
  );
  if (loading) { return <Loading />; }
  return (
    <div className={classes.container}>
      <div className={classes.userSection}>
        <UserIcon name={userInfo.name} image={profileImage}/>
      </div>
      <div className={classes.tradeTokenSection}>
        <TradeToken name={userTradeToken.toString()}/>
      </div>
      {/* <div className={classes.mainSettingStyle}>
        <img src={MainSettingImage}/>
      </div> */}
      {/* <div className={classes.leaderBoardStyle}>
        <img src={LeaderBoardImage}/>
        <p>LeaderBoard</p>
      </div> */}
      <div className={classes.amountParent}>
        <h1>$</h1>
        <p>{amountInput}</p>
        <h2 onClick={onClickAmount}>
					+
        </h2>
      </div>
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
      />
      <BuyModal
        opened={buyInModalView}
        handleClose={onBuyInModalClose}
        content={buyInModalContent}
        title="Select Stackes"
        buttonTitle="BUY-IN"
        handleOK={handleBuyInClick}
      />
      <CustomAlert 
        title={errorShow.message}
        open={errorShow.show}
        handleClose={()=>setErrorShow(false)}
        type={errorShow.type}/>
    </div>
  );
}

Game.TypeProps = {
  chargeStripe: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  paymentInfo: PropTypes.object.isRequired,
  getPaymentInfo: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  buyInStacke: PropTypes.func.isRequired,
  userTradeToken: PropTypes.number.isRequired
}

const mapStateToProps = (store) => ({
  userInfo: store.userData.userInfo,
  paymentInfo: store.paymentData.paymentInfo,
  userTradeToken: store.userData.userTradeToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  chargeStripe,
  getPaymentInfo,
  getUserInfo,
  buyInStacke
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Game);
