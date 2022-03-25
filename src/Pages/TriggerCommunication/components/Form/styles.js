/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import color from '../../../../theme/colors';

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    border:1px solid #87BDFF;
    margin-left: 20px;
    width: 140px;
    &:hover{
      border:1px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0px;
  flex-wrap: wrap;
  width: 100%;
  background-color: ${color.bg2};
  input {
    width: 350px;
  }


  form{
    margin: 0px 40px;
  }
`;

export const ContainerSelects = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  width: 350px;
  height: 33px;
  border: 1px solid #cccfde;
  border-radius: 5px;
  padding: 0 0 0 15px;
  outline: 0;
  font-size: 13px;
  color: #9196ab;
  line-height: 33px;
  margin-bottom: 10px;
`;

export const Wrapper = styled.div`
  overflow-y: scroll;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  div {
    margin: 5px;
  }
`;
