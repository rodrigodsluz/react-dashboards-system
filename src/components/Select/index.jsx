/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinkButton, Tooltip } from '@d1.cx/components';
import { TrashAlt } from '@d1.cx/icons';
import { Container, Option, Wrapper } from './styles';

const Select = ({
  data,
  attr,
  onRemoveItem,
  onLoadItem,
  enableDelete,
  selectedItem,
}) => {
  const [selected, setSelected] = useState('0');

  const handleLoad = useCallback(async () => {
    await onLoadItem(selected);
  }, [selected]);

  useEffect(() => {
    if (selected !== '0') {
      handleLoad();
    }
  }, [selected]);

  useEffect(() => {
    if (!selectedItem) {
      setSelected('0');
    }
  }, [selectedItem]);

  return (
    <Wrapper>
      <Container
        data-testid="dropdownProductOrColumn"
        onClick={({ target }) => {
          setSelected(target.value);
        }}
      >
        <Option value="0">Selecionar</Option>
        {data.length
          && data?.map((element) => (
            <Option key={element.id} value={element.id}>
              {element[attr]}
            </Option>
          ))}
      </Container>
      {enableDelete && parseInt(selected, 10) !== 0 && (
        <Tooltip content="Deletar" bottom>
          <LinkButton
            data-testid="btnRemoverProduto"
            onClick={() => onRemoveItem(selected)}
          >
            <TrashAlt color="red" width="25px" />
          </LinkButton>
        </Tooltip>
      )}
    </Wrapper>
  );
};

Select.propTypes = {
  data: PropTypes.array.isRequired,
  attr: PropTypes.string.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onLoadItem: PropTypes.func.isRequired,
  enableDelete: PropTypes.bool,
  selectedItem: PropTypes.string,
};

export default Select;
