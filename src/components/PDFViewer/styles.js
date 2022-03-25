/* eslint-disable import/prefer-default-export */
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
  },
  actions: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',

    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateAreas: '"left center right"',
    justifyContent: 'center',
    alignItems: 'end',

    pointerEvents: 'none',
    '& > *': {
      pointerEvents: 'auto',
    },
  },
  pagination: {
    gridArea: 'center',
    justifySelf: 'center',
  },
  zoom: {
    gridArea: 'right',
    justifySelf: 'end',
  },
  fadeHover: {
    padding: '1rem',
    margin: '1.5rem',
    opacity: 0.25,
    transition: 'opacity .3s ease',
    '&:hover': {
      opacity: 1,
    },
    '& button[disabled]': {
      background: '#1976D2',
    },
  },
  scrollable: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    overflowY: 'scroll',
    '& > *': {
      margin: 'auto',
    },
  },
  loading: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: '#ffffffcc',
    transition: 'opacity .3s ease',

    '&.active': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
}));

export { useStyles };
