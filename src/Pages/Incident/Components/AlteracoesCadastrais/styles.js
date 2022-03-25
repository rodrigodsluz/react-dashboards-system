import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';

export const Container = styled.div``;

export const WrapperButton = styled.div`
  width: 100%;

  button {
    width: 100%;
  }
`;

export const WrapperDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  max-height: 300px;
  border: 1px dashed #ccc;

  margin: 10px;

  p {
    text-align: center;
  }
`;

const useStyles = makeStyles({
  gridItem: {
    marginTop: '1rem',
  },
  dropZone: {
    marginTop: '1rem',
  },
});

export default useStyles;
