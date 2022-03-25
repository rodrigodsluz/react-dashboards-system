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

export const ModalityFilter = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 0 0;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

export const Title = styled.span`
  margin-left: 13px;

  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;
