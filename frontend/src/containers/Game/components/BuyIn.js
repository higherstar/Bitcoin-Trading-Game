import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  button: {
    width: (props) => props.width,
    height: (props) => props.height,
    marginLeft: 20,
    marginRight: 20,
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: (props) => props.color,
    borderWidth: 3,
    borderStyle:'solid',
    boxShadow: theme.palette.shadow.main,
    cursor: 'pointer',
    color: theme.palette.base.white
  },
  valueText: {
    fontSize: 25,
    fontWeight: 600,
  },
  label: {
    color: (props) => props.color,
    fontSize: 25,
    fontWeight: 600,
  },
}));

function BuyIn(props) {
  const { value, label, color, onSelect, active } = props;
  const selectIndex = value === 20 ? 0 : value === 50 ? 1 : 2;
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      <div className={classes.button} onClick={()=>onSelect(selectIndex)}>
        <p className={classes.valueText}>$ {value}</p>
      </div>
      <div className={classes.label}>
        {label}
      </div>
    </div>    
  )
};

BuyIn.TypeProps = {
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool
};

BuyIn.defaultProps = {
  width: 100,
  height: 50,
  label: '',
  color: '#ffffff',
  active: false
};

export default BuyIn;