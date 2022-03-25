/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../Config/store';
import useChangeText from '../../../../hooks/useChanceText';
import useCheckEmptyInput from '../../../../hooks/useCheckEmptyInput';
import useToggleNotification from '../../../../hooks/useToggleNotification';

const SUCCESS_API = 'Tudo pronto! Sua coluna foi criada com sucesso!';
const SUCCESS_UPDATE_BY_ID = 'Tudo pronto! Sua coluna foi atualizada com sucesso!';
const SUCCESS_REMOVE_BY_ID = 'Área removida com sucesso! ';
const ERROR_API = 'Ops! Alguma coisa deu errado! Por favor, verifique sua conexão e tente novamente!';

function useProductColumns() {
  const selectedProduct = useSelector(
    (state) => state.Products.selectedProductId,
  );
  const [name, handleChangeName, handleSetInputName] = useChangeText();
  const [belongs, handleChangeBelongs, handleSetInputBelongs] = useChangeText();
  const [description, handleChangeDescription, handleSetInputDescription] = useChangeText();
  const [type, setType] = useState('');
  const productInputError = useCheckEmptyInput(name);
  const descriptionTextAreaError = useCheckEmptyInput(description);
  const belongsError = useCheckEmptyInput(belongs);
  const typeError = useCheckEmptyInput(type);
  const [open, handleChangeNotification, handleClose] = useToggleNotification();
  const [errorAPI, setErrorAPI] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: false,
    description: false,
    belongs: false,
    type: false,
  });

  const TYPES = ['string', 'number', 'date'];

  const getAllProductsColumns = useCallback(async () => {
    try {
      await dispatch.ProductColumn.loadProductColumnAsync(selectedProduct);
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    }
  }, [selectedProduct]);

  const handleChangeType = useCallback(
    ({ target }) => {
      setType(target.value);
    },
    [type],
  );

  const handleSubmit = useCallback(async () => {
    setFormErrors(() => ({
      name: productInputError,
      description: descriptionTextAreaError,
      belongs: belongsError,
      type: typeError,
    }));
    setErrorAPI(false);

    try {
      setLoading(true);
      const response = await dispatch.ProductColumn.createNewProductColumn({
        name,
        description,
        belongs: [belongs],
        type,
        product_id: selectedProduct,
      });

      const { id } = response;

      if (id) {
        setMessage(SUCCESS_API);
      }
      await dispatch.Document.loadDocumentsWithFiltersAsync({
        product: selectedProduct,
        page: 1,
        limit: 10,
      });
      handleChangeNotification(true);
      handleSetInputName('');
      handleSetInputDescription('');
      handleSetInputBelongs('');
      setType('');

      getAllProductsColumns();
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    } finally {
      setLoading(false);
    }
  }, [
    name,
    description,
    belongs,
    type,
    formErrors,
    descriptionTextAreaError,
    productInputError,
    belongsError,
    typeError,
    errorAPI,
    loading,
    selectedProduct,
  ]);

  const handleRemoveErrors = useCallback(() => {
    if (!productInputError) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: productInputError,
      }));
    }

    if (!descriptionTextAreaError) {
      setFormErrors((prevState) => ({
        ...prevState,
        description: descriptionTextAreaError,
      }));
    }

    if (!belongsError) {
      setFormErrors((prevState) => ({
        ...prevState,
        belongs: belongsError,
      }));
    }

    if (!typeError) {
      setFormErrors((prevState) => ({
        ...prevState,
        type: typeError,
      }));
    }
  }, [productInputError, descriptionTextAreaError, belongsError, typeError]);

  const handleResetInptus = useCallback(() => {
    handleSetInputName('');
    handleSetInputDescription('');
    handleSetInputBelongs('');
    setType('');
    setSelectedItem('');
  }, [name, description, belongs, type, selectedItem]);

  const handleRemoveProductById = useCallback(
    async (value) => {
      try {
        setErrorAPI(false);
        setLoading(true);
        await dispatch.ProductColumn.removeProductColumnById({
          id: value,
        });
        await dispatch.Document.loadDocumentsWithFiltersAsync({
          product: selectedProduct,
          page: 1,
          limit: 10,
        });
        setMessage(SUCCESS_REMOVE_BY_ID);
        handleChangeNotification(true);
        handleResetInptus();
        getAllProductsColumns();
      } catch (error) {
        setErrorAPI(true);
        setMessage(ERROR_API);
        handleChangeNotification(true);
      } finally {
        setLoading(false);
        setSelectedItem('');
      }
    },
    [selectedProduct],
  );

  const handleLoadProductById = useCallback(async (value) => {
    try {
      setErrorAPI(false);
      setLoading(true);
      setSelectedItem('');
      if (value !== '0') {
        const response = await dispatch.ProductColumn.loadProductColumnByIdAsync({
          id: value,
        });
        await dispatch.Document.loadDocumentsWithFiltersAsync({
          product: selectedProduct,
          page: 1,
          limit: 10,
        });
        handleSetInputName(response.name);
        handleSetInputDescription(response.description);
        handleSetInputBelongs(response.belongs[0] || '');
        setSelectedItem(value);
        setType(response.type);
      } else {
        handleResetInptus();
      }
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    } finally {
      setLoading(false);
    }
  }, [selectedProduct]);

  const handleUpdateProductById = useCallback(async () => {
    try {
      setErrorAPI(false);
      setLoading(true);
      if (selectedItem !== 0) {
        await dispatch.ProductColumn.updateProductColumnById({
          id: parseInt(selectedItem, 10),
          name,
          description,
          belongs: [belongs],
          type,
        });
        await dispatch.Document.loadDocumentsWithFiltersAsync({
          product: selectedProduct,
          page: 1,
          limit: 10,
        });
        handleResetInptus();
        getAllProductsColumns();
        setMessage(SUCCESS_UPDATE_BY_ID);
        handleChangeNotification(true);
      }
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    } finally {
      setLoading(false);
    }
  }, [selectedItem, name, type, description, selectedProduct, belongs]);

  const handleChangeSelected = ({ target }) => {
    const value = parseInt(target.value, 10);
    setSelectedItem(value);
    if (value > 0) {
      handleLoadProductById(parseInt(target.value, 10));
    }
  };

  useEffect(() => {
    handleRemoveErrors();
  }, [productInputError, descriptionTextAreaError]);

  useEffect(() => {
    getAllProductsColumns();
  }, [selectedProduct]);

  useEffect(async () => {
    if (selectedItem === 0) {
      handleResetInptus();
    }
  }, [selectedItem]);

  return {
    name,
    description,
    belongs,
    type,
    handleChangeName,
    handleChangeDescription,
    handleChangeBelongs,
    handleSubmit,
    formErrors,
    errorAPI,
    message,
    loading,
    handleClose,
    open,
    handleRemoveProductById,
    handleLoadProductById,
    selectedItem,
    handleUpdateProductById,
    TYPES,
    handleChangeType,
    handleChangeSelected,
  };
}

export default useProductColumns;
