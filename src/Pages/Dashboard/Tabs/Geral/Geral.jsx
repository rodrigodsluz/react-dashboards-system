/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Spacing, Typography } from '@d1.cx/components';
import { useSelector } from 'react-redux';
import CardInfos from '../../../../components/CardInfos';
import BarGraph from '../../../../components/Charts/BarChart/BarChart';
import RadialGraph from '../../../../components/Charts/RadialChart/RadialChart';
import PieGraph from '../../../../components/Charts/PieChart/PieChart';
import LegendItem from '../../../../components/LegendItem/LegendItem';
import CardsLoading from '../../../../components/Skeleton/CardsLoading/CardsLoading';

import ChartBarLoading from '../../../../components/Skeleton/ChartBarLoading/ChartBarLoading';
import LottieNotification from '../../../../components/LottieNotification/LottieNotification';
import {
  Wrapper,
  Container,
  WrapperCards,
  Legend,
  Row,
  GridLayout,
  OnlyColumn,
  WrapperSLA,
  WrapperBar,
  ScrollLegend,
} from './styles';
import CharPieLoading from '../../../../components/Skeleton/CharPieLoading/ChartPieLoading';
import useDisabledItensMenu from '../../../../hooks/useDisabledItensMenu';
import EmptyContainer from '../../../../components/EmptyContainer';

