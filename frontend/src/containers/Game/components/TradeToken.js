import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import TradeTokenImage from 'assets/image/trade_token.png'

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& svg': {
      fontSize: 50,
      marginRight: 10
    },
    '& p': {
      fontSize: 29,
      paddingRight: 10,
      color: theme.palette.primary.mainMenuButtonColor,
      margin: 0
    },
    '& img': {
      width: 65
    }
  }
}));

function TradeToken(props) {
  const { name } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <img src={TradeTokenImage}/>
      <p>Trade</p>
      <p>{`Token : ${name}`}</p>
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
