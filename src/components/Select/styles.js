/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.select`
  width: 100%;
  height: 33px;
  border-radius: 4px;
  border: 1px solid #cccfde;
  color: #9196ab;
  outline: none;

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

export const Option = styled.option``;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
