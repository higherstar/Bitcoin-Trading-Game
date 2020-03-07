import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomAlert(props) {
  const { title, type, open, handleClose } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={open} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal : 'right'}}>
        <Alert variant="filled" elevation={6} severity={type} onClose={handleClose}>
          {title ? title : 'Net Error'}
        </Alert>
      </Snackbar>
    </div>
  );
}

CustomAlert.propTypes = {
  title : PropTypes.string,
  type : PropTypes.string,
  open : PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};

CustomAlert.defaultProps = {
  title : '',
  type: 'error',
  open: false
}
