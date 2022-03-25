/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const Container = styled.div`
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  width: 700px;
  overflow-y: auto;
  overflow-x: hidden;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  display: flex;
  align-items: center;
  flex-direction: column;
  animation: ${FadeInAnimation} 0.3s linear;

  @media ${device.tablet} {
    width: 420px;
  }

  @media ${device.mobileL} {
    width: 300px;
  }
`;

export const DontClickedArea = styled.div`
  background-color: ${colors.details};
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
`;
