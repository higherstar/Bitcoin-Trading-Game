import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 0, -0.25),
  },
  label: {
    ...theme.typography.button,
    color: theme.palette.base[500],
  },
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(0.5),
  },
}));

function CustomCheckbox({
  label, checked, handleChange, disableCheck, disabled, className,
}) {
  const classes = useStyles();
  const formClasses = (({ root, label }) => ({ root, label }))(classes);

  const onChange = (event) => {
    if (disableCheck) {
      return;
    }

    handleChange(event.target.checked);
  };

  return (
    <FormControlLabel
      className={className}
      classes={formClasses}
      control={(
        <Checkbox
          className={classes.checkbox}
          color="primary"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      label={label}
    />
  );
}

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  disableCheck: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};

CustomCheckbox.defaultProps = {
  label: '',
  className: '',
  checked: false,
  disableCheck: false,
  disabled: false,
  handleChange: () => null,
};

export default CustomCheckbox;
