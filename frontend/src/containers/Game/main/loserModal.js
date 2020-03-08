import React from 'react';
import PropTypes from 'prop-types';

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
      padding: (props) => props.isMobile ? theme.spacing(2, 3.25) : '4vw',
      borderStyle: 'solid',
      background: 'black',
    },
  },
  inputContainer: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    '& a': {
      fontSize: (props) => props.isMobile ? 20 : '3vw',
      color: 'white',
      cursor: 'pointer',
      fontFamily: theme.font.CeliasMedium,
      marginBottom: 30,
      textDecoration: 'none'
    }
  },
  headerTitle: {
    fontSize: (props) => props.isMobile ? 25 : '4vw',
    width: '100%',
    textAlign: 'center',
    margin: 0,
    marginBottom: 50,
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium,
    marginBottom: 0,
  },
  jackpotText: {
    fontSize: (props) => props.isMobile ? 20 : 40,
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium
  },
  coin: {
    fontSize: (props) => props.isMobile ? 20 : 40,
    color: 'white',
    paddingLeft: 15,
    fontFamily: theme.font.CeliasMedium
  },
  headerText: {
    fontSize: (props) => props.isMobile ? 25 : '5vw',
    color: 'white',
    margin: 0,
    fontFamily: theme.font.CeliasMedium
  },
  jackpotContainer: {
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '4vw'
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

function LoserModal(props) {
  const {
    opened,
    isMobile
  } = props;
  const classes = useStyles({isMobile});
  
  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <div className={classes.inputContainer}>
        <p className={classes.headerText}>YOU LOSE</p>
        <p className={classes.headerTitle}>Better luck next time</p>
        <div className={classes.jackpotContainer}>
            <Link to='/game'>New Game</Link>
            <Link to='/game'>Main Menu</Link>
        </div>
      </div>
    </Dialog>
  );
}

LoserModal.propTypes = {
  opened: PropTypes.bool,
  handleClose: PropTypes.func,
  history: PropTypes.object,
  isMobile: PropTypes.bool
};

LoserModal.defaultProps = {
  opened: false,
  handleClose: () => {},
  history: {},
  isMobile: false
};

export default LoserModal;
