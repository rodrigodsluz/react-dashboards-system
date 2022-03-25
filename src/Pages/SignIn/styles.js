/* eslint-disable import/prefer-default-export */
import styled, { keyframes, css } from 'styled-components';

import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  overflow: hidden;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export const GenerticColorButton = styled.button`
  width: ${(props) => props.width};
  height: 2.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-image: linear-gradient(
      to right,
      ${colors.degradeColor1} 0%,
      ${colors.degradeColor2} 51%,
      ${colors.degradeColor2} 100%
    );
  }
`;

export const LeftColumn = styled.div`
  width: 20%;
  min-width: 350px;
  height: 100%;
  background-color: ${colors.leftColumn};

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media ${device.tablet} {
    min-width: 100%;
  }
`;

export const LogoClient = styled.img`
  width: 90%;
  margin-bottom: 20px;
  max-width: 300px;
  padding: 20px;
`;

export const RightColumn = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
  }

  @media ${device.tablet} {
    min-width: 100%;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingButton = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  animation: ${(props) => (props.active
    ? css`
          ${rotate} 1s ease-in-out infinite forwards
        `
    : '')};
`;
