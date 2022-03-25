/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';

export const Wrapper = styled.div`
  margin: 120px 0px 0px 80px;
  display: flex;
  align-items: center;
  padding: 20px;

  @media ${device.laptopL} {
    flex-direction: column;
    margin: 120px 0px 0px 0px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;
export const LeftColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  @media ${device.laptopL} {
    width: 100vw;
    padding: 20px;
    margin-left: 4px;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }
`;
export const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  height: 750px;
  overflow: hidden;
  width: 100%;
  margin: 0px 10px;
  padding: 20px;
  @media ${device.desktopL} {
    width: 90%;
    padding: 20px;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;
