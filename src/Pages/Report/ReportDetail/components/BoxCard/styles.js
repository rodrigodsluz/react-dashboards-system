/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { device } from '../../../../../theme/sizes';

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 14px;
  padding: 0px 10px;
  margin: 20px 0;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
 
`;

export const LabelColor = styled.span`
  color: #787878;
`;

export const AccordionContainer = styled(Accordion)`
  && {
    border-radius: 14px;
    border: none;
    box-shadow: none;
  }
`;

export const AccordionTitle = styled(AccordionSummary)`
  && {
    height: 19px;
  }
`;

export const AccordionContent = styled(AccordionDetails)`
  && {
    display: flex;
    flex-direction: column;
    margin-top: -13.5px;
  }
`;

export const EditButton = styled.div`
  position: absolute;
  top: ${(props) => (props.active ? '10px' : '4px')};
  right: 50px;

  button {
    margin: 0px;
  }
`;

export const WrapperEditting = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
  &:nth-child(2) {
    margin-top: 30px;
  }
 
`;

export const EdittingButton = styled.button`
  background-color: transparent;
  padding: 5px;
`;

export const ContainerInputs = styled.div`
  display: flex;

  @media ${device.mobileM} {
    input{
    width: 100%;
  }
  overflow-x: hidden;

  }
 
`;
