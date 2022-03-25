import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const WrapperButton = styled.div`
  width: 100%;

  button {
    width: 100%;
  }
`;
const useStyles = makeStyles({
  gridItem: {
    marginTop: '1rem',
  },
  checkbox: {
    marginLeft: '1rem',
  },
});

export default useStyles;
