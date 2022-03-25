/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { OutlineButton } from '@d1.cx/components';
import { dispatch } from '../../../../../Config/store';

import useStyles, { WrapperButton } from './styles';

const Rechamada = ({
  values, handleChange, formLoaded, loadingIncidents,
}) => {
  const [recallReasons, setRecallReasons] = useState([]);

  const classes = useStyles();

  useEffect(async () => {
    await dispatch.Reasons.loadReasonsAsync();
  }, []);

  /* reasons by api */
  const reasons = useSelector((state) => state.Reasons.reasons, shallowEqual);

  useEffect(() => {
    if (reasons) {
      const reasonsFiltered = reasons.filter(
        (reason) => reason.name !== 'Rechamada'
          && reason.name !== 'Rechamada – confirmada',
      );
      setRecallReasons(reasonsFiltered);
    }
  }, [reasons]);

  return formLoaded && !loadingIncidents ? (
    <Grid container spacing={1}>
      <Grid item className={classes.gridItem} xs={12}>
        <TextField
          name="registration"
          value={values.registration || ''}
          id="text-field-registration"
          label="Matrícula"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputMask
          mask="9999"
          value={values.lastFourDigits || ''}
          maskChar={null}
          onChange={(e) => handleChange(e)}
        >
          {() => (
            <TextField
              name="lastFourDigits"
              id="text-field-last-four-digits"
              label="Últimos 4 dígitos do cartão"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="reasons"
          options={recallReasons}
          getOptionLabel={(option) => option.name}
          clearOnEscape
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Motivo da rechamada"
              variant="outlined"
            />
          )}
          onChange={(_event, value) => {
            if (value) {
              values.selectedReason = value.name;
              values.product_id = value.product_id;
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          value={values.description || ''}
          id="text-field-description"
          label="Descrição"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          rows={3}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

Rechamada.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    description: '',
    selectedReason: '',
    product: '',
  }),
};

Rechamada.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    description: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    selectedReason: PropTypes.string,
    product_id: PropTypes.number,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default Rechamada;
