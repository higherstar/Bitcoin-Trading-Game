import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { stableSort, getSorting } from './utils';
import EnhancedTableHead from './Head';
import EnhancedTableToolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    boxShadow: 'none',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCell: {
    padding: theme.spacing(1.5, 0.5),
    lineHeight: '19px',
    color: theme.palette.base[500],
    textAlign: 'center',
  },
}));

function EnhancedTable(props) {
  const classes = useStyles();

  const {
    title,
    columns,
    data,
  } = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title} />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} size="medium">
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => (
                      <TableCell
                        className={classes.tableCell}
                        align={column.id !== 'name' ? 'center' : 'left'}
                        key={column.id}
                      >
                        {column.render ? (
                          <>{column.render(row)}</>
                        ) : (
                          <>{row[column.id]}</>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

EnhancedTable.defaultProps = {
  title: '',
};

export default EnhancedTable;
