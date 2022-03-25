/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.button`
  background: white;
  border: 1px solid #87bdff;
  padding: 3px 22px;
  border-radius: 4px;
  font-weight: bold;
  color: #117eff;
  width: 105px;
  height: 35px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: linear-gradient(to right, rgb(0, 225, 255), rgb(17, 126, 255));

    p {
      color: white;
    }
  }
`;
