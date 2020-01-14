import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    width: 18,
    height: 18,
    marginRight: theme.spacing(1),
    backgroundColor: (props) => props.color,
    borderRadius: 9,
  },
}));

function CustomOption({ label, color }) {
  const classes = useStyles({ color });

  return (
    <div className={classes.container}>
      <span className={classes.circle} />
      <Typography variant="button">{label}</Typography>
    </div>
  );
}

CustomOption.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CustomOption;
