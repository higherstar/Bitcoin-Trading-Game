import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: (props) => props.width,
    flex: 1,
  },
  formGroup: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    width: theme.spacing(11),
    marginRight: theme.spacing(8),
    color: '#000000',
    fontSize: 20
  },
}));

function CustomInputBox({
  className,
  leftText,
  label,
  width,
  onChange,
  type
}) {
  const classes = useStyles({width});

  return (
    <Box className={classnames(classes.formGroup, className)}>
      <Typography variant="button" className={classnames(classes.label, className)}>{leftText}</Typography>
      <TextField
        required
        className={classnames(classes.textField, className)}
        hiddenLabel
        label={label}
        type={type}
        variant="outlined"
        onChange={onChange}
      />
    </Box>
  );
}

CustomInputBox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  leftText: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.number,
  type: PropTypes.string
}

CustomInputBox.defaultProps = {
  className: '',
  label: '',
  leftText: '',
  onChange: undefined,
  width: 200,
  type: 'text'
};

export default CustomInputBox;
