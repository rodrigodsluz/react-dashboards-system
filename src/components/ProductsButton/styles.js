/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginLeft: 5,
    display: 'inline-block',
    padding: '15px',
  },
  carrousel: {
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleButton: {
    margin: '0 10px 0 10px',
    boxShadow: 'inherit',
    border: 'none !important',
    borderRadius: '4px !important',
    minWidth: '200px',
  },
  border: {
    boxShadow: 'inherit',
    minWidth: '200px',
    border: `1px solid ${theme.palette.primary.main} !important`,
  },
}));
