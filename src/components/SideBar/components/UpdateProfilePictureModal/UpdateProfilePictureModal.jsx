/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { PrimaryButton, Spacing, Typography } from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';
import { dispatch } from '../../../../Config/store';
import DropzoneIncident from '../../../DropZoneIndicent';
import SnackAlert from '../../../SnackAlert';
import {
  Container, ContainerButton, Header, Click, Title,
} from './styles';

function UpdateProfilePictureModal({ onClose, email }) {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const SUCCESS_UPDATE_PICTURE = 'Tudo pronto! Sua foto de perfil foi atualizada com sucesso.';
  const ERROR_UPDATE_PICTURE = 'Ooops! Alguma coisa de errada aconteceu! Por favor, verifique os dados e tente novamente.';
  const ERROR_IMAGE = 'Deve ser feito o upload de uma foto';

  const handleFileUpload = (file) => {
    setImage(file);
  };

  const handleCloseModalAfterCreating = () => {
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleChangeNotification = () => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    }
  };

  const handleSubmitUpdatePicture = async () => {
    try {
      if (image) {
        setLoading(true);
        await dispatch.User.postProfilePictureAsync(image);
        await dispatch.User.saveUserAsync(email);

        setNotification(true);
        setError(false);
        setMessage(SUCCESS_UPDATE_PICTURE);
        handleCloseModalAfterCreating();
      } else {
        setError(true);
        setNotification(true);
        setMessage(ERROR_IMAGE);
      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(true);
      setMessage(ERROR_UPDATE_PICTURE);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose}>
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          <Title>FOTO DE PERFIL</Title>
          {' '}
        </Typography>
      </Header>
      <Typography fontSize="16px" vertical="5px">
        Foto de perfil
      </Typography>
      <DropzoneIncident onFileUploaded={handleFileUpload} />
      <Spacing vertical="15px" />

      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitUpdatePicture}
          loading={loading}
          disabled={loading}
        >
          Atualizar foto de perfil
        </PrimaryButton>
      </ContainerButton>
      <SnackAlert
        open={notification}
        handleClose={handleChangeNotification}
        severity={error ? 'error' : 'success'}
        message={message}
      />
    </Container>
  );
}

export default UpdateProfilePictureModal;
