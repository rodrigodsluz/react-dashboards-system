/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';
import colors from '../../theme/colors';

export const Container = styled.div`
  width: 320px;
  height: 110px;
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${(props) => props.type === 'sucess'
    && css`
    background-image: linear-gradient(
      to right,
      ${colors.cardSucessDegrade1} 0%,
      ${colors.cardSucessDegrade2} 51%,
      ${colors.cardSucessDegrade2} 100%
    ); 
    `}


    ${(props) => props.type === 'running'
    && css`
    background-image: linear-gradient(
      to right,
      ${colors.cardRunningDegrade1} 0%,
      ${colors.cardRunningDegrade2} 51%,
      ${colors.cardRunningDegrade2} 100%
    ); 
    `}

    ${(props) => props.type === 'finishi'
    && css`
    background-image: linear-gradient(
      to right,
      ${colors.cardFinishedDegrade1} 0%,
      ${colors.cardFinishedDegrade2} 51%,
      ${colors.cardFinishedDegrade2} 100%
    ); 
    `}
  
  
`;

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`;
