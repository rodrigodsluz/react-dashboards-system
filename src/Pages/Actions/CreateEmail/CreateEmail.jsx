/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
import {
  FlexContent,
  Input,
  LinkButton,
  PrimaryButton,
  Tooltip,
} from '@d1.cx/components';
import { TrashAlt } from '@d1.cx/icons';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import EmailEditor from 'react-email-editor';
import { useSelector, shallowEqual } from 'react-redux';
import { dispatch } from '../../../Config/store';
import SnackAlert from '../../../components/SnackAlert';
import Modal from '../../../components/Modal';
import ExcludeContent from '../../../components/ExcludeContent';
import Initial from './initialDesign.json';
import {
  Container, Option, Row, Select,
} from './styles';

function CreateEmail() {
  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );

  const uniqueTemplate = useSelector((state) => state.Template.uniqueTemplate);
  const emailEditorRef = useRef(null);
  const [allTemplateEmails, setAllTemplateEmails] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('0');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    subject: false,
  });

  const TTILE_MODAL = 'Remover template';
  const MESSAGE_MODAL = 'Deseja deletar o template: ';

  const ALERT_SUCESS = 'Tudo pronto! Seu template foi criado com sucesso.';
  const ALERT_SUCESS_UPDATE = 'Show! Seu template foi atualizado com sucesso.';
  const ALERT_ERROR = 'Hmmm! Parece que algo deu errado, tente novamente!';
  const ALERT_DELETE_SUCESS = 'Seu template foi deletado com sucesso!';

  const handleChangeTemplateName = useCallback(
    ({ target }) => {
      setTemplateName(target.value);
      if (target.value.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          name: false,
        }));
      }
    },
    [templateName],
  );
  const handleChangeSubjectName = useCallback(
    ({ target }) => {
      setSubjectName(target.value);
      if (target.value.length > 0) {
        setErrors((prevState) => ({
          ...prevState,
          subject: false,
        }));
      }
    },
    [subjectName],
  );

  const handleUptadeExistTemplate = useCallback(
    async (design, html, id) => {
      const obj = {
        email: {
          id,
          schedule: 0,
          definition: {
            name: templateName,
            subject: subjectName,
            html,
            design,
          },
        },
      };
      await dispatch.Template.updateTemplateAsync(obj);
      await dispatch.Template.loadAllTemplatesAsync();
      emailEditorRef.current?.editor.loadDesign(Initial);
      setSelectedTemplateId('0');
      setTemplateName('');
      setSubjectName('');
      setAlertType('success');
      setMessageAlert(ALERT_SUCESS_UPDATE);
      setAlertOpen(true);
      setLoading(false);
    },
    [selectedTemplateId, templateName, subjectName],
  );

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      setLoading(true);

      if (templateName.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          name: true,
        }));
        setLoading(false);
      }
      if (subjectName.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          subject: true,
        }));
        setLoading(false);
      }
      if (templateName.length > 0 && subjectName.length > 0) {
        const obj = {
          email: {
            schedule: 0,
            definition: {
              name: templateName,
              subject: subjectName,
              html,
              design,
            },
          },
        };

        if (parseInt(selectedTemplateId, 10) !== 0) {
          handleUptadeExistTemplate(
            design,
            html,
            parseInt(selectedTemplateId, 10),
          );
          return;
        }

        await dispatch.Template.createTemplateAsync(obj);
        await dispatch.Template.loadAllTemplatesAsync();
        emailEditorRef.current?.editor.loadDesign(Initial);
        setTemplateName('');
        setSubjectName('');
        setAlertType('success');
        setMessageAlert(ALERT_SUCESS);
        setAlertOpen(true);
        setLoading(false);
      }
    });
  };

  const onLoad = useCallback(() => {
    if (emailEditorRef) {
      emailEditorRef.current?.editor.loadDesign(Initial);
    }
  }, [emailEditorRef]);

  const handleSelectedTemplate = useCallback(
    async ({ target }) => {
      setSelectedTemplateId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setLoading(true);
        const data = { id: parseInt(target.value, 10) };
        await dispatch.Template.getTemplateById(data);

        setLoading(false);
      } else {
        emailEditorRef.current.editor.loadDesign(Initial);
        setTemplateName('');
        setSubjectName('');
      }
    },
    [selectedTemplateId],
  );
  const handleSetValuesInInputWithSelectedTemplate = useCallback(() => {
    if (uniqueTemplate) {
      const { name, subject, design } = uniqueTemplate.definition;
      setTemplateName(name);
      setSubjectName(subject);
      emailEditorRef.current.editor.loadDesign(design);
    }
  }, [uniqueTemplate]);

  const handleDeleteTemplate = useCallback(async () => {
    try {
      setAlertOpen(false);
      const data = { id: parseInt(selectedTemplateId, 10) };
      await dispatch.Template.removeTemplateById(data);
      await dispatch.Template.loadAllTemplatesAsync();
      emailEditorRef.current?.editor.loadDesign(Initial);
      setTemplateName('');
      setSubjectName('');
      setAlertType('success');
      setMessageAlert(ALERT_DELETE_SUCESS);
      setAlertOpen(true);
      setSelectedTemplateId('0');
    } catch (error) {
      setAlertType('error');
      setMessageAlert(ALERT_ERROR);
      setAlertOpen(true);
    }
  }, [selectedTemplateId]);

  const getOnlyTypeInAllTrigger = useCallback(() => {
    if (allTemplates) {
      const emails = allTemplates.filter(
        (elem) => elem.trigger_type === 'email',
      );
      setAllTemplateEmails(emails);
    }
  }, [allTemplates]);

  const handleGetAll = useCallback(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleResetUniqueTemplateAfterExitPage = async () => {
    await dispatch.Template.resetUnique();
  };
  useEffect(async () => {
    handleGetAll();
  }, []);

  useEffect(async () => {
    handleResetUniqueTemplateAfterExitPage();
    handleSetValuesInInputWithSelectedTemplate();
  }, [uniqueTemplate]);

  useEffect(() => {
    getOnlyTypeInAllTrigger();
  }, [allTemplates]);

  return (
    <div>
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
          content={(
            <ExcludeContent
              messageOne={MESSAGE_MODAL}
              messageTwo={templateName}
            />
          )}
        />
        <FlexContent spaceBetween>
          <Row>
            <Input
              value={templateName}
              onChange={handleChangeTemplateName}
              placeholder="Nome do template"
              disabled={loading}
              error={errors.name}
              errorMessage="Esse campo não pode ser vazio."
            />
            <Input
              value={subjectName}
              onChange={handleChangeSubjectName}
              placeholder="Assunto"
              disabled={loading}
              error={errors.subject}
              errorMessage="Esse campo não pode ser vazio."
            />
          </Row>
          <Select
            name="select-template"
            id="template"
            onChange={handleSelectedTemplate}
            value={selectedTemplateId}
          >
            <Option value="0">Selecionar um template</Option>

            {allTemplateEmails
              && allTemplateEmails?.map((template) => (
                <Option key={template.id} value={template.id.toString()}>
                  {template.definition.name}
                </Option>
              ))}
          </Select>
          <Row>
            {selectedTemplateId !== '0' && (
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

            <PrimaryButton
              onClick={exportHtml}
              disabled={loading}
              loading={loading}
            >
              {parseInt(selectedTemplateId, 10) !== 0
                ? 'Atualizar HTML '
                : 'Salvar HTML'}
            </PrimaryButton>
          </Row>
        </FlexContent>
      </Container>
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        style={{ height: '80vh' }}
        appearance={{ theme: 'dark' }}
      />
    </div>
  );
}

export default CreateEmail;
