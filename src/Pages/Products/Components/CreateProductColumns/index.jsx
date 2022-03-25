/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  FlexContent,
  Input,
  LinkButton,
  PrimaryButton,
  Spacing,
  TextArea,
  Tooltip,
  Typography,
} from '@d1.cx/components';
import { useSelector } from 'react-redux';
import { TrashAlt } from '@d1.cx/icons';
import SnackAlert from '../../../../components/SnackAlert';
import { Container, WrapperButton } from './styles';
import useProductColumns from './useProductColumns';
import {
  Option,
  Container as ContSelect,
} from '../../../../components/Select/styles';

const CreateProductColumns = () => {
  const allProductColumns = useSelector((state) => state.ProductColumn.columns);
  const selectedProduct = useSelector(
    (state) => state.Products.selectedProductId,
  );

  const {
    name,
    description,
    belongs,
    type,
    selectedItem,
    handleChangeName,
    handleChangeDescription,
    handleChangeBelongs,
    loading,
    handleSubmit,
    handleUpdateProductById,
    handleRemoveProductById,
    TYPES,
    handleChangeType,
    formErrors,
    open,
    handleClose,
    errorAPI,
    message,
    handleChangeSelected,
  } = useProductColumns();

  return (
    <>
      {selectedProduct > 0 && (
        <Container>
          <SnackAlert
            open={open}
            handleClose={handleClose}
            severity={errorAPI ? 'error' : 'success'}
            message={message}
          />
          <Typography color="#000" fontSize="22px" vertical="20px">
            Criação de coluna
          </Typography>
          <FlexContent>
            <select name="" id="" value={selectedItem} onChange={handleChangeSelected}>
              <option value={0}>Selecionar uma coluna</option>
              {allProductColumns.length && allProductColumns?.map((elem) => (
                <option value={elem.id}>{elem.name}</option>
              ))}
            </select>

            {selectedItem && (
            <Tooltip content="Deletar" bottom>
              <LinkButton
                data-testid="btnRemoverProduto"
                onClick={() => handleRemoveProductById(selectedItem)}
              >
                <TrashAlt color="red" width="25px" />
              </LinkButton>
            </Tooltip>

            )}

          </FlexContent>
          <Spacing vertical="5px" />
          <Input
            placeholder="Nome da coluna"
            onChange={handleChangeName}
            value={name}
            error={formErrors.name}
          />
          <Input
            placeholder="Associar"
            onChange={handleChangeBelongs}
            error={formErrors.belongs}
            value={belongs}
            data-testid="belongs"
          />
          <ContSelect
            onChange={handleChangeType}
            value={type}
            data-testid="types"
          >
            <Option value={0}>Selecionar tipo</Option>
            {TYPES
              && TYPES.map((element) => (
                <Option value={element}>{element}</Option>
              ))}
          </ContSelect>
          <TextArea
            placeholder="Digite uma breve descrição"
            onChange={handleChangeDescription}
            value={description}
            error={formErrors.description}
            data-testid="textarea"
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
      )}
    </>
  );
};

export default CreateProductColumns;
