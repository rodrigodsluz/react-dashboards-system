/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../../theme/colors';

export const Container = styled.div`
  margin: 120px 20px 0px 100px;
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

export const WrapperModal = styled.div`
  width: 400px;
`;

export const StatusItem = styled.div`
  background-color: ${(props) => props.color};
  color: ${colors.textPrimary};
  border-radius: 5px;
  border:1px solid #ccc;
  padding: 5px;
  width: 100%;
  color: #fff;
  display: inline-block;
  p {
    text-align: center;
  }
`;
