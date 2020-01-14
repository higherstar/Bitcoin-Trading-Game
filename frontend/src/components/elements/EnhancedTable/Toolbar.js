import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const { title } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>

      <div className={classes.spacer} />

      <div className={classes.actions}>
        {/*
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        */}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string,
};

EnhancedTableToolbar.defaultProps = {
  title: '',
};

export default EnhancedTableToolbar;
