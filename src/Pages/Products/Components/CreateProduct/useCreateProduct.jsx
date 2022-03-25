/* eslint-disable no-return-await */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../Config/store';
import useChangeText from '../../../../hooks/useChanceText';
import useCheckEmptyInput from '../../../../hooks/useCheckEmptyInput';
import useToggleNotification from '../../../../hooks/useToggleNotification';

const SUCCESS_API = 'Tudo pronto! Sua área foi criado com sucesso!';
const SUCCESS_UPDATE_BY_ID = 'Tudo pronto! Sua área foi atualizado com sucesso!';
const SUCCESS_REMOVE_BY_ID = 'Área removido com sucesso! ';
const ERROR_API = 'Ops! Alguma coisa deu errado! Por favor, verifique sua conexão e tente novamente!';

function useCreateProduct() {
  const userPermissions = useSelector((state) => state.User.user);
  const [id, handleChangeId, handleSetInputId] = useChangeText();
  const [name, handleChangeName, handleSetInputName] = useChangeText();
  const [description, handleChangeDescription, handleSetInputDescription] = useChangeText();
  const productInputError = useCheckEmptyInput(name);
  const descriptionTextAreaError = useCheckEmptyInput(description);
  const [open, handleChangeNotification, handleClose] = useToggleNotification();
  const [errorAPI, setErrorAPI] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [formErrors, setFormErrors] = useState({
    id: false,
    name: false,
    description: false,
  });

  const handleResetInptus = useCallback(async () => {
    handleSetInputId('');
    handleSetInputName('');
    handleSetInputDescription('');
    setSelectedItem(0);
    await dispatch.Products.selectedProductIdAsync(0);
  }, [name, description, selectedItem]);

  const getAllProducts = useCallback(async () => {
    try {
      await dispatch.Products.loadAllProductsAsync();
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setFormErrors(() => ({
      name: productInputError,
      description: descriptionTextAreaError,
    }));
    setErrorAPI(false);

    try {
      setLoading(true);
      const response = await dispatch.Products.createNewProduct({
        name,
        description,
      });

      const { id: idResponse } = response;

      if (idResponse) {
        setMessage(SUCCESS_API);
      }
      await dispatch.User.saveUserAsync(userPermissions?.email);

      handleChangeNotification(true);
      handleResetInptus();
      getAllProducts();
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
    formErrors,
    descriptionTextAreaError,
    productInputError,
    errorAPI,
    loading,
    userPermissions,
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
  }, [productInputError, descriptionTextAreaError]);

  const handleRemoveProductById = useCallback(async (value) => {
    try {
      setErrorAPI(false);
      setLoading(true);
      await dispatch.Products.removeProductById({
        id: value,
      });
      await dispatch.User.saveUserAsync(userPermissions?.email);
      setMessage(SUCCESS_REMOVE_BY_ID);
      handleChangeNotification(true);
      handleResetInptus();
      getAllProducts();
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    } finally {
      setLoading(false);
    }
  }, [userPermissions]);

  const handleLoadProductById = useCallback(async (value) => {
    try {
      setErrorAPI(false);
      setLoading(true);
      setSelectedItem(0);
      if (value !== '0') {
        const response = await dispatch.Products.loadProductByIdAsync({
          id: value,
        });
        handleSetInputId(response.id);
        handleSetInputName(response.name);
        handleSetInputDescription(response.description);
        setSelectedItem(value);
        await dispatch.Products.selectedProductIdAsync(value);
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
  }, [userPermissions]);

  const handleUpdateProductById = useCallback(async () => {
    try {
      setErrorAPI(false);
      setLoading(true);
      if (selectedItem !== 0) {
        await dispatch.Products.updateProductById({
          id: parseInt(selectedItem, 10),
          name,
          description,
        });
        await dispatch.User.saveUserAsync(userPermissions?.email);
        getAllProducts();
        setMessage(SUCCESS_UPDATE_BY_ID);
        handleChangeNotification(true);
      }
      handleResetInptus();
    } catch (error) {
      setErrorAPI(true);
      setMessage(ERROR_API);
      handleChangeNotification(true);
    } finally {
      setLoading(false);
    }
  }, [selectedItem, name, description, userPermissions]);

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

  useEffect(async () => {
    getAllProducts();
  }, []);

  useEffect(async () => {
    if (selectedItem === 0) {
      handleResetInptus();
    }
  }, [selectedItem]);

  useEffect(async () => {
    if (userPermissions) {
      await dispatch.User.setCurrentProductById(
        userPermissions?.capabilities?.permittedProducts[0]?.id,
      );

      await dispatch.User.setAllProducts(
        userPermissions?.capabilities?.permittedProducts,
      );
    }
  }, [userPermissions]);

  return {
    id,
    name,
    description,
    handleChangeId,
    handleChangeName,
    handleChangeDescription,
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
    handleChangeSelected,
  };
}

export default useCreateProduct;
