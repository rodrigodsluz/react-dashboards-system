/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';

const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const Container = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  left:0;
  z-index: 10;
  width:100%;
  overflow-y: auto;
  margin:0 auto;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  display: flex;
  align-items: center;
  flex-direction: column;
  animation: ${FadeInAnimation} 0.3s linear;
 
`;
