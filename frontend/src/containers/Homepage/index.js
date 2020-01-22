import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton } from 'components/elements';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.base.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1.875)
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
  },
  link: {
    textDecoration: 'none',
  },
}));

function HomePage() {
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
        <Link to="/login" className={classes.link}>
          <CustomButton label='Login' onClick={onClickLogin}/>
        </Link>
        <Link to="/signup" className={classes.link}>
          <CustomButton label='Sign Up' className={classes.signUpStyle} onClick={onClickSignUp}/>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
