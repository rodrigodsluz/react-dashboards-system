/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { makeStyles, withStyles } from '@material-ui/core';

import StepConnectorBase from '@material-ui/core/StepConnector';
import colors from '../../../../../../theme/colors';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${colors.details};
  overflow: hidden;
`;

export const LogoClient = styled.img`
  width: 90%;
  margin-bottom: 20px;
  max-width: 300px;
  padding: 20px;
`;

export const Body = styled.div`
  width: 80%;
`;

export const Box = styled.div`
  border-radius: 8px;
  padding-top: 30px;
`;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;

export const StepItem = styled.div`
  background-color: ${(props) => (props.active ? colors.details : '#fff')};
  border: 1px solid #ccc;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

export const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const RocketWrapper = styled.div`
  width: 100%;
`;

export const Card = styled.div`
  z-index: 100;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 90%;
  margin: 30px 0px 0px 60px;
  border-radius: 8px;
  background-color: ${colors.bg2};

`;

export const useStyles = makeStyles((theme) => ({
  step: {
    userSelect: 'none',
    cursor: 'pointer',
    padding: theme.spacing(1),
    flex: '3 0 0px',
    whiteSpace: 'nowrap',
  },
  stepContent: {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  status: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  stepCard: {
    minWidth: '16rem',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export const StepConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 24,
  },
  active: {
    '& $line': {
      background: colors.details,
    },
  },
  completed: {
    '& $line': {
      background: colors.details,
    },
  },
  line: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 1,
  },
}))(StepConnectorBase);

export const useStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.bg2,
    zIndex: 1,
    border: '1px solid #ccc',
    color: theme.palette.text.light,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  active: {
    background: colors.details,
    boxShadow: theme.shadows[4],
  },
  completed: {
    background: theme.palette.primary.light,
  },
  tooltip: {
    fontSize: 14,
    background: colors.details,
  },
  arrow: {
    color: colors.details,
  },
}));
