import React from 'react';
import { Typography } from '@d1.cx/components';
import PropTypes from 'prop-types';
import { Container } from './styles';

function SelectButton({ name, chanceCategory, category }) {
  return (
    <Container
      onClick={() => chanceCategory(name)}
      check={category === name.toLowerCase()}
    >
      <Typography>{name}</Typography>
    </Container>
  );
}

SelectButton.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  chanceCategory: PropTypes.func.isRequired,
};
export default SelectButton;
