import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton } from 'components/elements';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
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
    width: '50%',
    height: '50%'
  },
  signUpStyle:{
    marginTop: 20
  },
  link: {
    textDecoration: 'none',
    marginTop: 50,
    marginBottom: 50
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
          <CustomButton label='LOGIN' onClick={onClickLogin} width={550} height={150}/>
        </Link>
        <Link to="/signup" className={classes.link}>
          <CustomButton label='SIGN UP' className={classes.signUpStyle} onClick={onClickSignUp} width={550} height={150}/>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
