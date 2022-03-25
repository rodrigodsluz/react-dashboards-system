/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '15px 0',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 70,
    color: 'green',
  },
  messageOne: {
    marginTop: '10px',
    fontSize: '18px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  messageTwo: {
    marginTop: '10px',
    fontSize: '16px',
    color: theme.palette.text.secondary,
  },
}));

export const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
