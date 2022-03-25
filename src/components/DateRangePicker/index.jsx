/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { DateRangePicker, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

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
  label,
}) => {
  const classes = useStyles();

  return (
    <>
      {label && label.length > 0 && <Typography>{label}</Typography>}
      <DateRangePicker
        format="DD/MM/YYYY"
        placement={placement}
        isoWeek
        value={date}
        size="md"
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
        <Button
          appearance="primary"
          className={classes.rsButtonSearch}
          onClick={handleSearch}
          id="dateSearch"
        >
          Buscar
        </Button>
      )}
    </>
  );
};

DataRangerPicker.defaultProps = {
  showButton: true,
  handleSearch: () => {},
  ranges: [],
  placement: 'auto',
  label: '',
};

DataRangerPicker.propTypes = {
  showButton: PropTypes.bool,
  date: PropTypes.array.isRequired,
  ranges: PropTypes.array,
  label: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
  placement: PropTypes.string,
};

export default DataRangerPicker;
