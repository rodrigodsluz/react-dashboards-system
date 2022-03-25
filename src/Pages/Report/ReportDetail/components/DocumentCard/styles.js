/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { device } from '../../../../../theme/sizes';

import Theme from '../../../../../theme';

export const Container = styled.div`
  width: 420px;
  height: 100px;
  padding: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #cccfde;
  border-radius: 14px;
  margin-bottom: 10px;
  position: relative;

  &:hover {
    background: #fafafa;
  }

  @media ${device.laptop} {
    width: 80vw;
  }

  @media ${device.laptopL} {
    width: 100%;
  }
`;

export const CardBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 90px;
  background: none;

  position: relative;

  &:hover {
    background: #fafafa;
  }
`;

export const ThreeDotsMenu = styled.div`
  position: absolute;
  bottom: 29px;
  right: 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  white-space: nowrap;
`;

export const CardInfo = styled.div`
  margin: 10px 110px 0 20px;
`;

export const ChangeStatusBtn = styled.button`
  outline: none;
  border: none;
  background: transparent;

  &:hover {
    cursor: pointer;
    background: transparent;
  }
`;

export const DeleteBtn = styled.button`
  margin: auto;
  background: transparent;
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  color: white;
  padding: 30px;

  ${(props) => props.status === 'ok'
    && css`
      background: #43a047;
    `}

  ${(props) => props.status === 'pending'
    && css`
      background: #f44336;
    `}

    ${(props) => props.status === 'in_analisys'
    && css`
      background: #ffdd59;
    `}
`;

export const CardName = styled.div`
  width: 200px;
  padding-bottom: 5px;
  
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const useStyles = makeStyles((theme) => ({
  menu: {
    '& .MuiPaper-root': {
      boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.25)',
      borderRadius: '14px',
    },
  },
  modalBox: {
    padding: '0px',
    width: '200px',
  },
  optionBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
  protocolStatusBox: {
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
  },
  protocol: {
    marginRight: 20,
    fontSize: 18,
  },
  addDocButtonsBox: {
    padding: '20px 0',
    display: 'flex',
  },
  addDocBtn: {
    marginRight: '10px',
  },
  contentCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up('md')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'wrap',
    },
  },
  table: {
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.light,
    '&:hover': {
      color: theme.palette.text.light,
      textDecoration: 'none',
    },
  },
  buttonChangeStatus: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'transparent',
    },
  },
  cards: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '29.5%',
    },
  },
}));

export const AddDocumentsButton = withStyles(() => ({
  root: {
    marginRight: '15px',
    color: Theme.palette.text.light,
    fontWeight: 600,
    backgroundColor: Theme.palette.buttons.default.light,
    '&:hover': {
      backgroundColor: Theme.palette.buttons.default.hover,
    },
  },
}))(Button);

export const SaveButton = withStyles(() => ({
  root: {
    color: Theme.palette.text.light,
    fontWeight: 600,
    backgroundColor: Theme.palette.buttons.save.lightGreen,
    '&:hover': {
      backgroundColor: Theme.palette.buttons.save.hoverGreen,
    },
  },
}))(Button);

export const CancelButton = withStyles(() => ({
  root: {
    fontWeight: 600,
    marginLeft: 10,
    color: Theme.palette.text.primary,
    backgroundColor: Theme.palette.buttons.cancel.light,
    '&:hover': {
      backgroundColor: Theme.palette.buttons.cancel.hover,
    },
  },
}))(Button);

export const DownloadButton = withStyles(() => ({
  root: {
    color: Theme.palette.text.light,
    fontWeight: 600,
    backgroundColor: Theme.palette.buttons.download.lightGray,
    borderRadius: 20,
    '&:hover': {
      backgroundColor: Theme.palette.buttons.download.hoverGray,
    },
  },
}))(Button);

export const StyledTableRow = withStyles(() => ({
  root: {
    cursor: 'pointer',
  },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 15,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);
