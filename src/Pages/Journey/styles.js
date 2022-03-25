/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  @media ${device.laptop} {
    margin: 0px 0px 230px;

    position: absolute;
    width: 100vw;
  }
`;

export const Wrapper = styled.div`
  margin: 120px 20px 0px 90px;

  @media ${device.laptop} {
    margin: 20px 20px 0px 15px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const WrapperLottie = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
`;

export const TableLoadingContainer = styled.div`
  text-align: center;
  padding: 10px;
  max-height: 280px;
  overflow: hidden;
`;
