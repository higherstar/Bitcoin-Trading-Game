import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/styles/makeStyles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 70,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    height: 70,
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
    color: theme.palette.base[800],
  },
  menuButton: {
    marginRight: theme.spacing(4.5),
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

function TopBar(props) {
  const classes = useStyles();

  const { open, handleDrawerOpen } = props;

  return (
    <AppBar position="absolute" className={classnames(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classnames(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default TopBar;
