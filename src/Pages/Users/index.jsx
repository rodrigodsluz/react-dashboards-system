import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, PrimaryButton, Spacing } from '@d1.cx/components';
import { dispatch } from '../../Config/store';
import TableUsers from './components/Table/Table';
import TableLoading from '../../components/Skeleton/TableLoading/TableLoading';

import {
  Container,
  Row,
  WrapperLottie,
  Wrapper,
  TableLoadingContainer,
} from './styles';
import RightModal from '../../components/RightModal/RightModal';
import NewUserModal from './components/NewUserModal/NewUserModal';
import LottieNotification from '../../components/LottieNotification/LottieNotification';
import SnackAlert from '../../components/SnackAlert';

const UsersTable = () => {
  const userState = useSelector((state) => state.User.userList);
  const [username, setUsername] = useState('');
  const [openModalNewUser, setOpenModalNewUser] = useState(false);
  const [loadingTable, setloadingTable] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [resetSearchFilter, setResetSearchFilter] = useState(false);

  /**
   * @function handleChangeUsernameFilter
   * @description Seta o nome de usuario a ser filtrado
   */

  const handleChangeUsernameFilter = useCallback(
    ({ target }) => {
      setUsername(target.value);
    },
    [username],
  );

  /**
   * @function handleChangeUsernameFilter
   * @description Seta o nome de usuario a ser filtrado
   */

  const resetFilterBackSpace = (event) => {
    const valid = event?.key === 'Backspace';
    setResetSearchFilter(valid);
  };

  /**
   * @function handleGetAllUser
   * @description Bate na api, retorna todos os grupos e usuarios
   * e salva no redux
   */

  const handleGetAllUser = useCallback(async () => {
    try {
      setErrorAPI(false);
      await dispatch.User.loadAllUsersAsync();
      await dispatch.Groups.loadAllGroupsAsync();
    } catch (error) {
      setErrorAPI(true);
    }
  }, []);

  /**
   * @function handleLoading
   * @description Controla o loading da tabela com base no retorno do redux
   */

  const handleLoading = useCallback(() => {
    if (!userState) {
      setloadingTable(true);
    } else {
      setloadingTable(false);
    }
  }, [userState]);

  const handleCloseNotification = useCallback(() => {
    setErrorAPI(false);
  }, [errorAPI]);

  useEffect(() => {
    handleGetAllUser();
  }, []);

  useEffect(() => {
    handleLoading();
  }, [userState]);

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
            onClick={() => setOpenModalNewUser(true)}
            data-testid="btnAdicionarUser"
          >
            Adicionar novo
          </PrimaryButton>
        </Row>
        <Spacing vertical="10px" />
        {userState?.length > 0 ? (
          <>
            <Input
              width="100%"
              placeholder="Buscar por usuário"
              onChange={handleChangeUsernameFilter}
              value={username}
              data-testid="txtFiltroUser"
              onKeyPress={resetFilterBackSpace}
            />

            <TableUsers
              data={userState}
              filterUser={username}
              resetSearchFilter={resetSearchFilter}
            />
          </>
        ) : (
          <WrapperLottie>
            <LottieNotification
              hiddenBg
              animation="lupa"
              description="Não há usuários adicionados!"
            />
          </WrapperLottie>
        )}
        {loadingTable && (
          <TableLoadingContainer>
            <TableLoading />
          </TableLoadingContainer>
        )}
        <RightModal open={openModalNewUser}>
          <NewUserModal onClose={() => setOpenModalNewUser(false)} />
        </RightModal>
      </Wrapper>
    </Container>
  );
};

export default UsersTable;
