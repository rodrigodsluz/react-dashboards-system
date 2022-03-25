/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Typography } from '@d1.cx/components';

import ProcessesTable from '../ProcessesTable';

import { Container, ModalityFilter, Title } from './styles';

const columnNames = {
  day: 'Data',
  valid: 'Em andamento',
  final: 'Finalizados',
  pause: 'Pausados',
  invalid: 'Inválidos',
  primary: 'Acesso',
  total: 'Total',
};

const alwaysShownColumns = ['valid', 'final'];

/**
 * @function OpenProcessesTable
 * @description Tabela com os processamentes abertos
 *
 */
const OpenProcessesTable = ({ openSummary }) => {
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [modalities, setModalities] = useState([]);

  useEffect(() => {
    if (openSummary) {
      setModalities(Object.keys(openSummary));

      window.openSummary = openSummary;
    }
  }, [openSummary]);

  /**
   * @function data
   * @description Seleciona as esteiras
   *
   */
  const data = useMemo(() => {
    if (!openSummary) return [];

    const daysObj = Object.entries(openSummary ?? {})
      .filter(([key]) => selectedModalities.includes(key))
      .map(([, value]) => value)
      .flat()
      .reduce((obj, {
        day, month, year, status, total: value,
      }) => {
        // eslint-disable-next-line prefer-template
        const date = `${day.toString().padStart(2, '0')}/${month
          .toString()
          .padStart(2, '0')}/${year}`;

        if (!obj[date]) {
          obj[date] = Object.fromEntries(
            Object.keys(columnNames).map((key) => [key, 0]),
          );
          obj[date].day = date;
        }

        obj[date] = {
          ...obj[date],
          [status]: (obj[date]?.[status] ?? 0) + +value,
          total: +(obj[date]?.total ?? 0) + +value,
        };
        return obj;
      }, {});

    const days = Object.entries(daysObj ?? {}).map(([day, value]) => ({
      day,
      ...value,
    }));

    if (days.length) {
      return [
        ...days,
        {
          day: 'Total Pendente',
          ...days.reduce((obj, value) => {
            const day = { ...value };
            delete day.day;

            Object.entries(day).forEach(([key, val]) => {
              obj[key] = +(obj[key] ?? 0) + +val;
            });

            return obj;
          }, {}),
        },
      ];
    }
    return [];
  }, [openSummary, selectedModalities]);

  /**
   * @function columns
   * @description Seleciona as colunas
   *
   */
  const columns = useMemo(() => {
    const unsorted = [...new Set(data.map((i) => Object.keys(i)).flat())].map(
      (id) => ({ title: columnNames[id], id }),
    );

    return Object.keys(columnNames)
      .map((key) => unsorted.find((i) => i.id === key))
      .filter(
        (item) => typeof item !== 'undefined'
          && (data[data.length - 1][item.id] !== 0
            || alwaysShownColumns.includes(item.id)),
      );
  }, [columnNames, data]);

  const handleModalityChange = (event) => {
    setSelectedModalities(event.target.value);
  };
  return (
    <Container>
      <ModalityFilter>
        <Title>
          <Typography fontSize="21px" vertical="15px">Processos Pendentes</Typography>
        </Title>

        <Box flexGrow={1} />
        <FormControl variant="outlined" size="small" data-testid="dropdownEsteira">
          <InputLabel id="modality-select-label">Esteira</InputLabel>
          <Select
            label="Esteira"
            labelId="modality-select-label"
            value={selectedModalities}
            onChange={handleModalityChange}
            multiple
            style={{ width: '15rem' }}
            MenuProps={{
              getContentAnchorEl: () => null,
            }}
          >
            {modalities.map((modality) => (
              <MenuItem key={`${modality}`} value={modality}>
                {modality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ModalityFilter>
      <ProcessesTable
        columns={columns}
        data={data}
        defaultSortBy="day"
        dense
        noItemsMessage={
          selectedModalities.length ? (
            <Typography fontSize="15px" align="center">
              Não há nenhum processo para a esteira e o período selecionados.
            </Typography>
          ) : (
            <Typography fontSize="15px" align="center">
              Selecione uma esteira para ver os processos disponiveis.
            </Typography>
          )
        }
      />
    </Container>
  );
};

OpenProcessesTable.propTypes = {
  openSummary: PropTypes.object.isRequired,
};

export default OpenProcessesTable;
