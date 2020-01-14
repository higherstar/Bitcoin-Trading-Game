import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/styles/makeStyles';

import { CustomButton } from '../elements';

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiDialog-paper': {
      width: 834,
      maxWidth: 'unset',
      height: 'fit-content',
      padding: theme.spacing(4.25, 3.25),
      boxShadow: theme.palette.shadow.main,
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.base[500],
    fontWeight: 'bold',
  },
  content: {
    padding: theme.spacing(1, 0),
    flex: 1,
    borderBottom: `1px solid ${theme.palette.base[200]}`,
  },
  actions: {
    marginTop: theme.spacing(5),
    justifyContent: 'center',
  },
}));

function CustomModal(props) {
  const classes = useStyles();

  const {
    opened,
    title,
    content,
    handleClose,
  } = props;

  return (
    <Dialog
      className={classes.container}
      open={opened}
      onClose={handleClose}
    >
      <DialogTitle className={classes.title}>
        {title}
      </DialogTitle>

      <DialogContent className={classes.content}>
        {content}
      </DialogContent>

      <DialogActions className={classes.actions}>
        <CustomButton
          label="Cancel"
          color="red"
        />
      </DialogActions>
    </Dialog>
  );
}

CustomModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  title: PropTypes.node,
  content: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};

CustomModal.defaultProps = {
  title: '',
  content: '',
};

export default CustomModal;
