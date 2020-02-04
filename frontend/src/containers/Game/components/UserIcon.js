import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: 90,
      color: 'white'
    },
    '& p': {
      fontSize: 29,
      paddingLeft: 10,
      color: theme.palette.primary.mainMenuButtonColor
    }
  }
}));

function CustomUserIcon(props) {
  const { name } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Link to="/login"><AccountCircleIcon /></Link>
      <p>{name}</p>
    </div>
  );
}

CustomUserIcon.propTypes = {
  name: PropTypes.string
};

CustomUserIcon.defaultProps = {
  name: 'Custom'
};

export default CustomUserIcon;
