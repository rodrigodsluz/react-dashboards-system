/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';
import colors from '../../theme/colors';

export const Container = styled.div`
  background-color: ${colors.bg2};

  @media ${device.laptop} {
    margin: -110px 0px 230px;
  }
`;

export const Wrapper = styled.div`
  margin: 100px 20px 0px 100px;
  background-color: #fff;
  height: 90vh;
  padding: 20px;
  @media ${device.laptop} {
    margin: 120px 20px 0px 15px;
  }
`;
