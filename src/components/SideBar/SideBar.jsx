/* eslint-disable max-len */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import React, { useCallback, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import { Spacing, Tooltip, Typography } from '@d1.cx/components';
import {
  SignOutAlt,
  ChartPie,
  UserCheck,
  Chalkboard,
  // Cog,
  Rocket,
  FileAlt,
  UserFriends,
  UserAlt,
  PaperPlane,
  Tachometer,
  Tasks,
  Tools,
  Cubes,
  Gem,
} from '@d1.cx/icons';
import { useSelector } from 'react-redux';
import Logo from '../../assets/workflow-white.png';
import useDisabledItensMenu from '../../hooks/useDisabledItensMenu';
import UpdateProfilePictureModal from './components/UpdateProfilePictureModal/UpdateProfilePictureModal';

import {
  Click,
  NavbarDropdown,
  NavbarDropdownContent,
  Row,
  SidebarMobileMenuIcon,
  SidebarMenu,
  MobileIconLabel,
  IconWrapper,
  SpaceWrapper,
  LogoIconWrapper,
  LogoIcon,
  DropDownWrapper,
  MobileDropDownWrapper,
  Border,
  UserIconWrapper,
} from './styles';
import colors from '../../theme/colors';
import { dispatch } from '../../Config/store';
import User from '../User/User';
import RightModal from '../RightModal/RightModal';

function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const userPermissions = useSelector((state) => state.User.user);
  const [onHover, setOnHover] = useState({
    isOnHover: false,
    path: '',
  });

  const [mobileIconClick, setMobileIconClick] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const { isAdmin } = useDisabledItensMenu();
  const handleLogout = useCallback(async () => {
    await dispatch.User.resetCurrentProductByIdAsync();

    localStorage.removeItem('token');
    localStorage.clear();
    history.push('/');
  }, []);

  const handleMobileIconClick = () => setMobileIconClick(!mobileIconClick);
  const closeMobileMenu = () => setMobileIconClick(false);

  /**
   * @function isActive
   * @description Compara o path da página atual com a passada pelo parametro em
   * cade ícone específico, se forem o mesmo muda a cor do ícone para dar ênfase
   * em qual é a página atual que o usuário se encontra. Além disso, verifica
   * se o estado onHover é true, se for, ele muda a cor enquanto estiver true.
   * Não obstante, há uma verificação específica para detectar se está na página
   * de detalhes dos processos
   */
  const isActive = (path, detailPage) => (location.pathname === path
    || (onHover.isOnHover && onHover.path === path)
    || (location.pathname.includes('detail') && detailPage)
    ? colors.degradeColor2
    : '#fff');

  const handleProfilePicture = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Border position="top" />
      <LogoIconWrapper>
        <Typography fontSize="25px" vertical="20px">
          <LogoIcon alt={process.env.REACT_APP_NAME || 'Workflow'} src={process.env.REACT_APP_LOGO_WHITE || Logo} />
        </Typography>
      </LogoIconWrapper>

      <SidebarMobileMenuIcon
        onClick={handleMobileIconClick}
        mobileClick={mobileIconClick}
      >
        {mobileIconClick ? <FaTimes /> : <FaBars />}
      </SidebarMobileMenuIcon>

      <SidebarMenu
        onClick={handleMobileIconClick}
        mobileClick={mobileIconClick}
      >
        <div>
          <SpaceWrapper>
            <Spacing vertical="20px" />
          </SpaceWrapper>

          <Tooltip content="Dashboard" light>
            <Link
              data-testid="dashboard"
              onMouseOver={() => setOnHover({
                isOnHover: true,
                path: '/dashboard',
              })}
              onMouseOut={() => setOnHover({
                isOnHover: false,
              })}
              to={{
                pathname: '/dashboard',
                state: { name: 'Dashboard' },
              }}
              onClick={closeMobileMenu}
            >
              <IconWrapper>
                <ChartPie width="25px" color={isActive('/dashboard')} />

                <MobileIconLabel>
                  <Typography fontSize="18px" color={isActive('/dashboard')}>
                    Dashboard
                  </Typography>
                </MobileIconLabel>
              </IconWrapper>
            </Link>
          </Tooltip>
          <Spacing vertical="10px" />

          <Tooltip content="Processos" light>
            <Link
              data-testid="reports"
              onMouseOver={() => setOnHover({
                isOnHover: true,
                path: '/reports',
              })}
              onMouseOut={() => setOnHover({
                isOnHover: false,
              })}
              to={{
                pathname: '/reports',
                state: { name: 'Processos' },
              }}
            >
              <IconWrapper>
                <FileAlt width="25px" color={isActive('/reports', true)} />

                <MobileIconLabel>
                  <Typography
                    fontSize="18px"
                    color={isActive('/reports', true)}
                  >
                    Processos
                  </Typography>
                </MobileIconLabel>
              </IconWrapper>
            </Link>
          </Tooltip>
          <SpaceWrapper>
            <Spacing vertical="30px" />
          </SpaceWrapper>

          {isAdmin && (
            <>
              <Border position="middle" />

              <MobileDropDownWrapper>
                <Link
                  data-testid="users-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/users',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/users',
                    state: { name: 'Usuários' },
                  }}
                >
                  <IconWrapper>
                    <UserAlt width="25px" color={isActive('/users')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/users')}>
                        Usuários
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="groups-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/groups',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/groups',
                    state: { name: 'Grupos' },
                  }}
                >
                  <IconWrapper>
                    <UserFriends width="25px" color={isActive('/groups')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/groups')}>
                        Grupos
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <DropDownWrapper>
                <NavbarDropdown>
                  <span>
                    {' '}
                    <UserCheck
                      width="25px"
                      color={
                        location.pathname === '/users'
                        || (onHover.isOnHover && onHover.path === '/users')
                          ? isActive('/users')
                          : isActive('/groups')
                      }
                    />
                  </span>
                  <NavbarDropdownContent>
                    <Link
                      data-testid="users"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/users',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/users',
                        state: { name: 'Usuários' },
                      }}
                    >
                      <Row>
                        <UserAlt width="25px" color={isActive('/users')} />
                        <Typography fontSize="15px" color={isActive('/users')}>
                          Usuários
                        </Typography>
                      </Row>
                    </Link>
                    <Link
                      data-testid="groups"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/groups',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/groups',
                        state: { name: 'Grupos' },
                      }}
                    >
                      <Row>
                        <UserFriends width="25px" color={isActive('/groups')} />
                        <Typography fontSize="15px" color={isActive('/groups')}>
                          Grupos
                        </Typography>
                      </Row>
                    </Link>
                  </NavbarDropdownContent>
                </NavbarDropdown>
              </DropDownWrapper>

              <Spacing vertical="10px" />

              <Tooltip content="Status" light>
                <Link
                  data-testid="status"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/status',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/status',
                    state: { name: 'Status' },
                  }}
                >
                  <IconWrapper>
                    <Chalkboard width="25px" color={isActive('/status')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/status')}>
                        Status
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </Tooltip>

              <SpaceWrapper>
                <Spacing vertical="10px" />
              </SpaceWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="journey-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/journey',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/journey',
                    state: { name: 'Jornadas' },
                  }}
                >
                  <IconWrapper>
                    <Rocket width="25px" color={isActive('/journey')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/journey')}>
                        Jornadas
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="modality-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/modality',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/modality',
                    state: { name: 'Esteiras' },
                  }}
                >
                  <IconWrapper>
                    <Cubes width="25px" color={isActive('/modality')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/modality')}>
                        Esteiras
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="product-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/product',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/product',
                    state: { name: 'Áreas' },
                  }}
                >
                  <IconWrapper>
                    <Gem width="25px" color={isActive('/product')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/product')}>
                        Áreas
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <DropDownWrapper>
                <NavbarDropdown>
                  <span>
                    {' '}
                    <Tools
                      width="25px"
                      color={
                        location.pathname === '/journey'
                        || (onHover.isOnHover && onHover.path === '/journey')
                          ? isActive('/journey')
                          : isActive('/modality')
                      }
                    />
                  </span>
                  <NavbarDropdownContent>
                    <Link
                      data-testid="journey"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/journey',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/journey',
                        state: { name: 'Jornadas' },
                      }}
                    >
                      <Row>
                        <Rocket width="25px" color={isActive('/journey')} />
                        <Typography
                          fontSize="15px"
                          horizontal="10px"
                          color={isActive('/journey')}
                        >
                          Jornadas
                        </Typography>
                      </Row>
                    </Link>
                    <Link
                      data-testid="modality"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/modality',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/modality',
                        state: { name: 'Esteiras' },
                      }}
                    >
                      <Row>
                        <Cubes width="25px" color={isActive('/modality')} />
                        <Typography
                          fontSize="15px"
                          horizontal="10px"
                          color={isActive('/modality')}
                        >
                          Esteiras
                        </Typography>
                      </Row>
                    </Link>

                    <Link
                      data-testid="product"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/product',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/product',
                        state: { name: 'Áreas' },
                      }}
                    >
                      <Row>
                        <Gem width="25px" color={isActive('/product')} />
                        <Typography
                          fontSize="15px"
                          horizontal="10px"
                          color={isActive('/product')}
                        >
                          Áreas
                        </Typography>
                      </Row>
                    </Link>

                  </NavbarDropdownContent>
                </NavbarDropdown>
              </DropDownWrapper>

              <SpaceWrapper>
                <Spacing vertical="10px" />
              </SpaceWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="actions-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/actions',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/actions',
                    state: { name: 'Ações' },
                  }}
                >
                  <IconWrapper>
                    <PaperPlane width="25px" color={isActive('/actions')} />

                    <MobileIconLabel>
                      <Typography fontSize="18px" color={isActive('/actions')}>
                        Criar
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <MobileDropDownWrapper>
                <Link
                  data-testid="transition-mobile"
                  onMouseOver={() => setOnHover({
                    isOnHover: true,
                    path: '/transition',
                  })}
                  onMouseOut={() => setOnHover({
                    isOnHover: false,
                  })}
                  to={{
                    pathname: '/transition',
                    state: { name: 'Transições' },
                  }}
                >
                  <IconWrapper>
                    <Tasks width="25px" color={isActive('/transition')} />

                    <MobileIconLabel>
                      <Typography
                        fontSize="18px"
                        color={isActive('/transition')}
                      >
                        Transições
                      </Typography>
                    </MobileIconLabel>
                  </IconWrapper>
                </Link>
              </MobileDropDownWrapper>

              <DropDownWrapper>
                <NavbarDropdown>
                  <span>
                    {' '}
                    <Tachometer
                      width="28px"
                      color={
                        location.pathname === '/actions'
                        || (onHover.isOnHover && onHover.path === '/actions')
                          ? isActive('/actions')
                          : isActive('/transition')
                      }
                    />
                  </span>
                  <NavbarDropdownContent>
                    <Link
                      data-testid="actions"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/actions',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/actions',
                        state: { name: 'Ações' },
                      }}
                    >
                      <Row>
                        <PaperPlane width="25px" color={isActive('/actions')} />
                        <Typography
                          fontSize="15px"
                          color={isActive('/actions')}
                        >
                          Criar
                        </Typography>
                      </Row>
                    </Link>

                    <Link
                      data-testid="transition"
                      onMouseOver={() => setOnHover({
                        isOnHover: true,
                        path: '/transition',
                      })}
                      onMouseOut={() => setOnHover({
                        isOnHover: false,
                      })}
                      to={{
                        pathname: '/transition',
                        state: { name: 'Transições' },
                      }}
                    >
                      <Row>
                        <Tasks width="25px" color={isActive('/transition')} />
                        <Typography
                          fontSize="15px"
                          color={isActive('/transition')}
                        >
                          Transições
                        </Typography>
                      </Row>
                    </Link>

                  </NavbarDropdownContent>
                </NavbarDropdown>
              </DropDownWrapper>
            </>
          )}
        </div>

        <div>
          {/* <Spacing vertical="5px" />
          <Tooltip content="Disparador" light>
            <Link
              data-testid="trigger"
              onMouseOver={() => setOnHover({
                isOnHover: true,
                path: '/trigger',
              })}
              onMouseOut={() => setOnHover({
                isOnHover: false,
              })}
              to={{
                pathname: '/trigger',
                state: { name: 'Disparador' },
              }}
            >
              <IconWrapper>
                <Cog width="25px" color={isActive('/trigger')} />

                <MobileIconLabel>
                  <Typography fontSize="18px" color={isActive('/trigger')}>
                    Disparador
                  </Typography>
                </MobileIconLabel>
              </IconWrapper>
            </Link>
          </Tooltip> */}

          <Spacing vertical="10px" />
          <UserIconWrapper onClick={handleProfilePicture}>
            <Tooltip content={userPermissions?.name} whiteSpace light>
              <User name={userPermissions?.name} path={userPermissions?.path} email={userPermissions?.email} />
            </Tooltip>
          </UserIconWrapper>
          <Spacing vertical="5px" />

          <Tooltip content="Sair" light>
            <Click onClick={handleLogout} type="button">
              <IconWrapper>
                <SignOutAlt width="25px" color="#fff" />

                <MobileIconLabel>
                  <Typography fontSize="18px" color="#fff">
                    Sair
                  </Typography>
                </MobileIconLabel>
              </IconWrapper>
              <SpaceWrapper>
                <Spacing vertical="10px" />
              </SpaceWrapper>
            </Click>
          </Tooltip>
        </div>
      </SidebarMenu>

      <RightModal open={openModal}>
        <UpdateProfilePictureModal onClose={() => setOpenModal(false)} email={userPermissions?.email} />
      </RightModal>

      <Border position="bottom" />
    </>
  );
}

export default SideBar;
