/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ProcessesTable from '../ProcessesTable';
import {
  Container,
} from './styles';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * @function getMonthYear
 * @description Retorna a data
 *
 */
const getMonthYear = (month, year) => {
  if (month >= 0) {
    return `${months[month]}\u00a0${year}`;
  }
  return `${months[12 + month]}\u00a0${year - 1}`;
};

/**
 * @function FinishedProcessesTable
 * @description Tabela com os processamentos finalizados
 *
 */
const FinishedProcessesTable = ({ finishedSummary }) => {
  const isValidNumber = (number) => !Number.isNaN(number) && Number.isFinite(number);

  /**
   * @function columns
   * @description Retorna as colunas
   *
   */
  const columns = useMemo(() => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const monthColumns = Array(month + 1)
      .fill(null)
      .map((_, i) => ({
        title: getMonthYear(i, year),
        id: months[i].toLocaleLowerCase(),
      }));

    return [
      { title: 'Esteira', id: 'modality' },
      { title: 'Acumulado', id: 'accumulated' },
      ...monthColumns,
      {
        title: `${getMonthYear(month, year)} x ${getMonthYear(
          month - 1,
          year,
        )}`,
        id: 'curMonthPrevMonth',
      },
      {
        title: `${getMonthYear(month, year)} x Acumulado`,
        id: 'curMonthAccumulated',
      },
    ];
  }, [finishedSummary]);

  /**
   * @function data
   * @description Formata e faz calculos referente aos meses da tabela
   *
   */
  const data = useMemo(() => {
    if (!finishedSummary) return [];

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return Object.entries(finishedSummary).map(([modality, entry]) => {
      const accumulated = entry
        .filter((value) => value.year < year || value.month < month)
        .reduce((acc, value) => acc + +value.total, 0);

      const curMonthPrevMonth = (entry.find((value) => value.month === month)?.total ?? 0)
          / (entry.find((value) => value.month === month - 1)?.total ?? 0)
        - 1;

      const curMonthAccumulated = (entry.find((value) => value.month === month)?.total ?? 0)
          / entry
            .filter((value) => value.year < year || value.month < month)
            .reduce((acc, value) => acc + +value.total, 0)
        - 1;

      const monthsObjs = Object.fromEntries(
        Array(month)
          .fill(null)
          .map((_, i) => [
            months[i].toLocaleLowerCase(),
            entry.find((value) => value.month === i + 1)?.total ?? 0,
          ]),
      );

      return {
        modality,
        accumulated,
        ...monthsObjs,
        curMonthPrevMonth: isValidNumber(curMonthPrevMonth)
          ? `${(curMonthPrevMonth * 100).toFixed(2)}%`
          : '-',
        curMonthAccumulated: isValidNumber(curMonthPrevMonth)
          ? `${(curMonthAccumulated * 100).toFixed(2)}%`
          : '-',
      };
    });
  }, [finishedSummary]);

  return (
    <Container>
      <ProcessesTable
        title="Processos Finalizados"
        columns={columns}
        data={data}
        dense
      />
    </Container>
  );
};

FinishedProcessesTable.propTypes = {
  finishedSummary: PropTypes.object.isRequired,
};

export default FinishedProcessesTable;
