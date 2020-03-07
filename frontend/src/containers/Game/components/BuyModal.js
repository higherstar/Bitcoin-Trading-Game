import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CustomButton } from 'components/elements';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: (props) => props.isMobile ? '90vw' : 'fit-content',
      height: 'fit-content',
      minWidth: (props) => props.isMobile ? 'unset' : 'fit-content',
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
    color: theme.palette.base.white,
    fontWeight: 'bold',
    fontSize: (props) => props.isMobile ? '7vw' : '3vw',
    marginTop: (props) => props.isMobile ? '4vw' : 'unset',
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(1, 0),
    flex: 1,
    marginBottom: (props) => props.isMobile ? '7vw' : 'unset',
  },
  actions: {
    justifyContent: 'center',
    display: 'flex',
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
      fontSize: (props) => props.isMobile ? 25 : 50,
    }
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function BuyModal(props) {
  const {
    opened,
    title,
    content,
    handleClose,
    buttonTitle,
    handleOK,
    isMobile
  } = props;

  const classes = useStyles({isMobile});

  return (
    <Dialog
      className={classes.container}
      open={opened}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle>
        <Typography className={classes.title}>{title}</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {content}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <CustomButton
          label={buttonTitle}
          color="red"
          onClick={handleOK}
          width={isMobile ? '50vw' : '16vw'}
          height={isMobile ? '10vw' : '5vw'}
        />
      </DialogActions>
    </Dialog>
  );
}

BuyModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  title: PropTypes.node,
  content: PropTypes.node,
  buttonTitle: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleOK: PropTypes.func,
  isMobile: PropTypes.bool
};

BuyModal.defaultProps = {
  title: '',
  content: '',
  buttonTitle: 'Cancel',
  handleOK: ()=>{},
  isMobile: false
};

export default BuyModal;
