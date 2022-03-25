/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../theme/sizes';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 80vh;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  border-radius: 10px;
  input,
  textarea {
    min-width: 100%;
    max-width: 600px;
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

export const Select = styled.select`
  height: 35px;
  width: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  text-align: center;
`;

export const Option = styled.option``;

export const Row = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Flex = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    width: 100%;
  }
`;
