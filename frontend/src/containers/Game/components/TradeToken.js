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
      fontSize: (props) => props.isMobile ? 25 : 50,
      marginRight: 10
    },
    '& p': {
      fontFamily: theme.font.CeliasMedium,
      fontSize: (props) => props.isMobile ? 15 :  29,
      paddingRight: (props) => props.isMobile ? 0 : 10,
      color: theme.palette.primary.mainMenuButtonColor,
      margin: 0
    },
    '& img': {
      width: (props) => props.isMobile ? 40 :  65
    }
  }
}));

function TradeToken(props) {
  const { name, isMobile } = props;
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
  name: PropTypes.string,
  isMobile: PropTypes.bool
};

TradeToken.defaultProps = {
  name: 'Custom',
  isMobile: false,
};

export default TradeToken;
