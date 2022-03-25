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
  align-items: center;
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
  select,
  textarea {
    width: 500px;
  }

  textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 100%;
    max-width: 100%;
    outline: none;
    padding: 10px;
    color: #9196ab;
  }

  @media ${device.tablet} {
    input,
    select,
    textarea {
      width: 350px;
    }
  }

  @media ${device.mobileL} {
    input,
    select,
    textarea {
      width: 250px;
    }
  }
`;

export const ContentWrapper = styled.span`
  @media ${device.tablet} {
    width: 350px;
  }

  @media ${device.mobileL} {
    width: 250px;
  }
`;

export const SelectWrapper = styled.span`
  margin: auto;
  @media ${device.tablet} {
    margin-left: 50px;
  }

  @media ${device.mobileL} {
    margin: 0;
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

export const PreviewLabel = styled.span`
  display: flex;
  align-items: left;
  width: 72%;

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const Select = styled.select`
  width: 100%;
  max-width: 500px;
  padding: 7px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
`;

export const WrapperColorPickers = styled.div`
  display: flex;
  justify-content: space-around;
  width: 500px;

  @media ${device.mobileL} {
    width: 300px;
  }
`;

export const ColorPicker = styled.input`
  width: 100px;
  border: none;
`;

export const PreviewStatus = styled.div`
  background-color: ${(props) => (props.value ? props.value : '#000')};
  width: 100px;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #ccc;
  p {
    text-align: center;
  }
`;

export const SLA = styled.input`
  outline: none;
  width: 100px;
  padding: 10px;
  font-size: 19px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ContainerSLA = styled.div`
  display: flex;
  align-items: center;
`;
