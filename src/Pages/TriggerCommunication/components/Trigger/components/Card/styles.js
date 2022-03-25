/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.button`
  border:1px solid ${(props) => (props.active ? '#00E1FF' : '#ccc')};
  height: 50px;
  width: 50%;
  border-radius: 4px;

  margin: 0 5px;
  margin-bottom: 10px;
  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  p{
      padding-left: 4px;
  }
`;
