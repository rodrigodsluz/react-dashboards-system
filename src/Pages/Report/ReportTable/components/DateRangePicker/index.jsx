/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { DateRangePicker } from 'rsuite';

import { DateButton } from './styles';

/**
 * @param placement Setting placeholders
 *| 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'leftEnd'
  | 'rightStart'
  | 'rightEnd';
 */
const DataRangerPicker = ({
  date,
  ranges,
  setDate,
  handleSearch,
  placement,
  showButton,
}) => (
  <>
    <DateRangePicker
      format="DD/MM/YYYY"
      placement={placement}
      isoWeek
      value={date}
      size="sm"
      showWeekNumbers
      placeholder="Selecione um período"
      appearance="default"
      ranges={ranges}
      style={{ width: 280 }}
      onChange={(value) => {
        setDate(value);
      }}
    />

    {showButton && (
    <DateButton
      onClick={handleSearch}
      id="dateSearch"
    >
      Buscar
    </DateButton>
    )}
  </>
);

DataRangerPicker.defaultProps = {
  showButton: true,
  handleSearch: () => {},
};

DataRangerPicker.propTypes = {
  showButton: PropTypes.bool,
  date: PropTypes.array.isRequired,
  ranges: PropTypes.array.isRequired,

  setDate: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
  placement: PropTypes.string.isRequired,
};

export default DataRangerPicker;
