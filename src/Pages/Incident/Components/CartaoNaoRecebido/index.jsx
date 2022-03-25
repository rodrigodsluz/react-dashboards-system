/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

import { OutlineButton } from '@d1.cx/components';
import { dispatch } from '../../../../Config/store';

import useStyles, { WrapperButton } from './styles';

const cartaoNaoRecebido = ({
  values,
  formLoaded,
  handleChange,
  loadingIncidents,
}) => {
  const [isZipCodeSearching, setIsZipCodeSearching] = useState(false);

  const zipCodeInfo = useSelector(
    (state) => state.ZipCode.searchZipCode,
    shallowEqual,
  );

  useEffect(() => {
    if (zipCodeInfo.data?.code === 200) {
      values.uf = zipCodeInfo.data.result.uf;
      values.city = zipCodeInfo.data.result.localidade;
      values.address = zipCodeInfo.data.result.logradouro;
    }
  }, [zipCodeInfo]);

  useEffect(() => {
    const timeoutName = setTimeout(async () => {
      if (values.zipCode !== '') {
        setIsZipCodeSearching(true);
        await dispatch.ZipCode.searchZipCodeAsync(values.zipCode);
        setIsZipCodeSearching(false);
      }
    }, 2500);

    return () => clearTimeout(timeoutName);
  }, [values.zipCode]);

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
          mask="99999-999"
          value={values.zipCode || ''}
          maskChar={null}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            return handleChange(e);
          }}
        >
          {() => (
            <TextField
              name="zipCode"
              id="text-field-zip-code"
              label="CEP"
              variant="outlined"
              fullWidth
              size="small"
            />
          )}
        </InputMask>
      </Grid>
      <Fade in={isZipCodeSearching} unmountOnExit>
        <Grid item xs={12}>
          <LinearProgress color="primary" />
        </Grid>
      </Fade>
      <Grid item xs={12}>
        <TextField
          name="address"
          value={values.address || ''}
          id="text-field-address"
          label="Logradouro"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={4}>
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
      <Grid item xs={8}>
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
      <Grid item xs={10}>
        <TextField
          name="city"
          value={values.city || ''}
          id="text-field-city"
          label="Cidade"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="uf"
          value={values.uf || ''}
          id="text-field-state"
          label="UF"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <InputMask
          mask={
            values.phone?.length >= 6 && values.phone?.[2] === '9'
              ? '(99) 99999-9999'
              : '(99) 9999-9999'
          }
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
          name="cardAddress"
          value={values.cardAddress || ''}
          id="text-field-card-address"
          label="Endereço de postagem do cartão"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          name="position"
          className={classes.radioGroup}
          row
          aria-label="position"
          onChange={(e) => handleChange(e)}
        >
          <Grid container>
            <FormLabel className={classes.formLabel} component="legend">
              Urgência no envio?
            </FormLabel>
          </Grid>
          <FormControlLabel
            className={classes.formControlLabel}
            value="sim"
            control={<Radio color="primary" />}
            label="Sim"
            labelPlacement="start"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value="não"
            control={<Radio color="primary" />}
            label="Não"
            labelPlacement="start"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.descriptionField}
          name="description"
          value={values.description || ''}
          id="text-field-description"
          label="Descrição"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          rowsMax={3}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item className={classes.submitButton} xs={12}>
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

cartaoNaoRecebido.defaultProps = {
  uf: '',
  city: '',
  email: '',
  phone: '',
  number: '',
  address: '',
  zipCode: '',
  complement: '',
  cardAddress: '',
  description: '',
  registration: '',
  lastFourDigits: '',
};

cartaoNaoRecebido.propTypes = {
  values: PropTypes.shape({
    uf: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    number: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    complement: PropTypes.string,
    cardAddress: PropTypes.string,
    description: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default cartaoNaoRecebido;
