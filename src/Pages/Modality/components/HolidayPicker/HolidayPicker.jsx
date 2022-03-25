/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { dispatch } from '../../../../Config/store';

function HolidayPicker({ selectedHolidays }) {
  const currentHolidays = selectedHolidays?.map((day) => {
    const splitDate = day.split('/');
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
  });

  const [holidays, setHolidays] = useState(currentHolidays || []);

  const handleDayClick = useCallback(
    async (day, { selected }) => {
      const selectedDays = holidays.concat();

      if (selected) {
        const selectedIndex = selectedDays.findIndex((selectedDay) => DateUtils.isSameDay(selectedDay, day));
        selectedDays.splice(selectedIndex, 1);
      } else {
        selectedDays.push(day);
      }

      if (!selectedDays.length) {
        await dispatch.Modalities.setNoHolidays(true);
      }

      const formattedDate = selectedDays.map((days) => {
        const date = days.getDate().toString().padStart(2, '0');
        const month = (days.getMonth() + 1).toString().padStart(2, '0');
        const year = days.getFullYear();
        return `${date}/${month}/${year}`;
      });

      setHolidays(selectedDays);
      await dispatch.Modalities.setHolidays(formattedDate);
    },
    [holidays],
  );

  return (
    <div>
      <DayPicker selectedDays={holidays} onDayClick={handleDayClick} />
    </div>
  );
}

export default HolidayPicker;
