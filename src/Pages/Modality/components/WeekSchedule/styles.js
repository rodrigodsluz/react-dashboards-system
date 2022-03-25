/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  &:nth-child(7) {
    background: red;
    margin: 50px;
  }
  @media ${device.laptop} {
  }
`;
