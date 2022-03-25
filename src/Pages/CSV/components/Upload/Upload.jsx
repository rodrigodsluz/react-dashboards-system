/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import CSVReader from 'react-csv-reader';
import useUpload from './useUpload';
import UploadGIF from '../../../../assets/upload.gif';
import FileGIF from '../../../../assets/files.gif';
import './style.css';

const Upload = ({ uploaded }) => {
  const { handleUploadCSV } = useUpload();
  return (
    <label
      htmlFor="file"
      className="animation"
      id="thumbnail"
      style={{ backgroundImage: `url(${uploaded ? FileGIF : UploadGIF})` }}
    >
      <CSVReader
        name="file"
        id="file"
        cssInputClass="csv-input"
        parserOptions={{
          header: true,
        }}
        inputStyle={{
          width: '100%',
          cursor: 'pointer',
        }}
        onFileLoaded={handleUploadCSV}
      />
    </label>
  );
};

export default Upload;
