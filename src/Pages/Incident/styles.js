import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const Container = styled.div`
  background-color: ${colors.details};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

export const Wrapper = styled.div`
  background-color: #fff;
  width: 90%;
  height: 95%;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
    width: 100%;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  width: 50%;
  padding: 20px;
  overflow-y: scroll;
  min-width: 300px;
  @media ${device.laptop} {
    width: 100%;
  }
`;

export const RightColumn = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    width: 100%;
    display: none;
  }
`;
export const InputText = styled(Autocomplete)`
  && {
    box-shadow: none;
    outline: none;
  }
`;

const useStyles = makeStyles({
  menu: {
    '& .MuiPaper-root': {
      border: 'none',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '1px solid transparent',
      borderRadius: '5px',
    },
  },
  cssFocused: {},
  notchedOutline: {
    border: '1px solid #cccfde',
    borderRadius: '5px',
  },
});

export default useStyles;
