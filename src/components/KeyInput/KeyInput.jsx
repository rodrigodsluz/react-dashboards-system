/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Input } from '@d1.cx/components';
import React from 'react';

import { Container } from './styles';

function KeyInput({
  inputKey,
  inputValue,
  changeInputKey,
  changeInputValue,
  disabled,
  testId,
}) {
  return (
    <Container>
      <Input
        data-testid={`${testId}key`}
        placeholder="Chave"
        disabled={disabled}
        value={inputKey}
        onChange={changeInputKey}
      />
      <Input
        data-testid={`${testId}Valor`}
        placeholder="Valor"
        value={inputValue}
        onChange={changeInputValue}
      />
    </Container>
  );
}

export default KeyInput;
