import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { OutlineButton } from '@d1.cx/components';
import useStyles, { WrapperButton } from './styles';

const SAC = ({
  values, handleChange, formLoaded, loadingIncidents,
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
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

SAC.defaultProps = {
  values: {
    email: '',
    registration: '',
    lastFourDigits: '',
  },
};

SAC.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
  }),
  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default SAC;
