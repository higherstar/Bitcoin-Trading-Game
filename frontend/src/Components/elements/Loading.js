import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Loading(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress color={props.color} />
    </div>
  );
}

Loading.propTypes = {
  color: PropTypes.string,
};

Loading.defaultProps = {
  color: 'secondary',
};

export default Loading;
