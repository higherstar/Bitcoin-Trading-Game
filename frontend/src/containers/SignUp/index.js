import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox, Loading, CustomAlert, CustomBack } from 'components/elements';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { registerUser } from 'redux/actions/user';
import { connect } from 'react-redux';

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
    height: '50%',
  },
  signUpButtonStyle: {
    marginTop: 20,
  },
}));

function SignUp(props) {
  const { registerUser, history } = props;

  const classes = useStyles();

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorShow, setErrorShow] = useState({show: false, message: 'Net Error', type: 'error'});

  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setUserEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setUserPassword(event.target.value);
  };
  const handleOnClickSignUp = () => {
    setLoading(true);
    registerUser({
      name: userName,
      email: userEmail,
      password: userPassword,
    }).then(() => {
      setLoading(false);
      history.push('/billing');
    }).catch((error) => {
      setErrorShow({show:true, message: error, type: 'error'});
      setLoading(false);
    });
  };

  if (loading) { return <Loading />; }
  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <CustomInputBox onChange={handleChangeName} label="UserName" leftText="UserName: " width={300} />
        <CustomInputBox onChange={handleChangeEmail} label="Email" leftText="Email: " width={300} type="email" />
        <CustomInputBox onChange={handleChangePassword} label="Password" leftText="Password: " width={300} type="password" />
        <CustomButton onClick={handleOnClickSignUp} label="Sign Up" className={classes.signUpButtonStyle} />
      </div>
      <CustomAlert 
          title={errorShow.message}
          open={errorShow.show}
          handleClose={()=>setErrorShow(false)}
          type={errorShow.type}/>
      <CustomBack type='home'/>
    </div>
  );
}

SignUp.TypeProps = {
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
