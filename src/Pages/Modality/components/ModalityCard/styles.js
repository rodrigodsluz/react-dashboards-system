/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
// import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  background: #1A1731;
  border-radius: 14px;

  width: 310px;
  height: 100px;

  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 15px 0;

  cursor: pointer;

  @media (max-width: 684px) {
    margin: auto;
    margin-bottom: 10px;
  }
`;
