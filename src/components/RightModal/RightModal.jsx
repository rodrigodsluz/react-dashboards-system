/* eslint-disable react/prop-types */
import React from 'react';

import { Container, DontClickedArea } from './styles';

function RightModal({ children, open }) {
  return open ? (
    <>
      <DontClickedArea />
      <Container>{children}</Container>
    </>
  ) : null;
}

export default RightModal;
