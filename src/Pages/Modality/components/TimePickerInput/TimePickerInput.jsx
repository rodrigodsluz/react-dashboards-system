/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import { useSelector } from 'react-redux';
import locale from 'antd/es/date-picker/locale/de_DE';
import { StyledTimePicker } from './styles';
import { dispatch } from '../../../../Config/store';

function TimePickerInput({
  index,
  selectedWeek,
  setMessage,
  setError,
  setNotification,
}) {
  let week = useSelector((state) => state.Modalities.week);

  const IS_SAME_TIME = 'O horário de início não pode ser igual ao horário final!';

  const currentTime = ['', '', '', '', '', '', ''];

  if (selectedWeek || Object.keys(week).length >= 0) {
    if (selectedWeek) {
      selectedWeek = { ...selectedWeek, ...week };
    }

    const positions = Object.keys(selectedWeek || week)?.map((p) => p);

    const values = Object.values(selectedWeek || week)?.map((value) => [
      moment(value.start, 'HH:mm:ss'),
      moment(value.end, 'HH:mm:ss'),
    ]);

    positions.forEach((position, i) => {
      currentTime[position - 1] = values[i];
    });
  }

  const [time, setTime] = useState(currentTime[index - 1] || []);

  const onChangeDate = useCallback(
    async (value) => {
      if (!value) {
        setTime([]);
        delete week[index];

        if (selectedWeek) {
          delete selectedWeek[index];
          week = selectedWeek;
        }
        await dispatch.Modalities.setIsDeleted(true);
      } else {
        setTime(value);
        const start = moment(value[0]).format('HH:mm:ss');
        const end = moment(value[1]).format('HH:mm:ss');

        if (start !== end) {
          week = { ...selectedWeek, ...week, [index]: { start, end } };
        } else {
          setTime([]);
          setMessage(IS_SAME_TIME);
          setError(true);
          setNotification(true);
        }
      }
      await dispatch.Modalities.setWeek(week);
      await dispatch.Modalities.setIsDeleted(false);
    },
    [week],
  );

  return (
    <StyledTimePicker
      data-testid="timepicker"
      placeholder={['Início', 'Fim']}
      value={time}
      onChange={onChangeDate}
      showNow
      locale={{
        ...locale,
        lang: {
          ...locale.lang,
          ok: 'Selecionar',
        },
      }}
    />
  );
}

export default TimePickerInput;
