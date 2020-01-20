import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function CustomAccordion(props) {
  const classes = useStyles();

  const { summary, panelDetails, handleHeaderClick } = props;

  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
    handleHeaderClick(!state);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDown />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
          onClick={handleClick}
        >
          <div className={classes.summary}>
            {summary}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {panelDetails}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

CustomAccordion.propTypes = {
  summary: PropTypes.node.isRequired,
  panelDetails: PropTypes.node.isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
};

export default CustomAccordion;
