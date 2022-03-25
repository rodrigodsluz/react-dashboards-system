/* eslint-disable react/prop-types */
import React from 'react';
import Lottie from 'react-lottie';
import { Typography } from '@d1.cx/components';
import lupa from './Cone/cone.json';
import upload from './Upload/upload.json';
import files from './Files/files.json';
import message from './Message/message.json';
import rocket from './Rocket/Rocket.json';
import incident from './Incident/incident.json';
import transitions from './Transitions/Transitions.json';
import lab from './Lab/lab.json';
import sms from './Sms/sms.json';
import conversatin from './Conversation/conversation.json';
import empty from './Empty/empty.json';
import question from './Question/question.json';
import check from './Check/check.json';
import error from './Error/Error.json';
import alert from './Alert/alert.json';
import { Container } from './styles';

function LottieNotification({
  hiddenBg,
  animation,
  description = 'Não há dados nesse período',
  color = '#ccc',
  width = '200',
  height = '200',
  removeAbsolute,
}) {
  const animations = {
    lupa,
    upload,
    files,
    message,
    rocket,
    incident,
    transitions,
    lab,
    sms,
    conversatin,
    empty,
    question,
    check,
    error,
    alert,
  };

  const animationData = animations[animation];

  const options = {
    loop: true,
    autoplay: true,
    animationData,

    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container hiddenBg={hiddenBg} removeAbsolute={removeAbsolute}>
      <Lottie options={options} width={width} height={height} />
      <Typography fontSize="15px" bold color={color}>
        {description}
      </Typography>
    </Container>
  );
}

export default LottieNotification;
