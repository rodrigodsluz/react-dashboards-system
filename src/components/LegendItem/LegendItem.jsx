import React from 'react';
import { Typography } from '@d1.cx/components';
import PropTypes from 'prop-types';
import { Container, Color } from './styles';

function LegendItem({ color, title }) {
  return (
    <Container>
      <Color color={color} />
      <Typography fontSize="13px" horizontal="10px">
        {title}
      </Typography>
    </Container>
  );
}

LegendItem.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LegendItem;
