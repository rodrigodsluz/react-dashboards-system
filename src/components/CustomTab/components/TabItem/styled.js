import styled from 'styled-components';

export const TabItemStyled = styled.li`
  padding: 0 20px;
  position: relative;
  height: 45px;
  margin: 0 20px;
  &:first-child {
    margin: 0 20px 0 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TabTextStyled = styled.button`
  display: block;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 14px;
  line-height: ${(props) => (props.active ? '45px' : '48px')};
  height: 45px;
  color: ${(props) => (props.active ? '#3e4157' : '#9196AB')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    cursor: pointer;
    color: #3e4157;
  }
`;
