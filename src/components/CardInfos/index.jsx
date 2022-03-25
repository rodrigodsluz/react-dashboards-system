import React from 'react';
import { Typography } from '@d1.cx/components';
import { Rocket, Tachometer, History } from '@d1.cx/icons';
import PropTypes from 'prop-types';

import colors from '../../theme/colors';
import { Container, Wrapper } from './styles';

function CardInfos({ title, value, type }) {
  const setIconByName = () => {
    switch (type) {
      case 'sucess':
        return <Rocket width="60px" color="#fff" />;
      case 'running':
        return <Tachometer width="60px" color="#fff" />;
      case 'finishi':
        return <History width="60px" color="#fff" />;
      default:
        return '';
    }
  };

  return (
    <Container type={type}>
      <Typography color={colors.textPrimary} fontSize="19px" bold>
        {title}
      </Typography>
      <Wrapper>
        {setIconByName()}
        <Typography color={colors.textPrimary} fontSize="57px" bold>
          {value}
        </Typography>
      </Wrapper>
    </Container>
  );
}

CardInfos.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardInfos;
