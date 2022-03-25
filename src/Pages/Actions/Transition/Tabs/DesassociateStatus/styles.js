/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../../theme/sizes';
import colors from '../../../../../theme/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 50px;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    width: 95vw;
    padding: 0px 10px;
  }
`;

export const Row = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    width: 100%;
  }
`;
export const Card = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: ${colors.bg2};
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  select {
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    outline: none;
  }
`;

export const GridChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
  margin: 0 auto;

  div {
    margin: 10px;
  }

  
`;
