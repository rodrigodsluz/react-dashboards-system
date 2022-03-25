/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      allowNegative={false}
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      isNumericString
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextFieldMoney = (props) => {
  const {
    value, handleChange, label, name, ...others
  } = props;

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="outlined"
      label={label}
      name={name}
      size="small"
      fullWidth
      id={name}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...others}
    />
  );
};

TextFieldMoney.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextFieldMoney;
