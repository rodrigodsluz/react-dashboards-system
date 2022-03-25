/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => (props.hiddenBg ? 'transparent' : '#fff')};
  max-width: 350px;
  max-height: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: ${(props) => (props.removeAbsolute ? 'initial' : 'absolute')};;
`;
