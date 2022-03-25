import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import cx from 'clsx';

import Chart from 'react-apexcharts';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import Loader from '../../../../../components/Loader';

import { useStyles } from './styles';

const ChartSlaCountTime = () => {
  const [categories, setCategories] = useState();
  const [dataToDisplayIn, setDataToDisplayIn] = useState();
  const [dataToDisplayOut, setDataToDisplayOut] = useState();

  const classes = useStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });

  const documents = useSelector(
    (state) => state.Document.documentsSlaCountTime,
  );

  useEffect(() => {
    if (documents) {
      const cat = [];
      const slaDataIn = [];
      const slaDataOut = [];
      documents.forEach((item) => {
        cat.push(item.time);
        slaDataIn.push(item.inSlaInProgress);
        slaDataOut.push(item.outSlaInProgress);
      });
      setCategories(cat);
      setDataToDisplayIn(slaDataIn);
      setDataToDisplayOut(slaDataOut);
    }
  }, [documents]);

  const series = [
    {
      name: 'Dentro SLA',
      data: dataToDisplayIn,
    },
    {
      name: 'Fora SLA',
      data: dataToDisplayOut,
    },
  ];

  const options = {
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 1000,
            height: 320,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 900,
            height: 320,
          },
        },
      },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: 800,
            height: 320,
          },
        },
      },
    ],
    chart: {
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        export: {
          csv: {
            filename: 'processos',
            columnDelimiter: ',',
            headerCategory: 'Data',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: 'processos',
          },
          png: {
            filename: 'processos',
          },
        },
        autoSelected: 'zoom',
      },
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Processos em andamento',
      align: 'left',
    },
    grid: {
      show: true,
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories,
      title: {
        text: 'Período',
      },
    },
    yaxis: {
      title: {
        text: 'Em progresso',
      },
      min: 0,
      max: 1000,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      floating: true,
      offsetY: 0,
      offsetX: 0,
    },
  };

  return (
    <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
      {dataToDisplayIn ? (
        <>
          <CardContent className={classes.cardContent}>
            <Chart
              options={options}
              series={series}
              type="line"
              width="1170"
              height="320"
            />
          </CardContent>
        </>
      ) : (
        <CardContent className={classes.contentLoader}>
          <Loader />
        </CardContent>
      )}
    </Card>
  );
};

export default ChartSlaCountTime;
