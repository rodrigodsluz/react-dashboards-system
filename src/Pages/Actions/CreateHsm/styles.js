/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  height: 90vh;
  width: 100%;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  border-radius: 10px;
  input,
  textarea {
    min-width: 100%;
    border: 1px solid #cccfde;
    font-size: 13px;
  }
`;

export const Textarea = styled.textarea`
  min-height: 150px;
  max-height: 150px;
  outline: none;
  padding: 10px;
`;

export const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Click = styled.button`
  background-color: transparent;
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

export const WrapperSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  select {
    min-width: 150px;
  }
`;

export const Flex = styled.div`
  width: 50%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-y: scroll;
`;

export const WrapperCombo = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`;
