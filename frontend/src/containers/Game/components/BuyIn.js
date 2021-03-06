import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    marginBottom: (props) => props.isMobile ? 10 : 'unset',
  },
  button: {
    width: (props) => props.width,
    height: (props) => props.height,
    marginLeft: (props) => props.isMobile ? 10 : 20,
    marginRight: (props) => props.isMobile ? 10 : 20,
    background: (props) => props.active ? props.color : 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: (props) => props.color,
    borderWidth: 3,
    borderStyle:'solid',
    boxShadow: theme.palette.shadow.main,
    cursor: 'pointer',
    color: (props) => props.color === '#ffffff' && props.active ? theme.palette.base[800] : theme.palette.base.white,
  },
  valueText: {
    fontSize: (props) => props.isMobile ? 20 : '2.7vw',
    fontWeight: 600,
  },
  label: {
    color: (props) => props.color,
    fontSize: (props) => props.isMobile ? 18 : '2.7vw',
    fontWeight: 600,
  },
}));

function BuyIn(props) {
  const { value, label, color, onSelect, active, isMobile } = props;
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
  active: PropTypes.bool,
  isMobile: PropTypes.bool
};

BuyIn.defaultProps = {
  width: 100,
  height: 50,
  label: '',
  color: '#ffffff',
  active: false,
  isMobile: false
};

export default BuyIn;