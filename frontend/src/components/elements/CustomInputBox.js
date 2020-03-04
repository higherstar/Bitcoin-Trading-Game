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
    backgroundColor: theme.palette.base.white,
    fontFamily: theme.font.CeliasMedium,

    '& .MuiInputBase-input': {
      padding: '1.3vw 14px',
    }
  },
  formGroup: {
    marginBottom: (props) => theme.spacing(props.marginBottom),
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    width: (props) => `${props.width.toString().slice(0, -2)/2}vw`,
    marginRight: (props) => `${props.width.toString().slice(0, -2)/5}vw`,
    color: '#fff',
    fontSize: '2.25VW',
    fontFamily: theme.font.CeliasMedium,
  },
}));

function CustomInputBox({
  className,
  leftText,
  label,
  width,
  onChange,
  marginBottom,
  labelPadding,
  defaultValue,
  type,
}) {
  const classes = useStyles({ width, marginBottom, labelPadding });

  return (
    <Box className={classnames(classes.formGroup, className)}>
      <Typography variant="button" className={classnames(classes.label, className)}>{leftText}</Typography>
      <TextField
        required
        className={classnames(classes.textField, className)}
        hiddenLabel
        type={type}
        defaultValue={defaultValue}
        autoComplete={type}
        variant="outlined"
        inputProps={{style: {
          fontSize: '1.6vw',
        }}}
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
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  labelPadding: PropTypes.number,
  marginBottom: PropTypes.number,
};

CustomInputBox.defaultProps = {
  className: '',
  label: '',
  leftText: '',
  onChange: undefined,
  width: 200,
  type: 'text',
  defaultValue: '',
  marginBottom: 4,
  labelPadding: 8,
};

export default CustomInputBox;
