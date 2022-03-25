/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@d1.cx/components';

import { ExclamationCircle, QuestionCircle, CheckCircle } from '@d1.cx/icons';
import { Container, Name, Status } from './styles';

const DocumentCard = ({ attachment }) => {
  const ICONS = {
    ok: <CheckCircle width="40px" color="#fff" />,
    pending: <ExclamationCircle width="40px" color="#fff" />,
    in_analisys: <QuestionCircle width="40px" color="#fff" />,
  };

  const COLORS = {
    ok: '#59CF5B',
    in_analisys: '#F0CB35',
    pending: '#F27457',
  };

  const TEXT = {
    ok: 'Ok',
    in_analisys: 'Em análise',
    pending: 'Pendente',
  };
  return (
    <Container color={COLORS[attachment.status]}>
      <Name>
        <Typography>{attachment.name}</Typography>
      </Name>

      <Status>
        <span>
          {ICONS[attachment.status]}
        </span>
        <Typography bold>{TEXT[attachment.status]}</Typography>
      </Status>
    </Container>
  );
};

export default DocumentCard;
