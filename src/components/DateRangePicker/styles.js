/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  rsButtonSearch: {
    marginLeft: 5,
    background: theme.palette.primary.main,
    color: theme.palette.text.light,
  },
}));
