/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.common.white,
  },
  innerContainer: {
    padding: '50px',
    background: theme.palette.common.white,
  },
  messageBox: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: '1.5rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    '@media (min-width:200px)': {
      fontSize: '1.3rem',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8rem',
    },
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: '80%',
  },

  linkBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    textDecoration: 'none',
  },
  icon: {
    marginRight: 10,
    color: theme.palette.text.secondary,
  },
  back: {
    color: theme.palette.text.secondary,
  },
}));
