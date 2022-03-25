import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    minWidth: 200,
    height: '100vh',
    borderRadius: 0,
  },
  menuList: {
    outline: 'none',
  },
  menuItem: {
    padding: '10px 20px',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  linkLabel: {
    // fontWeight: '600',
  },
  icon: {
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
