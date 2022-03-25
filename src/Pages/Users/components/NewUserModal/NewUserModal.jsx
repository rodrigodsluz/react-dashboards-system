/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import {
  Input, PrimaryButton, Spacing, Typography,
} from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';
import Chip from '@material-ui/core/Chip';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Container,
  GridChips,
  WrapperInputs,
  Option,
  Header,
  Click,
  ContainerButton,
  Select,
} from './styles';
import { dispatch } from '../../../../Config/store';
import SnackAlert from '../../../../components/SnackAlert';

function NewUserModal({ onClose }) {
  const allGroups = useSelector(
    (state) => state.Groups.allGroups,
    shallowEqual,
  );

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfimrPassword] = useState('');
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notCompleteCreating, setNotCompleteCreating] = useState(false);
  const INITIAL_ERRORS = {
    email: false,
    pass: false,
    confirmPass: false,
    name: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [groups, setGroups] = useState([]);

  const MIN_PASSWORD = 8;
  const ERROR_PASSWORD = `A senha deve ter no mínimo ${MIN_PASSWORD} caracteres!`;
  const ERROR_CONFIRM_PASSWORD = 'A senha não é igual a digitada anteriormente.';
  const ERROR_NAME = 'O nome não pode estar vazio.';
  const ERROR_GROUPS = 'Hmmmm! Parace que esse grupo já foi adicionado ou não existe.';
  const ERROR_CREATE_USER = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';

  const SUCCESS_CREATE_USER = 'Tudo pronto! Seu usuário foi criado com sucesso.';

  const handleChangeUserName = useCallback(
    ({ target }) => {
      setUserName(target.value);
    },
    [username],
  );

  const handleChangeEmail = useCallback(
    ({ target }) => {
      setEmail(target.value);
    },
    [email],
  );

  const handleChangePassword = useCallback(
    ({ target }) => {
      setPassword(target.value);
    },
    [password],
  );

  const handleChangeConfirmPassword = useCallback(
    ({ target }) => {
      setConfimrPassword(target.value);
    },
    [confirmPassword],
  );

  const handleChangeGroupName = useCallback(
    ({ target }) => {
      setGroupName(target.value);
    },
    [groupName],
  );

  const comparePasswordInput = useCallback(() => {
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPass: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        confirmPass: false,
      }));
    }

    if (password.length > 0 && password.length < MIN_PASSWORD) {
      setErrors((prevState) => ({
        ...prevState,
        pass: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        pass: false,
      }));
    }
  }, [password, confirmPassword]);

  const handleAddGroupInArray = useCallback(
    () => {
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
    },
    [groupName],
  );

  const handleDelete = useCallback(
    (index) => {
      const copyItem = [...groups];
      copyItem.splice(index, 1);
      setGroups(copyItem);
    },
    [groups],
  );

  const handleCloseModalAfterCreating = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [notification]);

  const handleAlertNotCompleteCreatingUser = useCallback(() => {
    if (notCompleteCreating) {
      setError(true);
      setNotification(true);
      setMessage(ERROR_CREATE_USER);
    }
  }, [notCompleteCreating]);

  const handleSubmitNewUSer = useCallback(async () => {
    try {
      setLoading(true);

      setErrors(INITIAL_ERRORS);

      if (email.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          email: true,
        }));
      }

      if (password.length < MIN_PASSWORD) {
        setErrors((prevState) => ({
          ...prevState,
          pass: true,
        }));
      }

      const data = {
        name: username,
        email,
        password,
      };

      const addGroupsInCreateUser = {
        name: username,
        email,
        accessGroups: groups,
      };

      await dispatch.User.createNewUserAsync(data);

      if (groups.length > 0) {
        await dispatch.User.updateUserAsync(addGroupsInCreateUser);
      }
      await dispatch.User.loadAllUsersAsync();
      setNotCompleteCreating(false);
      setNotification(true);
      setError(false);
      setMessage(SUCCESS_CREATE_USER);
      handleCloseModalAfterCreating();
    } catch (erro) {
      setNotCompleteCreating(true);
      setError(true);
      setMessage(ERROR_CREATE_USER);
    }

    setLoading(false);
    setNotCompleteCreating(false);
  }, [username, email, password, groups]);

  const handleChangeNotification = useCallback(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  }, [notification]);

  useEffect(() => {
    comparePasswordInput();
  }, [password, confirmPassword]);

  useEffect(() => {
    handleChangeNotification();
  }, [notification]);

  useEffect(() => {
    handleAlertNotCompleteCreatingUser();
  }, [notCompleteCreating]);

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
          NOVO USUÁRIO
          {' '}
        </Typography>
      </Header>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Nome do usuário
        </Typography>
        <Input
          placeholder="Nome do novo usuário"
          value={username}
          onChange={handleChangeUserName}
          errorMessage={ERROR_NAME}
          required
          data-testid="txtNome"
        />
      </WrapperInputs>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Email
        </Typography>
        <Input
          placeholder="Digite o email do novo usuário"
          value={email}
          onChange={handleChangeEmail}
          error={errors.email}
          required
          type="email"
          data-testid="txtEmail"
        />
      </WrapperInputs>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Senha
        </Typography>
        <Input
          placeholder="Digite uma senha"
          value={password}
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          required
          onChange={handleChangePassword}
          errorMessage={ERROR_PASSWORD}
          error={errors.pass}
          data-testid="txtSenha"
        />
      </WrapperInputs>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Confirmar senha
        </Typography>
        <Input
          placeholder="Repita a senha anterior"
          id="password_confirmation"
          name="password_confirmation"
          autoComplete="password"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          error={errors.confirmPass}
          errorMessage={ERROR_CONFIRM_PASSWORD}
          data-testid="txtConfirmarSenha"
        />
      </WrapperInputs>

      <WrapperInputs>
        <Typography fontSize="16px" vertical="5px">
          Selecionar grupos
        </Typography>

        <Select
          onChange={handleChangeGroupName}
          value={groupName}
          disabled={allGroups.length === 0}
          data-testid="dropdownGrupo"
        >
          <Option value="0">Selecione um grupo</Option>

          {allGroups
            && allGroups?.map((elem) => (
              <Option value={elem.name}>{elem.name}</Option>
            ))}
        </Select>

        <Spacing vertical="10px" />
        <GridChips>
          {groups
            && groups?.map((elem, i) => (
              <Chip
                label={elem.substring(0, 30)}
                onDelete={() => handleDelete(i)}
                color="primary"
                variant="outlined"
              />
            ))}
        </GridChips>
      </WrapperInputs>

      <Spacing vertical="15px" />

      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitNewUSer}
          disabled={loading}
          loading={loading}
          data-testid="btnSalvar"
        >
          Salvar
        </PrimaryButton>
      </ContainerButton>
      <Spacing vertical="30px" />
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </Container>
  );
}

export default NewUserModal;
