import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    alignItems: 'center',
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

function CustomUserIcon(props) {
  const { name } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <AccountCircleIcon />
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
