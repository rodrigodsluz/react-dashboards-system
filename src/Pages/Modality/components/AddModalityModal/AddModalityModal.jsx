/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { PrimaryButton, Spacing, Typography } from '@d1.cx/components';
import { ArrowLeft } from '@d1.cx/icons';
import TimeInputsCard from '../TimeInputsCard/TimeInputsCard';

import {
  Container,
  Header,
  Click,
  RightContainer,
  ContainerButton,
} from './styles';

function NewJourneyModal({
  onClose,
  selectedWeek,
  handleSubmitNewModality,
  loading,
  selectedModality,
  setMessage,
  setError,
  setNotification,
}) {
  const days = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];

  return (
    <Container>
      <Header spaceBetween>
        <Click onClick={onClose} data-testid="back-icon">
          <ArrowLeft color="#575757" />
        </Click>
        <Typography fontSize="25px" vertical="40px" horizontal="10px">
          Voltar
        </Typography>
      </Header>

      <RightContainer>
        {days.map((day, i) => (
          <TimeInputsCard
            day={day}
            index={i}
            selectedWeek={selectedWeek}
            setMessage={setMessage}
            setError={setError}
            setNotification={setNotification}
          />
        ))}
      </RightContainer>

      <Spacing vertical="10px" />
      <ContainerButton>
        <PrimaryButton
          onClick={handleSubmitNewModality}
          loading={loading}
          disabled={loading}
        >
          {!selectedModality ? 'Criar esteira' : 'Atualizar esteira'}
        </PrimaryButton>
      </ContainerButton>
      <Spacing vertical="10px" />
    </Container>
  );
}

export default NewJourneyModal;
