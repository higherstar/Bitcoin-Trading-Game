import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import makeStyles from '@material-ui/styles/makeStyles';
import HighlightOff from '@material-ui/icons/HighlightOff';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: theme.spacing(20),
    width: '100%',
  },
  selectEmpty: {
    borderRadius: 0,
    '&:before, &:hover:before': {
      border: 0,
    },
    '& > select': {
      height: 'auto',
      padding: theme.spacing(1.25, 5, 1.25, 1.25),
      fontFamily: 'Segoe UI',
      fontSize: 13,
      lineHeight: '17px',
      color: theme.palette.base[300],
    },
    '& > svg': {
      width: 16,
      height: 16,
      fill: theme.palette.base[300],
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  option: {
    cursor: 'pointer',
  },
  selectIcon: {
    position: 'absolute',
    right: theme.spacing(1.5),
  },
  iconButton: {
    cursor: 'pointer',
    '&:hover': {
      fill: theme.palette.secondary.main,
    },
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(-0.5),
    padding: theme.spacing(0.5),
  },
}));

const CustomSelect = (props) => {
  const classes = useStyles();

  const {
    className,
    placeholder,
    value,
    items,
    options,
    defaultValue,
    helperText,
    disableValues,
    nullable,
    handleChange,
  } = props;

  const onChange = (event) => {
    handleChange(event.target.value);
  };

  const handleSetDefault = (e) => {
    if (!nullable) {
      return;
    }

    e.stopPropagation();
    handleChange('');
  };

  const selectIcon = () => (
    <div className={classes.selectIcon}>
      {nullable && (
        <HighlightOff
          className={classnames(classes.closeIcon, classes.iconButton)}
          onClick={(e) => handleSetDefault(e)}
        />
      )}
      <ArrowDropDown className={classes.iconButton} />
    </div>
  );

  return (
    <div className={classnames(classes.root, className)}>
      <FormControl className={classes.formControl}>
        <Select
          value={value || defaultValue}
          onChange={onChange}
          className={classes.selectEmpty}
          variant={options.variant}
          IconComponent={selectIcon}
          native
        >
          <option value="" disabled>{placeholder}</option>
          {items.map((item) => (
            <option
              value={item.value}
              key={item.key}
              className={classes.option}
              disabled={disableValues.indexOf(item.value) > -1}
            >
              {item.label}
            </option>
          ))}
        </Select>
        {helperText && (<FormHelperText>{helperText}</FormHelperText>)}
      </FormControl>
    </div>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  items: PropTypes.array,
  defaultValue: PropTypes.string,
  options: PropTypes.object,
  helperText: PropTypes.node,
  nullable: PropTypes.bool,
  disableValues: PropTypes.array,
  handleChange: PropTypes.func,
};

CustomSelect.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
  defaultValue: '',
  items: [],
  options: {
    variant: 'standard',
  },
  helperText: '',
  disableValues: [''],
  nullable: false,
  handleChange: undefined,
};

export default CustomSelect;
