/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@d1.cx/components';

import { useSelector, shallowEqual } from 'react-redux';
import { Chip } from '@material-ui/core';
import {
  Container, Card, Wrapper, GridChips,
} from './styles';
import SnackAlert from '../../../../../components/SnackAlert/index';
import { dispatch } from '../../../../../Config/store';

function DesassociateStatus() {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const allTemplates = useSelector(
    (state) => state.Template.allTemplates,
    shallowEqual,
  );
  const statusState = useSelector((state) => state.Status.allState);
  const allTriggers = useSelector((state) => state.Template.allTrigger);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [selectedType, setSelectedType] = useState('0');
  const [alertType, setAlertType] = useState('success');
  const [messageAlert, setMessageAlert] = useState('');
  const [templatesByType, setTemplatesByType] = useState([]);
  const ALERT_SUCCESS = 'Tudo pronto! Sua associação foi removida com sucesso.';
  const ALERT_ERROR = 'Hmmm! Parece que algo deu errado. Verifique sua conexão e tente novamente!';
  const triggers = ['email', 'sms', 'hsm', 'action'];
  const handleChangeTypeMessage = useCallback(
    ({ target }) => {
      setTemplatesByType([]);
      setSelectedType(target.value);
    },
    [selectedStatus],
  );

  const handleChangeStatus = useCallback(
    ({ target }) => {
      setTemplatesByType([]);
      setSelectedStatus(target.value);
    },
    [selectedStatus],
  );

  /**
   * @function handleGetStatusAndGroups
   * @description Bate na api, retorna todos os grupos e usuarios
   * e salva no redux
   */

  const handleGetAllStatusByProduct = useCallback(async () => {
    try {
      setSelectedStatus('0');
      setSelectedType('0');
      await dispatch.Status.loadStatusByProductAsync(currentProductById);
    } catch (error) {
      setMessageAlert(ALERT_ERROR);
      setAlertType('error');
      setAlertOpen(true);
    }
  }, [currentProductById]);

  const getOnlyTypeInAllTrigger = useCallback(() => {
    const array = [];
    if (allTriggers) {
      allTriggers.forEach((trigger) => {
        if (trigger.status_id === parseInt(selectedStatus, 10)) {
          const item = trigger.trigger_message.filter(
            (elem) => elem.type === selectedType,
          );

          if (item.length > 0) {
            array.push(item);
          }
        }
      });
      setTemplatesByType(array);
    }
  }, [allTriggers, selectedType, selectedStatus]);

  const handleDelete = async (id) => {
    setLoading(true);
    const data = {
      id,
    };

    try {
      await dispatch.Template.removeAssociateTrigger(data);
      await dispatch.Template.getAllTriggers();
      setMessageAlert(ALERT_SUCCESS);
      setAlertType('success');
      setAlertOpen(true);
    } catch (error) {
      setMessageAlert(ALERT_ERROR);
      setAlertType('error');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOnlyTypeInAllTrigger();
  }, [allTemplates, selectedType, selectedStatus, allTriggers]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    handleGetAllStatusByProduct();
  }, [currentProductById]);

  useEffect(async () => {
    await dispatch.Template.loadAllTemplatesAsync();
    await dispatch.Template.getAllTriggers();
  }, []);

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
          Desassociar um template de um status
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
            {statusState.length > 0
              && statusState.map((elem) => (
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
            test-id="dropdownTipoMessagem"
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
            Templates
          </Typography>
          <GridChips>
            {templatesByType.length > 0
              && templatesByType[0].map((elem) => (
                <Chip
                  key={elem.id}
                  label={elem?.name}
                  color="primary"
                  disabled={loading}
                  variant="outlined"
                  onDelete={() => {
                    handleDelete(elem?.id);
                  }}
                />
              ))}
          </GridChips>
        </Wrapper>
      </Card>
    </Container>
  );
}

export default DesassociateStatus;
