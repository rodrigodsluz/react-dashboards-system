import React, { useState, useEffect } from 'react';

import cx from 'clsx';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import { useSelector } from 'react-redux';

import Loader from '../../../../../components/Loader';

import { useStyles } from './styles';

function createOptions(...labels) {
  const options = {
    chart: {
      type: 'pie',
      width: 60,
      height: 60,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 200,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: [labels[0], labels[1], labels[2]],
    stroke: {
      width: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
    },
  };
  return options;
}

const ChartCardSlaStatusCount = () => {
  const [totalSeriesSlaFinished, setTotalSeriesSlaFinished] = useState([]);
  const [totalSeriesSlaInProgress, setTotalSeriesSlaInProgress] = useState([]);

  const classes = useStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });

  const slaCountModality = useSelector(
    (state) => state.Document.documentsSlaCountModality,
  );

  useEffect(() => {
    if (slaCountModality) {
      const inProgress = [];
      inProgress.push(slaCountModality.totalInSlaInProgress);
      inProgress.push(slaCountModality.totalOutSlaInProgress);
      inProgress.push(slaCountModality.totalWithoutSlaInProgress);
      setTotalSeriesSlaInProgress(inProgress);

      const finished = [];
      finished.push(slaCountModality.totalInSlaFinished);
      finished.push(slaCountModality.totalOutSlaFinished);
      finished.push(slaCountModality.totalWithoutSlaFinished);
      setTotalSeriesSlaFinished(finished);
    }
  }, [slaCountModality]);

  function createCard(
    chartOptions,
    series,
    title,
    labelOne,
    labelTwo,
    labelThree,
    ...data
  ) {
    return (
      <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
        <CardHeader
          className={classes.cardHeader}
          subheader={<Typography>{title}</Typography>}
          style={{ textAlign: 'center' }}
        />
        {slaCountModality ? (
          <>
            <CardContent className={classes.cardContent}>
              <Chart
                options={chartOptions}
                series={series}
                type="pie"
                width="200"
              />
              <Box style={{ width: '100%' }}>
                <Box className={classes.info}>
                  <Typography className={classes.label}>{labelOne}</Typography>
                  <Typography className={classes.data}>{data[0]}</Typography>
                </Box>
                <Divider style={{ height: 2 }} />
                <Box className={classes.info}>
                  <Typography className={classes.label}>{labelTwo}</Typography>
                  <Typography className={classes.data}>{data[1]}</Typography>
                </Box>
                <Divider style={{ height: 2 }} />
                <Box className={classes.info}>
                  <Typography className={classes.label}>
                    {labelThree}
                  </Typography>
                  <Typography className={classes.data}>{data[2]}</Typography>
                </Box>
              </Box>
            </CardContent>
          </>
        ) : (
          <CardContent className={classes.contentLoader}>
            <Loader />
          </CardContent>
        )}
      </Card>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.chartBox}>
        {createCard(
          createOptions('Dentro do prazo', 'Fora do prazo', 'Sem SLA'),
          totalSeriesSlaInProgress,
          'Em andamento',
          'Dentro do SLA',
          'Fora do SLA',
          'Sem SLA',
          slaCountModality.totalInSlaInProgress,
          slaCountModality.totalOutSlaInProgress,
          slaCountModality.totalWithoutSlaInProgress,
        )}
      </Box>
      <Box className={classes.chartBox}>
        {createCard(
          createOptions('Dentro do prazo', 'Fora do prazo', 'Sem SLA'),
          totalSeriesSlaFinished,
          'Finalizados',
          'Dentro do SLA',
          'Fora do SLA',
          'Sem SLA',
          slaCountModality.totalInSlaFinished,
          slaCountModality.totalOutSlaFinished,
          slaCountModality.totalWithoutSlaFinished,
        )}
      </Box>
    </Box>
  );
};

export default ChartCardSlaStatusCount;
