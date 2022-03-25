/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../../../theme/colors';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  min-width: 400px;

 
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.textPrimary};
  width: 50%;
  min-height: 300px;
  margin: 10px 0px 0px 0px;
  padding: 20px 0px;
  border-radius: 15px;

  p {
    z-index: 9;
  }
  @media ${device.laptop} {
    width: 100%;
  }

  @media ${device.mobileL} {
    margin-right: 60px;
  }
`;

export const Label = styled.span`
    width: 100%;

  @media ${device.mobileL} {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 30px;
  }
`;
