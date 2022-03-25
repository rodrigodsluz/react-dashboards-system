/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../theme/colors';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  background-color: ${colors.background};
  overflow-x: hidden;
  overflow-y: auto;

  @media ${device.laptop} {
    margin-top: 50px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 87%;
  justify-content: space-between;
  margin-top: 0px;

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
  margin-top: 4px;
`;

export const BackMenuContainer = styled.div`
  overflow: scroll;
`;

export const BackButtonsWrapper = styled.div``;

export const StartsOnErrorMessage = styled.p`
  font-size: 10px;
  margin-top: -14px;
  color: ${colors.error};
`;

export const InputsContainer = styled.div`
  width: 93%;
  background-color: ${colors.background};
  margin-left: 100px;
  margin-top: -10px;
`;

export const InputsWrapper = styled.div`
  display: flex;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 12px;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  margin-right: 20px;
  margin-bottom: 0px;

  input {
    width: 230px;
    height: 30px;
    margin-top: 9px;
    margin-right: 15px;
  }
  button {
    margin-right: 5px;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 92vw;
  height: 100vh;
  margin-left: 75px;

  @media ${device.laptop} {
    flex-direction: column;
    width: 100vw;
  }
`;

export const LeftContainer = styled.div`
  width: 60vw;
  background: #fff;
  border-radius: 14px;

  margin-right: 20px;

  @media ${device.laptop} {
    width: 90vw;
    height: 100vh;
  }

  @media ${device.tablet} {
    width: 85vw;
  }
`;

export const RightContainer = styled.div`
  width: 40vw;
  background: #fff;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-top: 13px;

  margin-top: -83px;

  height: 76vh;
  overflow: scroll;

  border: 1px solid #ccc;

  @media ${device.laptop} {
    width: 90vw;
    height: 100vh;

    margin-top: 10px;
  }

  @media ${device.tablet} {
    width: 85vw;
  }
`;

export const HolidayPickerWrapper = styled.div`
  margin-top: 0px;

  @media ${device.laptop} {
    margin-bottom: 20px;
  }

  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

export const TimeWrapper = styled.div`
  margin-top: 22px;
  @media ${device.laptop} {
    margin: 20px 0;
  }
`;

export const StartsOnContainer = styled.div`
  display: flex;
  align-items: left;
  margin-left: -6px;
  margin-bottom: 12px;
  input {
    width: 53px;
    height: 33px;
    text-align: center;
    margin-left: 7px;
    outline: none;
    padding: 10px;
    font-size: 19px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const CreateModalityButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  button {
    width: 100%;
  }

  @media ${device.laptop} {
    button {
      width: 90%;
      margin-right: 100px;
    }
  }
`;

export const OutlineButton = styled.button`
  background: white;
  border: 1px solid #87bdff;
  padding: 3px 22px;
  border-radius: 4px;
  font-weight: bold;
  color: #117eff;
  margin-right: 190px;
  width: 105px;
  height: 35px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: white;
    background: linear-gradient(to right, rgb(0, 225, 255), rgb(17, 126, 255));
  }
`;

export const useStyles = makeStyles(() => ({
  menu: {
    '& .MuiPaper-root': {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '14px',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  },
}));
