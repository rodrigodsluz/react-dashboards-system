/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  input {
    height: 35px;
    margin-top: 10px;
    margin-right: 10px;
  }
  button {
    margin-right: 5px;
  }
`;

export const ClickButton = styled.button`
  background-color: transparent;
  width: 45px;
`;

export const Select = styled.select`
  height: 35px;
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  text-align: center;
`;

export const Option = styled.option``;
