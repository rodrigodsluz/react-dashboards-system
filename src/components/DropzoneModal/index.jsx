/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';

import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Typography, PrimaryButton } from '@d1.cx/components';

import Dropzone from '../DropZone';
import {
  useStyles,
  ModalContainer,
  ModalWrapper,
  DropzoneContainer,
  TextFieldContainer,
  CancelButton,
} from './styles';

const DropzoneModal = ({
  open,
  handleClose,
  addDocument,
  setSelectedFile,
  onSubmitFunction,
  loading,
}) => {
  const classes = useStyles();

  return (
    <ModalContainer
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalWrapper>
          {addDocument && (
            <DropzoneContainer>
              <Dropzone onFileUploaded={setSelectedFile} />
            </DropzoneContainer>
          )}
          <Box className={classes.formBox}>
            <Form id="formDoc" onSubmit={onSubmitFunction}>
              <TextFieldContainer>
                <Typography fontSize="18px" vertical="12px">
                  {addDocument
                    ? 'Nome do documento adicionado'
                    : 'Nome do documento pendente'}
                </Typography>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Nome"
                  size="small"
                  type="text"
                  fullWidth
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: 'numeric',
                  }}
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <Typography fontSize="18px" vertical="12px">
                  {addDocument
                    ? 'Descrição do documento adicionado'
                    : 'Descrição do documento pendente'}
                </Typography>
                <TextField
                  id="description"
                  name="description"
                  variant="outlined"
                  placeholder="Descrição"
                  size="small"
                  type="text"
                  fullWidth
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: 'numeric',
                  }}
                />
              </TextFieldContainer>

              <Box className={classes.buttonBox}>
                <CancelButton
                  type="button"
                  onClick={handleClose}
                  testID="btnCancelar"
                >
                  Cancelar
                </CancelButton>

                <PrimaryButton
                  type="submit"
                  color="primary"
                  autoFocus
                  testID="btnConfirmar"
                  loading={loading}
                >
                  Confirmar
                </PrimaryButton>
              </Box>
            </Form>
          </Box>
        </ModalWrapper>
      </Fade>
    </ModalContainer>
  );
};

DropzoneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  addDocument: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  onSubmitFunction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default DropzoneModal;
