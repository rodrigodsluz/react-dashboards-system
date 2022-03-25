/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';

import { Dropdown } from 'rsuite';
import { device } from '../../../theme/sizes';
import colors from '../../../theme/colors';

export const DetailsContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 99.6vw;
  margin-top: -30px;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 0px;
    margin-top: -110px;
  }
`;

export const MainContainer = styled.div`
  width: 65vw;
  margin: 120px 20px 10px 90px;
  overflow: hidden;

  @media ${device.laptop} {
    width: 95vw;
    margin-left: 20px;
  }
`;

export const ChangeStatusOrOperatorContainer = styled.div`
  margin: 10px 0 25px 30px;
  display: flex;
  align-self: end;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    text-decoration: none;
  }
`;

export const Drop = styled(Dropdown)`
  border: 1px solid #cccfde;
  border-radius: 14px;
  padding: 2px;
`;

export const TabsContainer = styled.div`
  background: white;
  border-radius: 14px;
  margin-bottom: 10px;
`;

export const TabLabel = styled(Tab)`
  text-transform: none;
  font-weight: bold;

  ${(props) => props.position === 'left'
    && css`
        margin-right: 150px;

        @media only screen and (max-width: 650px) {
          margin-right: 0px;
        }
      );
    `}

  ${(props) => props.position === 'right'
    && css`
        margin-right: 40px;
      );
    `}
`;

export const TabListContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TabsWrapper = styled.div`
  height: 64vh;

  @media ${device.mobileL} {
    height: 74vh;
  }
`;

export const CardMessagesContainer = styled.div`
  width: 57vw;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 14px;
  margin: -30px;
  overflow-y: scroll;
  height: 50vh;

  @media ${device.laptopL} {
    margin-left: 20px;
  }

  @media ${device.laptop} {
    width: 84vw;
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
`;

export const MessagesWrapper = styled.div`
  margin-bottom: 10px;
  border-radius: 14px;
  word-break: break-all;
  border: 1px solid #cccfde;
  padding: 15px;
  display: flex;
  justify-content: space-between;

  ${(props) => props.from === 'client'
    && css`
        background: ${colors.details};
        margin-left: auto;

        p{
          color: #fff;
        }
      );
    `}

  @media ${device.laptopL} {
    overflow-x: hidden;
  }

  @media ${device.mobileL} {
    margin-right: 30px;
  }
`;

export const MessageItems = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptopL} {
    width: 100%;
  }
`;

export const DateAndDoubleTickContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media ${device.laptop} {
    width: 100%;
  }
`;

export const InputMessageContainer = styled.div`
  margin: 20px -30px -30px -30px;
`;

export const ObservationsDate = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media ${device.laptopL} {
    width: 100%;
  }
`;

export const DocumentCardsColumn = styled.div`
  width: 32vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px 20px 0px;
  background-color: ${colors.textPrimary};
  margin-top: 125px;
  border-radius: 15px;
  height: 90vh;

  @media ${device.laptopL} {
    flex-direction: column;
    margin: 125px 10px 0 0;
    height: 85vh;
    width: 35vw;
  }

  @media ${device.laptop} {
    width: 94vw;
    margin: 0;
  }
`;

export const ColumnTitle = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${device.laptop} {
    width: 100%;
  }
`;

export const DocumentTitle = styled.div`
  margin: 0 105px;

  @media ${device.laptop} {
    margin: 0 225px;
  }

  @media ${device.mobileL} {
    margin: 0 65px;
  }

  @media ${device.laptopL} {
    margin: 0 25px;
  }
`;

export const DocumentBtns = styled.div`
  margin: 24px 95px;
  align-items: center;

  @media ${device.laptop} {
    margin: 24px 205px;
  }

  @media ${device.mobileL} {
    margin: 24px 50px;
  }

  @media ${device.laptopL} {
    margin: 24px 20px;
  }
`;

export const DocumentCardsContainer = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 0 20px;

  @media ${device.laptopL} {
    width: 100%;
  }
`;

export const DetailsLoadingContainer = styled.div`
  background: white;
  border-radius: 14px;
  padding: 30px;
`;

export const SubHeaderItems = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  @media ${device.mobileL} {
    position: relative;
  }
`;

export const TimelineBtn = styled.div`
  margin: -20px 30px 0px 0;

  @media ${device.mobileL} {
    right: 5px;
    top: 115px;
    position: absolute;
  }
`;

export const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;

  @media ${device.mobileL} {
    margin-left: -70px;
    position: relative;
  }
`;

export const DropdownContainer = styled.div`
  margin: 0px 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.mobileL} {
    margin: 0px 10px 0 0px;
  }
`;

export const ProtocolLabel = styled.div`
  @media ${device.mobileL} {
    margin-left: -20px;
  }
`;

export const BadgeContainer = styled.div`
  @media ${device.mobileL} {
    position: absolute;
    top: 63px;
    left: 0px;
  }
`;

export const TextFieldContainer = styled.div`
  width: 43vw;
  margin-top: 7px;

  @media ${device.laptopL} {
    width: 30vw;
  }

  @media ${device.laptop} {
    width: 42vw;
  }

  @media ${device.mobileL} {
    width: 53vw;
    margin-left: -40px;
  }
`;

export const AttachmentFile = styled.div`
  margin-right: 5px;
`;

export const DeleteBtn = styled.button`
  background: none;
`;

export const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -12px;
  @media ${device.laptopL} {
    margin-left: 40px;
  }
`;

export const DoubleTickIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-left: 5px;
`;

export const MessageDate = styled.div`
  display: flex;
  overflow: hidden;
`;

export const EmptyMessages = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 14px;
`;

export const InputButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 0;
  margin-top: 10px;
  margin-right: 10px;

  @media ${device.mobileL} {
    flex-wrap: nowrap;
  }
`;

export const AttachmentButton = styled.button`
  background: white;
  margin-right: 6px;

  @media ${device.mobileL} {
    margin-right: 0px;
    margin-left: 16px;
    margin-top: 3px;
  }
`;

export const useStyles = makeStyles(() => ({
  menu: {
    '& .MuiPaper-root': {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '14px',
    },
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

export const Row = styled.div`
  display: flex;
  align-items: center;

  
`;
