import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

}));

const Loader = () => {
  const classes = useStyles();

  return (
    <CircularProgress className={classes.root} />
  );
};

export default Loader;
