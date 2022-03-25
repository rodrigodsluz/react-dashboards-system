import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const WrapperButton = styled.div`
  width: 100%;

  button {
    width: 100%;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginTop: '10rem',
      marginBottom: '1rem',
    },
    marginTop: '4rem',
    marginBottom: '2rem',
  },
  container: {
    justifyContent: 'center',
  },
}));

export default useStyles;
