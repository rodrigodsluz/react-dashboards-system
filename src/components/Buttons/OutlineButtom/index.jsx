/* eslint-disable react/prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { Typography } from '@d1.cx/components';

import { Container } from './styles';

const OutlineButton = ({ children, onClick }) => (
  <Container onClick={onClick}>
    <Typography color="#117eff" align="center">{children}</Typography>
  </Container>
);

OutlineButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OutlineButton;
