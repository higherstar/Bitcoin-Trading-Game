import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton } from 'components/elements';
import LoginModal from './loginModal';
import SignUpModal from './SignUpModal';

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
  }
}));

function HomePage(props) {
  const classes = useStyles();
  const { history, isMobile } = props;
  const [loginModalView, setLoginModalView] = useState(false);
  const [signUpModalView, setSignUpModalView] = useState(false);
  console.log(isMobile);

  const onClickLogin = () => {
    setLoginModalView(true);
  };

  const handleLoginClose = () => {
    setLoginModalView(false);
  }

  const handleSignUpClose = () => {
    setSignUpModalView(false);
  }

  const handleLogin = () => {
    // setLoginModalView(true);
  }

  const onClickSignUp = () => {
    setSignUpModalView(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <div className={classes.link}>
          <CustomButton
            label='LOGIN' 
            onClick={onClickLogin} 
            width={isMobile ? '80vw' : '27vw'} 
            height={isMobile ? '15vw' : '8vw'}
            isMobile={isMobile}
          />
        </div>
        <div className={classes.link}>
          <CustomButton 
            label='SIGN UP' 
            className={classes.signUpStyle} 
            onClick={onClickSignUp} 
            width={isMobile ? '80vw' : '27vw'} 
            height={isMobile ? '15vw' : '8vw'}
            isMobile={isMobile}
          />
        </div>
        <LoginModal
          opened={loginModalView}
          handleClose={handleLoginClose}
          handleOK={handleLogin}
          history={history}
          isMobile={isMobile}
        />
        <SignUpModal
          opened={signUpModalView}
          handleClose={handleSignUpClose}
          handleOK={handleLogin}
          history={history}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

HomePage.defaultProps = {
};

export default HomePage;
