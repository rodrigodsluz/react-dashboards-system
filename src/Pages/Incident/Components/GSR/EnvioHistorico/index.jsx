import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import { OutlineButton } from '@d1.cx/components';
import DateRangePicker from '../../../../../components/DateRangePicker';

import useStyles, { WrapperButton } from './styles';

const dateFormat = 'DD/MM/YYYY';
const dateRangeToString = (range = [new Date(), new Date()]) => range.map((date) => moment(date).format(dateFormat)).join(' - ');
const stringToDateRange = (str = dateRangeToString()) => str.split(' - ').map((date) => moment(date, dateFormat).toDate());

const EnvioHistorico = ({
  values,
  handleChange,
  formLoaded,
  loadingIncidents,
}) => {
  const classes = useStyles();

  useEffect(() => {
    handleChange({ target: { name: 'dates', value: dateRangeToString() } });
  }, []);

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
        <DateRangePicker
          date={stringToDateRange(values.dates)}
          setDate={(range) => handleChange({ target: { name: 'dates', value: dateRangeToString(range) } })}
          showButton={false}
          label="Datas"
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
        <TextField
          name="address"
          value={values.address || ''}
          id="text-field-address"
          label="Endereço"
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

EnvioHistorico.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    description: '',
    dates: dateRangeToString(),
    phone: '',
    email: '',
    address: '',
  }),
};

EnvioHistorico.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,

    dates: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default EnvioHistorico;
