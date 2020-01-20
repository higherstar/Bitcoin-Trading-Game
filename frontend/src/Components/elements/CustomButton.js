import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

const getColor = (theme, color) => {
  switch (color) {
    case 'dark':
      return {
        base: theme.palette.base[800],
        hover: '#35353E',
        active: '#000000',
        disabled: '#828282',
      };
    case 'green':
      return {
        base: theme.palette.primary.main,
        hover: '#5DD8A4',
        active: '#40BC88',
        disabled: '#92DEBE',
      };
    case 'yellow':
      return {
        base: '#F5894A',
        hover: '#FFAD6E',
        active: '#F57A38',
        disabled: '#FEB0A7',
      };
    case 'red':
      return {
        base: theme.palette.primary.red,
        hover: '#FF5D4B',
        active: '#FC3822',
        disabled: '#FEB0A7',
      };
    case 'grey':
      return {
        base: theme.palette.base[100],
        hover: '#F6F6F6',
        active: '#EBEBEB',
        disabled: '#EEEEEE',
      };
    case 'white':
      return {
        base: theme.palette.base.white,
        hover: '#F6F6F6',
        active: '#FAF8FF',
        disabled: '#EEEEEE',
      };
    case 'blue':
    default:
      return {
        base: theme.palette.secondary.main,
        hover: '#769CF9',
        active: '#5F74FB',
        disabled: '#A8C1FF',
      };
  }
};

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: (props) => props.width,
    height: (props) => props.height,
    backgroundColor: (props) => getColor(theme, props.color).base,
    borderRadius: 2,
    boxShadow: theme.palette.shadow.main,
    color: (props) => (props.color === 'grey' || props.color === 'white' ? '#60636B' : 'white'),

    '&:hover': {
      backgroundColor: (props) => getColor(theme, props.color).hover,
    },

    '&:active': {
      backgroundColor: (props) => getColor(theme, props.color).active,
    },

    '&:disabled': {
      backgroundColor: (props) => getColor(theme, props.color).disabled,
      color: (props) => (props.color === 'grey' ? '#D4D5D9' : 'white'),
    },
  },
  buttonIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
  },
}));

function CustomButton({
  className,
  label,
  width,
  height,
  color,
  disabled,
  icon,
  onClick,
  type
}) {
  const classes = useStyles({ width, height, color });

  return (
    <Button
      className={classnames(classes.button, className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <div className={classes.buttonIcon}>{icon}</div>
      {label}
    </Button>
  );
}

CustomButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.array,
  onClick: PropTypes.func,
  type: PropTypes.string
};

CustomButton.defaultProps = {
  className: '',
  width: 160,
  height: 40,
  color: 'blue',
  disabled: false,
  icon: [],
  onClick: undefined,
  type: ''
};

export default CustomButton;
