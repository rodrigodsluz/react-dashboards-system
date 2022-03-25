/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback } from 'react';

import cx from 'clsx';

import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import { useSelector } from 'react-redux';

import ExtractReports from '../../ExtractReports';
import Loader from '../../../../../components/Loader';

import { dispatch } from '../../../../../Config/store';

import { useStyles, StyledTableCell } from './styles';

const ChartStatusCount = React.memo(
  ({
    product, date,
  }) => {
    const classes = useStyles();

    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });

    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);

    const countedStatuses = useSelector((state) => state.Status.statusCount);

    useEffect(() => {
      if (countedStatuses) {
        const arr = [];
        countedStatuses.countDocs.forEach((element) => {
          const item = parseInt(element, 10);
          arr.push(item);
        });
        setLabels(countedStatuses.statuses);
        setSeries(arr);
      }
    }, [countedStatuses]);

    const options = {
      labels,
      plotOptions: {
        pie: {
          customScale: 0.85,
        },
      },
    };

    const generateReport = useCallback(async () => {
      const initial = moment(date[0]).format('DD/MM/YYYY');
      const final = moment(date[1]).format('DD/MM/YYYY');

      const data = {
        product_id: [product],
        initialDate: initial,
        finalDate: final,
      };

      await dispatch.Document.downloadDocumentsAsync(data);
    }, [product, date]);

    return (
      <>
        <Box className={classes.wrapper}>
          <Card className={cx(classes.cardTable, cardShadowStyles.root)}>
            <CardHeader
              className={classes.cardTableHeader}
              subheader={
                <Typography>Quantidade de documentos por status</Typography>
              }
              style={{ textAlign: 'center' }}
            />

            {countedStatuses ? (
              <>
                <CardContent className={classes.content}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {countedStatuses.statusCount.map((status) => (
                        <TableRow key={uuidv4()} hover>
                          <StyledTableCell component="th" scope="row">
                            {status.status}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {status.documents}
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </>
            ) : (
              <CardContent
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Loader />
              </CardContent>
            )}
          </Card>

          <Card className={cx(classes.cardChart, cardShadowStyles.root)}>
            {countedStatuses ? (
              <>
                <ExtractReports handleConfirm={generateReport} />
                <CardContent className={classes.chartPieContent}>
                  <Chart
                    options={options}
                    series={series}
                    type="pie"
                    width="600"
                  />
                </CardContent>
              </>
            ) : (
              <CardContent
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Loader />
              </CardContent>
            )}
          </Card>
        </Box>
      </>
    );
  },
);

ChartStatusCount.propTypes = {
  date: PropTypes.array.isRequired,
  product: PropTypes.number.isRequired,
};

export default ChartStatusCount;
