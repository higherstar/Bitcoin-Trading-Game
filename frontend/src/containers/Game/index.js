import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox } from 'components/elements';
import { Link } from 'react-router-dom';
import { CustomModal } from 'components/modals';

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

function Game() {
  const classes = useStyles();
  const [amountModalView, setAmountModalView] = useState(false);
  const [amount, setAmount] = useState(0);

  const onClickStart = () => {
    console.log('LoginButtonClicked');
  };
  const onClickHowToPlay = () => {
    console.log('signupButtonClicked');
  };
  const onClickAmount = () => {
    console.log('amount click');
    setAmountModalView(true);
  };
  const onAmountModalClose = () => {
    setAmountModalView(false);
    console.log('venus---event');
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
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
        <p>{amount}</p>
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
      {
        amountModalView
					&& (
					  <CustomModal
					    opened={amountModalView}
					    handleClose={onAmountModalClose}
					    content={amountModalContent}
					    title="Add Amount"
					    buttonTitle="Buy"
					  />
					)
      }
    </div>
  );
}

export default Game;
