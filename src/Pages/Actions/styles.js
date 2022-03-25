/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';
import colors from '../../theme/colors';

export const Container = styled.div`
  background-color: ${colors.background};
  @media ${device.laptop} {
    margin: 0px 0px 230px;
    position: absolute;
    width: 100vw;
  }
`;

export const Wrapper = styled.div`
  margin: 75px 20px 0px 100px;
  background-color: ${colors.bg2};
  @media ${device.laptop} {
    margin: 20px 20px 0px 15px;
  }
`;
