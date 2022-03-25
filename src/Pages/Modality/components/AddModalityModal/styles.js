/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const RightContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-top: 13px;

  margin-top: -13px;

  height: 82vh;
  overflow: auto;
  overflow-x: hidden;

  @media ${device.laptop} {
    width: 90%;
    height: 100vh;

    margin-top: 0px;
  }

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    width: 83%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin-right: 260px;
  margin-top: -12px;

  @media ${device.laptop} {
    margin-top: 60px;
  }

  @media ${device.tablet} {
    margin-right: 60px;
  }

  @media ${device.mobileL} {
    margin: 55px 0 0 34px;
  }
`;

export const GridChips = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-height: 300px;
  overflow-y: scroll;
  padding: 10px;
  margin: 0 auto;
`;

export const DataList = styled.datalist``;

export const Option = styled.option``;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
  margin-top: 4px;

`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 77%;
  }

  @media ${device.tablet} {
    button {
      width: 100%;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
`;
export const WrapperCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  input {
    width: 30px;
  }
`;

export const Select = styled.select`
  width: 100%;
  max-width: 500px;
  padding: 7px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
