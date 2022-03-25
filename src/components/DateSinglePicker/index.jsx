/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { DatePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Typography } from '@material-ui/core';
import moment from 'moment';

const dateToString = (date) => moment(date).format('DD/MM/YYYY');

const stringToDate = (date) => moment(date, 'DD/MM/YYYY').toDate();

const DateSinglePicker = ({
  value, name, label, onChange,
}) => (
  <>
    <Typography>
      {label}
    </Typography>
    <DatePicker
      block
      value={stringToDate(value)}
      onChange={(date) => { onChange({ target: { name, value: dateToString(date) } }); }}
      placement="auto"
      format="DD/MM/YYYY"
    />
  </>
);

DateSinglePicker.defaultProps = {
  label: 'Date',
  value: dateToString(new Date()),
};

DateSinglePicker.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateSinglePicker;
