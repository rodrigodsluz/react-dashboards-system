/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  cardChart: {
    width: '49.5%',
    margin: '15px 0 20px 0',
    borderRadius: theme.spacing(1),
    transition: '0.3s',
    overflow: 'initial',
    background: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  contentLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
