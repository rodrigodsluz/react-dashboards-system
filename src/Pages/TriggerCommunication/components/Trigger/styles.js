/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
// import { device } from '../../../../theme/sizes';
import color from '../../../../theme/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-top: 0px;
  width: 100%;

  background-color: ${color.bg2};
  input {
    width: 350px;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    width: 40%;
    border: 1px solid #87bdff;
    &:hover {
      border: 1px;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 33px;
  border: 1px solid #cccfde;
  border-radius: 5px;
  padding: 0 0 0 15px;
  outline: 0;
  font-size: 13px;
  color: #9196ab;
  line-height: 33px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;

  button {
    padding-bottom: 0px;
  }

  select {
    margin-bottom: 0px;
  }
`;

export const WrapperCards = styled.div`
display: flex;
justify-content: space-around;
`;
