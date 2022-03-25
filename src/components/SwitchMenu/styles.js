/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../theme/colors';

export const Container = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
  border-radius: 30px;
  height: 50px;
`;

export const SelectItem = styled.button`
  border: none;
  background-color: ${colors.details};
  padding: 10px;
  text-transform: uppercase;
  height: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ContainerHeaderMenu = styled.select`
  width: 268px;
  font-size: 16px;
  height: 50px;
  cursor: pointer;
  padding: 0px 10px;
  line-height: 1;
  border-radius: 10px;
  background-color: ${colors.details};
  color: ${colors.textPrimary};
  outline: none;
  appearance: none;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  background-position-x: 244px;
  text-align-last: center;
`;

export const Item = styled.option`
  background-color: ${colors.details};
  padding: 15px;
  color: ${colors.textPrimary};
`;
