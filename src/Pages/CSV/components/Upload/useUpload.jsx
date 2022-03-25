/* eslint-disable consistent-return */
import { useCallback } from 'react';
import { dispatch } from '../../../../Config/store';

const useUpload = () => {
  const handleConvertObjectToArrayHeaders = useCallback((data) => {
    if (data) {
      const keys = Object.keys(data[0]);
      return keys;
    }
  }, []);

  const handleUploadCSV = useCallback(async (data, fileInfo) => {
    const headers = handleConvertObjectToArrayHeaders(data);
    await dispatch.CSV.setCSVBodyAsync(data);
    await dispatch.CSV.setUploadDataCSVAsync(headers);
    await dispatch.CSV.setInfosFileAsync(fileInfo);
  }, []);

  return {
    handleUploadCSV,
  };
};

export default useUpload;
