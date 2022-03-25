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
import FullScreenModal from '../../../../components/FullScreenModal/index';
import { DeleteItem, WrapperModal } from './styles';

import { dispatch } from '../../../../Config/store';
import StepsModal from '../StepsModal';
// import { dispatch } from '../../../../Config/store';

const columns = [
  { id: 'JourneyName', label: 'Nome da jornada', minWidth: 200 },
  { id: 'modality', label: 'Esteira', minWidth: 200 },

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

export default function TableJourney({
  data,
  filtered,
  currentProductById,
  resetSearchFilter,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = React.useState('');
  const [journeyId, setJourneyId] = React.useState(0);
  const [removeJourneyModalOpen, setRemoveJourneyModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allRows, setAllRows] = React.useState([]);
  const [rowsInitial, setRowsIniital] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [openStepModal, setOpenStepModal] = React.useState(false);

  function createData(id, modality, modalityId, JourneyName, optional) {
    return {
      id,
      modality,
      modalityId,
      JourneyName,
      optional,
    };
  }

  /**
   * @function handleCreateRows
   * @description Cria as linhas de acordo com os dados necessários para
   * popular a tabela
   */

  const handleCreateRows = useCallback(() => {
    const rows = data?.map((journey) => createData(
      journey.id,
      journey.modality?.name,
      journey.modality_id,
      journey.name,
      'remove',
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
    await dispatch.Journeys.deleteJourneyByIdAsync(journeyId);
    await dispatch.Journeys.loadJourneysByProductAsync(currentProductById);
    setPage(0);
    setLoading(false);
    setRemoveJourneyModalOpen(false);
  }, [currentProductById, journeyId]);

  /**
   * @function handleFilterTableByJourneyName
   * @description Filtra os valores das linhas de acordo com o nome
   * digitado
   */

  const handleFilterTableByJourneyName = (e) => {
    e?.preventDefault();
    if (allRows) {
      const filterResult = allRows.filter((elem) => elem.JourneyName.toLocaleLowerCase().includes(
        filtered.toLocaleLowerCase(),
      ));
      setAllRows(filterResult);

      if (resetSearchFilter) {
        setAllRows(rowsInitial);
        const resetFilterResult = rowsInitial.filter((elem) => elem.JourneyName.toLocaleLowerCase().includes(
          filtered.toLocaleLowerCase(),
        ));
        setAllRows(resetFilterResult);
      }
      setPage(0);
    }
  };
  useEffect(() => {
    if (filtered) {
      handleFilterTableByJourneyName();
    } else {
      setAllRows(rowsInitial);
    }
  }, [filtered, rowsInitial]);

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
                                  setRemoveJourneyModalOpen(true);
                                  setJourneyId(row.id);
                                  setName(row.JourneyName);
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
                              setOpenStepModal(true);
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

      <MiniModal open={removeJourneyModalOpen} title="Remover jornada">
        <WrapperModal>
          <Typography vertical="10px" fontSize="16px">
            Tem certeza que deseja remover essa jornada:
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
            <OutlineButton onClick={() => setRemoveJourneyModalOpen(false)}>
              Voltar
            </OutlineButton>
          </FlexContent>
          <Spacing vertical="10px" />
        </WrapperModal>
      </MiniModal>
      <FullScreenModal open={openStepModal}>
        <StepsModal
          data={allRows && allRows[index]}
          onClose={setOpenStepModal}
          productId={currentProductById}
        />
      </FullScreenModal>
    </>
  );
}
