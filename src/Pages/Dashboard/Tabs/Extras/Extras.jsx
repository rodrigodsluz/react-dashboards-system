/* eslint-disable no-param-reassign */
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  startOfDay, endOfDay, subDays, format,
} from 'date-fns';
import {
  InputSearch,
  Typography,
  FlexContent,
  LinkButton,
} from '@d1.cx/components';
import {
  TrashAlt,
  CheckCircle,
  Clock,
  PauseCircle,
  ExclamationCircle,
  Tachometer,
} from '@d1.cx/icons';
import {
  ExtrasContainer,
  SearchedDataContainer,
  ResultBoxContainer,
  BoxContent,
} from './styles';
import { dispatch } from '../../../../Config/store';
import EmptyContainer from '../../../../components/EmptyContainer';

/**
 * @function Extras
 * @description Tab do extras com uma barra de pesquisa das colunas
 */
const Extras = () => {
  const [columns, setColumns] = useState([]);
  const [inputData, setInputData] = useState('');
  const [results, setResults] = useState({});

  const filledColumns = useSelector(
    (state) => state.Document.DocumentsCountFilledColumns,
  );

  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const startDate = useSelector((state) => state.Filters.initialDate);
  const endDate = useSelector((state) => state.Filters.endDate);

  /**
   * @function handleSearchedData
   * @description Filtra e organiza as keys dos objetos
   */
  const handleSearchedData = () => {
    if (Array.isArray(filledColumns)) {
      const parsed = filledColumns.reduce((obj, value) => {
        Object.entries(value).forEach(([column, items]) => {
          if (!obj[column]) obj[column] = {};
          obj[column] = items
            .filter(
              ({ key }) => key !== 'withoutKey' && typeof key === 'string',
            )
            .map((item) => {
              item.count.total = Object.values(item.count).reduce(
                (a, b) => a + b,
              );
              return item;
            });
        });
        return obj;
      }, {});

      const keys = Object.keys(parsed);

      const old = Object.fromEntries(
        Object.entries(results[currentProductById] ?? {}).filter(
          ([key]) => !keys.includes(key),
        ),
      );

      setResults({
        ...results,
        [currentProductById]: {
          ...parsed,
          ...old,
        },
      });
    }
  };

  /**
   * @function handleSearch
   * @description Pesquisa pela coluna pesquisada e tras o resultado
   */
  const handleSearch = useCallback(
    async (event, override = {}) => {
      event?.preventDefault();

      setColumns([...columns, inputData].filter((s) => s.length));

      const start = format(startOfDay(subDays(new Date(), 6)), 'dd/MM/yyyy');
      const end = format(endOfDay(new Date()), 'dd/MM/yyyy');

      delete override.date;

      const data = {
        currentProductById: [currentProductById],
        initialDate: startDate ? moment(startDate).format('DD/MM/YYYY') : start,
        finalDate: endDate ? moment(endDate).format('DD/MM/YYYY') : end,
        filledColumns: [...columns, inputData].filter((s) => s.length),
        ...override,
      };

      await dispatch.Document.getDocumentsCountFilledColumnsAsync(data);
      setColumns([]);
      setInputData('');
    },
    [columns, startDate, endDate, inputData],
  );

  /**
   * @function handleRemoveColumn
   * @description Remove a coluna pesquisada
   */
  const handleRemoveColumn = (column) => () => {
    setResults({
      ...results,
      [currentProductById]: Object.fromEntries(
        Object.entries(results[currentProductById]).filter(
          ([key]) => key !== column,
        ),
      ),
    });
  };

  const keyNames = {
    'Em andamento': 'valid',
    Finalizados: 'final',
    Pausados: 'pause',
    Inválidos: 'invalid',
    Acesso: 'primary',
  };

  /**
   * @function getLabelIcon
   * @description Recebe a label como parâmetro e retorna um ícone pra cada uma
   */
  const getLabelIcon = (label) => {
    let icon;
    switch (label) {
      case 'Em andamento':
        icon = <Clock color="#fff" width="20px" />;
        break;

      case 'Finalizados':
        icon = <CheckCircle color="#fff" width="19px" />;
        break;

      case 'Pausados':
        icon = <PauseCircle color="#fff" width="20px" />;
        break;

      case 'Inválidos':
        icon = <ExclamationCircle color="#fff" width="20px" />;
        break;

      case 'Acesso':
        icon = <Tachometer color="#fff" width="20px" />;
        break;

      default:
        break;
    }
    return icon;
  };

  useEffect(() => {
    handleSearchedData();
  }, [filledColumns]);

  return (
    <ExtrasContainer>
      {currentProductById ? (
        <>
          <form onSubmit={handleSearch}>
            <InputSearch
              data-testid="txtExtra"
              value={inputData}
              onChange={({ target: { value } }) => setInputData(value)}
              placeholder="Digite o nome da coluna e pressione enter para pesquisar"
            />
          </form>

          {Object.entries(results[currentProductById] ?? {}).map(
            ([column, items]) => (
              <SearchedDataContainer>
                <FlexContent spaceBetween key={column}>
                  <Typography fontSize="26px" bold>
                    {column}
                  </Typography>
                  <LinkButton onClick={handleRemoveColumn(column)}>
                    <TrashAlt width="30px" color="red" />
                  </LinkButton>
                </FlexContent>

                <ResultBoxContainer>
                  {items.map((item) => (
                    <BoxContent key={item.key}>
                      <Typography
                        fontSize="16px"
                        bold
                        color="#fff"
                        vertical="10px"
                      >
                        {item.key}
                      </Typography>

                      <FlexContent center>
                        <FlexContent spaceAround direction="column">
                          {Object.entries(keyNames).map(([label, key]) => (
                            <FlexContent>
                              {getLabelIcon(label)}
                              <Typography
                                fontSize="13px"
                                bold
                                color="#fff"
                                horizontal="5px"
                              >
                                {label}
                              </Typography>
                              <Typography
                                color="#fff"
                                fontSize="13px"
                                bold
                                align="right"
                              >
                                {item.count[key] ?? 0}
                              </Typography>
                            </FlexContent>
                          ))}
                        </FlexContent>

                        <FlexContent direction="column">
                          <Typography fontSize="13px" bold color="#fff">
                            Total
                          </Typography>
                          <Typography
                            fontSize="23px"
                            bold
                            color="#fff"
                            vertical="5px"
                          >
                            {item.count.total}
                          </Typography>
                        </FlexContent>
                      </FlexContent>
                    </BoxContent>
                  ))}
                </ResultBoxContainer>
              </SearchedDataContainer>
            ),
          )}
        </>
      ) : (
        <EmptyContainer />
      )}
    </ExtrasContainer>
  );
};

export default Extras;
