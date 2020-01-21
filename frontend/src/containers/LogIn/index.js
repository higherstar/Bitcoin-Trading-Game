import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox, Loading, CustomAlert, CustomBack } from 'components/elements';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { logInUser } from 'redux/actions/user';
import { connect } from 'react-redux';
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
    borderWidth: 2,
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderRadius: 20,
    width: '50%',
    height: '50%',
  },
  signUpStyle: {
    marginTop: 20,
  },
}));

function LogIn(props) {
  const { logInUser, history, userInfo } = props;
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['id', 'token']);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error!', type: 'error'});
  const handleChangeEmail = (event) => {
    setUserEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const onClickLogin = () => {
    setLoading(true);
    logInUser({
      email: userEmail,
      password: userPassword,
    }).then((result) => {
      setCookie('id', result._id, { path: '/', maxAge: 3600 });
      setCookie('token', result.token, { path: '/', maxAge: 3600 });
      // setCookie('token', result._id, { path: '/' });
      setLoading(false);
      history.push('/game');
    }).catch((error) => {
      setErrorShow({show: true, message: error, type: 'error'});
      setLoading(false);
    });
  };

  if (loading) { return <Loading />; }
  return (
    <div className={classes.container}>
      <form className={classes.buttonContainer} noValidate autoComplete="off">
          <CustomInputBox
            onChange={handleChangeEmail}
            label="Email"
            leftText="Email: "
            width={300}
            type="email"
          />
          <CustomInputBox
            onChange={handleChangePassword}
            label="Password"
            leftText="Password: "
            width={300}
            type="password"
          />
          <CustomButton label="Login" onClick={onClickLogin} type="submit"/>
          <CustomAlert 
            title={errorShow.message}
            open={errorShow.show}
            handleClose={()=>setErrorShow(false)}
            type={errorShow.type}/>
      </form>
      <CustomBack type='home'/>
    </div>
  );
}

LogIn.TypeProps = {
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  userInfo: store.userData.userInfo,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
