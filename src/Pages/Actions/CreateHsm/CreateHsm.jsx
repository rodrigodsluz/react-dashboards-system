/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Input,
  Typography,
  PrimaryButton,
  FlexContent,
  LinkButton,
  Steps,
  Spacing,
  Tooltip,
} from '@d1.cx/components';
import { TrashAlt, PlusCircle } from '@d1.cx/icons';
import {
  Click,
  Container,
  Form,
  Option,
  Row,
  Select,
  Wrapper,
  WrapperSelect,
} from './styles';
import SnackAlert from '../../../components/SnackAlert';
import KeyInput from '../../../components/KeyInput/KeyInput';
import colors from '../../../theme/colors';
import Modal from '../../../components/Modal';
import ExcludeContent from '../../../components/ExcludeContent';
// import LottieNotification from '../../../components/LottieNotification/LottieNotification';
import useCreateHsm from './useCreateHSM';

function CreateHsm() {
  const {
    alertOpen,
    handleCloseAlert,
    alertType,
    messageAlert,
    TTILE_MODAL,
    openModal,
    handleCloseModal,
    handleDeleteTemplate,
    MESSAGE_MODAL,
    name,
    handleSelectedTemplate,
    selectedTemplateId,
    template,
    handleOpenModal,
    step,
    handleChangeName,
    errors,
    skills,
    handleChangeskills,
    richTemplateName,
    handleChangeRichTemplateNames,
    url,
    handleChangeUrl,
    auth,
    handleChangeAuth,
    handleNextStep,
    handlePreviousStep,
    setDisabled,
    disabled,
    handleAddRichTemplateVariable,
    richTemplateVariables,
    handleChangeRichTemplateVariablesKey,
    handleChangeRichTemplateVariablesValue,
    handleRemoveRichTemplateVariables,
    handleAddContext,
    context,
    handleChangeContextKey,
    handleChangeContextValue,
    handleRemoveContext,
    handleAddExtras,
    extras,
    handleChangeExtraKey,
    handleChangeExtrasValues,
    handleUptadeExistTemplate,
    handleRemoveExtras,
    handleSubmit,
    loading,
  } = useCreateHsm();

  return (
    <Container>
      <SnackAlert
        open={alertOpen}
        handleClose={handleCloseAlert}
        severity={alertType}
        message={messageAlert}
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

      <Spacing vertical="10px" />
      <WrapperSelect>
        <Select
          name="select-template"
          id="template"
          onChange={handleSelectedTemplate}
          value={selectedTemplateId}
        >
          <Option value="0">Selecionar um template</Option>

          {template
            && template?.map((hsm) => (
              <Option key={hsm.id} value={hsm.id.toString()}>
                {hsm.definition.name}
              </Option>
            ))}
        </Select>
        {selectedTemplateId !== '0' && name !== '' && (
          <>
            {' '}
            <Tooltip content="Remover template" top whiteSpace>
              <LinkButton onClick={handleOpenModal}>
                <TrashAlt color="red" width="25px" />
              </LinkButton>
            </Tooltip>
          </>
        )}
        <Steps
          data={[
            { title: 'Passo 1', description: 'Configuração inicial' },
            { title: 'Passo 2', description: 'Configuração de variaveis' },
          ]}
          indexActive={step}
          inline
        />
      </WrapperSelect>

      <Form>
        {step === 1 ? (
          <>
            <Spacing vertical="15px" />
            <Typography fontSize="20px" bold vertical="15px">
              Nome
            </Typography>
            <Input
              placeholder="Digite o nome para o HSM"
              value={name}
              onChange={handleChangeName}
              error={errors.name}
              required
            />
            <Typography fontSize="20px" bold vertical="15px">
              Habilidade
            </Typography>
            <Input
              placeholder="Digite a habilidade"
              value={skills}
              onChange={handleChangeskills}
              error={errors.skills}
              required
            />
            <Typography fontSize="20px" bold vertical="15px">
              Rich template name
            </Typography>
            <Input
              placeholder="Digite o rich template name"
              value={richTemplateName}
              onChange={handleChangeRichTemplateNames}
              error={errors.richTemplateName}
              required
            />
            <Typography fontSize="20px" bold vertical="15px">
              URL
            </Typography>
            <Input
              placeholder="Digite a url"
              value={url}
              onChange={handleChangeUrl}
              error={errors.url}
              required
            />
            <Typography fontSize="20px" bold vertical="15px">
              Autenticação
            </Typography>
            <Input
              placeholder="Digite a autenticação"
              value={auth}
              onChange={handleChangeAuth}
              error={errors.auth}
              required
            />
            <PrimaryButton onClick={handleNextStep}>Próximo</PrimaryButton>
          </>
        ) : (
          <>
            {' '}
            <LinkButton onClick={handlePreviousStep}>Voltar</LinkButton>
            <FlexContent spaceBetween>
              <Typography fontSize="20px" bold vertical="15px">
                Rich template variables
              </Typography>
              <LinkButton onClick={() => setDisabled(!disabled)}>
                <Typography fontSize="14px" vertical="15px" horizontal="10px">
                  {disabled ? 'Habilitar edição' : 'Desabilitar edição'}
                </Typography>
              </LinkButton>
              <LinkButton onClick={handleAddRichTemplateVariable}>
                <Row>
                  <Typography
                    fontSize="20px"
                    bold
                    vertical="15px"
                    horizontal="10px"
                  >
                    Novo
                  </Typography>
                  <PlusCircle width="20px" color={colors.details} />
                </Row>
              </LinkButton>
            </FlexContent>
            <Wrapper>
              {richTemplateVariables?.map((input, index) => (
                <Row>
                  <KeyInput
                    testId="rich"
                    disabled={disabled}
                    key={index}
                    inputKey={input.key}
                    inputValue={input.value}
                    changeInputKey={(e) => {
                      handleChangeRichTemplateVariablesKey(e, index);
                    }}
                    changeInputValue={(e) => {
                      handleChangeRichTemplateVariablesValue(e, index);
                    }}
                  />
                  <Click
                    onClick={() => handleRemoveRichTemplateVariables(index)}
                  >
                    <TrashAlt width="30px" color="red" />
                  </Click>
                </Row>
              ))}
            </Wrapper>
            <FlexContent spaceBetween>
              <Typography fontSize="20px" bold vertical="15px">
                Contexto
              </Typography>

              <LinkButton onClick={handleAddContext}>
                <Row>
                  <Typography
                    fontSize="20px"
                    bold
                    vertical="15px"
                    horizontal="10px"
                  >
                    Novo
                  </Typography>
                  <PlusCircle width="20px" color={colors.details} />
                </Row>
              </LinkButton>
            </FlexContent>
            <Wrapper>
              {context.map((input, index) => (
                <Row>
                  <KeyInput
                    testId="context"
                    key={index}
                    inputKey={input.key}
                    inputValue={input.value}
                    changeInputKey={(e) => {
                      handleChangeContextKey(e, index);
                    }}
                    changeInputValue={(e) => {
                      handleChangeContextValue(e, index);
                    }}
                  />
                  <Click onClick={() => handleRemoveContext(index)}>
                    <TrashAlt width="30px" color="red" />
                  </Click>
                </Row>
              ))}
            </Wrapper>
            <FlexContent spaceBetween>
              <Typography fontSize="20px" bold vertical="15px">
                Extras
              </Typography>

              <LinkButton onClick={handleAddExtras}>
                <Row>
                  <Typography
                    fontSize="20px"
                    bold
                    vertical="15px"
                    horizontal="10px"
                  >
                    Novo
                  </Typography>
                  <PlusCircle width="20px" color={colors.details} />
                </Row>
              </LinkButton>
            </FlexContent>
            <Wrapper>
              {extras.map((input, index) => (
                <Row>
                  <KeyInput
                    testId="extras"
                    key={index}
                    inputKey={input.key}
                    inputValue={input.value}
                    changeInputKey={(e) => {
                      handleChangeExtraKey(e, index);
                    }}
                    changeInputValue={(e) => {
                      handleChangeExtrasValues(e, index);
                    }}
                  />
                  <Click onClick={() => handleRemoveExtras(index)}>
                    <TrashAlt width="30px" color="red" />
                  </Click>
                </Row>
              ))}
            </Wrapper>
            <PrimaryButton
              onClick={
                parseInt(selectedTemplateId, 10) !== 0
                  ? handleUptadeExistTemplate
                  : handleSubmit
              }
              loading={loading}
              disabled={loading || disabled}
            >
              {parseInt(selectedTemplateId, 10) !== 0
                ? 'Atualizar HSM '
                : 'Salvar HSM'}
            </PrimaryButton>
          </>
        )}
      </Form>
    </Container>
  );
}

export default CreateHsm;
