/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import PropTypes from 'prop-types';
import LottieNotification from '../LottieNotification/LottieNotification';
import './estilos.css';
import { Container } from './styles';

const DropzoneIncident = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);

      /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.path)
        ? setSelectedFileUrl(fileUrl)
        : setSelectedFileUrl('https://i.ibb.co/9H7M3rr/documents-symbol.png');
      onFileUploaded(file);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFileUrl ? (
        <span>
          <LottieNotification
            hiddenBg
            removeAbsolute
            animation="files"
            color="#A8A8A8"
            width={200}
            height={150}
            description="Arquivo adicionado!"
          />
        </span>
      ) : (
        <span>
          <LottieNotification
            hiddenBg
            removeAbsolute
            animation="upload"
            width={200}
            height={150}
            color="#A8A8A8"
            description="Arraste ou clique aqui para adicionar o documento"
          />
        </span>
      )}
    </Container>
  );
};
DropzoneIncident.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};
export default DropzoneIncident;
