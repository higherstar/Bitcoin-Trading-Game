import React from 'react';
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
      width: (props) => props.isMobile ? '90vw' : 'fit-content',
      maxWidth: (props) => props.isMobile ? 300 : 'unset',
      minWidth: 'fit-content',
      height: 'fit-content',
      padding: (props) => props.isMobile ? theme.spacing(2, 3.25) : theme.spacing(4.25, 3.25),
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
      fontSize: (props) => props.isMobile ? 17 : '2.5vw',
      cursor: 'pointer',
      fontFamily: theme.font.CeliasMedium,
      color: theme.palette.primary.buttonBottomBorder,
      padding: '2vw',
      textDecoration: 'none',
      marginRight: (props) => props.isMobile ? 10 : 'unset'
    }
  },
  headerText: {
    fontSize: (props) => props.isMobile ? 25 : '5vw',
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
  const {
    opened, close, isMobile, onClickMain
  } = props;
  const classes = useStyles({isMobile});

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
            <a onClick={onClickMain}>Main Menu</a>
        </div>
      </div>
    </Dialog>
  );
}

PauseModal.propTypes = {
  opened: PropTypes.bool,
  handleClose: PropTypes.func,
  logInUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  onClickMain: PropTypes.func.isRequired
};

PauseModal.defaultProps = {
  opened: false,
  handleClose: () => {},
  history: {},
  isMobile: false
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(PauseModal);
