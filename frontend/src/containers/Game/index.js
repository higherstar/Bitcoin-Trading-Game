import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox } from 'components/elements';
import { Link } from 'react-router-dom';
import { CustomModal } from 'components/modals';
import { bindActionCreators } from 'redux';
import { chargeStripe } from 'redux/actions/payment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  const { chargeStripe, userInfo } = props;
  const [amountModalView, setAmountModalView] = useState(false);
  const [amount, setAmount] = useState(0);

  const onClickStart = () => {
    console.log('LoginButtonClicked');
  };
  const onClickHowToPlay = () => {
    console.log('signupButtonClicked');
  };
  const onClickAmount = () => {
    setAmountModalView(true);
  };
  const onAmountModalClose = () => {
    setAmountModalView(false);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value)
  };
  const handleAmountChargeClick = () => {
    chargeStripe({
        id: userInfo._id,
        amount: amount
      })
  }
  const amountModalContent = (
    <div>
      <CustomInputBox
        onChange={handleChangeAmount}
        width={300}
        type="number"
        marginBottom={0}
        labelPadding={0}
        leftText="$"
        shrink
        variant="outlined"
      />
    </div>
  );
  return (
    <div className={classes.container}>
      <div className={classes.amountParent}>
        <h1>$</h1>
        <p>0</p>
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
        opened={amountModalView}
        handleClose={onAmountModalClose}
        content={amountModalContent}
        title="Add Amount"
        buttonTitle="Buy"
        handleOK={handleAmountChargeClick}
      />
    </div>
  );
}

Game.TypeProps = {
  chargeStripe: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (store) => ({
  userInfo: store.userData.userInfo,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  chargeStripe,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Game);
