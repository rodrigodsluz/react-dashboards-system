import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import { OutlineButton } from '@d1.cx/components';
import DropZone from '../../../../../components/DropZone';
import TextFieldMoney from '../../../../../components/TextFieldMoney';

import useStyles, { WrapperButton } from './styles';

const AnaliseFilaCreditoConta = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
  setSelectedFile,
}) => {
  const classes = useStyles();

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

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
          name="companyName"
          value={values.companyName || ''}
          id="text-field-companyName"
          label="Nome/razão social"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputMask
          mask={values.phone?.length >= 6 && values.phone?.[2] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
          value={values.phone || ''}
          maskChar={null}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            return handleChange(e);
          }}
        >
          {() => (
            <TextField
              name="phone"
              id="text-field-phone"
              label="Telefone"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="AccountOfThirdPartyOrHolder"
          value={values.AccountOfThirdPartyOrHolder || ''}
          id="text-field-AccountOfThirdPartyOrHolder"
          label="Conta de terceiro ou titular"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldMoney
          name="value"
          value={values.value || ''}
          id="text-field-value"
          label="Valor"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name="bankCode"
          value={values.bankCode || ''}
          id="text-field-value"
          label="Código do banco"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name="agency"
          value={values.agency || ''}
          id="text-field-agency"
          label="Agência"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name="accountWithDigit"
          value={values.accountWithDigit || ''}
          id="text-field-accountWithDigit"
          label="Conta com digito"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Tipo de conta</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="accountType"
            value={values.accountType || ''}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="corrente"
              control={<Radio />}
              label="Corrente"
            />
            <FormControlLabel
              value="poupanca"
              control={<Radio />}
              label="Poupança"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item className={classes.dropZone} sm={12}>
        <Typography style={{ padding: ' 0 0 10px 0' }}>
          Comprovante de Pagamento
        </Typography>
        <DropZone fullWidth onFileUploaded={handleFileUpload} />
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

AnaliseFilaCreditoConta.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    companyName: '',
    phone: '',
    AccountOfThirdPartyOrHolder: '',
    value: '',
    bankCode: '',
    agency: '',
    accountWithDigit: '',
    accountType: '',
    description: '',
  }),
};

AnaliseFilaCreditoConta.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    companyName: PropTypes.string,
    phone: PropTypes.string,
    AccountOfThirdPartyOrHolder: PropTypes.string,
    value: PropTypes.string,
    bankCode: PropTypes.string,
    agency: PropTypes.string,
    accountWithDigit: PropTypes.string,
    accountType: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
};

export default AnaliseFilaCreditoConta;
