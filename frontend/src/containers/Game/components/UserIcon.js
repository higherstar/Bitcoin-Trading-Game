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
      fontSize:  (props) => props.isMobile ? '6vw' : '2.4vw',
      maxWidth: (props) => props.isMobile ? '40vw' : '30vw',
      margin: 0,
      fontFamily: theme.font.CeliasMedium,
      paddingLeft: 10,
      color: theme.palette.primary.mainMenuButtonColor
    },
    '& img': {
      width: (props) => props.isMobile ? 50 : '6vw'
    }
  }
}));

function CustomUserIcon(props) {
  const { name, image, isMobile } = props;
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
  image: PropTypes.string,
  isMobile: PropTypes.bool
};

CustomUserIcon.defaultProps = {
  name: 'Custom',
  image: 'Users/user1.png ',
  isMobile: false
};

export default CustomUserIcon;
