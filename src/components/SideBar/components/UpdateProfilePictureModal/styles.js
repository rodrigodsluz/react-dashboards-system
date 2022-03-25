import styled from 'styled-components';
import { device } from '../../../../theme/sizes';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${device.tablet} {
    width: 83%;
    }
`;

export const Click = styled.button`
  width: 40px;
  background-color: transparent;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: 500px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  margin-right: 10px;

  @media ${device.tablet} {
    margin: 0 0 0 138px;
  }

  @media ${device.mobileL} {
    width: 300px;
    margin: 0 0 0 34px;
    font-size: 12px;
  }
`;

export const Title = styled.div`
  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.mobileL} {
    line-height: 30px;
    font-size: 20px;
  }
`;
