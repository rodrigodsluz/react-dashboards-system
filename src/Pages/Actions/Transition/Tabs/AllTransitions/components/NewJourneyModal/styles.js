/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;

export const WrapperInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  input,
  select,
  textarea {
    width: 500px;
  }

  textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 100%;
    max-width: 100%;
    outline: none;
    padding: 10px;
    color: #9196ab;
  }
`;

export const GridChips = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-height: 300px;
  overflow-y: scroll;
  padding: 10px;
  margin: 0 auto;
`;

export const DataList = styled.datalist``;

export const Option = styled.option``;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 500px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
`;
export const WrapperCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  input {
    width: 30px;
  }
`;

export const Select = styled.select`
  width: 100%;
  max-width: 500px;
  padding: 7px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
