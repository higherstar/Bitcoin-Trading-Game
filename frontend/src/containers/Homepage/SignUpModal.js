import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { registerUser } from 'redux/actions/user';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CustomButton, CustomInputBox, CustomAlert } from 'components/elements';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: '50vw',
      maxWidth: 'unset',
      height: 'fit-content',
      padding: theme.spacing(4.25, 3.25),
      borderWidth: 3,
      borderColor: theme.palette.primary.buttonBottomBorder,
      borderStyle: 'solid',
      background: `linear-gradient(${theme.palette.primary.top}, ${theme.palette.primary.middle}, ${theme.palette.primary.bottom})`,
      boxShadow: theme.palette.shadow.main,
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.base[500],
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(1, 0),
    flex: 1,
  },
  actions: {
    justifyContent: 'center'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.base.white,
    '& svg': {
      fontSize: '3.25vw'
    }
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1.875),
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
    width: '100%',
    height: '100%',
  },
  signUpStyle: {
    marginTop: 20,
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function SignUpModal(props) {
  const classes = useStyles();

  const {
    opened,
    handleClose,
    registerUser,
    history,
  } = props;

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

  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <DialogContent className={classes.content}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogContent>
      <div className={classes.inputContainer}>
        <div className={classes.buttonContainer} noValidate autoComplete="off">
          <CustomInputBox 
            onChange={handleChangeName}
            label="UserName"
            leftText="UserName: "
            width={'18VW'}
            labelPadding={'20vw'} />
          <CustomInputBox 
            onChange={handleChangeEmail}
            label="Email" leftText="Email: "
            type="email"
            width={'18VW'}
            labelPadding={'20vw'} />
          <CustomInputBox 
            onChange={handleChangePassword}
            label="Password" leftText="Password: "
            type="password"
            width={'18VW'}
            labelPadding={'20vw'} />
          <CustomButton
            onClick={handleOnClickSignUp}
            label="Sign Up"
            width={'14.7VW'}
            height={'5vw'}
            className={classes.signUpButtonStyle} />
          <CustomAlert 
            title={errorShow.message}
            open={errorShow.show}
            handleClose={()=>setErrorShow(false)}
            type={errorShow.type}/>
        </div>
      </div>
    </Dialog>
  );
}

SignUpModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpModal);
