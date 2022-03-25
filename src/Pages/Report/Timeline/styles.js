/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../theme/sizes';

export const TimelineContainer = styled.div`
  width: 92vw;
  margin: 120px 20px 10px 90px;
  overflow: hidden;
  margin-top: 90px;

  @media ${device.laptop} {
    margin: 0px 20px 10px 30px;

    padding-top: 10px;
  }

  @media ${device.mobileL} {
    margin-left: 10px;
    width: 95vw;
  }
`;

export const TimelineWrapper = styled.div`
  background: #fff;
  margin: 15px 0 0 0;
  border-radius: 14px;
`;

export const ContentContainer = styled.div`
  border-radius: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

export const UserAndDateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
`;
