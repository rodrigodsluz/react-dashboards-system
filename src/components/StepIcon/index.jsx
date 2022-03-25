/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CheckDouble, ExclamationCircle, QuestionCircle } from '@d1.cx/icons';
import { Tooltip } from '@d1.cx/components';
import { Circle } from './styles';

const StepIcon = (props) => {
  const [message, setMessage] = useState('Você está aqui');

  const BACKGROUND_COLOR = {
    incompleted: '#ccc',
    active: '#1A1731',
    pending: '#F27457',
    in_analisys: '#FFDD59',
  };

  const STATUS_MESSAGE = {
    active: 'Você está aqui',
    pending: 'Você possui documentos pendentes',
    in_analisys: 'Você possui documentos em análise',
  };

  const handleSelectColorByStatus = () => {
    if (props.active && props.pending) {
      setMessage(STATUS_MESSAGE.pending);
      return BACKGROUND_COLOR.pending;
    }
    if (props.active && !props.pending && props.in_analisys) {
      setMessage(STATUS_MESSAGE.in_analisys);
      return BACKGROUND_COLOR.in_analisys;
    }
    if (props.active) {
      setMessage(STATUS_MESSAGE.active);
      return BACKGROUND_COLOR.active;
    }

    return BACKGROUND_COLOR.incompleted;
  };

  if (props.completed) {
    return (
      <Circle color={BACKGROUND_COLOR.active}>
        <CheckDouble color="#fff" width={25} />
      </Circle>
    );
  }

  if (!props.active && !props.completed) {
    return <Circle color={() => handleSelectColorByStatus()} />;
  }

  return (
    <Tooltip content={message} top whiteSpace>
      <Circle
        color={() => handleSelectColorByStatus()}
        onClick={() => (props.active ? props.handleClick() : null)}
      >
        {props.pending && <ExclamationCircle color="#fff" width={40} />}

        {!props.pending && props.in_analisys && (
        <QuestionCircle width={40} color="#fff" />
        )}
        {!props.pending && !props.in_analisys && (
        <CheckDouble color="#fff" width={25} />
        )}
      </Circle>
    </Tooltip>
  );
};

export default StepIcon;
