/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@d1.cx/components';

import { Container } from './styles';

function ModalityCard({ modality }) {
  return (
    <Container>
      <Typography fontSize="18px" vertical="5px" bold color="white">
        {modality}
      </Typography>
    </Container>
  );
}

export default ModalityCard;
