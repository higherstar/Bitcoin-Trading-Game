import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/styles/makeStyles';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    height: 70,
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
    color: theme.palette.base[800],
  },
  toolbarIcon: {
    height: 70,
    padding: theme.spacing(3.75, 2, 3.75, 3.75),
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
  },
  menuIcon: {
    color: theme.palette.secondary.main,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100vh',
    backgroundColor: theme.palette.background.drawer,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'hidden',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      // width: theme.spacing(9),
    },
  },
  link: {
    textDecoration: 'none',
  },
  listItem: {
    minHeight: 60,
    color: theme.palette.base[600],
  },
  listItemIcon: {
    minWidth: 40,
    color: 'inherit',
  },
  listItemText: {
    margin: 0,
    fontSize: 18,
    lineHeight: '24px',
  },
}));

function LeftDrawer({ open, handleDrawerClose }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classnames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
      </div>

      <List>
        <Link to="/home" className={classes.link}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="HOMEPAGE" className={classes.listItemText} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

LeftDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default LeftDrawer;
