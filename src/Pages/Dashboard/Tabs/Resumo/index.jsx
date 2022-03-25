import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import FinishedProcessesTable from './components/FinishedProcessesTable';
import OpenProcessesTable from './components/OpenProcessesTable';
import { dispatch } from '../../../../Config/store';
import { Container } from './styles';
import EmptyContainer from '../../../../components/EmptyContainer';

/**
 * @function Resumo
 * @description Página com tabela de processos e processo finalizados
 *
 */
const Resumo = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const openSummary = useSelector(
    (state) => state.Document.documentsOpenSummary,
  );
  const finishedSummary = useSelector(
    (state) => state.Document.documentsFinishedSummary,
  );

  /**
   * @function handleDocumentsOpenSummary
   * @description Pega o objeto com as informações dos processos pendentes
   *
   */
  const handleDocumentsOpenSummary = useCallback(async () => {
    await dispatch.Document.getDocumentsOpenSummaryAsync({
      products: [currentProductById],
      table: 'modalities',
      categoryColumn: [
        {
          dateColumn: 'created_at',
          category: 'valid',
        },
        {
          dateColumn: 'date_finished',
          category: 'final',
        },
      ],
      groupDate: ['year', 'month', 'day'],
    });
  }, [currentProductById]);

  /**
   * @function handleDocumentsFinishedSummary
   * @description Pega o objeto com as informações dos processos finalizados
   *
   */
  const handleDocumentsFinishedSummary = useCallback(async () => {
    await dispatch.Document.getDocumentsFinishedSummaryAsync({
      products: [currentProductById],
      table: 'modalities',
      categoryColumn: [
        {
          dateColumn: 'date_finished',
          category: 'final',
        },
      ],
      groupDate: ['year', 'month'],
    });
  }, [currentProductById]);

  useEffect(() => {
    if (currentProductById > 0) {
      handleDocumentsFinishedSummary();
      handleDocumentsOpenSummary();
    }
  }, [currentProductById]);

  return (
    <Container>
      {currentProductById ? (
        <>
          <OpenProcessesTable openSummary={openSummary} />
          <FinishedProcessesTable finishedSummary={finishedSummary} />
        </>
      ) : <EmptyContainer />}

    </Container>
  );
};

export default Resumo;
