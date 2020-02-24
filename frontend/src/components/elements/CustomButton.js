import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: (props) => props.width,
    minHeight: (props) => props.height,
    paddingTop: '1vw',
    paddingBottom: '1vw',
    borderRadius: 15,
    borderColor: theme.palette.primary.buttonBottomBorder,
    borderWidth: 3,
    borderStyle: 'solid',
    fontSize: (props) => `${props.width.toString().slice(0, -2) / 7}vw`,
    color: theme.palette.base.white,
    fontFamily: theme.font.CeliasMedium,
    // background: `linear-gradient(${theme.palette.primary.buttonTopBorder}, ${theme.palette.primary.buttonBottomBorder})`,

    '&:hover': {
      // backgroundColor: (props) => getColor(theme, props.color).hover,
    },

    '&:active': {
      // backgroundColor: (props) => getColor(theme, props.color).active,
    },

    '&:disabled': {
      // backgroundColor: (props) => getColor(theme, props.color).disabled,
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
