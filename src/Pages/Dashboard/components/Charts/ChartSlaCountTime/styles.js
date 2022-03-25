/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chartBox: {
    width: '32.8%',
  },

  cardChart: {
    width: '100%',
    margin: '20px 0 20px 0',
    borderRadius: spacing(1),
    transition: '0.3s',
    overflow: 'initial',
    background: palette.common.white,
  },

  cardHeader: {
    color: palette.text.light,
    backgroundColor: palette.primary.main,
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
    color: palette.text.common,
  },

  data: {
    fontWeight: 'bold',
  },

  contentLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
