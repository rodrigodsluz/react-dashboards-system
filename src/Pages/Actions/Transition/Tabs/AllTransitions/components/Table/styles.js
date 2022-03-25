/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../../../../../../theme/colors';

export const Container = styled.div`
  width: 60%;

  button {
    width: 100%;
  }
`;

export const WrapperModal = styled.div`
  width: 400px;
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

export const ContainerModal = styled.div`
  
  display: flex;
  justify-content: center;
  
  padding: 50px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;
