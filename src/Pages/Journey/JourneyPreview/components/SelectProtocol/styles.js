/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div``;

export const ProtocolScroll = styled.div`
  max-height: 500px;
  width: 80%;
  overflow-y: auto;
  margin-top: 20px;
`;
export const ProtocolItem = styled.button`
  border: 1px solid #CCCFDE;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  height: 51px;
  margin-bottom: 10px;

  p{
      text-align:center ;
  }
`;
