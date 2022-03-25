/* eslint-disable import/prefer-default-export */
import { makeStyles, withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardTable: {
    width: '45%',
    borderRadius: theme.spacing(1),
    transition: '0.3s',
    overflow: 'initial',
    background: theme.palette.common.white,
  },
  cardTableHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: theme.palette.text.light,
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    overflow: 'auto',
    marginTop: 0,
    height: 290,

    '& table': {
      marginBottom: 5,
    },
  },

  cardChart: {
    width: '54%',
    borderRadius: theme.spacing(1),
    transition: '0.3s',
    overflow: 'initial',
    background: theme.palette.common.white,
  },

  chartPieContent: {
    overflow: 'auto',
    marginTop: 10,
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    height: 350,
  },
}));

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 15,
  },
  body: {
    padding: 0,
  },
}))(TableCell);
