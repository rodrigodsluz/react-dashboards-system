/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { motion } from 'framer-motion';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const ChangeStatusBtn = styled.button`
  outline: none;
  border: none;
  background: transparent;

  &:hover {
    cursor: pointer;
    background: transparent;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DetailsLoadingContainer = styled.div`
  background: white;
  border-radius: 14px;
  padding: 30px;
`;

export const DocumentsContainer = styled.div`
  overflow: hidden;
  width: 91%;

  @media ${device.laptop} {
    width: 95%;
  }

  @media ${device.tablet} {
    width: 100%;
  }
`;

export const DetailsContainer = styled.div`
  display: none;
  width: 400px;
  cursor: grab;

  ${(props) => props.info
    && props.show
    && css`
      display: flex;

      overflow: auto;
    `}
`;

export const DetailsWrapper = styled.div`
  overflow: scroll;
  background: white;
`;

export const MotionSquare = styled(motion.div)`
  display: flex;
  z-index: 4000000;
  position: absolute;
  top: 120px;
  height: 400px;
  left: 400px;
`;

export const PdfContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const ProtocolWrapper = styled.div`
  @media ${device.tablet} {
    margin-left: 10px;
  }
`;

export const OutlineButton = styled.button`
  background: white;
  border: 1px solid #87bdff;
  padding: 9px 25px;
  border-radius: 4px;
  font-weight: bold;
  color: #117eff;
  margin-right: 190px;
  width: 182px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    color: white;
    background: linear-gradient(to right, rgb(0, 225, 255), rgb(17, 126, 255));
  }
  
  ${(props) => props.info
    && css`
      @media ${device.tablet} {
        display: none;
      }
    `}

`;

export const useStyles = makeStyles(() => ({
  modal: {
    zIndex: 10000,
  },
  paper: {
    position: 'absolute',
  },
  nav: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    display: 'flex',
    height: '100vh',
  },
  imgBox: {
    width: '100%',
    height: 500,
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  otherFilesBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageOtherFiles: {
    fontSize: '18px',
    fontWeight: 500,
  },
  link: {
    textDecoration: 'none',
    color: `${colors.textPrimary}`,
    '&:hover': {
      color: `${colors.textPrimary}`,
      textDecoration: 'none',
    },
    '&:visited': {
      color: `${colors.textPrimary}`,
      textDecoration: 'none',
    },
    '&:focus': {
      color: `${colors.textPrimary}`,
      textDecoration: 'none',
    },
  },
  modalBox: {
    padding: '10px',
    width: '300px',
    zIndex: '4000',
  },
  optionBox: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    overflowX: 'auto',
    margin: '0 10px',
  },
}));
