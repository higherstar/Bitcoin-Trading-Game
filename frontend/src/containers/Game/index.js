import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox, CustomAlert, Loading } from 'components/elements';
import { Link } from 'react-router-dom';
import { CustomModal } from 'components/modals';
import { bindActionCreators } from 'redux';
import { chargeStripe, getPaymentInfo } from 'redux/actions/payment';
import { getUserInfo } from 'redux/actions/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.base.white,
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
  howToPlay: {
    marginTop: 20,
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  amountParent: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    padding: '0 10px',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 7,
    minWidth: 230,
    borderStyle: 'solid',
    alignItems: 'center',
    '& p': {
      fontSize: 30,
      padding: 0,
      margin: 0,
    },
    '& h1': {
      fontSize: 40,
      width: '100%',
      padding: 0,
      paddingRight: 15,
      margin: 0,
      fontWeight: 'bold',
    },
    '& i': {
      fontSize: 30,
      padding: 0,
      paddingLeft: 15,
      margin: 0,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
}));

function Game(props) {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['id', 'token']);
  const { chargeStripe, userInfo, paymentInfo, getPaymentInfo, history, getUserInfo } = props;
  const [amountModalView, setAmountModalView] = useState(false);
  const [buyInModalView, setBuyInModalView] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState(0);
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error', type: 'error'});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(paymentInfo.amount) {
      setAmount(paymentInfo.amount);
      setAmountInput(paymentInfo.amount);
    }
  }, [paymentInfo])

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
  }, [])

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
    history.push('/login');
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
  const handleAmountChargeClick = () => {
    chargeStripe({
        id: userInfo._id,
        amount: amount
    }).then(()=>{
      setErrorShow({show:true, message: 'Buy Success', type: 'success'});
      setAmountModalView(false);
    }).catch((error)=>{
      setErrorShow({show:true, message: error ? error : 'Net Error', type: 'error'});
    });
  }
  const amountModalContent = (
    <div>
      <CustomInputBox
        onChange={handleChangeAmount}
        width={300}
        type="number"
        defaultValue={amount}
        marginBottom={0}
        labelPadding={0}
        leftText="$"
        shrink
        variant="outlined"
      />
    </div>
  );
  if (loading) { return <Loading />; }
  return (
    <div className={classes.container}>
      <div className={classes.amountParent}>
        <h1>$</h1>
        <p>{amountInput}</p>
        <i className="material-icons" onClick={onClickAmount}>
					add_circle
        </i>
      </div>
      <p className={classes.title}>BitCoin Trading</p>
      <div className={classes.buttonContainer}>
        <Link to="/game" className={classes.link}>
          <CustomButton label="Enter Game" onClick={onClickStart} />
        </Link>
        <Link to="/game" className={classes.link}>
          <CustomButton label="How to Play" className={classes.howToPlay} onClick={onClickHowToPlay} />
        </Link>
      </div>
      <CustomModal
        opened={buyInModalView}
        handleClose={onBuyInModalClose}
        content={amountModalContent}
        title="Add Amount"
        buttonTitle="Buy"
        handleOK={handleAmountChargeClick}
      />
      <CustomModal
        opened={buyInModalView}
        handleClose={onBuyInModalClose}
        content={amountModalContent}
        title="Select Stackes"
        buttonTitle="Buy-in"
        handleOK={handleAmountChargeClick}
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
  getUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({
  userInfo: store.userData.userInfo,
  paymentInfo: store.paymentData.paymentInfo
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  chargeStripe,
  getPaymentInfo,
  getUserInfo
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Game);
