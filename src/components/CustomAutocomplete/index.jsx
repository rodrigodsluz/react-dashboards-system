/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import Autocomplete from '@material-ui/lab/Autocomplete';

const CustomAutocomplete = ({
  autoValue,
  handleConfirm,
  options,
  label,
  placeholder,
  variant,
}) => (
  <FormControl>
    <Autocomplete
      size="small"
      fullWidth
      id={label}
      options={options}
      value={autoValue}
      onChange={handleConfirm}
      renderTags={(value, getTagProps) => value.map((option, index) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ))}
      renderInput={(params) => (
        <TextField
          size="small"
          style={{ minWidth: 200 }}
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  </FormControl>
);

CustomAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  autoValue: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default CustomAutocomplete;
