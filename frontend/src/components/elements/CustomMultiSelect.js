import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Done from '@material-ui/icons/Done';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    '& .MuiListItemText-primary': {
      color: theme.palette.secondary.main,
      fontSize: 14,
    },
  },
}));

const MuiTheme = createMuiTheme({
  overrides: {
    MuiSelect: {
      icon: {
        fill: '#5985EE',

        '&:hover': {
          fill: '#1F58EE',
        },
      },
    },
    MuiFormControl: {
      root: {
        width: 160,
        minWidth: 160,
        maxWidth: 300,
        marginTop: 16,
        marginLeft: 10,
        '& .Mui-disabled svg': {
          fill: '#ADB0B8',

          '&:hover': {
            fill: '#ADB0B8',
          },
        },
      },
    },
    MuiInputBase: {
      root: {
        '& .Mui-disabled label': {
          color: '#ADB0B8',
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: '#5985EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& > svg': {
          width: 15,
          height: 15,
          cursor: 'pointer',

          '&:hover': {
            fill: '#1F58EE',
          },
        },
      },
    },
    MuiMenuItem: {
      root: {
        color: '#5985EE',

        '&:hover': {
          color: 'white',
          backgroundColor: '#719DEE',
        },

        '&$selected': {
          color: 'white',
          backgroundColor: '#5985EE',

          '&:hover': {
            backgroundColor: '#719DEE',
          },
        },

        '& > div': {
          flex: 'unset',
          width: 190,
        },

        '& > div span': {
          fontSize: 14,
          whiteSpace: 'initial',
          wordBreak: 'break-all',
        },
      },
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function CustomMultiSelect(props) {
  const {
    items, label, disabled, value, className, handleChange,
  } = props;
  const classes = useStyles();

  const onChange = (event) => {
    handleChange(event.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        marginTop: 50,
      },
    },
    className: classes.menu,
  };

  const handleSetDefault = (e) => {
    if (disabled) {
      return;
    }

    e.stopPropagation();
    handleChange(['']);
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <FormControl className={className}>
        <Select
          multiple
          value={value}
          onChange={onChange}
          input={<Input />}
          renderValue={() => (
            <InputLabel>
              {label}
              <HighlightOff onClick={(e) => handleSetDefault(e)} />
            </InputLabel>
          )}
          MenuProps={MenuProps}
          disabled={disabled}
        >
          {items.map((item) => (
            <MenuItem
              key={item.key}
              value={item.value}
            >
              <ListItemText primary={item.label} />
              {value.indexOf(item.value) !== -1 && (
                <Done />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

CustomMultiSelect.propTypes = {
  items: PropTypes.array,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

CustomMultiSelect.defaultProps = {
  items: [],
  label: '',
  disabled: false,
  value: [],
  className: null,
};

export default CustomMultiSelect;
