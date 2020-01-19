import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& svg': {
      fontSize: 50
    },
    '& p': {
      fontSize: 15,
      fontWeight: 'bold',
      margin: 0
    }
  }
}));

function TradeToken(props) {
  const { name } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <CachedIcon />
      <p>{`TradeToken : ${name}`}</p>
    </div>
  );
}

TradeToken.propTypes = {
  name: PropTypes.string
};

TradeToken.defaultProps = {
  name: 'Custom'
};

export default TradeToken;
