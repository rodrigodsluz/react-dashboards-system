/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Input, Typography, Spacing, FlexContent,
} from '@d1.cx/components';
import { Sync } from '@d1.cx/icons';
import colors from '../../theme/colors';
import { onSignIn, verifyUser } from '../../Auth';

import SnackAlert from '../../components/SnackAlert';

import {
  Container,
  GenerticColorButton,
  LeftColumn,
  LogoClient,
  LoadingButton,
  RightColumn,
} from './styles';

import { dispatch } from '../../Config/store';
import Logo from '../../assets/workflow.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    await dispatch.Filters.clearFilters();
    if (await verifyUser(history, '/')) {
      history.replace('/dashboard');
    }
  }, [history]);

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const myEmailChangeHandler = (event) => setEmail(event.target.value);

  const myPasswordChangeHandler = (event) => setPassword(event.target.value);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const res = await onSignIn(email, password);
        if (res) {
          history.push('/dashboard');
        }
      } catch (error) {
        setOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [email, password],
  );

  return (
    <Container>
      <LeftColumn>
        <div>
          <FlexContent center>
            <LogoClient
              alt={process.env.REACT_APP_NAME || 'Workflow'}
              src={process.env.REACT_APP_LOGO || Logo}
            />
          </FlexContent>
          <form onSubmit={handleLogin}>
            <Input
              value={email}
              required
              name="user"
              autoComplete="user"
              placeholder="Digite seu email"
              autoFocus
              type="email"
              onChange={myEmailChangeHandler}
              data-testid="txtUserEmail"
            />
            <Spacing vertical="5px" />
            <Input
              value={password}
              required
              name="password"
              autoComplete="password"
              placeholder="Digite sua senha"
              autoFocus
              security
              type="password"
              onChange={myPasswordChangeHandler}
              data-testid="txtPassword"
            />
            <Spacing vertical="5px" />
            <GenerticColorButton width="150px" type="submit">
              {loading ? (
                <LoadingButton active>
                  <Sync width="20px" color="#fff" />
                </LoadingButton>
              ) : (
                <Typography center color={colors.textPrimary}>
                  Entrar
                </Typography>
              )}
            </GenerticColorButton>

            <Link to="./recover-password" data-testid="btnEsqueciSenha">
              <Typography
                align="left "
                vertical="15px"
                color={colors.textSecondary}
              >
                Esqueci minha senha
              </Typography>
            </Link>
          </form>
          <SnackAlert
            open={open}
            severity="error"
            message="Usuário não localizado. Por favor, confira seus dados e tente novamente."
            handleClose={handleClose}
          />
        </div>
      </LeftColumn>

      <RightColumn>
        <img
          src="https://campanhasmail.azurewebsites.net/images/smarkio_html/initial.png"
          alt=""
        />
      </RightColumn>
    </Container>
  );
}
