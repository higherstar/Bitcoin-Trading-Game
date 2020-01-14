import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: theme.spacing(1.5, 0.5),
    lineHeight: '16px',
    color: theme.palette.base[800],
  },
  sortLabel: {
    '&:not(.MuiTableSortLabel-active) .MuiTableSortLabel-icon': {
      display: 'none',
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function EnhancedTableHead(props) {
  const classes = useStyles();

  const {
    columns,
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            className={classes.tableCell}
            align={headCell.id === 'parkingName' ? 'left' : 'center'}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
            key={headCell.id}
          >
            <TableSortLabel
              className={classes.sortLabel}
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
