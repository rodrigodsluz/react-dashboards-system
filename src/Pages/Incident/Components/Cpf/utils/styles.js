import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  span: {
    display: 'inline-block',
    padding: '0.4em',
    minWidth: '128px',
    fontSize: '90%',
    borderRadius: '30px',
    fontWeight: '400',
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(33, 150, 243)',
    textAlign: 'center',
  },
  iconButton: {
    marginLeft: '5px',
    marginTop: '3px',
  },
  formLabel: {
    verticalAlign: 'true',
  },
  noWrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default useStyles;
