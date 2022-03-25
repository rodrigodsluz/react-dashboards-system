/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../../../theme/sizes';

export const Container = styled.div`
  background: white;
  border-radius: 14px;

  @media ${device.mobileL} {
    width: 360px;
  }
`;
