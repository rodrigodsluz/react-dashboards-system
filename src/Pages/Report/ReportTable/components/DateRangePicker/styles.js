/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Button } from 'rsuite';

export const DateButton = styled(Button)`
  && {
    border-radius: 14px;
    margin-left: 10px;
    background: white;
    color: #0b5dba;
    border: 1px solid #0b5dba;

    &:hover {
      background: rgb(17, 126, 255);
      border: 1px solid rgb(17, 126, 255);

      color: white;
    }
  }
`;
