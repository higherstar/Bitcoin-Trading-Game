import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { logInUser } from 'redux/actions/user';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import makeStyles from '@material-ui/styles/makeStyles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: 'fit-content',
      maxWidth: 'unset',
      minWidth: 'fit-content',
      height: 'fit-content',
      padding: theme.spacing(4.25, 3.25),
      borderWidth: 3,
      borderColor: theme.palette.primary.buttonBottomBorder,
      borderStyle: 'solid',
      background: `linear-gradient(${theme.palette.primary.top}, ${theme.palette.primary.middle}, ${theme.palette.primary.bottom})`,
      boxShadow: theme.palette.shadow.main,
    },
  },
  inputContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& a': {
      fontSize: 40,
      color: 'white',
      cursor: 'pointer',
      fontFamily: theme.font.CeliasMedium,
      marginBottom: 30,
      textDecoration: 'none'
    }
  },
  headerTitle: {
    fontSize: 40,
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium,
    marginBottom: 0,
  },
  jackpotText: {
    fontSize: 40,
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium
  },
  coin: {
    fontSize: 40,
    color: 'white',
    paddingLeft: 15,
    fontFamily: theme.font.CeliasMedium
  },
  headerText: {
    fontSize: 100,
    color: 'white',
    margin: 0,
    fontFamily: theme.font.CeliasMedium
  },
  jackpotContainer: {
    display: 'flex'
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
  signUpStyle: {
    marginTop: 20,
  },
}));

function WinnerModal(props) {
  const classes = useStyles();

  const {
    opened,
    jackPot
  } = props;
  
  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <div className={classes.inputContainer}>
        <p className={classes.headerTitle}>CONTRATULATIONS!</p>
        <p className={classes.headerText}>YOU WIN</p>
        <div className={classes.jackpotContainer}>
          <p className={classes.jackpotText}>Jackpot: </p>
          <p className={classes.coin}>{` $ ${jackPot}`}</p>
        </div>
        <Link to='/game'>New Game</Link>
        <Link to='/game'>Main Menu</Link>
      </div>
    </Dialog>
  );
}

WinnerModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  jackPot: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(WinnerModal);
