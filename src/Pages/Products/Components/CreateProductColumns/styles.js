/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  min-width: 300px;
  max-width: 500px;
  width: 100vw;
  height: 420px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-left: 30px;

  select {
    width: 100%;
    height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  @media ${device.mobileL} {
    width: 100%;
    margin-left: 0px;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 35px;
`;
export const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
