/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #cccfde;
  border-radius: 5px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px 15px;

  span {
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const Name = styled.div`
  width: 70%;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    padding-left: 10px;
  }
`;
