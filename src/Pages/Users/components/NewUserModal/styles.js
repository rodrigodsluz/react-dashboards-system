/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    width: 83%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex;
  width: 300px;
  margin-right: 210px;

  @media ${device.tablet} {
    margin-right: 60px;
  }

  @media ${device.mobileL} {
    margin: 0 0 0 34px;
  }
`;

export const WrapperInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input,
  select {
    width: 500px;
  }

  @media ${device.tablet} {
    input,
    select {
      width: 350px;
    }
  }

  @media ${device.mobileL} {
    input,
    select {
      width: 250px;
    }
  }
`;

export const GridChips = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-height: 300px;
  max-width: 500px;
  overflow-y: scroll;
  padding: 10px;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
`;

export const DataList = styled.datalist``;

export const Option = styled.option``;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 500px;
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

export const WrapperDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  max-height: 300px;
  border: 1px dashed #ccc;

  margin: 10px;

  p {
    text-align: center;
  }
`;
