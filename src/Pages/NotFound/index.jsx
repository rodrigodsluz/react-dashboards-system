import React from 'react';

import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { useStyles } from './styles';

import Logo from '../../assets/workflow.png';

const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} bgcolor="grey.100">
      <Box className={classes.innerContainer}>
        <Box className={classes.imageBox}>
          <img
            src={process.env.REACT_APP_LOGO || Logo}
            alt={process.env.REACT_APP_NAME || 'Workflow'}
            className={classes.img}
          />
        </Box>
        <Box className={classes.messageBox}>
          <Typography className={classes.message} variant="h1">
            Página não encontrada!
          </Typography>
        </Box>

        <Link to="/dashboard" className={classes.link}>
          <Box className={classes.linkBox}>
            <KeyboardReturnIcon className={classes.icon} />
            <Typography className={classes.back}>VOLTAR</Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
