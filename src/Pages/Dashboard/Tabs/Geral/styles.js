/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../../../theme/sizes';
import colors from '../../../../theme/colors';

export const Wrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  overflow: hidden;

  max-width: ${device.desktopL};
  @media ${device.laptopL} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  @media ${device.laptopL} {
    width: 100%;
  }
`;

export const GridLayout = styled.div`
  display: flex;
  overflow: hidden;
`;

export const OnlyColumn = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  background-color: ${colors.textPrimary};

  @media ${device.laptopL} {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }
`;
export const WrapperCards = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  max-height: 400px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${colors.textPrimary};
  padding: 10px;
  margin-right: 10px;

  @media ${device.laptopL} {
    width: 100%;
  }

  @media ${device.mobileL} {
    margin-left: 10px;
  }
`;

export const WrapperSLA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.textPrimary};
  width: 100%;
  border-radius: 15px;
`;
export const WrapperBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.textPrimary};
  width: 100%;
  height: 500px;
  margin: 10px 0px 0px 0px;
  padding: 10px 0px;
  border-radius: 15px;
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  padding: 10px;
  justify-content: center;
  align-items: left;
  width: 100%;
  min-width: 400px;

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media ${device.laptop} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow-y: hidden;
  }
`;

export const ScrollLegend = styled.div`
  height: 400px;
  overflow-y: auto;
  border-radius: 5px;
`;

export const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
  }
`;
