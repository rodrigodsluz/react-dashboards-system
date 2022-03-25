/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, Typography, Spacing } from '@d1.cx/components';

import { useSelector, shallowEqual } from 'react-redux';
import { Container, Card, Wrapper } from './styles';
import SnackAlert from '../../../../../components/SnackAlert/index';
import { dispatch } from '../../../../../Config/store';

function AssociateStatus() {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );
  const allStatusByProducts = useSelector((state) => state.Status.allState);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [selectedTemplate, setSelectedTemplate] = useState('0');
  const [selectedType, setSelectedType] = useState('0');
  const [templatesByType, setTemplatesByType] = useState([]);
  const [usedTemplates, setUsedTemplate] = useState([]);

  const allTriggers = useSelector((state) => state.Template.allTrigger);
  const [errors, setErrors] = useState({
    status: false,
    template: false,
    type: false,
  });

  const INITIAL = {
    status: false,
    template: false,
    type: false,
  };

  const ALERT_SUCESS = 'Tudo pronto! Seu template foi criado com sucesso.';
  const ALERT_ERROR = 'Hmmm! Parece que algo deu errado. Verifique se os três campos estão preenchidos e tente novamente!';
  const EMPTY = 'Ops! Você precisa selecionar um status e um template para poder continuar.';

  const triggers = ['email', 'sms', 'hsm', 'action'];
  const handleChangeTypeMessage = useCallback(
    ({ target }) => {
      setSelectedType(target.value);
      if (target.value !== '0') {
        setErrors((prev) => ({
          ...prev,
          type: false,
        }));
      }
    },
    [selectedStatus],
  );

  const handleChangeStatus = useCallback(
    ({ target }) => {
      setSelectedStatus(target.value);
      if (target.value !== '0') {
        setErrors((prev) => ({
          ...prev,
          status: false,
        }));
      }
    },
    [selectedStatus],
  );

  const handleChangeTemplate = useCallback(
    ({ target }) => {
      setSelectedTemplate(target.value);
      if (target.value !== '0') {
        setErrors((prev) => ({
          ...prev,
          template: false,
        }));
      }
    },
    [selectedTemplate],
  );
  /**
   * @function handleGetStatusAndGroups
   * @description Bate na api, retorna todos os grupos e usuarios
   * e salva no redux
   */

  const handleGetAllStatusByProduct = useCallback(async () => {
    try {
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
    } catch (error) {
      console.error(error);
    }
  }, [currentProductById]);

  const handleCreateTrigger = useCallback(async () => {
    try {
      setLoading(true);
      setErrors(INITIAL);
      if (selectedStatus === '0') {
        setErrors((prev) => ({
          ...prev,
          status: true,
        }));
      }

      if (selectedTemplate === '0') {
        setErrors((prev) => ({
          ...prev,
          template: true,
        }));
      }

      if (selectedType === '0') {
        setErrors((prev) => ({
          ...prev,
          type: true,
        }));
      }

      if (!errors.template && !errors.status && !errors.type) {
        const data = {
          to_status_id: selectedStatus,
          trigger_message_id: selectedTemplate,
        };
        await dispatch.Template.createNewTrigger(data);
        setAlertType('success');
        setAlertOpen(true);
        setMessageAlert(ALERT_SUCESS);
        setSelectedStatus('0');
        setSelectedTemplate('0');
        setSelectedType('0');
        await dispatch.Template.getAllTriggers();
      } else {
        setAlertType('warning');
        setAlertOpen(true);
        setMessageAlert(EMPTY);
      }
    } catch (error) {
      setAlertType('error');
      setAlertOpen(true);
      setMessageAlert(ALERT_ERROR);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, selectedTemplate, errors]);

  const getOnlyTypeInAllTrigger = useCallback(() => {
    if (allTemplates) {
      const templates = allTemplates.filter(
        (elem) => elem.trigger_type === selectedType,
      );

      setTemplatesByType(templates);
    }
  }, [allTemplates, selectedType]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConvertTriggersInArray = () => {
    const allTriggersSelecteds = [];
    if (allTriggers.length > 0) {
      allTriggers?.map((elem) => allTriggersSelecteds.push([...elem.trigger_message]));
    }
    if (allTriggersSelecteds.length > 0) {
      setUsedTemplate(allTriggersSelecteds.flat(1));
    }
  };

  useEffect(() => {
    getOnlyTypeInAllTrigger();
  }, [allTemplates, selectedType]);

  useEffect(() => {
    handleGetAllStatusByProduct();
  }, [currentProductById]);

  useEffect(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
    await dispatch.Template.getAllTriggers();
  }, []);

  useEffect(() => {
    handleConvertTriggersInArray();
  }, [allTriggers]);

  return (
    <Container>
      <SnackAlert
        open={alertOpen}
        handleClose={handleCloseAlert}
        severity={alertType}
        message={messageAlert}
      />
      <Card>
        <Typography fontSize="20px" bold vertical="10px">
          Associe um status a um template
        </Typography>
        <Wrapper>
          <Typography fontSize="18px" vertical="10px">
            Status
          </Typography>
          <select
            name=""
            id=""
            onChange={handleChangeStatus}
            value={selectedStatus}
            test-id="dropdownStatus"
          >
            <option value="0">Selecione um status</option>
            {allStatusByProducts.length > 0
              && allStatusByProducts.map((elem) => (
                <option value={elem.id} key={elem.id}>
                  {elem.status}
                </option>
              ))}
          </select>
        </Wrapper>

        <Wrapper>
          <Typography fontSize="18px" vertical="10px">
            Tipo da mensagem
          </Typography>
          <select
            name=""
            id=""
            onChange={handleChangeTypeMessage}
            value={selectedType}
            test-id="dropdownTipoMessage"
          >
            <option value="0">Selecione o tipo da mensagem</option>
            {triggers.length > 0
              && triggers.map((elem) => (
                <option value={elem} key={elem}>
                  {elem.toUpperCase()}
                </option>
              ))}
          </select>
        </Wrapper>

        <Wrapper>
          <Typography fontSize="18px" vertical="10px">
            Template
          </Typography>
          <select
            name=""
            id=""
            value={selectedTemplate}
            onChange={handleChangeTemplate}
            test-id="dropdownTemplate"
          >
            <option value="0">Selecione um template</option>
            {templatesByType.length > 0
              && templatesByType.map((elem) => {
                const result = usedTemplates.find((template) => template.name === elem.definition.name);
                if (!result) {
                  return (
                    <option value={elem.id} key={elem.id}>
                      {elem.definition.name}
                    </option>
                  );
                }
              })}
          </select>
        </Wrapper>
        <Spacing vertical="10px" />
        <Wrapper>
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onClick={handleCreateTrigger}
          >
            Salvar
          </PrimaryButton>
        </Wrapper>
      </Card>
    </Container>
  );
}

export default AssociateStatus;
