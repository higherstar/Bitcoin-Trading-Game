import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3.75),
  },
}));

function TabPanel(props) {
  const classes = useStyles();

  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <Typography
      className={classes.container}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
  children: null,
};

export default TabPanel;
