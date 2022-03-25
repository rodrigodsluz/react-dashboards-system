/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';
import { device } from '../../theme/sizes';

export const ModalContainer = styled(Modal)`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  box-shadow: red;
  padding: 25px;
  border-radius: 14px;

  @media ${device.laptop} {
    flex-direction: column;
    position: relative;
    margin-top: 330px;
  }

  @media ${device.tablet} {
    width: 400px;
  }

  @media ${device.mobileL} {
    width: 300px;
    margin-top: 90px;
  }
`;

export const DropzoneContainer = styled.div`
  margin: 0 423px 0 0;

  @media ${device.laptop} {
    margin-bottom: 380px;
    margin-top: -20px;
    background: red;
  }

  @media ${device.mobileL} {
    margin-top: -50px;
  }
`;

export const TextFieldContainer = styled.div`
  width: 420px;
  padding: 10px;

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const CancelButton = styled.div`
  background: white;
  border: 1px solid #87bdff;
  padding: 9px 25px;
  border-radius: 4px;
  font-weight: bold;
  color: #117eff;
  margin-right: 190px;
  width: 115px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: white;
    background: linear-gradient(to right, rgb(0, 225, 255), rgb(17, 126, 255));
  }

  @media ${device.tablet} {
    margin-right: 120px;
  }

  @media ${device.mobileL} {
    margin-right: 20px;
  }
`;

export const useStyles = makeStyles(() => ({
  textFieldLabel: {
    padding: '6px 0',
  },
  buttonBox: {
    padding: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '1px solid #cccfde',
      borderRadius: '5px',
    },
  },
  cssFocused: {},
  notchedOutline: {
    border: '1px solid #cccfde',
    borderRadius: '5px',
  },
}));
