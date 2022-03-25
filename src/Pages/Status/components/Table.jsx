/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  PrimaryButton,
  Typography,
  Modal as MiniModal,
  OutlineButton,
  Spacing,
  FlexContent,
} from '@d1.cx/components';
import { TrashAlt } from '@d1.cx/icons';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import RightModal from '../../../components/RightModal/RightModal';
import UpdateStatusModal from './UpdateUserModal/UpdateStatusModal';
import { DeleteItem, WrapperModal, StatusItem } from './styles';
import SnackAlert from '../../../components/SnackAlert';

import { dispatch } from '../../../Config/store';
import colors from '../../../theme/colors';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'status', label: 'Status', minWidth: 200 },
  { id: 'category', label: 'Categoria', minWidth: 200 },
  {
    id: 'product',
    label: 'Área',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'sla',
    label: 'SLA',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'statusTransition',
    label: 'Enviar comunicação',
    minWidth: 100,
    align: 'center',
    format: (value) => (value.length ? 'Sim' : 'Não'),
  },

  {
    id: 'check',
    label: 'Marcador',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'optional',
    label: '',
    minWidth: 40,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '80%',
  },
});

export default function TableStatus({
  data,
  filterStatus,
  resetFilter,
  resetSearchFilter,
}) {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [index, setIndex] = React.useState(0);
  const [removeByStatusId, setRemoveByStatusId] = React.useState('');
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [removeStatusModalOpen, setRemoveStatusModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allRows, setAllRows] = React.useState([]);
  const [rowsInitial, setRowsIniital] = React.useState([]);
  const [notification, setNotification] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const SUCESS_DELETED = 'Status excluído com sucesso!';
  const ERROR_DELETED = 'Ooops! O Status não pode ser excluído pois há processos relacionados a ele';

  function createData(
    id,
    status,
    category,
    product,
    sla,
    send,
    check,
    optional,
    backgroundColor,
    statusTransition,
    color,
    description,
  ) {
    return {
      id,
      status,
      category,
      product,
      sla,
      send,
      check,
      optional,
      backgroundColor,
      statusTransition,
      color,
      description,
    };
  }

  /**
   * @function handleCreateRows
   * @description Cria as linhas de acordo com os dados necessários para
   * popular a tabela
   */

  const handleCreateRows = useCallback(() => {
    const rows = data?.map((status) => createData(
      status.id,
      status.status,
      status.category,
      status.product.name,
      status.sla,
      status.isPrimary,
      'check',
      'remove',
      status.backgroundColor,
      status.statusTransition,
      status.color,
      status.description,
    ));
    setRowsIniital(rows);

    setAllRows(rows);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeNotification = () => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * @function handleDeleteUser
   * @description Remove o usuário selecionado
   * atráves do email
   */

  const handleDeleteUser = useCallback(async () => {
    setLoading(true);
    let statusDeleted = true;
    try {
      await dispatch.Status.deleteStatusAsync(removeByStatusId);
    } catch (err) {
      if (err.message === 'Request failed with status code 400') {
        statusDeleted = false;
      }
    }
    await dispatch.Status.loadStatusByProductAsync(currentProductById);
    resetFilter('');
    setPage(0);
    setLoading(false);
    setRemoveStatusModalOpen(false);
    if (statusDeleted) {
      setNotification(true);
      setError(false);
      setMessage(SUCESS_DELETED);
    } else {
      setNotification(true);
      setError(true);
      setMessage(ERROR_DELETED);
    }
  }, [removeByStatusId]);

  /**
   * @function handleFilterTableByStatusName
   * @description Filtra os valores das linhas de acordo com o nome
   * digitado
   */

  const handleFilterTableByStatusName = (e) => {
    e?.preventDefault();
    if (allRows) {
      const filterResult = allRows.filter((elem) => elem.status
        .toLocaleLowerCase()
        .includes(filterStatus.toLocaleLowerCase()));
      setAllRows(filterResult);

      if (resetSearchFilter) {
        setAllRows(rowsInitial);
        const resetFilterResult = rowsInitial.filter((elem) => elem.status
          .toLocaleLowerCase()
          .includes(filterStatus.toLocaleLowerCase()));
        setAllRows(resetFilterResult);
      }
      setPage(0);
    }
  };

  useEffect(() => {
    if (filterStatus) {
      handleFilterTableByStatusName();
    } else {
      setAllRows(rowsInitial);
    }
  }, [filterStatus, rowsInitial]);

  useEffect(() => {
    handleCreateRows();
  }, [data]);

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allRows
                && allRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];

                        if (value === 'check') {
                          return (
                            <TableCell align="right">
                              <StatusItem
                                color={
                                  row.backgroundColor
                                    ? row.backgroundColor
                                    : colors.details
                                }
                              >
                                <Typography
                                  color={row.color ? row.color : '#fff'}
                                  fontSize="13px"
                                >
                                  {row.status}
                                </Typography>
                              </StatusItem>
                            </TableCell>
                          );
                        }

                        if (value === 'remove') {
                          return (
                            <TableCell align="right">
                              <DeleteItem
                                onClick={() => {
                                  setRemoveStatusModalOpen(true);
                                  setRemoveByStatusId(row.id);
                                  setName(row.status);
                                }}
                              >
                                <TrashAlt width="30px" color="red" />
                              </DeleteItem>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => {
                              setOpen(true);
                              setIndex(i + page * rowsPerPage);
                            }}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <MiniModal open={removeStatusModalOpen} title="Remover status">
        <WrapperModal>
          <Typography vertical="10px" fontSize="16px">
            Tem certeza que deseja remover o status:
            {' '}
          </Typography>
          <Typography fontSize="16px" bold>
            {name}
            ?
          </Typography>
          <Spacing vertical="10px" />
          <b>
            Atenção, os status que estão associados a um ou mais processos não serão excluídos
          </b>
          <Spacing vertical="10px" />
          <FlexContent spaceBetween>
            <PrimaryButton
              onClick={handleDeleteUser}
              loading={loading}
              disabled={loading}
            >
              Confirmar
            </PrimaryButton>
            <OutlineButton onClick={() => setRemoveStatusModalOpen(false)}>
              Voltar
            </OutlineButton>
          </FlexContent>
          <Spacing vertical="10px" />
        </WrapperModal>
      </MiniModal>
      <RightModal open={open}>
        <UpdateStatusModal
          status={allRows.length > 0 ? allRows[index] : data && data[index]}
          onClose={() => setOpen(false)}
          resetPage={setPage}
          resetFilter={resetFilter}
        />
      </RightModal>
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </>
  );
}
