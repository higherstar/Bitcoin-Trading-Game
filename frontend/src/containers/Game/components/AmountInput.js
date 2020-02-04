import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputLabel } from '@material-ui/core';
import AttachMoney from '@material-ui/icons/AttachMoney'

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(1),
    fontSize: 14,
    color: '#415574',
    fontFamily: theme.font.CeliasMedium,
  },
}));

const customMuiTheme = (props) => createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: props.width,
        height: props.height,
        background: props.background,
        fontSize: props.fontSize,
        color: '#ffffff',
      },
      input: {
        padding: '12px 8px',
      },
      adornedStart: { 
        paddingLeft: 0,
        '& svg': {
          position: 'absolute',
          left: 10,
          padding: 2,
          width: props.fontSize,
          height: props.fontSize,
        },
      },
      inputAdornedStart: {
        paddingLeft: `${props.fontSize} !important`,
      },
    },
    MuiInputBase: {
      root: {
        background: '#FAFBFB',

        '& fieldset': {
          display: 'none !important',
        },
      },
      input: {
        height: '100%',
        boxSizing: 'border-box',
        border: '3px solid #1d9edc',
        borderRadius: 2,
        padding: '6px 10px 7px !important',
        textAlign: 'right',

        '&:focus': {
          borderColor: '#1d9edc',
        },
      },
    },
  },
});

const AmountInput = (props) => {
  const {
    id,
    className,
    width,
    height,
    background,
    fontSize,
    label,
    labelWidth,
    startAdornment,
    endAdornment,
    type,
    placeholder,
    value,
    handleChange,
  } = props;

  const classes = useStyles();

  const [state, setState] = useState('');
  const onChange = (event) => {
    handleChange(event);
    setState(event.target.value);
  };

  const onClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ThemeProvider theme={customMuiTheme({ width, height, background, fontSize })}>
      <div className={className} onClick={onClick}>
        {label && <InputLabel className={classes.label} htmlFor={id}>{label}</InputLabel>}
        <OutlinedInput
          id={id}
          labelWidth={labelWidth}
          type={type}
          startAdornment={startAdornment || <AttachMoney />}
          endAdornment={endAdornment}
          placeholder={placeholder}
          value={value || state}
          onChange={onChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
      </div>
    </ThemeProvider>
  );
};

AmountInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  fontSize: PropTypes.string,
  label: PropTypes.string,
  labelWidth: PropTypes.number,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

AmountInput.defaultProps = {
  id: 'custom-text-field',
  className: 'custom-text-field',
  width: '100%',
  height: '36',
  background: 'transparent',
  fontSize: '24px',
  label: '',
  labelWidth: 0,
  startAdornment: null,
  endAdornment: null,
  type: 'text',
  placeholder: '',
  value: '',
  handleChange: () => {},
};

export default AmountInput;
