import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LottieNotification from '../LottieNotification/LottieNotification';

import { useStyles } from './styles';

const ConfirmationContent = ({ messageOne }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.iconBox}>
        <LottieNotification
          animation="question"
          description=""
          width="150px"
          height="150px"
        />
      </Box>
      <Typography className={classes.messageOne}>{messageOne}</Typography>
    </Box>
  );
};

ConfirmationContent.defaultProps = {
  messageOne: 'Ação executada!',
};

ConfirmationContent.propTypes = {
  messageOne: PropTypes.string,
};

export default ConfirmationContent;
