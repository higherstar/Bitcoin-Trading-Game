import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 80,
    height: 37,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(40px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.buttonBottomBorder,
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 35,
    height: 35,
  },
  track: {
    borderRadius: 35 / 2,
    border: `5px solid #8540d2`,
    backgroundColor: 'transparent',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const CustomSwitch = () => {
  const [state, setState] = React.useState();

  const handleChange = event => {
    setState(event.target.checked);
  };

  return (
    <IOSSwitch
      checked={state}
      onChange={handleChange}
      value="checkedB"
    />
  );
};

// CustomSwitch.propTypes = {
//   color: PropTypes.string,
//   checked: PropTypes.bool,
//   handleSwitch: PropTypes.func,
// };

// CustomSwitch.defaultProps = {
//   color: 'primary',
//   checked: false,
//   handleSwitch: () => null,
// };

export default CustomSwitch;
