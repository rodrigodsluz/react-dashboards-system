import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { OutlineButton } from '@d1.cx/components';

import useStyles, { WrapperButton, WrapperDrop, Container } from './styles';
import DropzoneIncident from '../../../../components/DropZoneIndicent';

const AlteracoesCadastrais = ({
  values,
  handleChange,
  setSelectedFile,
  formLoaded,
  loadingIncidents,
}) => {
  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const classes = useStyles();

  return formLoaded && !loadingIncidents ? (
    <Container>
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
            mask={
              values.phone?.length >= 6 && values.phone?.[2] === '9'
                ? '(99) 99999-9999'
                : '(99) 9999-9999'
            }
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
            name="wannaChange"
            value={values.wannaChange || ''}
            id="text-field-wanna-change"
            label="Dado que quer alterar"
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
            rowsMax={3}
            onChange={(e) => handleChange(e)}
          />
        </Grid>

        <WrapperDrop>
          <DropzoneIncident onFileUploaded={handleFileUpload} />
        </WrapperDrop>
        <WrapperButton>
          <OutlineButton type="submit">Enviar</OutlineButton>
        </WrapperButton>
      </Grid>
    </Container>
  ) : (
    <></>
  );
};

AlteracoesCadastrais.defaultProps = {
  values: {
    registration: '',
    email: '',
    phone: '',
    wannaChange: '',
    description: '',
    lastFourDigits: '',
  },
};

AlteracoesCadastrais.propTypes = {
  values: PropTypes.shape({
    registration: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    wannaChange: PropTypes.string,
    description: PropTypes.string,
    lastFourDigits: PropTypes.string,
  }),

  setSelectedFile: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formLoaded: PropTypes.bool.isRequired,
  loadingIncidents: PropTypes.bool.isRequired,
};

export default AlteracoesCadastrais;
