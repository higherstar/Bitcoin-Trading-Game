import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 700,
    height: '50%',
    background: theme.palette.base.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      Homepage
    </div>
  );
}

export default HomePage;
