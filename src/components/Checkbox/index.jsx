/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

const CheckboxInput = ({
  name,
  options,
  containerStyle,
}) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => refs.filter((ref) => ref.checked).map((ref) => ref.value),
      clearValue: (refs) => {
        refs.forEach((ref) => {
          const myref = ref;
          myref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values?.includes(ref.id)) {
            const myref = ref;
            myref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => (
        <div key={option.id} style={containerStyle}>
          <input
            defaultChecked={defaultValue.find((dv) => dv === option.id)}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

CheckboxInput.defaultProps = {
  containerStyle: {},
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  containerStyle: PropTypes.shape({}),
  options: PropTypes.array.isRequired,
};

export default CheckboxInput;
