/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { dispatch } from '../../Config/store';

import { useStyles } from './styles';

const ProductsButton = ({ product, capabilities, handleSetProduct }) => {
  const [currentProduct, setCurrentProduct] = useState('');

  const classes = useStyles();

  useEffect(() => {
    if (product && capabilities.length > 0) {
      const found = capabilities.find((p) => p.id === product);
      setCurrentProduct(found?.name);
    }
  }, [product, capabilities]);

  const handleChangeProduct = useCallback(
    async (_event, value) => {
      if (capabilities.length > 0) {
        if (value) {
          const found = capabilities.find((p) => p.name === value);
          await dispatch.User.setCurrentProduct(found?.id);
        }
      }
    },
    [capabilities],
  );

  return (
    <>
      <Box className={classes.wrapper}>
        {capabilities.length > 0 ? (
          <Box>
            {capabilities.length <= 3 ? (
              <ButtonGroup variant="text" color="primary">
                {capabilities?.map((p) => (
                  <Button
                    className={clsx(
                      classes.singleButton, product === p.id ? classes.border : classes.borderless,
                    )}
                    key={p.id}
                    onClick={async () => {
                      handleSetProduct(p.id);
                      await dispatch.User.setCurrentProduct(p.id);
                    }}
                  >
                    {p.name}
                  </Button>
                ))}
              </ButtonGroup>
            ) : (
              <Box className={classes.carrousel}>
                <Autocomplete
                  size="small"
                  fullWidth
                  id="autocompleteProduct"
                  options={capabilities.map((option) => option.name)}
                  filterSelectedOptions
                  value={currentProduct}
                  onChange={handleChangeProduct}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      style={{ minWidth: 300 }}
                      variant="outlined"
                      label="Área"
                    />
                  )}
                />
              </Box>
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

ProductsButton.propTypes = {
  product: PropTypes.number.isRequired,
  capabilities: PropTypes.array.isRequired,
  handleSetProduct: PropTypes.func.isRequired,
};

export default ProductsButton;
