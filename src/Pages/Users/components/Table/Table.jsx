/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  PrimaryButton,
  Modal as MiniModal,
  OutlineButton,
  Spacing,
  FlexContent,
} from '@d1.cx/components';
import { v4 as uuidv4 } from 'uuid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { TrashAlt } from '@d1.cx/icons';
import RightModal from '../../../../components/RightModal/RightModal';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
import { DeleteItem, GroupItem } from '../../styles';
import { deleteUser } from '../../../../Config/Api/User';
import { dispatch } from '../../../../Config/store';
import { WrapperModal } from './styles';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'username', label: 'Usuário', minWidth: 200 },
  {
    id: 'groups',
    label: 'Grupos',
    minWidth: 160,
    align: 'left',
  },

  {
    id: 'lastAcess',
    label: 'Último acesso',
    minWidth: 60,
    align: 'right',
    format: (value) => {
      const split = value.split('T');
      if (split.length > 1) {
        const formatedDate = moment(split[0]).format('DD/MM/YYYY');
        return formatedDate;
      }
      return value;
    },
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
    maxHeight: 500,
  },
});

export default function TableUsers({ data, filterUser, resetSearchFilter }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [index, setIndex] = React.useState(0);
  const [userId, setUserId] = React.useState('');
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [removeUserModalOpen, setRemoveUserModalOpen] = React.useState(false);
  const [allRows, setAllRows] = React.useState([]);
  const [rowsInitial, setRowsIniital] = React.useState([]);
  function createData(
    id,
    username,
    email,
    groups,
    groupsNames,
    lastAcess,
    optional,
  ) {
    return {
      id,
      username,
      email,
      groups,
      groupsNames,
      lastAcess,
      optional,
    };
  }

  /**
   * @function handleCreateRows
   * @description Cria as linhas de acordo com os dados necessários para
   * popular a tabela
   */

  const handleCreateRows = useCallback(() => {
    const rows = data?.map((user) => createData(
      user.id,
      user.name,
      user.email,
      user.groups.length > 0
        ? user.groups.map((group) => (
          <GroupItem key={uuidv4()}>
            <Typography color="#fff">{group.name}</Typography>
          </GroupItem>
        ))
        : 'Nenhum',
      user.groups.length > 0
        ? user.groups.map((group) => group.name)
        : 'Nenhum',
      user.last_login || 'Nunca',
      '',
    ));
    setRowsIniital(rows);

    setAllRows(rows);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
    await deleteUser({ email: userId });
    await dispatch.Groups.loadAllGroupsAsync();
    setLoading(false);
    setRemoveUserModalOpen(false);
  }, [userId]);

  /**
   * @function handleFilterTableByUsername
   * @description Filtra os valores das linhas de acordo com o nome
   * digitado
   */

  const handleFilterTableByUsername = (e) => {
    e?.preventDefault();
    if (allRows) {
      const filterResult = allRows.filter((elem) => elem.username
        .toLocaleLowerCase()
        .includes(filterUser.toLocaleLowerCase()));
      setAllRows(filterResult);

      if (resetSearchFilter) {
        setAllRows(rowsInitial);
        const resetFilterResult = rowsInitial.filter((elem) => elem.username
          .toLocaleLowerCase()
          .includes(filterUser.toLocaleLowerCase()));
        setAllRows(resetFilterResult);
      }
      setPage(0);
    }
  };

  useEffect(() => {
    if (filterUser) {
      handleFilterTableByUsername();
    } else {
      setAllRows(rowsInitial);
    }
  }, [filterUser, rowsInitial]);

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
                        if (value === 'remove') {
                          return (
                            <TableCell align="right">
                              <DeleteItem
                                data-testid="trash-icon"
                                onClick={() => {
                                  setRemoveUserModalOpen(true);
                                  setUserId(row.email);
                                  setName(row.username);
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

      <MiniModal open={removeUserModalOpen} title="Remover grupo">
        <WrapperModal>
          <Typography vertical="10px" fontSize="16px">
            Tem certeza que deseja remover o usuário:
            {' '}
          </Typography>
          <Typography fontSize="16px" bold>
            {name}
            ?
          </Typography>
          <Spacing vertical="10px" />
          <FlexContent spaceBetween>
            <PrimaryButton
              onClick={handleDeleteUser}
              loading={loading}
              disabled={loading}
            >
              Confirmar
            </PrimaryButton>
            <OutlineButton onClick={() => setRemoveUserModalOpen(false)}>
              Voltar
            </OutlineButton>
          </FlexContent>
          <Spacing vertical="10px" />
        </WrapperModal>
      </MiniModal>

      <RightModal open={open}>
        <UpdateUserModal
          user={allRows.length > 0 ? allRows[index] : data && data[index]}
          onClose={() => setOpen(false)}
        />
      </RightModal>
    </>
  );
}
