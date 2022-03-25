/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Input,
  OutlineButton,
  PrimaryButton,
  Typography,
} from '@d1.cx/components';
import { Chip } from '@material-ui/core';
import {
  Container,
  ContainerButtons,
  Select,
  ContainerSelects,
  Wrapper,
} from './styles';
import useFormTrigger from './useFormTrigger';

const Form = () => {
  const {
    handleTestTrigger,
    password,
    handleChangePassword,
    boxName,
    handleChangeBoxName,
    handleChangeUsername,
    username,
    email,
    handleChangeEmail,
    errors,
    incommingEmail,
    incommingPort,
    outgoingEmail,
    outgoingProtocol,
    outgoingPort,
    handleChangeIncommingPort,
    handleChangeIncommingEmail,
    handleChangeOutgoingPort,
    handleChangeOutgoingEmail,
    handleOutgoingProtocol,
  } = useFormTrigger();

  return (
    <>
      <ContainerButtons>
        <OutlineButton onClick={handleTestTrigger}>Testar</OutlineButton>
        <PrimaryButton>Salvar</PrimaryButton>
      </ContainerButtons>
      <Container>
        <form action="">
          <Typography fontSize="16px" vertical="15px" bold color="#4d4f53">
            Conectar conta de email
          </Typography>

          <Input
            type="text"
            placeholder="Caixa pessoal, caixa da empresa"
            required
            value={boxName}
            onChange={handleChangeBoxName}
            error={errors.boxName}
          />
          <Input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={handleChangeUsername}
            required
            error={errors.username}
          />
          <Input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Digite o email que deseja associar a caixa"
            required
            error={errors.email}
          />
          <Input
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Digite sua senha do email"
            required
            error={errors.password}
          />
          <Typography fontSize="16px" vertical="15px" bold color="#4d4f53">
            Incomming Call
          </Typography>
          <Select disabled>
            <option value="IMAP">IMAP</option>
          </Select>
          <Input
            type="email"
            placeholder="Digite o incoming email server"
            required
            value={incommingEmail}
            error={errors.incommingEmail}
            onChange={handleChangeIncommingEmail}
          />
          <Input
            type="text"
            placeholder="Digite a porta"
            required
            value={incommingPort}
            error={errors.incommingPort}
            onChange={handleChangeIncommingPort}
          />

          <Typography fontSize="16px" vertical="15px" bold color="#4d4f53">
            Outgoing Call
          </Typography>
          <Select onChange={handleOutgoingProtocol} value={outgoingProtocol}>
            <option value="SMTP">SMTP</option>
            <option value="POP3">POP3</option>
          </Select>
          <Input
            type="text"
            placeholder="Digite o incoming email server"
            required
            value={outgoingEmail}
            error={errors.outgoingEmail}
            onChange={handleChangeOutgoingEmail}

          />
          <Input
            type="text"
            placeholder="Digite a porta"
            required
            value={outgoingPort}
            error={errors.outgoingPort}
            onChange={handleChangeOutgoingPort}
          />
        </form>

        <ContainerSelects>
          <Typography fontSize="16px" vertical="15px" bold color="#4d4f53">
            Configuração
          </Typography>

          <Select>
            <option value="IMAP">Selecionar Status</option>
          </Select>
          <Select>
            <option value="IMAP">Selecionar modalidades</option>
          </Select>

          <Wrapper>
            <Chip
              color="primary"
              variant="outlined"
              label="Modalidade 1"
              onDelete={() => {}}
            />
          </Wrapper>
        </ContainerSelects>
      </Container>
    </>
  );
};

export default Form;