function Geral() {
  const { disabledItens } = useDisabledItensMenu();
  const cardProcessCount = useSelector((state) => state.Document.totalProcess);
  const modality = useSelector(
    (state) => state.Document.documentsSlaCountModality,
  );
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const countDocument = useSelector((state) => state.Status.statusCount);
  const countLateProcessValid = useSelector(
    (state) => state.Document.DocumentsCountLateProcessValid,
  );
  const countLateProcessFinal = useSelector(
    (state) => state.Document.DocumentsCountLateProcessFinal,
  );
  const [chartBarData, setChartBarData] = useState();
  const [chartSLASummatoryRunning, charSLASummatoryRunning] = useState();
  const [chartSLASummatoryFinished, setChartSLASummatoryFinished] = useState();
  const [chartSLADaysFinal, setChartSLADaysFinal] = useState();
  const [chartSLADaysValid, setChartSLADaysValid] = useState();
  const [chartRadialData, setChartRadialData] = useState();

  const [emptySLA, setEmptySLA] = useState(false);
  const [emptyDaysSLAValid, setEmptyDaysSLAValid] = useState(false);
  const [emptyDaysSlaFinal, setEmptyDaysSlaFinal] = useState(false);
  const [emptyRadial, setEmptyRadial] = useState(false);

  /**
   * @function summatorySLA
   * @description Formata o objeto com as informações dos valores totais do SLA
   */
  const summatorySLA = useCallback(() => {
    if (modality) {
      const { totalFinished, totalInProgress } = modality;

      if (totalFinished === 0 && totalInProgress === 0) {
        setEmptySLA(true);
      } else {
        setEmptySLA(false);
      }
      const objFinished = {
        data: [
          { name: 'Dentro do SLA', value: modality?.totalInSlaFinished },
          { name: 'Fora do SLA', value: modality?.totalOutSlaFinished },
          { name: 'Sem SLA', value: modality?.totalWithoutSlaFinished },
        ],
      };
      const objRunning = {
        data: [
          { name: 'Dentro do SLA', value: modality?.totalInSlaInProgress },
          { name: 'Fora do SLA', value: modality?.totalOutSlaInProgress },
          { name: 'Sem SLA', value: modality?.totalWithoutSlaInProgress },
        ],
      };
      charSLASummatoryRunning(objRunning);

      setChartSLASummatoryFinished(objFinished);
    }
  }, [modality]);

  /**
   * @function formatModalityObjectToGraph
   * @description Formata o objeto com as informações do SLA
   * para ser utilizado dentro do gráfico
   */
  const formatModalityObjectToGraph = useCallback(() => {
    if (modality) {
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
   * @function handleRandomColor
   * @description Responsável por gerar cores automaticamente para preencher
   * o fill do gráfico radial
   */

  const handleRandomColor = useCallback(() => {
    const color = `#${(Math.random() * 0xffffff).toString(16).substring(0, 6)}`;
    return color;
  }, [countDocument]);

  /**
   * @function handleSetColorsInRadialCountDocuments
   * @description Responsável por adicionar as cores geradas dentro do objeto
   */

  const handleSetColorsInRadialCountDocuments = useCallback(() => {
    if (countDocument) {
      const documentsFormat = countDocument?.statusCount.filter(
        (elem) => elem.documents !== 0,
      );
      if (documentsFormat.length === 0) {
        setEmptyRadial(true);
      } else {
        setEmptyRadial(false);
      }

      if (documentsFormat) {
        const documetsWithFill = documentsFormat.map((elem) => {
          const data = {
            name: elem.status,
            documents: elem.documents,
            fill: handleRandomColor(),
          };
          return data;
        });
        setChartRadialData(documetsWithFill);
      }
    }
  }, [countDocument]);

  const handleFormatIntervalInCountProcessLate = useCallback(() => {
    if (countLateProcessFinal) {
      const emptyCount = countLateProcessFinal.filter(
        (elem) => elem.amount !== 0,
      );

      if (emptyCount.length === 0) {
        setEmptyDaysSlaFinal(true);
      } else {
        setEmptyDaysSlaFinal(false);
      }
      const countFinal = {
        data: [
          { name: 'Até 1 dia', Quantidade: countLateProcessFinal[0].amount },
          {
            name: 'Entre 1 e 2 dias',
            Quantidade: countLateProcessFinal[1].amount,
          },
          {
            name: 'Entre 2 e 3 dias',
            Quantidade: countLateProcessFinal[2].amount,
          },
          {
            name: 'Entre 3 e 4 dias',
            Quantidade: countLateProcessFinal[3].amount,
          },
          {
            name: 'Entre 4 e 5 dias',
            Quantidade: countLateProcessFinal[4].amount,
          },
          {
            name: 'Entre 5 e 10 dias',
            Quantidade: countLateProcessFinal[5].amount,
          },
          {
            name: 'Entre 10 e 15 dias',
            Quantidade: countLateProcessFinal[6].amount,
          },
          {
            name: 'Mais que 15 dias',
            Quantidade: countLateProcessFinal[7].amount,
          },
        ],
      };

      setChartSLADaysFinal(countFinal);
    }

    if (countLateProcessValid) {
      const emptyCount = countLateProcessValid.filter(
        (elem) => elem.amount !== 0,
      );

      if (emptyCount.length === 0) {
        setEmptyDaysSLAValid(true);
      } else {
        setEmptyDaysSLAValid(false);
      }

      const countValid = {
        data: [
          { name: 'Até 1 dia', Quantidade: countLateProcessValid[0].amount },
          {
            name: 'Entre 1 e 2 dias',
            Quantidade: countLateProcessValid[1].amount,
          },
          {
            name: 'Entre 2 e 3 dias',
            Quantidade: countLateProcessValid[2].amount,
          },
          {
            name: 'Entre 3 e 4 dias',
            Quantidade: countLateProcessValid[3].amount,
          },
          {
            name: 'Entre 4 e 5 dias',
            Quantidade: countLateProcessValid[4].amount,
          },
          {
            name: 'Entre 5 e 10 dias',
            Quantidade: countLateProcessValid[5].amount,
          },
          {
            name: 'Entre 10 e 15 dias',
            Quantidade: countLateProcessValid[6].amount,
          },
          {
            name: 'Mais que 15 dias',
            Quantidade: countLateProcessValid[7].amount,
          },
        ],
      };

      setChartSLADaysValid(countValid);
    }
  }, [countLateProcessValid, countLateProcessFinal]);

  useEffect(() => {
    formatModalityObjectToGraph();
    summatorySLA();
  }, [modality, currentProductById]);

  useEffect(() => {
    handleSetColorsInRadialCountDocuments();
  }, [countDocument, currentProductById]);

  useEffect(() => {
    handleFormatIntervalInCountProcessLate();
  }, [countLateProcessValid, countLateProcessFinal, currentProductById]);

  return (
    <Wrapper>
      {currentProductById ? (
        <>
          <Container>
            <GridLayout>
              <Row>
                <WrapperCards>
                  {cardProcessCount ? (
                    <>
                      <CardInfos
                        title="Total de processos"
                        value={cardProcessCount?.count}
                        type="sucess"
                      />
                      <Spacing vertical="5px" />
                      <CardInfos
                        title="Processos em andamento"
                        value={cardProcessCount?.open}
                        type="running"
                      />
                      <Spacing vertical="5px" />
                      <CardInfos
                        title="Processos finalizados"
                        value={cardProcessCount?.finished}
                        type="finishi"
                      />
                    </>
                  ) : (
                    <CardsLoading />
                  )}
                </WrapperCards>

                <WrapperSLA>
                  <Typography fontSize="19px" bold vertical="10px">
                    SLA
                  </Typography>

                  {chartSLASummatoryRunning && chartSLASummatoryFinished && (
                    <>
                      {' '}
                      <Legend>
                        <LegendItem color="#0088FE" title="Dentro do SLA" />
                        <LegendItem color="#00C49F" title="Fora do SLA" />
                        <LegendItem color="#FFBB28" title="Sem SLA" />
                      </Legend>
                      <Spacing vertical="10px" />
                      <PieGraph
                        running={chartSLASummatoryRunning?.data}
                        finished={chartSLASummatoryFinished?.data}
                      />
                      {emptySLA && (
                        <LottieNotification
                          animation="lupa"
                          width="200px"
                          height="200px"
                        />
                      )}
                    </>
                  )}

                  {!modality && <CharPieLoading />}
                </WrapperSLA>
              </Row>
            </GridLayout>
            {!disabledItens && (
              <GridLayout>
                <Row>
                  <WrapperBar>
                    {chartSLADaysValid && (
                      <>
                        <Typography fontSize="19px" bold vertical="20px">
                          Processos em andamento fora do SLA
                        </Typography>

                        {!emptyDaysSLAValid ? (
                          <BarGraph data={chartSLADaysValid} />
                        ) : (
                          <LottieNotification animation="lupa" />
                        )}
                      </>
                    )}
                    {!countLateProcessValid && <ChartBarLoading />}
                  </WrapperBar>

                  <WrapperBar>
                    {chartSLADaysFinal && (
                      <>
                        <Typography fontSize="19px" bold vertical="20px">
                          Processos finalizados fora do SLA
                        </Typography>

                        {!emptyDaysSlaFinal ? (
                          <BarGraph data={chartSLADaysFinal} />
                        ) : (
                          <LottieNotification animation="lupa" />
                        )}
                      </>
                    )}

                    {!countLateProcessFinal && <ChartBarLoading />}
                  </WrapperBar>
                </Row>
              </GridLayout>
            )}
          </Container>

          {!disabledItens && (
            <OnlyColumn>
              <Typography fontSize="19px" bold vertical="40px">
                Documentos x Status
              </Typography>
              {!emptyRadial ? (
                <RadialGraph data={chartRadialData} />
              ) : (
                <LottieNotification animation="lupa" />
              )}

              {!countDocument && <CharPieLoading />}
              <ScrollLegend>
                <Legend column>
                  {chartRadialData
                    && chartRadialData.map((status) => (
                      <LegendItem
                        key={status.name}
                        color={status.fill}
                        title={`${status.name} - ${status.documents}`}
                      />
                    ))}
                </Legend>
              </ScrollLegend>
            </OnlyColumn>
          )}
        </>
      ) : <EmptyContainer />}
    </Wrapper>
  );
}

export default Geral;
