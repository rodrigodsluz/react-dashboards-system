/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  background: #1a1731;
  border-radius: 14px;

  width: 540px;

  padding: 10px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin: 0 15px 15px 0;

  @media ${device.tablet} {
    width: 100%;

    flex-direction: column;
  }

  @media ${device.mobileL} {
    width: 250px;
  }

`;

export const TimePickerWrapper = styled.div`
  input {
    width: 80px;
    padding: 9px;
  }
`;
