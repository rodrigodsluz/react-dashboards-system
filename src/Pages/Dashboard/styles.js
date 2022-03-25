/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  width: 100vw;
  margin-left: 92px;
  margin-top: 120px;
  margin-right: 20px;
  overflow: hidden;

  @media ${device.laptop} {
    margin-top: 10px;
    margin-left: 0px;
    margin-right: 0px;
    position: absolute;
  }
`;

export const WrapperHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapperTabs = styled.div`
  background-color: #fff;
  overflow: hidden;

  @media ${device.mobileS} {
    overflow-x: scroll;
  }
`;
