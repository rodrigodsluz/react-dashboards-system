/* eslint-disable no-unused-expressions */
import React, { useState, useCallback, useEffect } from 'react';

import {
  startOfDay, endOfDay, subDays, format,
} from 'date-fns';
import { Typography, Input } from '@d1.cx/components';

import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SwitchMenu from '../SwitchMenu/SwitchMenu';

import {
  Container,
  WrapperDatePicker,
  WrapperDateItem,
  Grid,
  WrapperPageName,
} from './styles';
import colors from '../../theme/colors';
import { dispatch } from '../../Config/store';
import { headersItems } from './headers';

const Header = () => {
  const location = useLocation();

  const products = useSelector((state) => state.User.allProducts);
  const userPermissions = useSelector((state) => state.User.user);
  const [pageName, setPageName] = useState('');

  const {
    location: { state, pathname },
  } = useHistory();

  const [startDate, setStartDate] = useState(
    format(startOfDay(subDays(new Date(), 6)), 'yyyy-MM-dd'),
  );
  const [endDate, setEndDate] = useState(
    format(endOfDay(new Date()), 'yyyy-MM-dd'),
  );

  const handleSetPageNameByURL = () => {
    const removeBar = pathname?.split('/');
    const item = headersItems[removeBar[1]];

    if (removeBar.includes('detail')) {
      setPageName('Detalhes');
    } else {
      setPageName(item);
    }
  };

  const handleChangeDate = useCallback(
    async (type, date) => {
      if (type === 'START') {
        setStartDate(date.target.value);
        await dispatch.Filters.setInitialDate(date.target.value);
      } else {
        setEndDate(date.target.value);
        await dispatch.Filters.setEndDate(date.target.value);
      }
    },
    [startDate, endDate],
  );

  const handleSetNameInHeaderAndTitlePage = useCallback(() => {
    if (location.pathname.includes('detail')) {
      setPageName('Detalhes');
    } else if (location.pathname.includes('dashboard')) {
      setPageName('Dashboard');
    } else {
      setPageName(state?.name);
    }
  }, [state]);
  const handleGetAllProducts = useCallback(async () => {
    if (userPermissions) {
      await dispatch.User.setAllProducts(
        userPermissions?.capabilities?.permittedProducts,
      );
    }
  }, [userPermissions]);

  useEffect(() => {
    handleGetAllProducts();
  }, [userPermissions]);

  useEffect(() => {
    handleSetNameInHeaderAndTitlePage();
    handleSetPageNameByURL();
  }, [state]);

  useEffect(async () => {
    if (userPermissions) {
      await dispatch.User.saveUserAsync(userPermissions?.email);
    }
  }, [state?.name]);

  useEffect(async () => {
    if (userPermissions) {
      await dispatch.User.setCurrentProductById(
        userPermissions?.capabilities?.permittedProducts[0]?.id,
      );

      await dispatch.User.setAllProducts(
        userPermissions?.capabilities?.permittedProducts,
      );
    }
  }, [userPermissions]);

  return (
    <Container>
      <Grid>
        <WrapperPageName>
          <Typography fontSize="31px" color={colors.title} horizontal="120px">
            {pageName || ''}
          </Typography>
        </WrapperPageName>
      </Grid>

      <Grid>
        {!['Detalhes', 'Usuários', 'Grupos', 'Ações', 'Áreas'].includes(
          pageName,
        ) && <SwitchMenu items={products} />}
      </Grid>

      <Grid>
        {![
          'Esteiras',
          'Detalhes',
          'Processos',
          'Usuários',
          'Grupos',
          'Ações',
          'Status',
          'Jornadas',
          'Áreas',
        ].includes(pageName) && (
          <WrapperDatePicker>
            <WrapperDateItem>
              <Typography fontSize="15px" horizontal="5px" color={colors.title}>
                Início:
              </Typography>
              <Input
                type="date"
                test-id="txtDataInicial"
                value={startDate}
                onChange={(event) => handleChangeDate('START', event)}
              />
            </WrapperDateItem>
            <WrapperDateItem>
              <Typography fontSize="15px" horizontal="5px" color={colors.title}>
                Fim:
              </Typography>
              <Input
                type="date"
                test-id="txtDataFinal"
                value={endDate}
                onChange={(event) => handleChangeDate('END', event)}
              />
            </WrapperDateItem>
          </WrapperDatePicker>
        )}
      </Grid>
    </Container>
  );
};

export default Header;
