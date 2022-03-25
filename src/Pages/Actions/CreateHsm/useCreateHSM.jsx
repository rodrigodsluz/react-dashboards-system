/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { dispatch } from '../../../Config/store';

const useCreateHsm = () => {
  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );
  const uniqueTemplate = useSelector((state) => state.Template.uniqueTemplate);
  const [template, setTemplate] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('0');
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [richTemplateName, setRichTemplateName] = useState('');
  const [url, setUrl] = useState('');
  const [auth, setAuth] = useState('');

  const [richTemplateVariableKey, setRichTemplateVariableKey] = useState('');
  const [richTemplateVariableValue, setRichTemplateVariableValue] = useState('');
  const [richTemplateIndex, setRichTemplateIndex] = useState(0);
  const [richTemplateVariables, setRichTemplateVariables] = useState([
    {
      key: '1',
      value: '',
    },
  ]);

  const [contextKey, setContextKey] = useState('');
  const [contextValue, setContextValue] = useState('');
  const [context, setContext] = useState([
    {
      key: '',
      value: '',
    },
  ]);

  const [extrasKeys, setExtrasKeys] = useState('');
  const [extrasValues, setExtrasValues] = useState('');
  const [extras, setExtras] = useState([
    {
      key: '',
      value: '',
    },
  ]);

  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    name: false,
    skills: false,
    richTemplateName: false,
    url: false,
    auth: false,
  });

  const INITIAL = {
    name: false,
    skills: false,
    richTemplateName: false,
    url: false,
    auth: false,
  };

  const ALERT_SUCESS = 'Tudo pronto! Seu hsm foi criado com sucesso.';
  const ALERT_WARNING = 'Opa! Todos os campos são obrigatórios!';
  const ALERT_ERROR = 'Hmmm! Parece que algo deu errado, tente novamente!';
  const ALERT_SUCESS_UPDATE = 'Tudo certo! Seu hsm foi atualizado com sucesso.';
  const ALERT_DELETE_SUCESS = 'Seu template foi deletado com sucesso!';
  const TTILE_MODAL = 'Remover template';
  const MESSAGE_MODAL = 'Deseja deletar o template: ';

  const handleGetAll = useCallback(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
  }, []);

  const getOnlyTypeInAllTrigger = useCallback(() => {
    if (allTemplates) {
      const sms = allTemplates.filter((elem) => elem.trigger_type === 'hsm');
      setTemplate(sms);
    }
  }, [allTemplates]);

  const handleResetAllInputsAfterSubmit = () => {
    setName('');
    setSkills('');
    setRichTemplateName('');
    setUrl('');
    setAuth('');
    setRichTemplateVariables([
      {
        key: '1',
        value: '',
      },
    ]);

    setContext([
      {
        key: '',
        value: '',
      },
    ]);

    setExtras([
      {
        key: '',
        value: '',
      },
    ]);
  };

  const handleSelectedTemplate = useCallback(
    async ({ target }) => {
      setSelectedTemplateId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setErrors(INITIAL);
        setLoading(true);
        const data = { id: parseInt(target.value, 10) };
        await dispatch.Template.getTemplateById(data);

        setLoading(false);
      } else {
        setStep(1);
        handleResetAllInputsAfterSubmit();
      }
    },
    [selectedTemplateId, step],
  );

  const handleFormatRequestToArray = useCallback(
    (data) => {
      const objectArray = Object.entries(data);
      return objectArray.map(([key, value]) => ({
        key,
        value,
      }));
    },
    [uniqueTemplate],
  );

  const handleSetValuesInInputWithSelectedTemplate = useCallback(() => {
    if (uniqueTemplate) {
      const {
        authorization,
        context: contextTemplate,
        extra_variables,
        name: nameTemplate,
        rich_template_name,
        rich_template_variables,
        skill,
        url: urlTemplate,
      } = uniqueTemplate.definition;

      setAuth(authorization);
      setName(nameTemplate);
      setSkills(skill);
      setRichTemplateName(rich_template_name);
      setUrl(urlTemplate);

      const arrayRich = handleFormatRequestToArray(rich_template_variables);
      const arrayContext = handleFormatRequestToArray(contextTemplate);
      const arrayExtras = handleFormatRequestToArray(extra_variables);
      setRichTemplateVariables(arrayRich);
      setContext(arrayContext);
      setExtras(arrayExtras);
    }
  }, [uniqueTemplate]);

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

  const handleChangeskills = useCallback(
    ({ target }) => {
      setSkills(target.value);
      if (skills.length > 0) {
        setErrors((prev) => ({
          ...prev,
          skills: false,
        }));
      }
    },
    [skills],
  );

  const handleChangeRichTemplateNames = useCallback(
    ({ target }) => {
      setRichTemplateName(target.value);
      if (richTemplateName.length > 0) {
        setErrors((prev) => ({
          ...prev,
          richTemplateName: false,
        }));
      }
    },
    [richTemplateName],
  );

  const handleChangeUrl = useCallback(
    ({ target }) => {
      setUrl(target.value);
      if (url.length > 0) {
        setErrors((prev) => ({
          ...prev,
          url: false,
        }));
      }
    },
    [url],
  );

  const handleChangeAuth = useCallback(
    ({ target }) => {
      setAuth(target.value);
      if (auth.length > 0) {
        setErrors((prev) => ({
          ...prev,
          auth: false,
        }));
      }
    },
    [auth],
  );

  const handleCheckErrors = () => {
    const check = {
      name,
      skills,
      richTemplateName,
      url,
      auth,
    };
    const keysValues = Object.values(check);
    const isValid = keysValues.filter((elem) => elem.length === 0);

    if (isValid.length === 0) {
      return true;
    }
    return false;
  };

  const handlePreviousStep = useCallback(() => {
    setStep(1);
  }, [step]);

  const handleNextStep = useCallback(() => {
    if (name.length === 0) {
      setErrors((prev) => ({
        ...prev,
        name: true,
      }));
      setLoading(false);
    }

    if (skills.length === 0) {
      setErrors((prev) => ({
        ...prev,
        skills: true,
      }));
      setLoading(false);
    }

    if (richTemplateName.length === 0) {
      setErrors((prev) => ({
        ...prev,
        richTemplateName: true,
      }));
      setLoading(false);
    }

    if (url.length === 0) {
      setErrors((prev) => ({
        ...prev,
        url: true,
      }));
      setLoading(false);
    }

    if (auth.length === 0) {
      setErrors((prev) => ({
        ...prev,
        auth: true,
      }));
      setLoading(false);
    }

    const isValid = handleCheckErrors();

    if (isValid) {
      setStep(2);
    }
  }, [step, errors, name, url, auth, richTemplateName, skills]);

  const handleCloseNotification = useCallback(() => {
    if (alertOpen) {
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }
  }, [alertOpen]);

  const handleFormatArrayToKeyValue = useCallback(
    (data) => data.reduce((elem, item) => {
      if (item.value !== '') {
        elem[item.key] = item.value;
      }
      return elem;
    }, {}),
    [richTemplateVariables, context, extras],
  );

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setLoading(true);

      const richsArray = handleFormatArrayToKeyValue(richTemplateVariables);
      const contextArray = handleFormatArrayToKeyValue(context);
      const extrasArray = handleFormatArrayToKeyValue(extras);

      try {
        setErrors(INITIAL);

        if (name.length > 0 && skills.length > 0) {
          const data = {
            hsm: {
              schedule: 0,
              definition: {
                name,
                skill: skills,
                rich_template_name: richTemplateName,
                rich_template_variables: richsArray,
                context: contextArray,
                url,
                authorization: auth,
                extra_variables: extrasArray,
              },
            },
          };

          await dispatch.Template.createTemplateAsync(data);
          handleResetAllInputsAfterSubmit();
          setAlertType('success');
          setMessageAlert(ALERT_SUCESS);
          setAlertOpen(true);
          setLoading(false);

          setStep(1);
          setSelectedTemplateId('0');
          handleGetAll();
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
        handleCloseNotification();
      }
    },
    [
      name,
      skills,
      errors,
      richTemplateVariables,
      richTemplateName,
      auth,
      url,
      context,
      extras,
    ],
  );

  const handleUptadeExistTemplate = useCallback(
    async (event) => {
      event?.preventDefault();
      setLoading(true);
      const richsArray = handleFormatArrayToKeyValue(richTemplateVariables);
      const contextArray = handleFormatArrayToKeyValue(context);
      const extrasArray = handleFormatArrayToKeyValue(extras);
      const obj = {
        hsm: {
          schedule: 0,
          id: parseInt(selectedTemplateId, 10),
          definition: {
            name,
            skill: skills,
            rich_template_name: richTemplateName,
            rich_template_variables: richsArray,
            context: contextArray,
            url,
            authorization: auth,
            extra_variables: extrasArray,
          },
        },
      };
      await dispatch.Template.updateTemplateAsync(obj);
      await dispatch.Template.loadAllTemplatesAsync();
      setSelectedTemplateId('0');
      handleResetAllInputsAfterSubmit();
      setAlertType('success');
      setStep(1);
      setMessageAlert(ALERT_SUCESS_UPDATE);
      setAlertOpen(true);
      setLoading(false);
    },
    [
      selectedTemplateId,
      name,
      skills,
      errors,
      richTemplateVariables,
      richTemplateName,
      auth,
      url,
      context,
      extras,
    ],
  );

  const handleDeleteTemplate = useCallback(async () => {
    try {
      setLoading(true);
      setAlertOpen(false);
      const data = { id: parseInt(selectedTemplateId, 10) };
      await dispatch.Template.removeTemplateById(data);
      await dispatch.Template.loadAllTemplatesAsync();
      setSelectedTemplateId('0');
      handleResetAllInputsAfterSubmit();
      setAlertType('success');
      setMessageAlert(ALERT_DELETE_SUCESS);
      setAlertOpen(true);
      setLoading(false);
      setStep(1);
    } catch (error) {
      setAlertType('error');
      setMessageAlert(ALERT_ERROR);
      setAlertOpen(true);
      setLoading(false);
    }
  }, [selectedTemplateId, step]);

  const handleChangeRichTemplateVariablesKey = useCallback(
    ({ target }, index) => {
      setRichTemplateIndex(index);
      const item = [...richTemplateVariables];
      item[index].key = target.value;
      setRichTemplateVariableKey(target.value);
    },
    [richTemplateVariableKey, richTemplateVariables],
  );

  const handleChangeRichTemplateVariablesValue = useCallback(
    ({ target }, index) => {
      setRichTemplateIndex(index);
      const item = [...richTemplateVariables];
      item[index].value = target.value;
      setRichTemplateVariableValue(target.value);
    },
    [richTemplateVariableValue, richTemplateVariables],
  );

  const handleAddRichTemplateVariable = useCallback(() => {
    setRichTemplateIndex(richTemplateIndex + 1);

    const item = {
      key: (richTemplateVariables.length + 1).toString(),
      value: '',
    };

    setRichTemplateVariables([...richTemplateVariables, item]);
  }, [richTemplateVariables, richTemplateIndex]);

  const handleRemoveRichTemplateVariables = useCallback(
    (index) => {
      const item = [...richTemplateVariables];
      item.splice(index, 1);
      setRichTemplateVariables(item);
    },
    [richTemplateVariables],
  );

  const handleChangeContextKey = useCallback(
    ({ target }, index) => {
      const item = [...context];
      item[index].key = target.value;
      setContextKey(target.value);
    },
    [contextKey, context],
  );

  const handleChangeContextValue = useCallback(
    ({ target }, index) => {
      const item = [...context];
      item[index].value = target.value;
      setContextValue(target.value);
    },
    [contextValue, context],
  );

  const handleAddContext = useCallback(() => {
    const item = {
      key: '',
      value: '',
    };

    setContext([...context, item]);
  }, [context]);

  const handleRemoveContext = useCallback(
    (index) => {
      const item = [...context];
      item.splice(index, 1);
      setContext(item);
    },
    [context],
  );

  const handleChangeExtraKey = useCallback(
    ({ target }, index) => {
      const item = [...extras];
      item[index].key = target.value;
      setExtrasKeys(target.value);
    },
    [extrasKeys, extras],
  );

  const handleChangeExtrasValues = useCallback(
    ({ target }, index) => {
      const item = [...extras];
      item[index].value = target.value;
      setExtrasValues(target.value);
    },
    [extrasValues, extras],
  );

  const handleAddExtras = useCallback(() => {
    const item = {
      key: '',
      value: '',
    };

    setExtras([...extras, item]);
  }, [extras]);

  const handleRemoveExtras = useCallback(
    (index) => {
      const item = [...extras];
      item.splice(index, 1);
      setExtras(item);
    },
    [extras],
  );

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleResetUniqueTemplateAfterExitPage = async () => {
    await dispatch.Template.resetUnique();
  };

  const disabledInputWhenEmptyInputs = () => {
    if (
      richTemplateVariables.length === 0
      && context.length === 0
      && extras.length === 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
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

  useEffect(() => {
    disabledInputWhenEmptyInputs();
  }, [richTemplateVariables, context, extras]);

  return {
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
  };
};

export default useCreateHsm;
