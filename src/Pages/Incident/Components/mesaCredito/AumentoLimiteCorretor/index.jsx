/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';

import { useSelector, shallowEqual } from 'react-redux';

import InputMask from 'react-input-mask';

import PropTypes from 'prop-types';

import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { OutlineButton } from '@d1.cx/components';
import { dispatch } from '../../../../../Config/store';

import useStyles, { WrapperButton } from './styles';

const AumentoLimiteCorretor = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
}) => {
  const [isZipCodeSearching, setIsZipCodeSearching] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const timeoutName = setTimeout(async () => {
      if (values.zipCode && values.zipCode !== '' && values.zipCode.length >= 10) {
        setIsZipCodeSearching(true);
        await dispatch.ZipCode.searchZipCodeAsync(values.zipCode);
        setIsZipCodeSearching(false);
      }
    }, 2500);

    return () => clearTimeout(timeoutName);
  }, [values.zipCode]);

  const zipCodeInfo = useSelector(
    (state) => state.ZipCode.searchZipCode,
    shallowEqual,
  );

  useEffect(() => {
    if (zipCodeInfo.data?.code === 200) {
      values.state = zipCodeInfo.data.result.uf;
      values.city = zipCodeInfo.data.result.localidade;
      values.address = zipCodeInfo.data.result.logradouro;
    }
  }, [zipCodeInfo]);

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
        <InputMask
          mask="(99)9 9999-9999"
          value={values.mobileNumber || ''}
          onChange={(e) => handleChange(e)}
          required
          size="small"
          fullWidth
        >
          {() => (
            <TextField
              name="mobileNumber"
              id="text-field-mobileNumber"
              label="Celular"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
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
          mask="99.999-999"
          value={values.zipCode || ''}
          onChange={(e) => handleChange(e)}
          className={classes.textInput}
          required
          size="small"
          fullWidth
        >
          {() => (
            <TextField
              name="zipCode"
              value={values.zipCode || ''}
              id="text-field-zipCode"
              label="CEP"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
      </Grid>
      <Fade in={isZipCodeSearching} unmountOnExit>
        <Grid item xs={12} className={classes.gridItem}>
          <LinearProgress color="primary" />
        </Grid>
      </Fade>
      <Grid item xs={10}>
        <TextField
          name="city"
          value={values.city || ''}
          id="text-field-city"
          label="Cidade"
          variant="outlined"
          fullWidth
          size="small"
          multiline
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="state"
          value={values.state || ''}
          id="text-field-state"
          label="UF"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="address"
          value={values.address || ''}
          id="text-field-address"
          label="Nome da rua"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="number"
          value={values.number || ''}
          id="text-field-number"
          label="Número"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="complement"
          value={values.complement || ''}
          id="text-field-complement"
          label="Complemento"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="neighborhood"
          value={values.neighborhood || ''}
          id="text-field-neighborhood"
          label="Bairro"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cliente possui o plástico</FormLabel>
          <RadioGroup
            aria-label="hasPlastic"
            name="hasPlastic"
            value={values.hasPlastic || ''}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          value={values.description || ''}
          id="text-field-description"
          label="Description"
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

AumentoLimiteCorretor.defaultProps = {
  values: PropTypes.shape({
    registration: '',
    lastFourDigits: '',
    mobileNumber: '',
    email: '',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    hasPlastic: '',
    description: '',
  }),
};

AumentoLimiteCorretor.propTypes = {
  values: PropTypes.shape({
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    mobileNumber: PropTypes.string,
    email: PropTypes.string,
    zipCode: PropTypes.string,
    address: PropTypes.string,
    number: PropTypes.string,
    complement: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    hasPlastic: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default AumentoLimiteCorretor;
