import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressBar = styled(LinearProgress)`
  && {
    background-color: red;
    color: green;
  }
`;

const useStyles = makeStyles({
  gridItem: {
    marginTop: '1rem',
  },
  iconButton: {
    marginLeft: '5px',
    marginTop: '3px',
  },
});

export default useStyles;
