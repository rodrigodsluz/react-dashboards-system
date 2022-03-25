import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton, WrapperDrop, Textarea } from './styles';
import DateSinglePicker from '../../../../../components/DateSinglePicker';
import DropzoneIncident from '../../../../../components/DropZoneIndicent';
import TextFieldMoney from '../../../../../components/TextFieldMoney';

const ContestacaoMovimentacaoDesacordo = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
  setSelectedFile,
}) => {
  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

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
      <Grid item className={classes.gridItem} xs={12}>
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
      <Grid item className={classes.gridItem} xs={12}>
        <InputMask
          mask="999.999.999-99"
          value={values.cpf || ''}
          maskChar={null}
          onChange={(e) => handleChange(e)}
        >
          {() => (
            <TextField
              name="cpf"
              id="text-field-cpf"
              label="CPF"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <TextField
          name="accountNumber"
          value={values.accountNumber || ''}
          id="text-field-accountNumber"
          label="Número da conta"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <TextField
          name="client"
          value={values.client || ''}
          id="text-field-client"
          label="Nome do cliente"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <DateSinglePicker
          name="date"
          label="Data"
          value={values.date}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <TextFieldMoney
          name="transaction"
          value={values.transaction || ''}
          id="text-field-transaction"
          label="Valor da transação"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <TextFieldMoney
          name="contestation"
          value={values.contestation || ''}
          id="text-field-contestation"
          label="Valor da contestação"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <Textarea
          name="description"
          value={values.description || ''}
          id="text-area-description"
          label="Descrição detalhada"
          onChange={(e) => handleChange(e)}
          placeholder="Descrição detalhada"
        />
      </Grid>
      <WrapperDrop>
        <DropzoneIncident onFileUploaded={handleFileUpload} />
      </WrapperDrop>
      <WrapperButton>
        <OutlineButton type="submit">Enviar</OutlineButton>
      </WrapperButton>
    </Grid>
  ) : (
    <></>
  );
};

ContestacaoMovimentacaoDesacordo.defaultProps = {
  values: PropTypes.shape({
    registration: '',
    lastFourDigits: '',
    cpf: '',
    accountNumber: '',
    client: '',
    date: '',
    description: '',
    transaction: null,
    contestation: null,
  }),
};

ContestacaoMovimentacaoDesacordo.propTypes = {
  values: PropTypes.shape({
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    cpf: PropTypes.string,
    accountNumber: PropTypes.string,
    client: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    transaction: PropTypes.string,
    contestation: PropTypes.string,
  }),

  setSelectedFile: PropTypes.func.isRequired,
  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default ContestacaoMovimentacaoDesacordo;
