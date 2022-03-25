/* eslint-disable no-unused-vars */
import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import DollarFormat from '../../../../../components/DollarFormat';

import useStyles, { WrapperButton } from './styles';

const RecalculoFatura = ({
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
        <TextField
          name="automaticPayment"
          value={values.automaticPayment || ''}
          id="text-field-automaticPayment"
          label="Parcelamento automático"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="contestation"
          value={values.contestation || ''}
          id="text-field-contestation"
          label="Contestação"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="dollarPurchases"
          value={values.dollarPurchases || ''}
          id="text-field-dollarPurchases"
          label="Compras em dólar"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
          InputProps={{
            inputComponent: DollarFormat,
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

RecalculoFatura.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',

    automaticPayment: '',
    contestation: '',
    dollarPurchases: '',
    description: '',
  }),
};

RecalculoFatura.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,

    automaticPayment: PropTypes.string,
    contestation: PropTypes.string,
    dollarPurchases: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default RecalculoFatura;
