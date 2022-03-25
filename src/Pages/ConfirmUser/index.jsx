/* eslint-disable no-unused-vars */
import { React, useState, useCallback } from 'react';
import { Input, Typography, FlexContent } from '@d1.cx/components';
import { Sync } from '@d1.cx/icons';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';
import SnackAlert from '../../components/SnackAlert';
import { dispatch } from '../../Config/store';
import { onSignIn } from '../../Auth';
import Logo from '../../assets/workflow.png';
import {
  GenerticColorButton,
  Container,
  Card,
  LogoClient,
  LoadingButton,
} from './styles';

const MIN_PASSWORD = 8;
const ERROR_PASSWORD = `A senha deve ter no mínimo ${MIN_PASSWORD} caracteres!`;
const ERROR_CONFIRM_PASSWORD = 'A senha não é igual a digitada anteriormente.';
export default function ConfirmUser() {
  const history = useHistory();
  const { search } = useLocation();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Ops, deu um erro!');
  const [passwordEnabled, enablePasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const INITIAL_ERRORS = {
    email: false,
    pass: false,
    confirmPass: false,
    oldPass: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setErrorMessage(false);
  };

  /**
   * @function handleChangeEmail
   * @description Salva o valor digitando no campo de email
   */

  const handleChangeEmail = useCallback(
    ({ target }) => {
      setEmail(target.value);
    },
    [email],
  );

  /**
   * @function handleChangeOldPassword
   * @description Salva o valor digitando no campo de senha antiga
   */

  const handleChangeOldPassword = useCallback(
    ({ target }) => {
      setOldPassword(target.value);
    },
    [oldPassword],
  );

  /**
   * @function handleChangePassword
   * @description Salva o valor digitando no campo de nova senha
   */

  const handleChangePassword = useCallback(
    ({ target }) => {
      setPassword(target.value);
    },
    [password],
  );

  /**
   * @function handleChangeConfirmPassword
   * @description Salva o valor digitando no campo de confirmação de nova senha
   */

  const handleChangeConfirmPassword = useCallback(
    ({ target }) => {
      setConfirmPassword(target.value);
    },
    [confirmPassword],
  );

  /**
   * @function handleSubmitGetCode
   * @description Responsável por pegar o código vindo da url e validar o usuario
   */

  const handleSubmitGetCode = useCallback(
    async (e) => {
      try {
        e?.preventDefault();
        setLoading(true);
        const { code } = queryString.parse(search);
        await dispatch.Auth.verifyUser({ email, code });
        enablePasswordChange(true);
      } catch (error) {
        setErrorMessage(true);
        setAlertMessage(
          'Hmmmmm! Parece que seu token está inválido ou esse email já foi cadastrado. Por favor, gere outro código e tente novamente!',
        );
        setOpenAlert(true);
      } finally {
        setLoading(false);
      }
    },
    [email],
  );

  /**
   * @function handleSubmitConfirmUser
   * @description Responsável por validar os dados digitados e confirmar o novo usuário
   */

  const handleSubmitConfirmUser = useCallback(
    async (event) => {
      try {
        event?.preventDefault();
        setLoading(true);

        setErrors(INITIAL_ERRORS);

        if (event.target.email.value.length === 0) {
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

        if (confirmPassword !== password) {
          setErrors((prevState) => ({
            ...prevState,
            confirmPass: true,
          }));
        }
        if (oldPassword.length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            oldPass: true,
          }));
        }
        if (password === confirmPassword) {
          await dispatch.Auth.changePassword({
            email,
            password,
            'old-password': oldPassword,
          });

          setAlertMessage('Confirmação de usuário feita com sucesso!');
          setOpenAlert(true);
          const res = await onSignIn(email, password);

          if (res) {
            history.push('/dashboard');
          }
        } else {
          setErrorMessage(true);
          setAlertMessage(
            'Parece que as senhas não conferem! Por favor, verifique e tente novamente!',
          );
          setOpenAlert(true);
        }
      } catch (error) {
        setErrorMessage(true);
        setAlertMessage(
          'Algo de errado aconteceeu e não foi possivel alterar sua senha. Verifique seus dados e tente novamente.',
        );
        setOpenAlert(true);
      } finally {
        setLoading(false);
      }
    },
    [email, password, oldPassword, confirmPassword],
  );

  return (
    <>
      <SnackAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        message={alertMessage}
        severity={!errorMessage ? 'success' : 'error'}
      />

      <Container>
        <Card>
          <FlexContent center direction="column">
            <LogoClient
              alt="PORTO SEGURO"
              src={process.env.REACT_APP_LOGO || Logo}
            />
            <Typography color="#000" fontSize="18px" vertical="15px">
              Confirmação de usuário
            </Typography>
          </FlexContent>
          <form
            onSubmit={
              passwordEnabled ? handleSubmitConfirmUser : handleSubmitGetCode
            }
          >
            <Input
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Digite seu email"
              autoFocus
              required
              onChange={handleChangeEmail}
              value={email}
            />

            {passwordEnabled && (
              <>
                {' '}
                <Input
                  name="old-password"
                  placeholder="Digite sua senha antiga"
                  id="old-password"
                  type="password"
                  required
                  onChange={handleChangeOldPassword}
                  value={oldPassword}
                  error={errors.oldPass}
                  errorMessage={ERROR_PASSWORD}
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Digite sua nova senha"
                  required
                  onChange={handleChangePassword}
                  value={password}
                  error={errors.pass}
                  errorMessage={ERROR_PASSWORD}
                />
                <Input
                  type="password"
                  id="re-password"
                  autoComplete="password"
                  placeholder="Confirme sua nova senha"
                  required
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  errorMessage={ERROR_CONFIRM_PASSWORD}
                  error={errors.confirmPass}
                />
              </>
            )}

            <GenerticColorButton type="submit" width="100%">
              {loading ? (
                <LoadingButton active>
                  <Sync width="20px" color="#fff" />
                </LoadingButton>
              ) : (
                <Typography color="#fff">Confirmar</Typography>
              )}
            </GenerticColorButton>
          </form>
        </Card>
      </Container>
    </>
  );
}
