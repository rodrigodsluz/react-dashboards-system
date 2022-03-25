/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../../../theme/colors';

export const ExtrasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SearchedDataContainer = styled.div`
  background-color: ${colors.bg2};
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 10px 0px;
  }
`;

export const ResultBoxContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
`;

export const BoxContent = styled.div`
  background-color: ${colors.details};
  width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;
