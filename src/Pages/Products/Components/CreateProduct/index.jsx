/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Input,
  PrimaryButton,
  Spacing,
  TextArea,
  Typography,
} from '@d1.cx/components';

import { useSelector } from 'react-redux';
import SnackAlert from '../../../../components/SnackAlert';
import Select from '../../../../components/Select';
import useCreateProduct from './useCreateProduct';
import { Container, WrapperButton } from './styles';

const CreateProduct = () => {
  const allProducts = useSelector((state) => state.Products.allProducts);

  const {
    id,
    name,
    description,
    handleChangeId,
    handleChangeDescription,
    handleChangeName,
    handleSubmit,
    formErrors,
    errorAPI,
    loading,
    message,
    handleClose,
    open,
    handleUpdateProductById,
    handleChangeSelected,
    selectedItem,
  } = useCreateProduct();

  return (
    <Container>
      <SnackAlert
        open={open}
        handleClose={handleClose}
        severity={errorAPI ? 'error' : 'success'}
        message={message}
      />
      <Typography color="#000" fontSize="22px" vertical="20px">
        Criação da área
      </Typography>

      <select name="" id="" value={selectedItem} onChange={handleChangeSelected}>
        <option value={0}>Selecionar uma área</option>
        {allProducts.length && allProducts?.map((elem) => (
          <option value={elem.id}>{elem.name}</option>
        ))}
      </select>

      <Spacing vertical="5px" />
      <Input
        placeholder="ID da área"
        value={`ID: ${id}`}
        onChange={handleChangeId}
        error={formErrors.id}
        disabled
      />
      <Input
        placeholder="Nome da área"
        value={name}
        onChange={handleChangeName}
        error={formErrors.name}
      />
      <TextArea
        placeholder="Digite uma breve descrição"
        value={description}
        onChange={handleChangeDescription}
        error={formErrors.description}
      />
      <WrapperButton>
        <PrimaryButton
          onClick={selectedItem ? handleUpdateProductById : handleSubmit}
          loading={loading}
          disabled={loading}
        >
          {selectedItem ? 'Atualizar' : ' Adicionar novo'}
        </PrimaryButton>
      </WrapperButton>
    </Container>
  );
};

export default CreateProduct;
