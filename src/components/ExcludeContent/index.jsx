import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { Typography } from '@d1.cx/components';

import { useStyles } from './styles';

const SuccessContent = ({ messageOne, messageTwo }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.iconBox}>
        <img src="https://campanhasmail.azurewebsites.net/images/workflow/delete-item.gif" alt="" width="100px" height="100px" />
      </Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography className={classes.messageOne} horizontal="2px">{messageOne}</Typography>
        <Typography className={classes.messageTwo} bold>
          {`${messageTwo}?`}
        </Typography>
      </Box>
    </Box>
  );
};

SuccessContent.defaultProps = {
  messageOne: 'Ação executada!',
  messageTwo: 'Muito Obrigado',
};

SuccessContent.propTypes = {
  messageOne: PropTypes.string,
  messageTwo: PropTypes.string,
};

export default SuccessContent;
