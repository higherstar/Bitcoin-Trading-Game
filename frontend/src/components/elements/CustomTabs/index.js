import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    key: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.shadow.light,
  },
  tabs: {
    boxShadow: theme.palette.shadow.main,

    '& .MuiTabs-indicator': {
      height: 4,
    },
  },
  tab: {
    ...theme.typography.h6,
    textTransform: 'uppercase',
  },
  tabSelected: {
    borderBottom: '4px solid',
  },
}));

function CustomTabs(props) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    tabs,
    tabContents,
    toolbar,
    variant,
    disabled,
    tabDisabled,
    handleChangeTab,
  } = props;

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        textColor="secondary"
        variant={variant}
        value={disabled ? false : value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            className={classnames(classes.tab, index === value && classes.tabSelected)}
            label={tab}
            {...a11yProps(index)}
            disabled={disabled || tabDisabled.indexOf(index) > -1}
          />
        ))}
        {toolbar && (
          <Tab
            className={classes.tab}
            label={toolbar}
            disabled
          />
        )}
      </Tabs>

      {tabContents.map((content, index) => (
        <TabPanel
          value={value}
          index={index}
          dir={theme.direction}
          key={`tab_panel_${index}`}
        >
          {content}
        </TabPanel>
      ))}
    </div>
  );
}

CustomTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabContents: PropTypes.array.isRequired,
  toolbar: PropTypes.array,
  disabled: PropTypes.bool,
  tabDisabled: PropTypes.array,
  variant: PropTypes.string,
  handleChangeTab: PropTypes.func,
};

CustomTabs.defaultProps = {
  disabled: false,
  tabDisabled: [],
  toolbar: undefined,
  variant: undefined,
  handleChangeTab: () => null,
};

export default CustomTabs;
