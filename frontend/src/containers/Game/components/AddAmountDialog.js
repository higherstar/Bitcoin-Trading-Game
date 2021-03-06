import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: (props) => props.isMobile ? '90vw' : '40%',
      minWidth: (props) => props.isMobile ? 'unset' : 450,
      maxWidth: (props) => props.isMobile ? 300 : 'unset',
      height: 'fit-content',
      padding: (props) => props.isMobile ? theme.spacing(2, 3.25) : theme.spacing(4.25, 3.25),
      borderWidth: 3,
      borderColor: theme.palette.primary.buttonBottomBorder,
      borderStyle: 'solid',
      background: `linear-gradient(${theme.palette.primary.top}, ${theme.palette.primary.middle}, ${theme.palette.primary.bottom})`,
      boxShadow: theme.palette.shadow.main,
    },
  },
  title: {
    marginBottom: (props) => props.isMobile ? 10 : theme.spacing(2),
    color: 'white',
    fontFamily: theme.font.CeliasMedium,
    fontWeight: 'bold',
    marginTop: (props) => props.isMobile ? 15 : 'unset',
    fontSize: (props) => props.isMobile ? 30 : 50,
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(1, 0),
    flex: 1,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    '& p': {
      fontSize: (props) => props.isMobile ? 40 : 70,
      color: theme.palette.primary.buttonBottomBorder,
      fontFamily: theme.font.CeliasMedium,
      marginBottom: 0,
      marginTop: 0,
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    fontFamily: theme.font.CeliasMedium,
    color: theme.palette.base.white,
    '& svg': {
      fontSize: (props) => props.isMobile ? 25 : '3.25vw'
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

function AddAmountDialog(props) {
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
      <DialogContent className={classes.content} style={{paddingBottom: isMobile ? 0 : 8}}>
        <Typography className={classes.title}>{title}</Typography>
        {content}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <p onClick={handleOK}>{buttonTitle}</p>
      </DialogActions>
    </Dialog>
  );
}

AddAmountDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  title: PropTypes.node,
  content: PropTypes.node,
  buttonTitle: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleOK: PropTypes.func,
  isMobile: PropTypes.bool
};

AddAmountDialog.defaultProps = {
  title: '',
  content: '',
  buttonTitle: 'Cancel',
  handleOK: ()=>{},
  isMobile: false
};

export default AddAmountDialog;
