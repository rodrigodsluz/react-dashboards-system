/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ContainerHeaderMenu, Item } from './styles';
import { dispatch } from '../../Config/store';

function SwitchMenu({ items }) {
  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );
  const handleSelect = useCallback(async ({ target }) => {
    await dispatch.User.setCurrentProductById(parseInt(target.value, 10));
  }, []);

  return (
    <ContainerHeaderMenu
      onChange={handleSelect}
      value={currentProductById || 0}
      data-testid="btnProduto"
    >
      {items && items.length > 0 ? (
        items.map((elem, index) => (
          <Item key={elem.id} value={elem.id} data-testid={`Área${index + 1}`}>
            {elem.name}
          </Item>
        ))
      ) : (
        <Item>Não há áreas</Item>
      )}
    </ContainerHeaderMenu>
  );
}

export default SwitchMenu;
