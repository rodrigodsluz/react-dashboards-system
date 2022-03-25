/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  padding-bottom: 10px;
`;

export const Color = styled.div`
  height: 15px;
  min-width: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
