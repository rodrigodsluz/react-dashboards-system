/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import {
  FlexContent,
  Input,
  PrimaryButton,
  Spacing,
  Typography,
} from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';
import Chip from '@material-ui/core/Chip';
import { useSelector, shallowEqual } from 'react-redux';

import SnackAlert from '../../../../components/SnackAlert';
import { dispatch } from '../../../../Config/store';
import {
  Container,
  GridChips,
  WrapperInputs,
  Option,
  Header,
  Click,
  ContainerButton,
  Select,
  Title,
} from './styles';

function UpdateUserModal({ user, onClose }) {
  const allGroups = useSelector(
    (state) => state.Groups.allGroups,
    shallowEqual,
  );

  const [username, setUserName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [access, setAccess] = useState(user?.admin);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const ERROR_GROUPS = 'Hmmmm! Parace que esse grupo já foi adicionado ou não existe.';
  const ERROR_UPDATE_USER = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const SUCCESS_CREATE_USER = 'Tudo pronto! Seu usuário foi atualizado com sucesso.';

  /**
   * @function handleChangeUserName
   * @description Seta o nome do usuario que esta sendo digitado
   */

  const handleChangeUserName = useCallback(
    ({ target }) => {
      setUserName(target.value);
    },
    [username],
  );

  /**
   * @function handleChanceUser
   * @description Seta em estados diferentes as informações
   * vindas do usuário selecionado.
   */

  const handleChanceUser = useCallback(() => {
    if (user) {
      setUserName(user.username);
      setEmail(user.email);
      setAccess(user.admin);
      const userGroups = user?.groups !== 'Nenhum' ? user.groupsNames.map((elem) => elem) : '';
      setGroups(userGroups);
    }
  }, [user]);

  /**
   * @function handleAddGroupInArray
   * @description Verifica se já existe o grupo selecionado
   * dentro da array de grupos do usuário.
   */
  const handleAddGroupInArray = useCallback(() => {
    if (groupName !== '') {
      const isExist = allGroups.filter(
        (elem) => elem.name === groupName && !groups.includes(groupName),
      );

      if (isExist.length > 0) {
        setGroups([...groups, groupName]);
        setGroupName('');
      } else {
        setNotification(true);
        setError(true);
        setMessage(ERROR_GROUPS);
      }
    }
  }, [groupName]);

  /**
   * @function handleChangeGroupName
   * @description Seta o nome do grupo digitado no input
   */

  const handleChangeGroupName = useCallback(
    ({ target }) => {
      setGroupName(target.value);
    },
    [groupName],
  );

  /**
   * @function handleDelete
   * @description Deleta o grupo selecionado pelo index
   */

  const handleDelete = useCallback(
    (index) => {
      const copyItem = [...groups];
      copyItem.splice(index, 1);
      setGroups(copyItem);
    },
    [groups],
  );

  /**
   * @function handleChangeNotification
   * @description Fecha a notificação automaticamente depois de 2 segundos.
   */

  const handleChangeNotification = useCallback(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }, [notification]);

  /**
   * @function handleCloseModalAfterCreating
   * @description Fecha o modal depois de 1 segundo, apenas para ser visivel
   * a notificação.
   */

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  /**
   * @function handleSubmitUpdateUser
   * @description Faz a request pra atualizar o usuário
   */

  const handleSubmitUpdateUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = {
        email,
        name: username,
        accessGroups: groups,
      };

      await dispatch.User.updateUserAsync(data);
      await dispatch.User.loadAllUsersAsync();
      setNotification(true);
      setError(false);
      setMessage(SUCCESS_CREATE_USER);
      handleCloseModalAfterCreating();
    } catch (err) {
      setError(true);
      setMessage(ERROR_UPDATE_USER);
      setLoading(false);
    }
  }, [username, groups, access]);

  useEffect(() => {
    handleChanceUser();
  }, [user]);

  useEffect(() => {
    if (groupName.length > 0) {
      handleAddGroupInArray();
    }
  }, [groupName]);

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose} data-testid="back-icon">
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          <Title>INFORMAÇÕES DO USUÁRIO</Title>
          {' '}
        </Typography>
      </Header>
      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Nome do usuário
        </Typography>
        <Input
          placeholder="Novo nome do usuário"
          value={username}
          onChange={handleChangeUserName}
        />
      </WrapperInputs>

      <Spacing vertical="5px" />

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Selecionar grupos
        </Typography>

        <Select
          onChange={handleChangeGroupName}
          value={groupName}
          disabled={allGroups.length === 0}
        >
          <Option value="0">Selecione um grupo</Option>

          {allGroups
            && allGroups?.map((elem) => (
              <Option value={elem.name}>{elem.name}</Option>
            ))}
        </Select>
        <Spacing vertical="10px" />
        <GridChips>
          {groups.length > 0
            && groups?.map((name, i) => (
              <Chip
                label={name?.substring(0, 30)}
                onDelete={() => handleDelete(i)}
                color="primary"
                variant="outlined"
              />
            ))}
        </GridChips>

        {groups.length === 0 && (
          <FlexContent center>
            <Typography>
              Não foi adicionado nenhum grupo a esse usuário
            </Typography>
          </FlexContent>
        )}
      </WrapperInputs>

      <Spacing vertical="15px" />

      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitUpdateUser}
          loading={loading}
          disabled={loading}
        >
          Atualizar usuário
        </PrimaryButton>
      </ContainerButton>
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </Container>
  );
}

export default UpdateUserModal;
