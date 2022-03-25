import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import { OutlineButton } from '@d1.cx/components';
import TextField from '@material-ui/core/TextField';
import useStyles, { WrapperButton } from './styles';

const UpDownAlteracaoCategoriaCartoes = ({
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
      <Grid item className={classes.gridItem} xs={12}>
        <TextField
          name="desiredCategory"
          value={values.desiredCategory || ''}
          id="text-field-desiredCategory"
          label="Categoria desejada"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
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

UpDownAlteracaoCategoriaCartoes.defaultProps = {
  values: PropTypes.shape({
    registration: '',
    lastFourDigits: '',
    desireCategory: '',
    description: '',
  }),
};

UpDownAlteracaoCategoriaCartoes.propTypes = {
  values: PropTypes.shape({
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    desiredCategory: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default UpDownAlteracaoCategoriaCartoes;
