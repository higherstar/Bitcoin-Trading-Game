import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton } from 'components/elements';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.base.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderRadius: 20,
    width: '50%',
    height: '50%'
  },
  signUpStyle:{
    marginTop: 20
  }
}));

function LogIn() {
  const classes = useStyles();

const onClickLogin = () => {
    console.log('LoginButtonClicked');
  };

const onClickSignUp = () => {
    console.log('signupButtonClicked');
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <CustomButton label='Login' onClick={onClickLogin}/>
        <CustomButton label='Sign Up' className={classes.signUpStyle} onClick={onClickSignUp}/>
      </div>
    </div>
  );
}

export default LogIn;
