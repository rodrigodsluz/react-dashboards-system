/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../theme/colors';
import { device } from '../../../../theme/sizes';

export const useStyles = makeStyles((theme) => ({
  nameEdit: {
    padding: '2px',
    '&:not(:last-child)': {
      marginRight: '1rem',
    },
  },
  stepDetails: {
    margin: theme.spacing(1),
    padding: theme.spacing(2, 1),
  },
  stepActions: {
    justifyContent: 'flex-end',
    '& > *': {
      display: 'flex',
      justifyContent: 'stretch',
      '& > *, & > * > *': {
        flexGrow: 1,
        width: '100%',
      },
    },
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  buttonWrapper: {
    position: 'relative',
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  saveProgress: {
    color: theme.palette.buttons.save.hover,
  },
  deleteProgress: {
    color: theme.palette.buttons.delete.hover,
  },
  saveButton: {
    color: theme.palette.text.light,
    backgroundColor: theme.palette.buttons.save.light,
    '&:hover': {
      backgroundColor: theme.palette.buttons.save.hover,
    },
  },
  discardButton: {
    color: theme.palette.text.dark,
    backgroundColor: theme.palette.buttons.cancel.light,
    '&:hover': {
      backgroundColor: theme.palette.buttons.cancel.hover,
    },
  },
  deleteButton: {
    color: theme.palette.text.light,
    backgroundColor: theme.palette.buttons.delete.light,
    '&:hover': {
      backgroundColor: theme.palette.buttons.delete.hover,
    },
  },

  step: {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  activeStep: {
    background: `linear-gradient( 135deg, ${colors.details} 0%, ${theme.palette.primary.dark} 100%)`,
    color: theme.palette.text.light,
  },
  input: {
    border: '1px solid #CCCFDE',
    borderRadius: 5,
    padding: 2,
  },
}));

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  background-color: ${colors.background};

  @media ${device.laptop} {
    margin-top: 50px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const Body = styled.div`
  width: 80%;
  background-color: ${colors.background};
`;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  input {
    height: 40px;
    margin-top: 10px;
    margin-right: 10px;
  }
  button {
    margin-right: 5px;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const InputWrapper = styled.span`
  display: flex;

  @media ${device.tablet} {
    width: 80vw;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;

export const WrapperItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

export const StepForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`;

export const LimitButton = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;

export const HeaderForm = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;

  @media ${device.tablet} {
    width: 300px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  input {
    width: 500px;
  }

  @media ${device.tablet} {
    width: 400px;
    input {
      width: 400px;
    }
  }
`;

export const WrapperInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  input {
    width: 500px;
  }

  @media ${device.tablet} {
    width: 300px;
    input {
      width: 300px;
    }
  }
`;

export const BGColor = styled.div`
  background-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.background};
`;

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  cursor: 'pointer',
  padding: grid * 2,
  flex: '3 0 0px',
  whiteSpace: 'nowrap',
  ...draggableStyle,
});

export const getListStyle = () => ({
  display: 'flex',
  overflow: 'auto',
  borderRadius: '10px',
  marginTop: '10px',
});
