/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { runTrigger } from '../../../Config/Api/Template';
import { dispatch } from '../../../Config/store';

const ALERT_SUCESS = 'Tudo pronto! Sua action foi criada com sucesso.';
const ALERT_ERROR = 'Hmmm! Parece que algo deu errado, tente novamente!';
const ALERT_UPDATE = 'Sua action foi atualizada!';
const ALERT_UPDATE_PROD = 'Sua action foi publicada!';
const ALERT_FORMAT_JSON = 'Ops! Remova a virgula caso não houver atributos em seguida.';

function useCode() {
  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );

  const documentJSON = useSelector((state) => state.Template.document);
  const uniqueTemplate = useSelector((state) => state.Template.uniqueTemplate);
  const [showDiagram, setShowDiagram] = useState(false);
  const [templateName, setTemplateName] = useState('custom');
  const [selectedTemplateId, setSelectedTemplateId] = useState('0');
  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');
  const [actionId, setActionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [allTemplatesTriggers, setAllTemplatesTriggers] = useState([]);
  const [code, setCode] = useState(`async function custom(){
  try{

  }catch(err){
        
  }
}`);

  const [productionCode, setProductionCode] = useState('');
  const [showDocuments, setShowDocuments] = useState(true);
  const [run, setRun] = useState(false);
  const [disabledSave, setDisabledSave] = useState(false);

  const [actionBody, setActionBody] = useState('');

  /**
   * @function handleChangeFunctionName
   * @description Altera o valor do nome da função a partir do input
   */

  const handleChangeFunctionName = () => {
    const ace = document.querySelector('.ace_content');
    const functionName = ace?.querySelector('.ace_name');
    if (functionName) {
      functionName.innerHTML = templateName;
    }
  };

  /**
   * @function handleChangeCode
   * @description Altera o valor do código desenvolvido no editor
   */

  const handleChangeCode = useCallback(
    (value) => {
      setCode(value);
    },
    [code],
  );

  /**
   * @function handleChangeTemplateName
   * @description Altera o nome do template
   */

  const handleChangeTemplateName = useCallback(
    ({ target }) => {
      setTemplateName(target.value);
    },
    [templateName],
  );

  /**
   * @function handleGetAll
   * @description Retorna todos os templates disponiveis
   */

  const handleGetAll = useCallback(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
  }, []);

  /**
   * @function handleResetUniqueTemplateAfterExitPage
   * @description Reseta o template ao sair da aba
   */

  const handleResetUniqueTemplateAfterExitPage = async () => {
    await dispatch.Template.resetUnique();
  };

  /**
   * @function handleSetValuesInInputWithSelectedTemplate
   * @description Guarda os valores do codigo de produção, de desenvolvimento
   * e o nome do template
   */

  const handleSetValuesInInputWithSelectedTemplate = useCallback(() => {
    if (uniqueTemplate) {
      const { name, production_code, development_code } = uniqueTemplate.definition;
      setActionId(uniqueTemplate.id);
      setTemplateName(name);
      setProductionCode(production_code);
      setCode(development_code);
    }
  }, [uniqueTemplate]);

  /**
   * @function getOnlyTypeInAllTrigger
   * @description FIltra o template com o tipo desejado
   */

  const getOnlyTypeInAllTrigger = useCallback(
    (type) => {
      if (allTemplates) {
        const trigger = allTemplates.filter(
          (elem) => elem.trigger_type === type,
        );
        setAllTemplatesTriggers(trigger);
      }
    },
    [allTemplates],
  );

  /**
   * @function handleSelectedTemplate
   * @description Altera o valor do select de templates e faz a request com base no id
   */

  const handleSelectedTemplate = useCallback(
    async ({ target }) => {
      setSelectedTemplateId(target.value);
      if (parseInt(target.value, 10) !== 0) {
        setLoading(true);
        const data = { id: parseInt(target.value, 10) };
        await dispatch.Template.getTemplateById(data);

        setLoading(false);
      } else {
        setTemplateName('custom');
        setCode(`async function custom(){
    try{
            
    }catch(err){
                
  }
}`);
      }
    },
    [selectedTemplateId],
  );

  /**
   * @function handleCheckErrors
   * @description Verifica se existem items vazios dentro do objeto de erros
   */

  const handleCheckErrors = (checkErrors) => {
    const keysValues = Object.values(checkErrors);
    const isValid = keysValues.filter((elem) => elem.length === 0);

    if (isValid.length === 0) {
      return true;
    }
    return false;
  };

  /**
   * @function handleShowMessageAlerts
   * @description Altera o tipo e a mensagem do alerta
   */

  const handleShowMessageAlerts = useCallback((typeAlert, message) => {
    setMessageAlert(message);
    setAlertType(typeAlert);
  }, []);

  /**
   * @function handleRemoveAction
   * @description Exclui a action com base no id
   */

  const handleRemoveAction = useCallback(async () => {
    try {
      const data = { id: parseInt(selectedTemplateId, 10) };
      await dispatch.Template.removeTemplateById(data);
      await handleGetAll();
      setCode(`async function custom(){
   try{
        
  }catch(err){    
 }
}`);
    } catch (error) {
      handleShowMessageAlerts('error', ALERT_ERROR);
      setAlertOpen(true);
    }
  }, [selectedTemplateId]);

  /**
   * @function handleOpenDocumentSettings
   * @description Controla a abertura do modal de resposta da action
   */

  const handleOpenDocumentSettings = useCallback(() => {
    setShowDocuments(!showDocuments);
  }, [showDocuments]);

  /**
   * @function handleSubmit
   * @description Responsável por fazer a request de cadastro da nova action
   */

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setLoading(true);
      const fuctionName = /custom/;
      const saveCodeName = code.replace(fuctionName, templateName);

      try {
        if (templateName.length > 0) {
          const data = {
            action: {
              schedule: 0,
              definition: {
                name: templateName,
                development_code: saveCodeName,
                production_code: saveCodeName,
              },
            },
          };
          await dispatch.Template.createTemplateAsync(data);
          await dispatch.Template.loadAllTemplatesAsync();

          handleShowMessageAlerts('success', ALERT_SUCESS);
          setAlertOpen(true);
          setLoading(false);
        } else {
          setDisabledSave(true);
        }
      } catch (e) {
        handleShowMessageAlerts('error', ALERT_ERROR);
        setAlertOpen(true);
      } finally {
        setLoading(false);
        setTemplateName('');
        setCode(`async function custom(){
  try{
               
  }catch(err){    
  }
}`);
      }
    },
    [templateName, code],
  );

  /**
   * @function handleUpdateDevelopmentCode
   * @description Responsável por fazer a request de update da action para desenvolvimendo
   */

  const handleUpdateDevelopmentCode = useCallback(
    async (event) => {
      try {
        event?.preventDefault();
        setLoading(true);
        const olderFunctionName = code.split(' ')[2].split('(')[0];
        const devCode = code.replace(olderFunctionName, templateName);
        if (templateName.length > 0) {
          const data = {
            action: {
              id: actionId,
              schedule: 0,
              definition: {
                name: templateName,
                development_code: devCode,
                production_code: productionCode,
              },
            },
          };
          await dispatch.Template.updateTemplateAsync(data);
          await dispatch.Template.loadAllTemplatesAsync();

          handleShowMessageAlerts('success', ALERT_UPDATE);
          setAlertOpen(true);
          setLoading(false);
        }
      } catch (error) {
        handleShowMessageAlerts('error', ALERT_ERROR);
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [code, templateName, actionId, loading, productionCode],
  );

  /**
   * @function handlePublishProductionCode
   * @description Responsável por fazer a request de update da action para produção
   */

  const handlePublishProductionCode = useCallback(
    async (event) => {
      try {
        event?.preventDefault();
        setLoading(true);
        setLoading(true);
        const olderFunctionName = code.split(' ')[2].split('(')[0];
        const devCode = code.replace(olderFunctionName, templateName);

        if (templateName.length > 0) {
          const data = {
            action: {
              id: actionId,
              schedule: 0,
              definition: {
                name: templateName,
                development_code: devCode,
                production_code: devCode,
              },
            },
          };
          await dispatch.Template.updateTemplateAsync(data);
          await dispatch.Template.loadAllTemplatesAsync();

          handleShowMessageAlerts('success', ALERT_UPDATE_PROD);
          setAlertOpen(true);
          setLoading(false);
        }
      } catch (error) {
        handleShowMessageAlerts('error', ALERT_ERROR);
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [productionCode, templateName, actionId, loading],
  );

  /**
   * @function handleRunTrigger
   * @description Responsável por fazer a request de execução da action
   */

  const handleRunTrigger = useCallback(async () => {
    try {
      setRun(true);

      const documentFormat = JSON.parse(documentJSON);
      const res = await runTrigger({
        document: documentFormat,
        customCode: code,
      });
      const { data } = res;
      setActionBody(data);
    } catch (error) {
      handleShowMessageAlerts('error', ALERT_FORMAT_JSON);
      setAlertOpen(true);
    } finally {
      setRun(false);
    }
  }, [documentJSON, code]);

  /**
   * @function handleActiveSaveButton
   * @description Responsável por desativar o botão de salvar quando não há um nome digitado
   */

  const handleActiveSaveButton = useCallback(() => {
    if (templateName.length > 0) {
      setDisabledSave(false);
    }
  }, [disabledSave, templateName]);

  /**
   * @function handleResetAction
   * @description Responsável por resetar o valor do modal do retorno da action
   */

  const handleResetAction = useCallback(() => {
    setActionBody('');
  }, [actionBody]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleToggleDiagram = useCallback(() => {
    setShowDiagram(!showDiagram);
  }, [showDiagram]);

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    handleResetUniqueTemplateAfterExitPage();
    handleSetValuesInInputWithSelectedTemplate();
  }, [uniqueTemplate]);

  useEffect(() => {
    handleChangeFunctionName();
    handleActiveSaveButton();
  }, [templateName]);

  return {
    allTemplates,
    handleChangeTemplateName,
    allTemplatesTriggers,
    selectedTemplateId,
    templateName,
    handleResetUniqueTemplateAfterExitPage,
    handleSetValuesInInputWithSelectedTemplate,
    handleSelectedTemplate,
    loading,
    getOnlyTypeInAllTrigger,
    handleCheckErrors,
    setLoading,
    handleShowMessageAlerts,
    alertType,
    messageAlert,
    setAlertOpen,
    alertOpen,
    handleChangeCode,
    code,
    productionCode,
    handleRemoveAction,
    handleOpenDocumentSettings,
    showDocuments,
    run,
    handleRunTrigger,
    disabledSave,
    handleSubmit,
    actionBody,
    handleResetAction,
    handleUpdateDevelopmentCode,
    handleCloseAlert,
    handlePublishProductionCode,
    handleToggleDiagram,
    showDiagram,
  };
}

export default useCode;
