/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 500px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export const WrapperInputs = styled.div`
  max-height: 80%;
  overflow-y: scroll;

`;
export const WrapperButtons = styled.div`
  display: flex;
  padding: 0px 10px;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  left: 0px;
  button {
    width: 200px;
  }
`;

export const Select = styled.select`
  height: 35px;
  border: 1px solid #cccfde;
  border-radius: 4px;
  outline: none;
  text-align: center;
  color: #9196ab;
  width: 100%;

  @media (max-width: 800px) {
    width: 50%;
  }
`;

export const Option = styled.option``;

export const WrapperDatePicker = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 80%;
  input {
    max-width: 240px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const WrapperDateItem = styled.div`
  flex: 50%;
`;
