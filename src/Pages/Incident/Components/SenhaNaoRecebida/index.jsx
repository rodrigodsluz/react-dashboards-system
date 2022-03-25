import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';

const SenhaNaoRecebida = ({
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
        <TextField
          name="email"
          value={values.email || ''}
          id="text-field-email"
          label="E-mail"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputMask
          mask={values.phone?.length >= 6 && values.phone?.[2] === '9' ? '(99) 99999-9999' : '(99) 9999-9999'}
          maskChar={null}
          value={values.phone || ''}
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
          name="description"
          value={values.description || ''}
          id="text-field-description"
          label="Descrição"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          rowsMax={3}
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

SenhaNaoRecebida.defaultProps = {
  values: {
    phone: '',
    email: '',
    description: '',
    registration: '',
    lastFourDigits: '',
  },
};

SenhaNaoRecebida.propTypes = {
  values: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default SenhaNaoRecebida;
