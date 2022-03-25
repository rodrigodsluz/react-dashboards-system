/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@d1.cx/components';
import TimePicker from '../TimePickerInput/TimePickerInput';

import { Container, TimePickerWrapper } from './styles';

function TimeInputs({
  day,
  index,
  selectedWeek,
  setMessage,
  setError,
  setNotification,
}) {
  return (
    <Container>
      <Typography
        fontSize="18px"
        bold
        vertical="5px"
        color="white"
        width="122px"
      >
        {day}
      </Typography>

      <TimePickerWrapper>
        <TimePicker
          index={index + 1}
          selectedWeek={selectedWeek}
          setMessage={setMessage}
          setError={setError}
          setNotification={setNotification}
        />
      </TimePickerWrapper>
    </Container>
  );
}

export default TimeInputs;
