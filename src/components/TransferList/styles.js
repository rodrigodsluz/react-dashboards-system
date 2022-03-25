/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
  },
  paper: {
    width: 400,
    height: 330,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
    background: theme.palette.primary.main,
    color: theme.palette.text.light,
    fontWeight: 700,
  },
}));
