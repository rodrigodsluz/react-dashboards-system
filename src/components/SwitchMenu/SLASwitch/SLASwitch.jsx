/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { Typography } from '@d1.cx/components';
import { Container, SelectItem } from '../styles';
import colors from '../../../theme/colors';

function SwitchMenuStatus({ items }) {
  const [status, setStatus] = useState('Andamento');

  const handleSelect = useCallback((product) => {
    setStatus(product);
  }, []);

  return (
    <Container>
      {items
        && items.map((elem) => (
          <SelectItem onClick={() => handleSelect(elem.name)} key={elem.name}>
            <Typography
              color={
                status === elem.name ? colors.textPrimary : colors.textSecondary
              }
              fontSize="15px"
              bold
            >
              {elem.name}
            </Typography>
          </SelectItem>
        ))}
    </Container>
  );
}

export default SwitchMenuStatus;
