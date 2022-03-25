/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Table, THead, TBody, Tr, Th, Td,
} from '@d1.cx/components';
import { useSelector } from 'react-redux';
import SnackAlert from '../../../../components/SnackAlert';
import useTable from './useTable';
import { Container } from './styles';

const ProductColumnsTable = ({ data }) => {
  const selectedProduct = useSelector(
    (state) => state.Products.selectedProductId,
  );
  const {
    errorAPI, handleClose, open, message, handleGetHeaders, headers,
  } = useTable();

  useEffect(() => {
    handleGetHeaders(data?.table?.header);
  }, [data]);

  return (
    <>
      {selectedProduct !== 0 && (
        <Container>
          <SnackAlert
            open={open}
            handleClose={handleClose}
            severity={errorAPI ? 'error' : 'success'}
            message={message}
          />
          <Table>
            <THead>
              <Tr header>
                {data
                  && data?.table?.header?.map((element) => (
                    <Th align="left" key={element}>
                      <strong>{element}</strong>
                    </Th>
                  ))}
              </Tr>
            </THead>

            <TBody>
              {data
                && data?.table?.data?.map((element, index) => (
                  <Tr key={index}>
                    {headers
                      && headers?.map((elem) => (
                        <Td>
                          <span>
                            {element[elem]?.name
                              ? element[elem]?.name
                              : element[elem] || ''}
                          </span>
                        </Td>
                      ))}
                  </Tr>
                ))}
            </TBody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default ProductColumnsTable;
