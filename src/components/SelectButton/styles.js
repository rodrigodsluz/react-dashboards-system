/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import colors from '../../theme/colors';

export const Container = styled.button`
  padding: 10px;
  border-radius: 30px;
  width: 100px;
  text-align: center;
  background-color: ${(props) => (props.check ? colors.details : colors.bg2)};
  border: 1px solid ${colors.details};
  margin: 10px;

  p {
    text-align: center;
    color: ${(props) => (props.check ? colors.bg2 : colors.details)};
  }
`;
