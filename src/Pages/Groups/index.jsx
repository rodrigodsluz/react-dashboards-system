import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Input, PrimaryButton, Spacing } from '@d1.cx/components';
import { dispatch } from '../../Config/store';
import TableGroups from './components/Table';
import TableLoading from '../../components/Skeleton/TableLoading/TableLoading';

import RightModal from '../../components/RightModal/RightModal';
import NewGroupModal from './components/NewGroupModal/NewGroupModal';
import {
  Container,
  Row,
  WrapperLottie,
  Wrapper,
  TableLoadingContainer,
} from './styles';
import LottieNotification from '../../components/LottieNotification/LottieNotification';
import SnackAlert from '../../components/SnackAlert';

const GroupsTable = () => {
  const userInfo = useSelector((state) => state.User.user, shallowEqual);
  const groupState = useSelector(
    (state) => state.Groups.allGroups,
    shallowEqual,
  );

  const [groupName, setGroupName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [resetSearchFilter, setResetSearchFilter] = useState(false);
  const handleGetProductsByUser = useCallback(async () => {
    if (userInfo) {
      const { capabilities } = userInfo;

      await dispatch.Status.loadStatusPerProduct(
        capabilities?.permittedProducts,
      );
    }
  }, [userInfo]);

  /**
   * @function handleChangeUsernameFilter
   * @description Seta o nome de usuario a ser filtrado
   */

  const handleChangeUsernameFilter = useCallback(
    ({ target }) => {
      setGroupName(target.value);
    },
    [groupName],
  );

  const resetFilterBackSpace = (event) => {
    const valid = event?.key === 'Backspace';
    setResetSearchFilter(valid);
  };

  /**
   * @function handleGetAllGroups
   * @description Bate na api, retorna todos os grupos
   * e salva no redux
   */

  const handleGetAllGroups = useCallback(async () => {
    try {
      setErrorAPI(false);
      await dispatch.Groups.loadAllGroupsAsync();
    } catch (error) {
      setErrorAPI(true);
    }
  }, []);

  const handleLoading = useCallback(() => {
    if (!groupState) {
      setloadingTable(true);
    } else {
      setloadingTable(false);
    }
  }, [groupState]);

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  useEffect(() => {
    handleGetAllGroups();
  }, []);

  useEffect(() => {
    handleGetProductsByUser();
  }, [userInfo]);

  useEffect(() => {
    handleLoading();
  }, [groupState]);

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
        <Row>
          <PrimaryButton
            onClick={() => setOpenModal(true)}
            data-testid="btnAdicionarGrupo"
          >
            Adicionar novo
          </PrimaryButton>
        </Row>
        <Spacing vertical="10px" />

        {groupState.length > 0 && (
          <>
            <Input
              width="100%"
              placeholder="Buscar por grupo"
              onChange={handleChangeUsernameFilter}
              value={groupName}
              data-testid="txtFiltroGrupo"
            />
            <TableGroups
              data={groupState}
              filterGroup={groupName}
              resetSearchFilter={resetSearchFilter}
            />
          </>
        )}

        {groupState.length === 0 && (
          <WrapperLottie>
            <LottieNotification
              hiddenBg
              animation="lupa"
              description="Não há grupos adicionados!"
            />
          </WrapperLottie>
        )}

        {!groupState && loadingTable && (
          <TableLoadingContainer>
            <TableLoading />
          </TableLoadingContainer>
        )}
        <RightModal open={openModal}>
          <NewGroupModal onClose={() => setOpenModal(false)} />
        </RightModal>
      </Wrapper>
    </Container>
  );
};

export default GroupsTable;
