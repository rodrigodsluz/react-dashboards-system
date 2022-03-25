/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const OutlineButton = styled.div`
  background: white;
  border: 1px solid #87bdff;
  padding: 9px 25px;
  border-radius: 5px;
  font-weight: bold;
  color: #117eff;
  margin-right: 190px;
  width: 112px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: white;
    background: linear-gradient(to right, rgb(0, 225, 255), rgb(17, 126, 255));
  }
`;
