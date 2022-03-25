import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import styled, { keyframes, css } from 'styled-components';

import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 100vh;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 5px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    padding: 40px 10px;
  }
`;

export const GenerticColorButton = styled.button`
  width: ${(props) => props.width};
  height: 2.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-image: linear-gradient(
      to right,
      ${colors.degradeColor1} 0%,
      ${colors.degradeColor2} 51%,
      ${colors.degradeColor2} 100%
    );
  }
`;

export const LogoClient = styled.img`
  width: 80%;
  padding: 20px;
  margin-bottom: 10px;
  max-width: 250px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingButton = styled.div`
  display: flex;
  padding:5px;
  justify-content: center;
  align-items: center;
  animation: ${(props) => (props.active
    ? css`
          ${rotate} 1s ease-in-out infinite forwards
        `
    : '')};
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    marginTop: 100,
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    padding: 5,
    width: theme.spacing(30),
    height: theme.spacing(10),
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

export const RecoverPassButton = withStyles((theme) => ({
  root: {
    margin: '15px 0 15px 0',
    color: theme.palette.text.light,
    fontWeight: 600,
    backgroundColor: theme.palette.buttons.default.light,
    '&:hover': {
      backgroundColor: theme.palette.buttons.default.hover,
    },
  },
}))(Button);
