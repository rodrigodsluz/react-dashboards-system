import React, { useCallback, useEffect, useState } from 'react';
import {
  Input,
  Typography,
  PrimaryButton,
  Spacing,
  LinkButton,
  Tooltip,
} from '@d1.cx/components';
import { useSelector, shallowEqual } from 'react-redux';
import { TrashAlt } from '@d1.cx/icons';
import { dispatch } from '../../../Config/store';
import {
  Container, Flex, Form, Option, Row, Select, Textarea,
} from './styles';
import colors from '../../../theme/colors';
import SnackAlert from '../../../components/SnackAlert';
import Modal from '../../../components/Modal';
import ExcludeContent from '../../../components/ExcludeContent';
// import LottieNotification from '../../../components/LottieNotification/LottieNotification';

function CreateSms() {
  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );
  const uniqueTemplate = useSelector((state) => state.Template.uniqueTemplate);
  const [template, setTemplate] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('0');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showAlertLimitCaracteres, setShowAlertLimitCaracteres] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    subject: false,
    message: false,
  });

  const INITIAL = {
    name: false,
    subject: false,
    message: false,
  };

  const ALERT_SUCESS = 'Tudo pronto! Seu sms foi criado com sucesso.';
  const ALERT_WARNING = 'Opa! Todos os campos são obrigatórios!';
  const ALERT_ERROR = 'Hmmm! Parece que algo deu errado, tente novamente!';
  const ALERT_DELETE_SUCESS = 'Seu template foi deletado com sucesso!';
  const ERROR_MESSAGE = 'Hmmmmm! Não é possível enviar um SMS com uma mensagem vazia.';
  const TTILE_MODAL = 'Remover template';
  const MESSAGE_MODAL = 'Deseja deletar o template: ';

  const handleGetAll = useCallback(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
  }, []);

  const getOnlyTypeInAllTrigger = useCallback(() => {
    if (allTemplates) {
      const sms = allTemplates.filter((elem) => elem.trigger_type === 'sms');
      setTemplate(sms);
    }
  }, [allTemplates]);

  const handleSelectedTemplate = useCallback(
    async ({ target }) => {
      setSelectedTemplateId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setLoading(true);
        const data = { id: parseInt(target.value, 10) };
        await dispatch.Template.getTemplateById(data);

        setLoading(false);
      }
    },
    [selectedTemplateId],
  );

  const handleSetValuesInInputWithSelectedTemplate = useCallback(() => {
    if (uniqueTemplate) {
      const {
        name: nameTemplate,
        subject: subjectTemplate,
        message: messageTemplate,
      } = uniqueTemplate.definition;

      setName(nameTemplate);
      setSubject(subjectTemplate);
      setMessage(messageTemplate);
    }
  }, [uniqueTemplate]);

  const handleResetAllInputsAfterSubmit = () => {
    setName('');
    setSubject('');
    setMessage('');
  };

  const handleDeleteTemplate = useCallback(async () => {
    try {
      setAlertOpen(false);
      setLoading(true);
      const data = { id: parseInt(selectedTemplateId, 10) };
      await dispatch.Template.removeTemplateById(data);
      await dispatch.Template.loadAllTemplatesAsync();
      setSelectedTemplateId('0');
      handleResetAllInputsAfterSubmit();
      setAlertType('success');
      setMessageAlert(ALERT_DELETE_SUCESS);
      setAlertOpen(true);
      setLoading(false);
    } catch (error) {
      setAlertType('error');
      setMessageAlert(ALERT_ERROR);
      setAlertOpen(true);
      setLoading(false);
    }
  }, [selectedTemplateId]);

  const handleChangeName = useCallback(
    ({ target }) => {
      setName(target.value);
      if (name.length > 0) {
        setErrors((prev) => ({
          ...prev,
          name: false,
        }));
      }
    },
    [name],
  );

  const handleChangeSubject = useCallback(
    ({ target }) => {
      setSubject(target.value);
      if (subject.length > 0) {
        setErrors((prev) => ({
          ...prev,
          subject: false,
        }));
      }
    },
    [subject],
  );

  const handleChangeMessage = useCallback(
    ({ target }) => {
      setMessage(target.value);
      if (message.length > 0) {
        setErrors((prev) => ({
          ...prev,
          message: false,
        }));
      }
    },
    [message],
  );

  const handleLimitSMS = useCallback(() => {
    setShowAlertLimitCaracteres(message.length > 160);
  }, [message]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setLoading(true);
      try {
        setErrors(INITIAL);
        if (name.length === 0) {
          setErrors((prev) => ({
            ...prev,
            name: true,
          }));
          setLoading(false);
        }

        if (subject.length === 0) {
          setErrors((prev) => ({
            ...prev,
            subject: true,
          }));
          setLoading(false);
        }

        if (message.length === 0) {
          setErrors((prev) => ({
            ...prev,
            message: true,
          }));
          setLoading(false);
        }

        if (name.length > 0 && subject.length > 0 && message.length > 0) {
          const data = {
            sms: {
              schedule: 0,
              definition: {
                name,
                subject,
                message,
              },
            },
          };
          await dispatch.Template.createTemplateAsync(data);
          await dispatch.Template.loadAllTemplatesAsync();
          setAlertType('success');
          setMessageAlert(ALERT_SUCESS);
          setAlertOpen(true);
          setName('');
          setSubject('');
          setMessage('');
          setLoading(false);
        } else {
          setMessageAlert(ALERT_WARNING);
          setAlertType('warning');
          setAlertOpen(true);
        }
      } catch (e) {
        setMessageAlert(ALERT_ERROR);
        setAlertType('error');
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [name, subject, message, errors],
  );

  const handleUptadeExistTemplate = useCallback(
    async (event) => {
      event?.preventDefault();
      setLoading(true);
      try {
        setErrors(INITIAL);
        if (name.length === 0) {
          setErrors((prev) => ({
            ...prev,
            name: true,
          }));
          setLoading(false);
        }

        if (subject.length === 0) {
          setErrors((prev) => ({
            ...prev,
            subject: true,
          }));
          setLoading(false);
        }

        if (message.length === 0) {
          setErrors((prev) => ({
            ...prev,
            message: true,
          }));
          setLoading(false);
        }

        if (name.length > 0 && subject.length > 0 && message.length > 0) {
          const obj = {
            sms: {
              id: parseInt(selectedTemplateId, 10),
              schedule: 0,
              definition: {
                name,
                subject,
                message,
              },
            },
          };
          await dispatch.Template.updateTemplateAsync(obj);
          await dispatch.Template.loadAllTemplatesAsync();
          setAlertType('success');
          setMessageAlert(ALERT_SUCESS);
          setAlertOpen(true);
          setSelectedTemplateId('0');
          handleResetAllInputsAfterSubmit();
          setAlertType('success');
          setLoading(false);
        } else {
          setMessageAlert(ALERT_WARNING);
          setAlertType('warning');
          setAlertOpen(true);
        }
      } catch (e) {
        setMessageAlert(ALERT_ERROR);
        setAlertType('error');
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [name, subject, message, errors, selectedTemplateId],
  );

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    if (message) {
      handleLimitSMS();
    }

    if (message.length === 0) {
      setShowAlertLimitCaracteres(false);
    }
  }, [message]);

  const handleResetUniqueTemplateAfterExitPage = async () => {
    await dispatch.Template.resetUnique();
  };

  useEffect(async () => {
    handleGetAll();
  }, []);

  useEffect(() => {
    getOnlyTypeInAllTrigger();
  }, [allTemplates]);

  useEffect(async () => {
    handleResetUniqueTemplateAfterExitPage();
    handleSetValuesInInputWithSelectedTemplate();
  }, [uniqueTemplate]);

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
      <Flex>
        <div>
          <Row>
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
                  {' '}
                </Tooltip>
              </>
            )}
          </Row>
          <Form>
            <Typography fontSize="20px" bold vertical="15px">
              Nome
            </Typography>
            <Input
              placeholder="Digite o nome para o SMS"
              value={name}
              onChange={handleChangeName}
              error={errors.name}
              required
            />
            <Typography fontSize="20px" bold vertical="15px">
              Assunto
            </Typography>
            <Input
              placeholder="Digite o assunto"
              value={subject}
              onChange={handleChangeSubject}
              error={errors.subject}
              required
            />

            <Typography fontSize="20px" bold vertical="15px">
              Mensagem
            </Typography>
            <Textarea
              placeholder="Digite aqui sua mensagem"
              value={message}
              required
              onChange={handleChangeMessage}
            />
            {errors.message && (
              <Typography fontSize="12px" vertical="15px" color={colors.error}>
                {ERROR_MESSAGE}
              </Typography>
            )}
            {showAlertLimitCaracteres && (
              <Typography fontSize="12px" vertical="15px" color={colors.error}>
                Por padrão, os SMS enviam 160 caracteres por vez. Atente-se ao
                utilizar variaveis.
              </Typography>
            )}
            <Spacing vertical={showAlertLimitCaracteres ? '0px' : '15px'} />
            <PrimaryButton
              onClick={
                parseInt(selectedTemplateId, 10) !== 0
                  ? handleUptadeExistTemplate
                  : handleSubmit
              }
              loading={loading}
              disabled={loading}
            >
              {selectedTemplateId !== '0' ? 'Atualizar SMS' : 'Criar SMS'}
            </PrimaryButton>
          </Form>
        </div>
      </Flex>
      {/* <Flex>
        <Spacing vertical="150px" />

        <LottieNotification
          hiddenBg
          width="380px"
          height="300px"
          animation="conversation"
          description=""
        />
      </Flex> */}
    </Container>
  );
}

export default CreateSms;
