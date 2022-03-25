/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import LottieNotification from '../LottieNotification/LottieNotification';
import './estilos.css';

const Dropzone = ({ onFileUploaded }) => {
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
    <Paper className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFileUrl ? (
        <span>
          <LottieNotification
            animation="files"
            color="#A8A8A8"
            description="Arquivo adicionado!"
          />
        </span>
      ) : (
        <span>
          <LottieNotification
            animation="upload"
            color="#A8A8A8"
            description="Arraste ou clique aqui para adicionar o documento"
          />
        </span>
      )}
    </Paper>
  );
};
Dropzone.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};
export default Dropzone;
