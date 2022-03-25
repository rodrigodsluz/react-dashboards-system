/* eslint-disable no-console */
import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Typography, LinkButton } from '@d1.cx/components';
import { ArrowLeft, Sync } from '@d1.cx/icons';

import Tooltip from '@material-ui/core/Tooltip';

import SnackAlert from '../../components/SnackAlert';

import { dispatch } from '../../Config/store';

import {
  GenerticColorButton,
  Container,
  Card,
  LogoClient,
  Wrapper,
  LoadingButton,
} from './styles';

import Logo from '../../assets/workflow.png';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [confirmForm, setConfirmForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const INITIAL_ERRORS = {
    email: false,
    pass: false,
    confirmPass: false,
    code: false,
  };
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const MIN_PASSWORD = 6;
  const ERROR_PASSWORD = 'A senha deve ter no mínimo 6 caracteres!';
  const ERROR_CONFIRM_PASSWORD = 'A senha não é igual a digitada anteriormente.';
  const ERROR_CODE = 'Código não pode estar vazio.';

  const history = useHistory();
  const formRef = useRef(null);

  const myEmailChangeHandler = (event) => setEmail(event.target.value);

  const handleChangePassword = useCallback(
    ({ target }) => {
      setPassword(target.value);
    },
    [password],
  );

  const handleChangeConfirmPassword = useCallback(
    ({ target }) => {
      setConfirmPassword(target.value);
    },
    [confirmPassword],
  );

  const handleChangeCode = useCallback(({ target }) => {
    setCode(target.value);
  }, []);

  useEffect(() => {
    formRef.current?.setFieldValue('email', email);
  }, [confirmForm]);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(!openAlert);
  }, [openAlert]);

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

  const handleRecoverPass = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        setLoading(true);
        await dispatch.Auth.forgotPassword({ email });
        setConfirmForm(!confirmForm);
        setMessage('Código de recuperação de senha enviado!');
        setCodeSuccess(true);
      } catch (error) {
        setMessage(
          'Erro ao enviar código! Por favor, verifique seu email e tente novamente.',
        );
        setCodeSuccess(false);
      }
      setOpenAlert(true);
      setLoading(false);
    },
    [email, confirmForm],
  );

  const handleConfirmRecoverPass = useCallback(
    async (event) => {
      try {
        event.preventDefault();
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
        if (code.length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            code: true,
          }));
        }

        await dispatch.Auth.forgotPasswordConfirm({
          email,
          password,
          code,
        });

        history.push('/');
      } catch (err) {
        console.error('Error with ', err);
      }

      setLoading(false);
    },
    [errors, password, confirmPassword, code],
  );

  useEffect(() => {
    comparePasswordInput();
  }, [password, confirmPassword]);

  return (
    <>
      <SnackAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        severity={codeSuccess ? 'success' : 'error'}
        message={message}
      />

      <Container>
        <Card>
          <Wrapper>
            <Tooltip title="voltar">
              <Link to="/">
                <LinkButton>
                  <ArrowLeft width="30px" color="#000" />
                </LinkButton>
              </Link>
            </Tooltip>
            <LogoClient
              alt={process.env.REACT_APP_NAME || 'Workflow'}
              src={process.env.REACT_APP_LOGO || Logo}
            />
          </Wrapper>
          <form
            onSubmit={
              confirmForm ? handleConfirmRecoverPass : handleRecoverPass
            }
          >
            <Input
              value={email}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              required
              placeholder="Digite seu email"
              onChange={myEmailChangeHandler}
              error={errors.email}
            />
            {confirmForm && (
              <>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Digite uma nova senha"
                  required
                  error={errors.pass}
                  value={password}
                  onChange={handleChangePassword}
                  errorMessage={ERROR_PASSWORD}
                />
                <Input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  autoComplete="password"
                  placeholder="Confirme sua nova senha"
                  required
                  error={errors.confirmPass}
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  errorMessage={ERROR_CONFIRM_PASSWORD}
                />
                <Input
                  id="code"
                  name="code"
                  placeholder="Código de verificação"
                  autoComplete="code"
                  required
                  error={errors.code}
                  value={code}
                  onChange={handleChangeCode}
                  errorMessage={ERROR_CODE}
                />
              </>
            )}

            <GenerticColorButton
              type="submit"
              width="100%"
              disabled={errors.pass || errors.confirmPass || errors.code}
            >
              {loading ? (
                <LoadingButton active>
                  <Sync width="20px" color="#fff" />
                </LoadingButton>
              ) : (
                <Typography color="#fff">Recuperar senha</Typography>
              )}
            </GenerticColorButton>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default RecoverPassword;
