import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import { OutlineButton } from '@d1.cx/components';
import TextField from '@material-ui/core/TextField';
import useStyles, { WrapperButton } from './styles';

import TextFieldMoney from '../../../../../components/TextFieldMoney';

const RetornoLimiteCentralAcima30K = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
}) => {
  const classes = useStyles();

  return formLoaded && !loadingIncidents ? (
    <Grid container style={{ marginTop: '10px' }} spacing={1}>
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
      <Grid item xs={12}>
        <TextFieldMoney
          className={classes.inputMoney}
          label="Limite desejado"
          name="desiredLimit"
          fullWidth
          value={values.desiredLimit || ''}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="additionalCommentsCentral"
          value={values.additionalCommentsCentral || ''}
          id="text-field-additionalCommentsCentral"
          label="Observações adicionais da Central"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.gridItem} xs={12}>
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

RetornoLimiteCentralAcima30K.defaultProps = {
  values: PropTypes.shape({
    registration: '',
    lastFourDigits: '',
    desiredLimit: '',
    creditAreaResponse: '',
    additionalCommentsCentral: '',
  }),
};

RetornoLimiteCentralAcima30K.propTypes = {
  values: PropTypes.shape({
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    desiredLimit: PropTypes.string,
    additionalCommentsCentral: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default RetornoLimiteCentralAcima30K;
