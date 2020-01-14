import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiIconButton-root': {
      padding: theme.spacing(1.125),
      color: theme.palette.base.white,
    },
  },
}));

const CustomSwitch = (props) => {
  const classes = useStyles();

  const {
    color, handleSwitch, checked,
  } = props;

  const onChange = (event) => {
    handleSwitch(event.target.checked);
  };

  return (
    <Switch
      classes={{ root: classes.root }}
      checked={checked}
      onChange={onChange}
      value="switch"
      color={color}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

CustomSwitch.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool,
  handleSwitch: PropTypes.func,
};

CustomSwitch.defaultProps = {
  color: 'primary',
  checked: false,
  handleSwitch: () => null,
};

export default CustomSwitch;
