/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  margin: 120px 0px 0px 70px;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;

  @media ${device.laptop} {
    flex-direction: row;
    width: 100vw;
  }

  @media ${device.mobileS} {
    flex-direction: column;
  }
`;

export const ContainerUpload = styled.div`
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0px 40px 0px 0px;
`;

export const ContainerAnimation = styled.div`
  background-color: #fff;
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerText = styled.div`
  background-color: #fff;
  padding: 40px;
`;
