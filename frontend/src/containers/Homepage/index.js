import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton } from 'components/elements';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';

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

function HomePage(props) {
  const classes = useStyles();
  const { history } = props;
  const [loginModalView, setLoginModalView] = useState(false);

const onClickLogin = () => {
  setLoginModalView(true);
};

const handleLoginClose = () => {
  setLoginModalView(false);
}

const handleLogin = () => {
  // setLoginModalView(true);
}

const onClickSignUp = () => {
  console.log('signupButtonClicked');
};

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <div className={classes.link}>
          <CustomButton label='LOGIN' onClick={onClickLogin} width={550} height={150}/>
        </div>
        <Link to="/signup" className={classes.link}>
          <CustomButton label='SIGN UP' className={classes.signUpStyle} onClick={onClickSignUp} width={550} height={150}/>
        </Link>
        <LoginModal
          opened={loginModalView}
          handleClose={handleLoginClose}
          handleOK={handleLogin}
          history={history}
        />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  history: PropTypes.func.isRequired
};

HomePage.defaultProps = {
};

export default HomePage;
