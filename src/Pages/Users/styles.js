/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const Container = styled.div`

  @media ${device.laptop} {
    margin: 0px 0px 230px;
    position: absolute;
    width: 100vw;
  }
`;

export const Wrapper = styled.div`
  margin: 125px 20px 0px 90px;

  @media ${device.laptop} {
    margin: 20px 20px 0px 15px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DeleteItem = styled.button`
  background-color: transparent;
`;

export const GroupItem = styled.div`
  display: inline-block;
  background-color: ${colors.details};
  color: ${colors.textPrimary};
  margin: 5px;
  border-radius: 5px;
  padding: 5px;
`;

export const WrapperLottie = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
 background-color: red;
`;

export const TableLoadingContainer = styled.div`
  text-align: center;
  padding: 10px;
  max-height: 280px;
  overflow: hidden;
`;
