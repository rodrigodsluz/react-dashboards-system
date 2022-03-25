/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@d1.cx/components';
import TableLoading from '../../../../../../components/Skeleton/TableLoading/TableLoading';

import {
  ToolbarContainer,
  Title,
  Pagination,
  TableLoadingContainer,
} from './styles';

/**
 * @function descendingComparator
 * @description Realiza comparação em ordem decrescente
 *
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * @function getComparator
 * @description Passa os parametros e chama a função de comparação
 *
 */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * @function stableSort
 * @description Retorna os dados ordenados
 *
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * @function ProcessesTable
 * @description Componente da tabela que vai ser usada para os processamentos
 *
 */
export default function ProcessesTable(props) {
  const {
    columns,
    data,
    actionLabel,
    handleAction,
    handleEdit,
    title,
    defaultSort,
    defaultSortBy,
    dense,
    noItemsMessage,
  } = props;

  const showEdit = !!handleEdit;

  const [order, setOrder] = useState(defaultSort);
  const [orderBy, setOrderBy] = useState(defaultSortBy ?? columns[0].key);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ToolbarContainer>
        {actionLabel !== '' ? (
          <Button variant="contained" onClick={handleAction} color="primary">
            {actionLabel}
          </Button>
        ) : (
          title !== '' && (
            <Title>
              <Typography fontSize="21px" vertical="15px">{title}</Typography>
            </Title>
          )
        )}

        <Pagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página"
          labelDisplayedRows={(info) => `${info.from}-${info.to} de ${info.count}`}
        />
      </ToolbarContainer>

      <Paper>
        <TableContainer>
          {data.length > 0 ? (
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={`header-${column.id}`}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        style={{ whiteSpace: 'noWrap' }}
                        onClick={() => handleSort(column.id)}
                      >
                        <Typography fontSize="15px">
                          {column.title}
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  {showEdit && <TableCell key="edit" />}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0
                  && stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={`row-${row.title ?? index}`}>
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            <Typography fontSize="15px" vertical="5px">
                              {row[column.id]}
                            </Typography>
                          </TableCell>
                        ))}
                        {showEdit && (
                          <TableCell key="edit">
                            <IconButton onClick={() => handleEdit(index)}>
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          ) : (
            <TableLoadingContainer>{noItemsMessage}</TableLoadingContainer>
          )}
        </TableContainer>
      </Paper>
    </>
  );
}

ProcessesTable.defaultProps = {
  actionLabel: '',
  title: '',
  handleAction: () => {},
  handleEdit: undefined,
  defaultSort: 'asc',
  defaultSortBy: undefined,
  dense: false,
  noItemsMessage: <TableLoading />,
};

ProcessesTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  actionLabel: PropTypes.string,
  handleAction: PropTypes.func,
  handleEdit: PropTypes.func,
  title: PropTypes.string,
  defaultSort: PropTypes.oneOf(['asc', 'desc']),
  defaultSortBy: PropTypes.string,
  dense: PropTypes.bool,
  noItemsMessage: <TableLoading />,
};
