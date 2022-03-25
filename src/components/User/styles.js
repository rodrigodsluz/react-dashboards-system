/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  width: 35px;
  height: 35px;
  color: #000;
  font-weight: bold;
  font-size: 16px;

  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  objectFit: contain,
`;
