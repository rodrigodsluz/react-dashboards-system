import React from 'react';
import {
  Input,
  LinkButton,
  OutlineButton,
  PrimaryButton,
  Tooltip,
  Typography,
} from '@d1.cx/components';
import { TrashAlt, Envelope, Mobile } from '@d1.cx/icons';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import SnackAlert from '../../../../components/SnackAlert';
import Modal from '../../../../components/Modal';
import ExcludeContent from '../../../../components/ExcludeContent';
import Card from './components/Card';
import {
  Container,
  ContainerButtons,
  Select,
  Row,
  WrapperCards,
} from './styles';
import useTrigger from './useTrigger';

const Trigger = () => {
  const allConnections = useSelector(
    (state) => state.Connection.allConnections,
  );
  const {
    clientID,
    clientSecret,
    endPoint,
    name,
    platform,
    tenentId,
    jouneyEmail,
    journeySms,
    isEditing,
    handleChangeClientID,
    handleChangeClientSecret,
    handleChangeEndPoint,
    handleChangeName,
    handleTestTrigger,
    handleChangePlataform,
    handleChangeTenentId,
    handleChangeJourneyEmail,
    handleChangeJourneySms,
    handleUpdate,
    handleSubmit,
    openNotification,
    handleCloseNotification,
    handleSelectedTemplate,
    selectedTemplateId,
    openModal,
    message,
    errors,
    errorAPI,
    loading,
    handleCloseModal,
    handleDeleteTemplate,
    handleOpenModal,
    handleChangePhone,
    phone,
    handleActive,
    isActive,
  } = useTrigger();
  const TTILE_MODAL = 'Remover template';
  const MESSAGE_MODAL = 'Deseja deletar o template: ';

  return (
    <Container>
      <SnackAlert
        open={openNotification}
        handleClose={handleCloseNotification}
        severity={errorAPI ? 'error' : 'success'}
        message={message}
      />
      <Modal
        title={TTILE_MODAL}
        open={openModal}
        handleClose={handleCloseModal}
        confirm={handleDeleteTemplate}
        content={
          <ExcludeContent messageOne={MESSAGE_MODAL} messageTwo={name} />
        }
      />
      <div>
        <Typography fontSize="16px" vertical="15px" bold color="#B1B5C3">
          Configuração do disparador
        </Typography>

        <Row>
          <Select onChange={handleSelectedTemplate} value={selectedTemplateId}>
            <option value="0">Selecionar disparador</option>
            {allConnections?.map((connection) => (
              <option value={connection.id}>{connection.client_name}</option>
            ))}
          </Select>
          {selectedTemplateId !== '0' && name !== '' && (
            <>
              {' '}
              <Tooltip content="Remover template" top whiteSpace>
                <LinkButton onClick={handleOpenModal} data-testid="trash-icon">
                  <TrashAlt color="red" width="25px" />
                </LinkButton>
                {' '}
              </Tooltip>
            </>
          )}
        </Row>
        <Typography fontSize="16px" vertical="15px" bold color="#B1B5C3">
          Adicionar um novo disparador
        </Typography>
        <Input
          type="text"
          placeholder="Digite o nome do disparador"
          required
          value={name}
          onChange={handleChangeName}
          error={errors.name}
        />
        <Input
          type="text"
          placeholder="Digite o nome da plataforma"
          required
          value={platform}
          onChange={handleChangePlataform}
          error={errors.platform}
        />
        <Input
          type="text"
          placeholder="Digite o Client ID"
          required
          value={clientID}
          onChange={handleChangeClientID}
          error={errors.clientID}
        />
        <Input
          type="text"
          placeholder="Digite o Client Secret"
          required
          value={clientSecret}
          onChange={handleChangeClientSecret}
          error={errors.clientSecret}
        />
        <Input
          type="text"
          placeholder="Digite o EndPoint"
          value={endPoint}
          onChange={handleChangeEndPoint}
          error={errors.endPoint}
        />
        <Input
          type="text"
          placeholder="Digite o Tenant Id"
          required
          value={tenentId}
          onChange={handleChangeTenentId}
          error={errors.tenentId}
        />
        <Input
          type="text"
          placeholder="Digite o Journey ID Email"
          required
          value={jouneyEmail}
          onChange={handleChangeJourneyEmail}
          error={errors.jouneyEmail}
        />
        <Input
          type="text"
          placeholder="Digite o Journey ID SMS"
          required
          value={journeySms}
          onChange={handleChangeJourneySms}
          error={errors.journeySms}
        />

        {isEditing && (
          <>
            {isActive === 'SMS' && (

            <InputMask
              mask="(99) 9 9999-9999"
              value={phone || ''}
              maskChar={null}
              onChange={handleChangePhone}
            >
              {() => (
                <Input
                  type="tel"
                  placeholder="Digite o número do telefone para receber o sms"
                  required
                />
              )}
            </InputMask>
            )}

            <Typography fontSize="16px" vertical="15px" bold color="#B1B5C3">
              Disparar por:
            </Typography>
            <WrapperCards>
              <Card
                name="Email"
                icon={<Envelope color="green" width={33} />}
                handleActive={handleActive}
                isActive={isActive}
              />
              <Card
                name="SMS"
                icon={<Mobile color="purple" width={33} />}
                handleActive={handleActive}
                isActive={isActive}
              />
            </WrapperCards>
          </>
        )}
        <ContainerButtons>
          {isEditing && ((jouneyEmail && isActive === 'Email') || (journeySms && isActive === 'SMS')) && (
            <OutlineButton
              disabled={loading}
              loading={loading}
              onClick={handleTestTrigger}
            >
              Testar
            </OutlineButton>
          )}
          <PrimaryButton
            disabled={loading}
            loading={loading}
            onClick={isEditing ? handleUpdate : handleSubmit}
          >
            {isEditing ? 'Atualizar' : 'Criar'}
          </PrimaryButton>
        </ContainerButtons>
      </div>
    </Container>
  );
};

export default Trigger;
