import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
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
      fontFamily: theme.font.CeliasMedium,
      paddingLeft: 10,
      color: theme.palette.primary.mainMenuButtonColor
    }
  }
}));

function CustomUserIcon(props) {
  const { name, image } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Link to="/home">
        <img src={image}/>
      </Link>
      <p>{name}</p>
    </div>
  );
}

CustomUserIcon.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string
};

CustomUserIcon.defaultProps = {
  name: 'Custom',
  image: 'Users/user1.png '
};

export default CustomUserIcon;
