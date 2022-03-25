import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Spacing,
  FlexContent,
  LinkButton,
} from '@d1.cx/components';
import Table from '../../components/Table';
import DonutChart from '../../../../components/Charts/DonutChart/DonutChart';
import DonutLoading from '../../../../components/Skeleton/ChartDonutLoading/DonutLoading';
import {
  Container, Row, Card, Label,
} from './styles';
import ChartBarLoading from '../../../../components/Skeleton/ChartBarLoading/ChartBarLoading';
import BarGraph from '../../../../components/Charts/BarChart/BarChart';
import LottieNotification from '../../../../components/LottieNotification/LottieNotification';
import useDisabledItensMenu from '../../../../hooks/useDisabledItensMenu';
import EmptyContainer from '../../../../components/EmptyContainer';

const Esteira = () => {
  const { disabledItens } = useDisabledItensMenu();
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const [tableRows, setTableRows] = useState([]);
  const [chartBarData, setChartBarData] = useState();
  const [totalProcess, setTotalProcess] = useState(0);
  const [indexModality, setIndexModality] = useState(0);
  const [chartSLASummatoryRunning, charSLASummatoryRunning] = useState();
  const [chartSLASummatoryFinished, setChartSLASummatoryFinished] = useState();

  const [emptySLARunning, setEmpytSLARunning] = useState(false);
  const [emptySLAFinished, setEmptySLAFinished] = useState(false);
  const [emptyModality, setEmptyModality] = useState(false);

  const modality = useSelector(
    (state) => state.Document.documentsSlaCountModality,
  );

  useEffect(() => {
    if (modality) {
      const arr = [];
      const arrTotal = [];
      const arrLabels = [];
      const arrTotalOut = [];
      let total = 0;

      modality.countInProgress.forEach((item) => {
        const totalOpen = parseInt(item.inSla + item.outSla, 10);
        const grandTotal = parseInt(
          item.inSla + item.outSla + item.withoutSla,
          10,
        );
        const obj = {
          name: item.name,
          openInSla: item.inSla,
          openOutSla: item.outSla,
          totalOpen,
          grandTotal,
          openWithoutSla: item.withoutSla,
        };
        arr.push(obj);
        arrLabels.push(item.name);
        arrTotalOut.push(item.outSla);
      });

      modality.countFinished.forEach((item, index) => {
        if (arr[index].name === item.name) {
          const totalClosed = parseInt(
            item.inSla + item.outSla + item.withoutSla,
            10,
          );
          const sum = arr[index].grandTotal + totalClosed;
          arr[index].closedInSla = item.inSla;
          arr[index].closedOutSla = item.outSla;
          arr[index].totalClosed = totalClosed;
          arr[index].grandTotal = sum;
          arr[index].closedWithoutSla = item.withoutSla;
        }
      });

      arr.forEach((item) => {
        total += parseInt(item.grandTotal, 10);
        arrTotal.push(parseInt(item.grandTotal, 10));
      });

      setTableRows(arr);
      setTotalProcess(total);
    }
  }, [modality]);

  /**
   * @function handleChangeNextModality
   * @description Responsável por aumentar o valor
   * do index que controla o array de dados do gráfico de barras
   */

  const handleChangeNextModality = useCallback(() => {
    if (chartBarData && indexModality < chartBarData.length - 1) {
      setIndexModality(indexModality + 1);
    }
  }, [indexModality, chartBarData]);

  /**
   * @function handleChangePreviousModality
   * @description Responsável por diminuir o valor
   * do index que controla o array de dados do gráfico de barras
   */
  const handleChangePreviousModality = useCallback(() => {
    if (indexModality > 0) {
      setIndexModality(indexModality - 1);
    }
  }, [indexModality]);

  /**
   * @function formatModalityObjectToGraph
   * @description Formata o objeto com as informações do SLA
   * para ser utilizado dentro do gráfico
   */
  const formatModalityObjectToGraph = useCallback(() => {
    if (modality) {
      const { totalFinished, totalInProgress } = modality;

      if (totalFinished === 0 && totalInProgress === 0) {
        setEmptyModality(true);
      } else {
        setEmptyModality(false);
      }
      const newArray = modality.countFinished.map((elem, index) => {
        const newObj = {
          name: elem.name,
          data: [
            { name: 'Fin. em SLA', Quantidade: elem.inSla },
            { name: 'Fin. fora SLA', Quantidade: elem.outSla },
            { name: 'Fin. Sem SLA', Quantidade: elem.withoutSla },
            {
              name: 'And. em SLA',
              Quantidade: modality.countInProgress[index].inSla,
            },
            {
              name: 'And. fora SLA',
              Quantidade: modality.countInProgress[index].outSla,
            },
            {
              name: 'And. Sem SLA',
              Quantidade: modality.countInProgress[index].withoutSla,
            },
          ],
        };

        return newObj;
      });
      setChartBarData(newArray);
    }
  }, [modality, chartBarData]);

  /**
   * @function summatorySLA
   * @description Formata o objeto com as informações dos valores totais do SLA
   * separados por esteira
   */
  const summatorySLA = useCallback(() => {
    if (chartBarData) {
      const objRunning = chartBarData.map((elem) => {
        const sumDataSLA = {
          name: elem.name,
          Quantidade:
            elem.data[3].Quantidade
            + elem.data[4].Quantidade
            + elem.data[5].Quantidade,
        };

        return sumDataSLA;
      });

      const objFinished = chartBarData.map((elem) => {
        const sumDataSLA = {
          name: elem.name,
          Quantidade:
            elem.data[0].Quantidade
            + elem.data[1].Quantidade
            + elem.data[2].Quantidade,
        };

        return sumDataSLA;
      });

      const validRunner = objRunning.filter((elem) => elem.Quantidade !== 0);
      if (validRunner.length === 0) {
        setEmpytSLARunning(true);
      } else {
        setEmpytSLARunning(false);
      }

      const validFinished = objFinished.filter((elem) => elem.Quantidade !== 0);
      if (validFinished.length === 0) {
        setEmptySLAFinished(true);
      } else {
        setEmptySLAFinished(false);
      }

      charSLASummatoryRunning(objRunning);
      setChartSLASummatoryFinished(objFinished);
    }
  }, [modality, chartBarData]);

  useEffect(() => {
    formatModalityObjectToGraph();
    setIndexModality(0);
  }, [modality]);

  useEffect(() => {
    summatorySLA();
  }, [chartBarData]);

  return (
    <>
      {currentProductById ? (
        <>
          <Container>
            {!disabledItens && (
            <>
              <Table data={tableRows} totalProcess={totalProcess} />

              <Row>
                <Card center={!emptySLARunning}>
                  <Typography fontSize="16px" bold vertical="20px">
                    <Label>
                      Quantidade total de processos por esteira
                    </Label>
                  </Typography>
                  {!emptySLARunning ? (
                    <DonutChart data={chartSLASummatoryRunning} />
                  ) : (
                    <LottieNotification animation="lupa" />
                  )}
                  {!chartSLASummatoryRunning && <DonutLoading />}
                </Card>

                <Card>
                  <Typography fontSize="16px" bold vertical="20px">
                    <Label>
                      Total de processos fora do sla por esteira
                    </Label>
                  </Typography>
                  {!emptySLAFinished ? (
                    <DonutChart data={chartSLASummatoryFinished} />
                  ) : (
                    <LottieNotification animation="lupa" />
                  )}

                  {!chartSLASummatoryFinished && <DonutLoading />}
                </Card>
              </Row>
            </>
            )}

            <Row>
              <Card>
                {!emptyModality && chartBarData?.length > 0 ? (
                  <>
                    <Typography fontSize="19px" bold vertical="10px">
                      {chartBarData[indexModality]?.name}
                    </Typography>
                    <FlexContent center>
                      <LinkButton onClick={handleChangePreviousModality}>
                        Anterior
                      </LinkButton>
                      <LinkButton onClick={handleChangeNextModality}>
                        Próximo
                      </LinkButton>
                    </FlexContent>
                    <BarGraph data={chartBarData[indexModality]} />
                  </>
                ) : (
                  <LottieNotification animation="lupa" />
                )}

                {!chartBarData && <ChartBarLoading />}
              </Card>

              <Card>
                {!emptyModality && chartBarData?.length > 0 ? (
                  <>
                    <Spacing vertical="30px" />
                    <DonutChart data={chartBarData[indexModality]?.data} />
                    <Spacing vertical="10px" />
                  </>
                ) : (
                  <LottieNotification animation="lupa" />
                )}
                {!chartBarData && <DonutLoading />}
              </Card>
            </Row>
          </Container>
        </>

      ) : <EmptyContainer />}
    </>
  );
};

export default Esteira;
