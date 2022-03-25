/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './styles';

function FullScreenModal({ children, open }) {
  return open ? <Container>{children}</Container> : null;
}

export default FullScreenModal;
