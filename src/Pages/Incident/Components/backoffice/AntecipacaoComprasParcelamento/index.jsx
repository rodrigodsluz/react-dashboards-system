import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';
import DateSinglePicker from '../../../../../components/DateSinglePicker';
import TextFieldMoney from '../../../../../components/TextFieldMoney';

const AntecipacaoComprasParcelamento = ({
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
      <Grid item xs={6}>
        <DateSinglePicker
          name="transactionDate"
          label="Data da transação"
          value={values.transactionDate}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.siblingDateLabel} xs={6}>
        <TextFieldMoney
          name="transactionValue"
          value={values.transactionValue || ''}
          id="text-field-transactionValue"
          label="Valor da transação"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="transactionDescription"
          value={values.transactionDescription || ''}
          id="text-field-transactionDescription"
          label="Descrição da transação"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="FieldDescriptionRecord"
          value={values.FieldDescriptionRecord || ''}
          id="text-field-FieldDescriptionRecord"
          label="Campo para registro da descrição"
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

AntecipacaoComprasParcelamento.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    transactionDate: '',
    transactionValue: '',
    transactionDescription: '',
    FieldDescriptionRecord: '',
  }),
};

AntecipacaoComprasParcelamento.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    transactionDate: PropTypes.string,
    transactionValue: PropTypes.string,
    transactionDescription: PropTypes.string,
    FieldDescriptionRecord: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default AntecipacaoComprasParcelamento;
