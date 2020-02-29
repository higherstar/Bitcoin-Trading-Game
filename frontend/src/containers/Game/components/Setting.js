import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/styles/makeStyles';
import { CustomSwitch } from 'components/elements';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: 'fit-content',
      maxWidth: 'unset',
      minWidth: '35vw',
      height: 'fit-content',
      padding: '4vw',
      borderWidth: 3,
      borderColor: theme.palette.primary.buttonBottomBorder,
      borderStyle: 'solid',
      background: `linear-gradient(${theme.palette.primary.top}, ${theme.palette.primary.middle}, ${theme.palette.primary.bottom})`,
      boxShadow: theme.palette.shadow.main,
    },
  },
  title: {
    margin: 0,
    color: theme.palette.base.white,
    fontWeight: 'bold',
    fontFamily: theme.font.CeliasMedium,
    fontSize: '3vw',
    textAlign: 'center',
  },
  sectionContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: '1vw',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      fontSize: '3vw',
      color: 'white',
      fontFamily: theme.font.CeliasMedium,
      margin: 0 
    }
  },
  sectionFaceBook: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '2vw',
      color: theme.palette.primary.buttonBottomBorder,
      fontFamily: theme.font.CeliasMedium,
      margin: 0 
    },
    '& div': {
      cursor: 'pointer',
      fontSize: '1.5vw',
      fontFamily: theme.font.CeliasMedium,
      color: 'white',
      background: '#4267b2',
      margin:0,
      padding: '0.4vw'
    }
  },
  done: {
    fontSize: '3vw',
    cursor: 'pointer',
    fontFamily: theme.font.CeliasMedium,
    color: 'white',
    marginBottom: 0,
    textAlign: 'center'
  }
}));

function Setting (props) {
  const classes = useStyles();

  const {
    opened,
    handleClose,
    leaderBoardScores
  } = props;

  const leaderScors = leaderBoardScores;
  if ( leaderScors.length > 5)
    leaderScors.slice(0, 5);
  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <div className={classes.container}>
        <div className={classes.sectionContainer}>
          <p>Music</p>
          <CustomSwitch />
        </div>
        <div className={classes.sectionContainer}>
          <p>Sound</p>
          <CustomSwitch />
        </div>
        <div className={classes.sectionFaceBook}>
          <p>facebook</p>
          <div>facebook</div>
        </div>
      </div>
      <p className={classes.done} onClick={handleClose}>DONE</p>
    </Dialog>
  );
}

Setting.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

Setting.defaultProps = {
}

const mapStateToProps = (store) => ({
  leaderBoardScores: store.paymentData.leaderBoardScores
});

export default connect(mapStateToProps, null)(Setting);
