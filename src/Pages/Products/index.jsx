import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CreateProduct from './Components/CreateProduct';
import CreateProductColumns from './Components/CreateProductColumns';
import ProductColumnsTable from './Components/ProductColumnsTable';
import { LeftColumn, RightColumn, Wrapper } from './styles';

const Products = () => {
  const allDocuments = useSelector(
    (state) => state.Document.allDocuments,
    shallowEqual,
  );
  return (
    <Wrapper>
      <LeftColumn>
        <CreateProduct />
        <CreateProductColumns />
      </LeftColumn>
      <RightColumn>
        <ProductColumnsTable data={allDocuments} />
      </RightColumn>
    </Wrapper>
  );
};

export default Products;
