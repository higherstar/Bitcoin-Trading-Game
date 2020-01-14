import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
    width: 250,
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  inputField: {
    padding: theme.spacing(0.75, 0, 0.75, 2),
    fontSize: 14,
  },
  menu: {
    width: '100%',
    maxHeight: 400,
    overflowY: 'auto',
    position: 'absolute',
    top: theme.spacing(6),
    left: 0,
    zIndex: 100,
  },
  menuLabel: {
    padding: theme.spacing(1.5),
    fontSize: theme.spacing(1.75),
    cursor: 'pointer',

    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.base.white,
    },
  },
  iconButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    background: theme.palette.base[200],
    '& svg': {
      fill: theme.palette.base.white,
    },
  },
}));

function CustomSearchInput(props) {
  const classes = useStyles();
  const {
    disabled,
    placeholder,
    menuData,
    handleChange,
    menuItemClick,
  } = props;

  const [showMenu, setShowMenu] = useState(true);
  const handleShowMenu = (show) => () => {
    setShowMenu(show);
  };

  const onChange = (event) => {
    handleShowMenu(true);
    handleChange(event.target.value);
  };

  const handleMenuItemClick = (label) => () => {
    menuItemClick(label);
    setShowMenu(false);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'id no.', className: classes.inputField }}
          disabled={disabled}
          onChange={onChange}
          onClick={handleShowMenu(true)}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {menuData.length > 0 && showMenu && (
        <Paper className={classes.menu} onMouseLeave={handleShowMenu(false)}>
          {menuData.map((data) => (
            <div
              className={classes.menuLabel}
              key={data.key}
              onClick={handleMenuItemClick(data.label)}
            >
              {data.label}
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
}

CustomSearchInput.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  menuData: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  menuItemClick: PropTypes.func,
};

CustomSearchInput.defaultProps = {
  placeholder: 'ID No.',
  disabled: false,
  menuData: [],
  menuItemClick: () => {},
};

export default CustomSearchInput;
