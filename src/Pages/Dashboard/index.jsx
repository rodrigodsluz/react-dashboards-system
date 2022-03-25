import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  startOfDay, endOfDay, subDays, format,
} from 'date-fns';

import { Notification } from '@d1.cx/components';

import Esteira from './Tabs/Esteira';
import Resumo from './Tabs/Resumo';
import Geral from './Tabs/Geral/Geral';
import Extras from './Tabs/Extras/Extras';
import { dispatch } from '../../Config/store';
import { Container, Wrapper, WrapperTabs } from './styles';
import useDisabledItensMenu from '../../hooks/useDisabledItensMenu';
import Tabs from '../../components/CustomTab/Tabs';
import { tabsDashboard } from '../../components/CustomTab/configuration';

const Dashboard = () => {
  const [value, setValue] = useState(1);
  const [errorAPI, setErrorAPI] = useState(false);
  const { disabledItens } = useDisabledItensMenu();
  const userPermissions = useSelector((state) => state.User.user);
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const startDate = useSelector((state) => state.Filters.initialDate);
  const endDate = useSelector((state) => state.Filters.endDate);
  const ERROR_API = 'Ooops! Parece que alguma coisa deu errada. Por favor, tente novamente! Caso o problema persistir, verique sua conexão.';
  /**
   * @function getAllProductsByUser
   * @description Salva no redux todas as áreas disponiveis
   * para o usuário e também salva uma área inicial para ja ativar a marcação
   * do área no header
   */
  const getAllProductsByUser = useCallback(async () => {
    try {
      setErrorAPI(false);
      if (userPermissions) {
        await dispatch.User.setAllProducts(
          userPermissions?.capabilities?.permittedProducts,
        );

        await dispatch.User.setCurrentProductById(
          userPermissions?.capabilities?.permittedProducts[0]?.id,
        );
      }
    } catch (error) {
      setErrorAPI(true);
    }
  }, [userPermissions]);

  /**
   * @function getCountProcessStatus
   * @description Retorna os dados que alimentam os cards de processos
   */
  const getCountProcessStatus = useCallback(async () => {
    try {
      const start = format(startOfDay(subDays(new Date(), 6)), 'dd/MM/yyyy');
      const end = format(endOfDay(new Date()), 'dd/MM/yyyy');

      if (currentProductById) {
        setErrorAPI(false);
        const data = {
          products: [currentProductById],
          initialDate: startDate
            ? moment(startDate).format('DD/MM/YYYY')
            : start,
          finalDate: endDate ? moment(endDate).format('DD/MM/YYYY') : end,
        };

        await dispatch.Document.loadTotalProcessAsync(data);
        await dispatch.Document.loadDocumentsSlaCountModalityAsync(data);
        await dispatch.Status.statusCountAsync(data);
        data.process_status = 'valid';
        await dispatch.Document.getDocumentsCountLateProcessValidAsync(data);

        data.process_status = 'final';
        await dispatch.Document.getDocumentsCountLateProcessFinalAsync(data);
      }
    } catch (error) {
      setErrorAPI(true);
    }
  }, [startDate, endDate, currentProductById]);

  useEffect(() => {
    if (currentProductById) {
      getCountProcessStatus();
    }
  }, [startDate, endDate, currentProductById]);

  useEffect(() => {
    getAllProductsByUser();
  }, []);
  return (
    <Wrapper>
      <Notification error show={errorAPI} message={ERROR_API} />
      <Container>
        <WrapperTabs>
          <Tabs
            data={tabsDashboard}
            setTabActive={setValue}
            tabActive={value}
          />
        </WrapperTabs>
        {!disabledItens ? (
          <>
            {value === 1 && <Geral />}
            {value === 2 && <Esteira />}
            {value === 3 && <Resumo />}
            {value === 4 && <Extras />}
          </>
        ) : (
          <>
            {value === 1 && <Geral />}
            {value === 2 && <Esteira />}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
