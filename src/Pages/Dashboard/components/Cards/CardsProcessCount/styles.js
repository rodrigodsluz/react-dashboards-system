/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flexWrap',
      flexDirection: 'column',
    },
  },
  infoCard: {
    width: '32.8%',
    display: 'flex',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      width: '100%',
      display: 'flex',
    },
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  cardContentProgress: {
    marginTop: 30,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

  boxContent: {
    width: '100%',
  },
  label: {
    color: theme.palette.text.common,
    fontWeight: 'bold',
    fontSize: 14,
  },
  data: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  boxIcon: {
    borderRadius: '50%',
    width: '60px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxIconBackgroundCreate: {
    background: theme.palette.info.light,
  },
  boxIconBackgroundOpen: {
    background: theme.palette.warning.light,
  },
  boxIconBackgroundClose: {
    background: theme.palette.success.light,
  },

  icon: {
    fontSize: 28,
  },
}));
