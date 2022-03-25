/* eslint-disable max-len */
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
import { DeleteItem } from '../styles';
import { WrapperModal } from './styles';
import { dispatch } from '../../../Config/store';
import RightModal from '../../../components/RightModal/RightModal';
import UpdateGroupModal from './UpdateGroupModal/UpdateGroupModal';
import { deleteGroupById } from '../../../Config/Api/Groups';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Grupo', minWidth: 200 },
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

export default function TableGroups({ data, filterGroup, resetSearchFilter }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [groupId, setgroupId] = React.useState('');
  const [name, setName] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [removeGroupModalOpen, setRemoveGroupModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allRows, setAllRows] = React.useState([]);
  const [rowsInitial, setRowsIniital] = React.useState([]);

  function createData(id, groupName, optional) {
    return {
      id,
      name: groupName,
      optional,
    };
  }

  /**
   * @function handleCreateRows
   * @description Cria as linhas de acordo com os dados necessários para
   * popular a tabela
   */

  const handleCreateRows = useCallback(() => {
    const rows = data?.map((group) => createData(group.id, group.name, 'remove'));
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
   * @function handleDeleteGroup
   * @description Remove o usuário selecionado
   * atráves do email
   */

  const handleDeleteGroup = useCallback(async () => {
    setLoading(true);
    await deleteGroupById(groupId);
    await dispatch.Groups.loadAllGroupsAsync();
    setLoading(false);
    setRemoveGroupModalOpen(false);
  }, [groupId]);

  /**
   * @function handleFilterTableByGroupName
   * @description Filtra os valores das linhas de acordo com o nome
   * digitado
   */

  const handleFilterTableByGroupName = (e) => {
    e?.preventDefault();
    if (allRows) {
      const filterResult = allRows.filter((elem) => elem.name.toLocaleLowerCase().includes(filterGroup.toLocaleLowerCase()));
      setAllRows(filterResult);

      if (resetSearchFilter) {
        setAllRows(rowsInitial);
        const resetFilterResult = rowsInitial.filter((elem) => elem.name
          .toLocaleLowerCase()
          .includes(filterGroup.toLocaleLowerCase()));
        setAllRows(resetFilterResult);
      }
      setPage(0);
    }
  };

  useEffect(() => {
    if (filterGroup) {
      handleFilterTableByGroupName();
    } else {
      setAllRows(rowsInitial);
    }
  }, [filterGroup, rowsInitial]);

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
                                  setRemoveGroupModalOpen(true);
                                  setgroupId(row.id);
                                  setName(row.name);
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
                              setIndex(i);
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

      <MiniModal open={removeGroupModalOpen} title="Remover grupo">
        <WrapperModal>
          <Typography vertical="10px" fontSize="16px">
            Tem certeza que deseja remover o grupo:
            {' '}
          </Typography>
          <Typography fontSize="16px" bold>
            {name}
            ?
          </Typography>
          <Spacing vertical="10px" />
          <FlexContent spaceBetween>
            <PrimaryButton
              onClick={handleDeleteGroup}
              loading={loading}
              disabled={loading}
            >
              Confirmar
            </PrimaryButton>
            <OutlineButton onClick={() => setRemoveGroupModalOpen(false)}>
              Voltar
            </OutlineButton>
          </FlexContent>
          <Spacing vertical="10px" />
        </WrapperModal>
      </MiniModal>

      <RightModal open={open}>
        <UpdateGroupModal
          group={data && data[index]}
          onClose={() => setOpen(false)}
        />
      </RightModal>
    </>
  );
}
