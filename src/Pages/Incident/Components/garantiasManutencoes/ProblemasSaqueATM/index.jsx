/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';
import DateSinglePicker from '../../../../../components/DateSinglePicker';
import TextFieldMoney from '../../../../../components/TextFieldMoney';

const ProblemasSaqueATM = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
}) => {
  const classes = useStyles();

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
        <TextFieldMoney
          name="withdraw"
          value={values.withdraw || ''}
          id="text-field-withdraw"
          label="Valor do Saque"
          variant="outlined"
          fullWidth
          size="small"
          min="0"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <DateSinglePicker
          name="date"
          label="Data do saque"
          value={values.date}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 24 }}>
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

ProblemasSaqueATM.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    withdraw: '',
  }),
};

ProblemasSaqueATM.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    date: PropTypes.string,
    withdraw: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default ProblemasSaqueATM;
