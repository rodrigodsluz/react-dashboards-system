/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '15px 0',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    margin: '50px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'red',

  },
  icon: {
    fontSize: 70,
    color: 'green',
  },
  messageOne: {
    marginTop: '20px',
    fontSize: '18px',
    textAlign: 'center',
    color: '#808080',
  },

}));
