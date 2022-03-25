/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';

import useStyles from './styles';

const TableMaker = ({ incidents }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="incidents table">

        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.noWrap}><b>Protocolo</b></TableCell>
            <TableCell align="center"><b>Fila</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incidentsItem) => (
            <TableRow key={uuidv4()}>
              <TableCell component="th" className={classes.noWrap} scope="row">{incidentsItem.protocol}</TableCell>
              <TableCell align="center">{incidentsItem.modality_identifier}</TableCell>
              <TableCell align="center">
                <span className={classes.span}>{incidentsItem.status.name}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableMaker.propTypes = {
  incidents: PropTypes.array.isRequired,
};

export default TableMaker;
