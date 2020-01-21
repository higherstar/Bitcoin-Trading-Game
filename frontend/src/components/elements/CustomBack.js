import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    '& svg': {
      fontSize: 50
    },
    '& p': {
      fontSize: 22,
      paddingLeft: 10,
      fontWeight: 'bold'
    }
  }
}));

function CustomBack(props) {
  const { name, type } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      {
        type === 'home' ?
          <Link to="/home">
            <HomeIcon />
          </Link> :
          <ExitToAppIcon />
      }
      
      <p>{name}</p>
    </div>
  );
}

CustomBack.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string
};

CustomBack.defaultProps = {
  name: '',
  type: 'home'
};

export default CustomBack;
