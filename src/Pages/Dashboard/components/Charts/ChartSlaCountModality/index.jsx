import React, { useState, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import cx from 'clsx';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import Loader from '../../../../../components/Loader';

import { dispatch } from '../../../../../Config/store';

import { useStyles } from './styles';

const ChartSlaCountModality = () => {
  const [pieSeries, setPieSeries] = useState([]);
  const [finishedInSla, setFinishedInSla] = useState([]);
  const [finishedOutSla, setFinishedOutSla] = useState([]);
  const [inProgressInSla, setInProgressInSla] = useState([]);
  const [inProgressOutSla, setInProgressOutSla] = useState([]);
  const [finishedWithoutSla, setFinishedWithoutSla] = useState([]);
  const [inProgressWithoutSla, setInProgressWithoutSla] = useState([]);

  const [modalities, setModalities] = useState([]);
  const [indexModality, setIndexModality] = useState(0);
  const [currentModality, setCurrentModality] = useState('');
  const [quantityModalities, setQuantityModalities] = useState(0);

  const classes = useStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });

  useEffect(() => {
    setPieSeries([]);
    setCurrentModality([]);

    setInProgressInSla([]);
    setInProgressOutSla([]);

    setFinishedInSla([]);
    setFinishedOutSla([]);

    setInProgressWithoutSla([]);
    setFinishedWithoutSla([]);

    setIndexModality(0);
    setQuantityModalities(0);
  }, []);

  const documents = useSelector(
    (state) => state.Document.documentsSlaCountModality,
  );

  useEffect(() => {
    const createObject = async () => {
      const items = [];
      const categories = [];

      documents.countInProgress.forEach((item) => {
        /** processes in Progress */
        const values = [];
        categories.push(item.name);
        values.push(item.inSla);
        values.push(item.outSla);
        values.push(item.withoutSla);
        const obj = {
          modality: item.name,
          data: values,
        };
        items.push(obj);
      });

      documents.countFinished.forEach((item, index) => {
        /** completed processes */
        if (items[index].modality === item.name) {
          items[index].data.push(item.inSla);
          items[index].data.push(item.outSla);
          items[index].data.push(item.withoutSla);
        }
      });
      setModalities(categories);
      setQuantityModalities(categories.length);
      await dispatch.Document.saveModalitiesChartValues(items);
    };
    if (documents) createObject();
  }, [documents]);

  const modalityValues = useSelector(
    (state) => state.Document.modalitiesChartValues,
  );

  useEffect(() => {
    if (modalityValues.length > 0) {
      setPieSeries(modalityValues[0].data);
      setCurrentModality(modalityValues[0].modality);

      setInProgressInSla(modalityValues[0].data[0]);
      setInProgressOutSla(modalityValues[0].data[1]);
      setInProgressWithoutSla(modalityValues[0].data[2]);
      setFinishedInSla(modalityValues[0].data[3]);
      setFinishedOutSla(modalityValues[0].data[4]);
      setFinishedWithoutSla(modalityValues[0].data[5]);
    }
  }, [modalityValues]);

  const displayModalityValues = useCallback(
    (modality) => {
      setCurrentModality(modality);
      const res = modalityValues.filter(
        (element) => element.modality === modality,
      );
      setPieSeries(res[0].data);

      setInProgressInSla(res[0].data[0]);
      setInProgressOutSla(res[0].data[1]);
      setInProgressWithoutSla(res[0].data[2]);
      setFinishedInSla(res[0].data[3]);
      setFinishedOutSla(res[0].data[4]);
      setFinishedWithoutSla(res[0].data[5]);
    },
    [modalityValues],
  );

  const handleChangeModalityMore = useCallback(() => {
    setIndexModality(indexModality + 1);
  }, [indexModality]);

  const handleChangeModalityLess = useCallback(() => {
    setIndexModality(indexModality - 1);
  }, [indexModality]);

  /** bar chart */
  const series = [
    {
      name: 'Em andamento dentro SLA',
      data: [inProgressInSla],
    },
    {
      name: 'Em andamento fora SLA',
      data: [inProgressOutSla],
    },
    {
      name: 'Em andamento sem SLA',
      data: [inProgressWithoutSla],
    },
    {
      name: 'Finalizados dentro SLA',
      data: [finishedInSla],
    },
    {
      name: 'Finalizados fora SLA',
      data: [finishedOutSla],
    },
    {
      name: 'Finalizados sem SLA',
      data: [finishedWithoutSla],
    },
  ];

  const options = {
    chart: {
      stacked: false,
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
      toolbar: {
        show: false,
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
      },
    },
    title: {
      text: `${currentModality}`,
      align: 'left',
      style: {
        fontWeight: 'bold',
        color: '#707070',
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      categories: [currentModality],
    },
    legend: {
      position: 'bottom',
      offsetY: 5,
      offsetX: 0,
      horizontalAlign: 'left',
      markers: {
        width: 10,
        height: 10,
        radius: 8,
      },
    },
    fill: {
      opacity: 1,
    },
  };
  /** bar chart */

  /** pie chart */
  const optionsPie = {
    chart: {
      type: 'pie',
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
    labels: [
      'Em andamento dentro SLA',
      'Em andamento fora SLA',
      'Em andamento sem SLA',
      'Finalizados dentro SLA',
      'Finalizados fora SLA',
      'Finalizados sem SLA',
    ],
    legend: {
      markers: {
        width: 26,
        height: 10,
        radius: 8,
      },
      position: 'bottom',
      horizontalAlign: 'center',
      width: 500,
      height: 65,
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
      },
    },
  };
  /** pie chart */

  return (
    <>
      <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
        {modalityValues ? (
          <>
            <Box className={classes.cardContentBox}>
              <CardContent className={classes.cardContent}>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  width="500"
                  height="350"
                />
              </CardContent>

              <CardContent className={classes.cardContent}>
                <Chart
                  options={optionsPie}
                  series={pieSeries}
                  type="pie"
                  width="570"
                  height="350"
                />
              </CardContent>
            </Box>
            {modalityValues.length > 0 && (
              <CardActions>
                {indexModality === 0 ? (
                  <Button size="small" color="primary" disabled>
                    Anterior
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleChangeModalityLess();
                      displayModalityValues(modalities[indexModality - 1]);
                    }}
                  >
                    Anterior
                  </Button>
                )}

                {indexModality === quantityModalities - 1 ? (
                  <Button size="small" color="primary" disabled>
                    Proxima
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleChangeModalityMore();
                      displayModalityValues(modalities[indexModality + 1]);
                    }}
                  >
                    Proxima
                  </Button>
                )}
              </CardActions>
            )}
          </>
        ) : (
          <CardContent className={classes.contentLoader}>
            <Loader />
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default ChartSlaCountModality;
