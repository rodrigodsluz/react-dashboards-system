/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';
import colors from '../../theme/colors';
import { device } from '../../theme/sizes';

export const SidebarMenu = styled.div`
  width: 72px;
  height: 100vh;
  background-color: ${colors.details};

  position: fixed;
  top: 0px;
  z-index: 21;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media ${device.laptop} {
    flex-direction: column;

    width: 100%;
    position: fixed;

    top: 65px;
    left: ${({ mobileClick }) => (mobileClick ? 0 : '-100%')};

    transition: all 0.5s ease;

    background: ${colors.details};

    padding: 20px;

    justify-content: flex-start;
  }
`;

export const Border = styled.div`
  background: transparent linear-gradient(90deg, #00e1ff 0%, #117eff 100%);
  position: fixed;
  left: 0px;
  width: 72px;
  height: 2.5px;
  z-index: 122;
  ${(props) => props.position === 'top'
    && css`
      top: 0px;
      @media ${device.laptop} {
        width: 100%;
        height: 3px;
      }
    `}
  ${(props) => props.position === 'bottom'
    && css`
      bottom: 1px;
      @media ${device.laptop} {
        width: 100%;
        height: 3px;
        top: 70px;
      }
    `}

    ${(props) => props.position === 'middle'
    && css`
      top: 140px;
      width: 32px;
      margin-left: 19.8px;
      height: 1px;

      @media ${device.laptop} {
        width: 100%;
        height: 3px;
        top: 70px;
      }
    `}
`;

export const SidebarMobileMenuIcon = styled.div`
  display: none;
  color: ${colors.degradeColor2};

  @media ${device.laptop} {
    display: block;
    position: fixed;
    z-index: 11;
    right: 20px;
    top: -5px;
    transform: translate(-100%, 60%);

    font-size: 1.8rem;

    cursor: pointer;
  }

  @media ${device.mobileL} {
    right: 0px;
  }
`;

export const LogoIconWrapper = styled.span`
  @media ${device.laptop} {
    display: flex;
    background: ${colors.details};
    position: fixed;
    z-index: 11;
    width: 100%;
    height: 70px;
  }
  display: none;
`;

export const LogoIcon = styled.img`
  width: 270px;
  padding: 0 0 20px 20px;

  @media ${device.mobileL} {
    width: 200px;
    margin-top: 5px;
  }
`;

export const DropDownWrapper = styled.div`

  @media ${device.laptop} {
    display: none;
  }
`;

export const MobileDropDownWrapper = styled.div`
  display: none;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
`;

export const IconWrapper = styled.span`
  display: flex;

  @media ${device.laptop} {
    width: 153px;
  }
`;

export const SpaceWrapper = styled.span`
  @media ${device.laptop} {
    display: none;
  }
  display: flex;
`;

export const MobileIconLabel = styled.div`
  @media ${device.laptop} {
    display: flex;
    margin: 13px 10px 10px 10px;
  }
  display: none;
`;

export const Click = styled.button`
  background-color: transparent;
  margin: 10px 0px;
`;

export const NavbarDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${colors.details};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  padding: 5px 16px;
  z-index: 1;
  border-radius: 0px 10px 10px 0px;

  a {
    text-decoration: none;
  }
`;

export const NavbarDropdown = styled.div`
  position: relative;
  width: 75px;
  text-align: center;

  display: table-cell;
  vertical-align: middle;
  text-align: center;
  
  &:hover ${NavbarDropdownContent} {
    display: inline-block;
    margin: -22px 0 0 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
  padding: 10px;
  text-decoration: none;

  p{
    margin-left: 10px;
  }
  text-align: left;
  &:hover {
    p {
      color: ${colors.degradeColor2};
      text-decoration: none;
    }
  }
`;

export const UserIconWrapper = styled.div`
  @media ${device.laptop} {
    position: absolute;
    top: -44px;
    right: 103px;
  }

  &:hover {
    cursor: pointer;
  }
`;
