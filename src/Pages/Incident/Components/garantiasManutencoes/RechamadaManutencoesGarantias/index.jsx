import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';

const RechamadaManutencoesGarantias = ({
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
      <FormGroup>
        <FormControlLabel
          label="Reenvio de Cartão"
          control={(
            <Checkbox
              color="primary"
              name="resendCard"
              className={classes.checkbox}
              checked={values.resendCard || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Fatura não Recebida"
          control={(
            <Checkbox
              color="primary"
              name="invoiceNotReceived"
              className={classes.checkbox}
              checked={values.invoiceNotReceived || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Senha não recebida"
          control={(
            <Checkbox
              color="primary"
              name="passwordNotReceived"
              className={classes.checkbox}
              checked={values.passwordNotReceived || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Alterações Cadastrais"
          control={(
            <Checkbox
              color="primary"
              name="registrationChanges"
              className={classes.checkbox}
              checked={values.registrationChanges || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Cancelamento de Cartão por Óbito"
          control={(
            <Checkbox
              color="primary"
              name="cardCancellationDeath"
              className={classes.checkbox}
              checked={values.cardCancellationDeath || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Cadastro de Procurador e/ou Curador"
          control={(
            <Checkbox
              color="primary"
              name="procuratorRegister"
              className={classes.checkbox}
              checked={values.procuratorRegister || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Problemas na utilização do aplicativo"
          control={(
            <Checkbox
              color="primary"
              name="appUsageProblems"
              className={classes.checkbox}
              checked={values.appUsageProblems || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Não recebe SMS/Push de compras"
          control={(
            <Checkbox
              color="primary"
              name="notReceivingPurchaseSmsPush"
              className={classes.checkbox}
              checked={values.notReceivingPurchaseSmsPush || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
        <FormControlLabel
          label="Problemas no saque ATM"
          control={(
            <Checkbox
              color="primary"
              name="withdrawProblems"
              className={classes.checkbox}
              checked={values.withdrawProblems || false}
              onChange={(e) => handleChange(e)}
            />
          )}
        />
      </FormGroup>
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

RechamadaManutencoesGarantias.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    resendCard: false,
    invoiceNotReceived: false,
    passwordNotReceived: false,
    registrationChanges: false,
    cardCancellationDeath: false,
    procuratorRegister: false,
    appUsageProblems: false,
    notReceivingPurchaseSms: false,
    withdrawProblems: false,
    description: '',
  }),
};

RechamadaManutencoesGarantias.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    resendCard: PropTypes.bool,
    invoiceNotReceived: PropTypes.bool,
    passwordNotReceived: PropTypes.bool,
    registrationChanges: PropTypes.bool,
    cardCancellationDeath: PropTypes.bool,
    procuratorRegister: PropTypes.bool,
    appUsageProblems: PropTypes.bool,
    notReceivingPurchaseSmsPush: PropTypes.bool,
    withdrawProblems: PropTypes.bool,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default RechamadaManutencoesGarantias;
