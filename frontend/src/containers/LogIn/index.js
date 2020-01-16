import React, { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomButton, CustomInputBox, Loading } from 'components/elements';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { logInUser } from 'redux/actions/user';
import { connect } from 'react-redux';

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

function LogIn(props) {
  const { logInUser, history } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
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
      password: userPassword
    }).then(()=> {
      setLoading(false);
      history.push('/home');
    }).catch(() => {
      console.log('error');
      setLoading(false);
    });
  };

  if (loading) 
    return <Loading />
  else
    return (
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <CustomInputBox onChange={handleChangeEmail} label="Email" leftText="Email: " width={300} type='email'/>
          <CustomInputBox onChange={handleChangePassword} label="Password" leftText="Password: " width={300} type='password'/>
          <CustomButton label='Login' onClick={onClickLogin}/>
        </div>
      </div>
    );
}

LogIn.TypeProps = {
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired
}
const mapStateToProps = (store) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInUser
}, dispatch);

export default connect (mapStateToProps, mapDispatchToProps)(LogIn);