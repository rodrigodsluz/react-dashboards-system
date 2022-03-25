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
  descriptionField: {
    height: '3rem',
    marginBottom: '3rem',
  },
  submitButton: {
    marginTop: '1rem',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

export default useStyles;
