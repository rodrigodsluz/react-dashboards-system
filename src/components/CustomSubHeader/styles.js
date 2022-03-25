/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { device } from '../../theme/sizes';

export const Wrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 15px;

  @media ${device.mobileL} {
    padding: 0 0 50px 0;
  }
`;

export const useStyles = makeStyles(() => ({
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
}));
