/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import { TimeGridScheduler, classes } from '@remotelock/react-week-scheduler';
import '@remotelock/react-week-scheduler/index.css';
import CustomProperties from 'react-custom-properties';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import useWindowSize from '../../../../utils/windowDimension';

export default function WeekSchedule({ selectedWeek }) {
  const week = useSelector((state) => state.Modalities.week);
  const isDeleted = useSelector((state) => state.Modalities.isDeleted);

  const currentTime = [
    ['2021-03-07 23:59:58', '2021-03-07 23:59:59'],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  if (selectedWeek || Object.keys(week).length >= 0) {
    if (selectedWeek) {
      const a = Object.keys(selectedWeek);
      const b = Object.keys(week);

      const missingWeeks = a.filter((v) => b.indexOf(v) === -1);

      if (
        (missingWeeks.length > 0 && Object.keys(week).length > 0)
        || (Object.keys(selectedWeek).length === 1 && isDeleted)
      ) {
        delete selectedWeek[missingWeeks[0]];
      }

      selectedWeek = { ...selectedWeek, ...week };
    }

    const positions = Object.keys(selectedWeek || week)?.map((p) => p);

    const values = Object.values(selectedWeek || week)?.map((value, i) => [
      '2021-03-' + positions[i].toString().padStart(2, '0') + ' ' + value.start,
      '2021-03-' + positions[i].toString().padStart(2, '0') + ' ' + value.end,
    ]);

    positions.forEach((position, i) => {
      currentTime[position - 1] = values[i];
    });
  }

  const defaultSchedule = currentTime.map((range) => range.map((dateString) => new Date(dateString)));

  const [schedule, setSchedule] = useState(defaultSchedule);

  /**
   * @function getWindowSize
   * @description Retorna o tamanho do cronograma baseado no tamanho
   * atual da tela
   */
  const getWindowSize = () => {
    const windowSize = useWindowSize();
    const size = {
      height: '76vh',
      cellHeight: '33px',
    };

    if (windowSize.width <= 1024) {
      size.height = '100vh';
      size.cellHeight = '40px';
    }
    return size;
  };

  useEffect(() => {
    setSchedule(defaultSchedule);
  }, [week, isDeleted]);
  return (
    <Container>
      <CustomProperties
        global={false}
        properties={{
          '--cell-height': `${getWindowSize().cellHeight}`,
          '--cell-width': '22px',
        }}
      >
        <TimeGridScheduler
          classes={classes}
          originDate={new Date('2021-03-02')}
          schedule={schedule}
          onChange={setSchedule}
          style={{
            height: `${getWindowSize().height}`,
            borderRadius: '14px',
            width: '92vw',
          }}
          disabled
          visualGridVerticalPrecision="60"
          verticalPrecision="0.1"
        />
      </CustomProperties>
    </Container>
  );
}
