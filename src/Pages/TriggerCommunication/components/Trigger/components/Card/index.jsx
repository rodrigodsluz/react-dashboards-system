/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@d1.cx/components';
import { Container } from './styles';

const Card = ({
  name, icon, handleActive, isActive,
}) => (
  <Container onClick={() => handleActive(name)} active={name === isActive}>
    {icon}
    <Typography fontSize="16px">{name}</Typography>
  </Container>
);

export default Card;
