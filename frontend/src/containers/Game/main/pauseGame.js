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
      fontSize: '2.5vw',
      color: 'white',
      cursor: 'pointer',
      fontFamily: theme.font.CeliasMedium,
      color: theme.palette.primary.buttonBottomBorder,
      padding: '2vw',
      textDecoration: 'none'
    }
  },
  headerText: {
    fontSize: '5vw',
    color: 'white',
    margin: 0,
    fontFamily: theme.font.CeliasMedium
  },
  linkCotainer: {
      display: 'flex',
      justifyContent:'space-content'
  }
}));

function PauseModal(props) {
  const classes = useStyles();

  const {
    opened, close
  } = props;
  
  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <div className={classes.inputContainer}>
        <p className={classes.headerText}>PAUSE</p>
        <div className={classes.linkCotainer}>
            <a onClick={close}>Resume</a>
            <Link to='/game'>Main Menu</Link>
        </div>
      </div>
    </Dialog>
  );
}

PauseModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(PauseModal);
