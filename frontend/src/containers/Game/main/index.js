import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function MainGameScreen(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
    </div>
  );
}

MainGameScreen.propTypes = {
};

MainGameScreen.defaultProps = {
};

const mapStateToProps = (store) => ({
  paymentInfo: store.paymentData.paymentInfo
});

export default connect(mapStateToProps)(MainGameScreen);
