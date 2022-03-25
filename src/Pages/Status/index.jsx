import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, PrimaryButton, Spacing } from '@d1.cx/components';
import TableStatus from './components/Table';
import TableLoading from '../../components/Skeleton/TableLoading/TableLoading';
import NewStatusModal from './components/NewStatusModal/NewStatusModal';
import RightModal from '../../components/RightModal/RightModal';
import { dispatch } from '../../Config/store';
import {
  Row, Wrapper, Container, TableLoadingContainer,
} from './styles';
import LottieNotification from '../../components/LottieNotification/LottieNotification';
import { WrapperLottie } from '../Users/styles';
import SnackAlert from '../../components/SnackAlert';

const StatusTable = () => {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const products = useSelector((state) => state.User.allProducts);

  const [statusName, setStatusName] = useState('');
  const [openModalNewStatus, setOpenModalNewStatus] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const statusState = useSelector((state) => state.Status.allState);
  const [resetSearchFilter, setResetSearchFilter] = useState(false);

  /**
   * @function handleChangeStatusNameFilter
   * @description Seta o nome de usuario a ser filtrado
   */
  const handleChangeStatusNameFilter = useCallback(
    ({ target }) => {
      setStatusName(target.value);
    },
    [statusName],
  );

  const resetFilterBackSpace = (event) => {
    const valid = event?.key === 'Backspace';
    setResetSearchFilter(valid);
  };

  /**
   * @function handleGetStatusAndGroups
   * @description Bate na api, retorna todos os grupos e usuarios
   * e salva no redux
   */

  const handleGetStatusAndGroups = useCallback(async () => {
    try {
      setStatusName('');
      setErrorAPI(false);
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
    } catch (error) {
      setErrorAPI(true);
    }
  }, [currentProductById]);

  const handleLoading = useCallback(() => {
    if (!statusState) {
      setloadingTable(true);
    } else {
      setloadingTable(false);
    }
  }, [statusState]);

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  useEffect(() => {
    handleGetStatusAndGroups();
  }, [currentProductById]);

  useEffect(() => {
    handleLoading();
  }, [statusState]);

  useEffect(() => {
    window.addEventListener('keydown', resetFilterBackSpace);
    return () => {
      window.removeEventListener('keydown', resetFilterBackSpace);
    };
  }, []);

  return (
    <Container>
      <SnackAlert
        open={errorAPI}
        handleClose={handleCloseNotification}
        severity="error"
        message="Ops! Não foi possivel encontrar os dados. Verifique sua conexão e tente novamente."
      />
      <Wrapper>
        {products && (
          <Row>
            <PrimaryButton
              onClick={() => setOpenModalNewStatus(true)}
              data-testid="btnAdicionarStatus"
            >
              Adicionar novo
            </PrimaryButton>
          </Row>
        )}

        <Spacing vertical="10px" />
        {statusState?.length > 0 && (
          <>
            <Input
              width="100%"
              placeholder="Buscar por status"
              onChange={handleChangeStatusNameFilter}
              value={statusName}
              data-testid="txtFiltroStatus"
              onKeyPress={resetFilterBackSpace}
            />
            <TableStatus
              data={statusState}
              filterStatus={statusName}
              resetFilter={setStatusName}
              resetSearchFilter={resetSearchFilter}
            />
          </>
        )}

        {statusState?.length === 0 && (
          <WrapperLottie>
            <LottieNotification
              hiddenBg
              animation="lupa"
              description="Não há status adicionados!"
            />
          </WrapperLottie>
        )}

        {!statusState && loadingTable && (
          <TableLoadingContainer>
            <TableLoading />
          </TableLoadingContainer>
        )}

        <RightModal open={openModalNewStatus}>
          <NewStatusModal
            onClose={() => {
              setOpenModalNewStatus(false);
            }}
          />
        </RightModal>
      </Wrapper>
    </Container>
  );
};

export default StatusTable;
