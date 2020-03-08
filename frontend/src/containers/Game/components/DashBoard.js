import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { changeAmountUnit } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: (props) => props.isMobile ? '90vw' : 'fit-content',
      maxWidth: (props) => props.isMobile ? 300 : 'unset',
      minWidth: (props) => props.isMobile ? 'unset' : '50vw',
      height: 'fit-content',
      padding: theme.spacing(4.25, 3.25),
      paddingTop: 0,
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
    fontSize: (props) => props.isMobile ? 25 : '3vw',
    marginTop: (props) => props.isMobile ? '4vw' : 'unset',
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
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.base.white,
    '& svg': {
      fontSize: (props) => props.isMobile ? 25 : 50,
    }
  },
  leaderTitles: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '1vw'
  },
  leaderTitleRank: {
    width: '20%',
    fontSize: (props) => props.isMobile ? 15 : '2.5vw',
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium,
    marginBottom: '2vw'
  },
  leaderTitleUserName: {
    width: '50%',
    fontSize: (props) => props.isMobile ? 15 : '2.5vw',
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium,
    marginBottom: '2vw'
  },
  leaderTitleWinning: {
    width: '30%',
    fontSize: (props) => props.isMobile ? 15 : '2.5vw',
    color: theme.palette.primary.buttonBottomBorder,
    fontFamily: theme.font.CeliasMedium,
    alignItems: 'center',
    marginBottom: '2vw'
  },
  no: {
    fontSize: (props) => props.isMobile ? 15 : '2vw',
    color: 'white',
    width: '20%',
    paddingLeft: '2vw',
    alignText: 'center',
    margin: 0,
    fontFamily: theme.font.CeliasMedium,
  },
  users: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    '& img' : {
      width: (props) => props.isMobile ? '5vw' : '3.4vw',
    },
    '& p': {
      fontSize: (props) => props.isMobile ? 15 : '2vw',
      color: 'white',
      margin: 0,
      maxWidth: '20vw',
      paddingLeft: '2vw',
      fontFamily: theme.font.CeliasMedium,
      alignItems: 'center'
    }
  },
  win: {
    width: '30%',
    fontSize: (props) => props.isMobile ? 15 : '2vw',
    color: 'white',
    margin: 0,
    paddingLeft: '1vw',
    fontFamily: theme.font.CeliasMedium,
    alignItems: 'center'
  }
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function DashBoard(props) {
  const {
    opened,
    handleClose,
    leaderBoardScores,
    isMobile
  } = props;
  const classes = useStyles({isMobile});

  const leaderScors = leaderBoardScores;
  if ( leaderScors.length > 5)
    leaderScors.slice(0, 5);
    
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
        <p className={classes.title}>LeaderBoard</p>
        <div className={classes.leaderTitles}>
          <p className={classes.leaderTitleRank}>Rank</p>
          <p className={classes.leaderTitleUserName}>Username</p>
          <p className={classes.leaderTitleWinning}>Winnings</p>
        </div>
        {
          leaderScors.map((item, index) => (
            <div className={classes.leaderTitles} key={`leader_title_${index}`}>
              <p className={classes.no}>{index + 1}</p>
              <div className={classes.users}>
                <img src='./Users/user.png' alt="user"></img>
                <p>{item.name}</p>
              </div>
              <p className={classes.win}>{changeAmountUnit (item.totalScore)}</p>
            </div>
          ))
        }
      </div>
    </Dialog>
  );
}

DashBoard.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  leaderBoardScores: PropTypes.array,
  isMobile: PropTypes.bool
};

DashBoard.defaultProps = {
  leaderBoardScores: [],
  isMobile: false
}

const mapStateToProps = (store) => ({
  leaderBoardScores: store.paymentData.leaderBoardScores
});

export default connect(mapStateToProps, null)(DashBoard);
