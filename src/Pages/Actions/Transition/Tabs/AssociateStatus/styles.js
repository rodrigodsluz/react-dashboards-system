/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../../theme/sizes';
import colors from '../../../../../theme/colors';

export const Container = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 500px;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    width: 95vw;
    padding: 0px 10px;
  }
`;

export const Row = styled.div`
  width: 50%;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-height: 300px;
  overflow-y: scroll;
  padding: 10px;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
`;
