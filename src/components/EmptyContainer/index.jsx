import React from 'react';
import LottieNotification from '../LottieNotification/LottieNotification';

import { Container } from './styles';

function EmptyContainer() {
  return (
    <Container>
      <LottieNotification
        animation="empty"
        hiddenBg
        description="Hmmm! Você não possui nenhuma área para visualizar."
      />
    </Container>
  );
}

export default EmptyContainer;
