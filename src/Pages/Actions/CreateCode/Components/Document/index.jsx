import React from 'react';
import { ArrowLeft, ArrowRight } from '@d1.cx/icons';
import PropTypes from 'prop-types';
import { Container } from './styles';

const Documents = ({ open, handleClick }) => (
  <Container onClick={handleClick}>
    {!open ? <ArrowLeft width="20px" /> : <ArrowRight width="20px" />}

  </Container>
);

Documents.propTypes = {
  handleClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Documents;
