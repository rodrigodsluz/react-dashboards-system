import React from 'react';

import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';

import { OutlineButton } from '@d1.cx/components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles, { WrapperButton } from './styles';

import DropZone from '../../../../../components/DropZone';

const CancelamentoCartaoObito = ({
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
      <Grid item className={classes.dropZone} sm={12}>
        <Typography style={{ padding: ' 0 0 10px 0' }}>
          Certidão de óbito
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

CancelamentoCartaoObito.defaultProps = {
  values: PropTypes.shape({
    cpf: '',
    registration: '',
    lastFourDigits: '',
    description: '',
  }),
};

CancelamentoCartaoObito.propTypes = {
  values: PropTypes.shape({
    cpf: PropTypes.string,
    registration: PropTypes.string,
    lastFourDigits: PropTypes.string,
    description: PropTypes.string,
  }),

  formLoaded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default CancelamentoCartaoObito;
