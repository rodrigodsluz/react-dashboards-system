import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';

import TextFieldMoney from '../../../../../components/TextFieldMoney';
import DateSinglePicker from '../../../../../components/DateSinglePicker';

const QuitacaoParcial = ({
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
        <DateSinglePicker
          name="dateOfInstallment"
          label="Data do parcelamento"
          value={values.dateOfInstallment}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="parcelsAnticipated"
          value={values.parcelsAnticipated || ''}
          id="text-field-parcelsAnticipated"
          label="Nº das parcelas a antecipar"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldMoney
          name="parcelValue"
          id="text-field-parcelValue"
          label="Valor da parcela"
          variant="outlined"
          fullWidth
          size="small"
          value={values.parcelValue || ''}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldMoney
          name="totalAnticipationAmount"
          id="text-field-totalAnticipationAmount"
          label="Valor total da antecipação"
          variant="outlined"
          fullWidth
          size="small"
          value={values.totalAnticipationAmount || ''}
          handleChange={handleChange}
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

QuitacaoParcial.defaultProps = {
  values: {
    cpf: '',
    registration: '',
    lastFourDigits: '',
    DateOfInstallment: '',
    parcelValue: '',
    parcelsAnticipated: '',
    totalAnticipationAmount: '',
  },
};

QuitacaoParcial.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    dateOfInstallment: PropTypes.string,
    parcelValue: PropTypes.string,
    parcelsAnticipated: PropTypes.string,
    totalAnticipationAmount: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default QuitacaoParcial;
