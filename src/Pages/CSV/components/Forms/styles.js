/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 10px;

  display: flex;
  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
  overflow-y: scroll;

  height: 100vh;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 10px 0px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  height: 120px;
  input {
    margin: 0px;
  }

  select {
    width: 286px;
  }
`;

export const WrapperRow = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin: 0px;
  }
`;

export const WrapperCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
