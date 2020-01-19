import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    width: (props) => props.width,
    height: (props) => props.height,
    marginLeft: 20,
    marginRight: 20,
    background: (props) => props.active ?  green[500] : '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth:1,
    borderStyle:'solid',
    boxShadow: theme.palette.shadow.main,
    cursor: 'pointer'
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}));

function BuyIn(props) {
  const { value, onSelect, active } = props;
  const selectIndex = value === 20 ? 0 : value === 50 ? 1 : 2;
  const classes = useStyles(props);
  return (
    <div className={classes.container} onClick={()=>onSelect(selectIndex)}>
      <p className={classes.valueText}>{value}</p>
    </div>
  )
};

BuyIn.TypeProps = {
  width: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool
};

BuyIn.defaultProps = {
  width: 100,
  height: 50,
  active: false
};

export default BuyIn;