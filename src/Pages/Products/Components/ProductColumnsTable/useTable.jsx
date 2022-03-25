/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../Config/store';
import useToggleNotification from '../../../../hooks/useToggleNotification';

const ERROR_API = 'Ops! Alguma coisa deu errado! Por favor, verifique sua conexão e tente novamente!';

function useTable() {
  const selectedProduct = useSelector(
    (state) => state.Products.selectedProductId,
  );

  const [open, handleChangeNotification, handleClose] = useToggleNotification();
  const [errorAPI, setErrorAPI] = useState(false);
  const [message, setMessage] = useState('');
  const [headers, setHeaders] = useState([]);

  const handleGetAllInfosTable = useCallback(async () => {
    try {
      await dispatch.Document.loadDocumentsWithFiltersAsync({
        product: selectedProduct,
        page: 1,
        limit: 10,
      });
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    }
  }, [selectedProduct]);

  const handleGetHeaders = useCallback(
    (data) => {
      if (data) {
        setHeaders(data);
      }
    },
    [headers],
  );

  useEffect(() => {
    if (selectedProduct) {
      handleGetAllInfosTable();
    }
  }, [selectedProduct]);

  return {
    open,
    handleClose,
    errorAPI,
    handleGetHeaders,
    headers,
  };
}

export default useTable;
