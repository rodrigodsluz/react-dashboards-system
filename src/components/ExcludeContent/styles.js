/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 70,
    color: 'red',
  },
  messageOne: {
    color: theme.palette.text.secondary,
  },

  messageTwo: {
    marginLeft: 8,
    color: theme.palette.text.secondary,
  },
}));
