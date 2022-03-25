/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import cx from 'clsx';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import Loader from '../../../../../components/Loader';

import { useStyles } from './styles';

function createOptions(text) {
  const options = {
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 520,
            height: 320,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 440,
            height: 320,
          },
        },
      },
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 400,
            height: 320,
          },
        },
      },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: 550,
            height: 360,
          },
        },
      },
    ],
    chart: {
      height: 350,
      stacked: true,
    },
    title: {
      text,
      align: 'left',
      style: {
        fontWeight: 'bold',
        color: '#707070',
      },
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      'Até 1 dia',
      'Entre 1 e 2 dias',
      'Entre 2 e 3 dias',
      'Entre 3 e 4 dias',
      'Entre 4 e 5 dias',
      'Entre 5 e 10 dias',
      'Entre 10 e 15 dias',
      'Mais que 15 dias',
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'days',
    },
    yaxis: {
      title: {
        text: 'Casos',
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(y) {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} casos`;
          }
          return y;
        },
      },
    },
  };

  return options;
}

const ChartDaysOutSla = () => {
  const [documentsValid, setDocumentsValid] = useState([]);
  const [documentsFinal, setDocumentsFinal] = useState([]);

  const classes = useStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });

  const valid = useSelector(
    (state) => state.Document.DocumentsCountLateProcessValid,
  );

  const final = useSelector(
    (state) => state.Document.DocumentsCountLateProcessFinal,
  );

  useEffect(() => {
    if (valid && final) {
      const arrValid = [];
      const arrFinal = [];
      valid.forEach((item) => {
        arrValid.push(item.amount);
      });

      final.forEach((item) => {
        arrFinal.push(item.amount);
      });
      setDocumentsValid(arrValid);
      setDocumentsFinal(arrFinal);
    }
  }, [valid, final]);

  const seriesValid = [
    {
      name: 'Dias fora do SLA',
      type: 'column',
      data: documentsValid,
    },
  ];

  const seriesFinal = [
    {
      name: 'Dias fora do SLA',
      type: 'column',
      data: documentsFinal,
    },
  ];

  return (
    <Box className={classes.wrapper}>
      <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
        <>
          {valid && final ? (
            <CardContent className={classes.cardContent}>
              <Chart
                options={createOptions('Processos em andamento fora do SLA')}
                series={seriesValid}
                type="bar"
                width="550"
                height="360"
              />
            </CardContent>
          ) : (
            <CardContent className={classes.contentLoader}>
              <Loader />
            </CardContent>
          )}
        </>
      </Card>

      <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
        <>
          {valid && final ? (
            <CardContent className={classes.cardContent}>
              <Chart
                options={createOptions('Processos finalizados fora do SLA')}
                series={seriesFinal}
                type="bar"
                width="550"
                height="360"
              />
            </CardContent>
          ) : (
            <CardContent className={classes.contentLoader}>
              <Loader />
            </CardContent>
          )}
        </>
      </Card>
    </Box>
  );
};

export default ChartDaysOutSla;
