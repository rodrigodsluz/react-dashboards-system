/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chartBox: {
    width: '49.5%',
  },

  cardChart: {
    margin: '5px 0 20px 0',
    borderRadius: theme.spacing(1),
    transition: '0.3s',
    overflow: 'initial',
    background: theme.palette.common.white,
  },

  cardHeader: {
    color: theme.palette.text.light,
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    padding: '5px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  label: {
    fontWeight: 'bold',
    color: theme.palette.text.common,
  },

  data: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },

  contentLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
