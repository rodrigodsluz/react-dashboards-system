/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 88.4vw;
  display: flex;
  flex-direction: column;


  & > *:not(:last-child){
    margin-bottom: 30px;
  }
`;
