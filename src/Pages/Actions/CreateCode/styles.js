/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;

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
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const RunWrapper = styled.button`
background-color: #1A1731;
display: flex;
justify-content: center;
align-items: center;
border-radius: 4px;
padding: 3px;
width: 50px;
transition: 0.2s ease-in-out;
`;

export const Option = styled.option``;

export const Wrapper = styled.div`
  width: 100%;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 30px;
  background-color: #272822;
`;
