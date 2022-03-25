import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { useStyles, Container } from './styles';
import LottieNotification from '../LottieNotification/LottieNotification';

const SuccessContent = ({ messageOne, messageTwo, error }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container>
        <LottieNotification
          hiddenBg
          width="200px"
          height="200px"
          animation={error ? 'error' : 'check'}
          description=""
        />
      </Container>
      <Typography className={classes.messageOne}>{messageOne}</Typography>
      <Typography className={classes.messageTwo}>{messageTwo}</Typography>
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
  error: PropTypes.bool.isRequired,
};

export default SuccessContent;
