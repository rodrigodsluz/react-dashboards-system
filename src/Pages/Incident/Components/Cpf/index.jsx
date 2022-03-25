/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import PropTypes from 'prop-types';

import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

import TableMaker from './utils/TableMaker';

import { dispatch } from '../../../../Config/store';

import useStyles, { Container, Wrapper } from './styles';

const Cpf = ({
  cpf,
  formLoaded,
  setFormLoaded,
  loadingIncidents,
  setLoadingIncidents,
  incidents,
  setIncidents,
  handleChange,
}) => {
  const incidentsLoaded = useSelector(
    (state) => state.Reasons.loadByCpf,
    shallowEqual,
  );

  useEffect(() => {
    const incidentsSorted = incidentsLoaded.sort(
      (a, b) => a.sla_start <= b.sla_start,
    );
    if (incidentsSorted.length > 5) {
      const incidentsSliced = incidentsSorted.slice(0, 5);
      setIncidents(incidentsSliced);
    } else {
      setIncidents(incidentsSorted);
    }
  }, [incidentsLoaded]);

  const classes = useStyles();

  const handleSearchCpfButton = async () => {
    try {
      if (cpf !== '') {
        setLoadingIncidents(true);
        setFormLoaded(false);
        await dispatch.Reasons.loadByCpfAsync(cpf);
      }
    } finally {
      setLoadingIncidents(false);
      setFormLoaded(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <InputMask
          mask="999.999.999-99"
          maskChar={null}
          value={cpf || ''}
          required
          fullWidth
          autoFocus
          size="small"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            handleChange(e);
            if (formLoaded) {
              setFormLoaded(false);
              setIncidents([]);
            }
          }}
        >
          {() => (
            <TextField
              name="cpf"
              id="text-field-cpf"
              label="CPF"
              variant="outlined"
              fullWidth
              autoFocus
              size="small"
            />
          )}
        </InputMask>

        <IconButton
          aria-label="search"
          className={classes.iconButton}
          onClick={() => handleSearchCpfButton()}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Wrapper>
      <Fade in={loadingIncidents} unmountOnExit>
        <Grid item xs={12} className={classes.gridItem}>
          <LinearProgress color="primary" />
        </Grid>
      </Fade>
      <Grid item xs={12} className={classes.gridItem}>
        {formLoaded ? <TableMaker incidents={incidents} /> : <></>}
      </Grid>
    </Container>
  );
};

Cpf.defaultProps = {
  cpf: '',
};

Cpf.propTypes = {
  cpf: PropTypes.string,
  formLoaded: PropTypes.bool.isRequired,
  setFormLoaded: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
  setLoadingIncidents: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
  setIncidents: PropTypes.func.isRequired,

  handleChange: PropTypes.func.isRequired,
};

export default Cpf;
