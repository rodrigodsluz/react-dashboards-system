/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: ${colors.bg2};
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 25px 0;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding-bottom: 10px;
    align-items: center;
    justify-content: space-around;
    padding: 80px 0 10px 0;

    position: relative;
  }
`;

export const WrapperPageName = styled.div`
  @media ${device.laptop} {
    padding: 20px 0;
  }
`;

export const WrapperDatePicker = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 200px;
  }

  @media ${device.laptop} {
    padding: 15px 15px 20px 0;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export const WrapperDateItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media ${device.laptop} {
    margin-bottom: 10px;

    width: 100%;
    justify-content: flex-end;
  }
`;

export const Grid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
