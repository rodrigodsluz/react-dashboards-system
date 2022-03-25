/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  menuList: {
    width: '100%',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {},
  link: {
    textDecoration: 'none',
    textUnderlineOffset: 'none',
    border: 'none',
    marginRight: 10,
    padding: 6,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignContent: 'center',
    '&:hover': {
      textDecoration: 'none',
      background: theme.palette.primary.main,
      borderRadius: 5,
      color: theme.palette.text.light,
    },
    '&:focus': {
      textDecoration: 'none',
      background: theme.palette.primary.main,
      borderRadius: 5,
      color: theme.palette.text.light,
    },
  },
  activeLink: {
    textDecoration: 'none',
    background: theme.palette.primary.main,
    borderRadius: 5,
    color: theme.palette.text.light,
  },
  listItemIcon: {
    minWidth: 10,
  },
  icon: {
    marginRight: 5,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItemlabel: {
    display: 'flex',
    fontWeight: 600,
    padding: '0 5px',
  },
}));
