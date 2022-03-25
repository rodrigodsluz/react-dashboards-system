import React from 'react';

import Badge from '../components/Badge';

import Theme from '../theme';

const checkStatus = (status) => {
  switch (status) {
    case 'ok':
      return (
        <Badge
          content="Ok"
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.done}
        />
      );
    case 'Concluído':
      return (
        <Badge
          content={status}
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.done}
        />
      );
    case 'in_analisys':
    case 'Em Análise':
      return (
        <Badge
          content="Em análise"
          textSize={12}
          textColor={Theme.palette.text.primary}
          backgroundColor={Theme.palette.badge.inAnalysis}
        />
      );
    case 'Pendente':
    case 'pending':
      return (
        <Badge
          content="Pendente"
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.pending}
        />
      );
    case 'Cancelado':
      return (
        <Badge
          content={status}
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.canceled}
        />
      );
    case 'Andamento':
      return (
        <Badge
          content={status}
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.progress}
        />
      );
    case 'Inconsistência':
      return (
        <Badge
          content={status}
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.badge.inconsistency}
        />
      );
    default:
      return (
        <Badge
          content={status}
          textSize={12}
          textColor={Theme.palette.text.light}
          backgroundColor={Theme.palette.buttons.cancel.light}
        />
      );
  }
};

export default checkStatus;
