import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, shallowEqual } from 'react-redux';

import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import { useStyles } from './styles';

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  const [admin, setAdmin] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const user = useSelector((state) => state.User.user, shallowEqual);

  useEffect(() => {
    if (user) {
      setAdmin(user.admin);
    }
  });

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NavLink to="/dashboard" className={classes.link}>
        <MenuItem disableGutters className={classes.menuItem}>
          <Typography className={classes.menuItemlabel}>
            <AssessmentIcon className={classes.icon} />
            Dashboard
          </Typography>
        </MenuItem>
      </NavLink>

      <NavLink to="/reports" className={classes.link}>
        <MenuItem disableGutters className={classes.menuItem}>
          <Typography className={classes.menuItemlabel}>
            <EventNoteIcon className={classes.icon} />
            Processos
          </Typography>
        </MenuItem>
      </NavLink>

      {admin && (
        <NavLink to="/users" className={classes.link}>
          <MenuItem disableGutters className={classes.menuItem}>
            <Typography className={classes.menuItemlabel}>
              <AccountCircle className={classes.icon} />
              Usuários
            </Typography>
          </MenuItem>
        </NavLink>
      )}

      {admin && (
        <NavLink to="/groups" className={classes.link}>
          <MenuItem disableGutters className={classes.menuItem}>
            <Typography className={classes.menuItemlabel}>
              <GroupIcon className={classes.icon} />
              Grupos
            </Typography>
          </MenuItem>
        </NavLink>
      )}

      {admin && (
        <NavLink to="/status" className={classes.link}>
          <MenuItem disableGutters className={classes.menuItem}>
            <Typography className={classes.menuItemlabel}>
              <AssignmentTurnedInIcon className={classes.icon} />
              Status
            </Typography>
          </MenuItem>
        </NavLink>
      )}
      {admin && (
        <NavLink to="/template" className={classes.link}>
          <MenuItem disableGutters className={classes.menuItem}>
            <Typography className={classes.menuItemlabel}>
              <DeveloperModeIcon className={classes.icon} />
              Template
            </Typography>
          </MenuItem>
        </NavLink>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="inherit" style={{ zIndex: 10 }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.sectionDesktop}>
            {user && (
              <Box className={classes.menuList}>
                <NavLink
                  to="/dashboard"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                >
                  <Typography className={classes.menuItemlabel}>
                    <AssessmentIcon className={classes.icon} />
                    Dashboard
                  </Typography>
                </NavLink>

                <NavLink
                  to="/reports"
                  className={classes.link}
                  activeClassName={classes.activeLink}
                >
                  <Typography className={classes.menuItemlabel}>
                    <EventNoteIcon className={classes.icon} />
                    Processos
                  </Typography>
                </NavLink>

                {user.admin && (
                  <NavLink
                    to="/users"
                    className={classes.link}
                    activeClassName={classes.activeLink}
                  >
                    <Typography className={classes.menuItemlabel}>
                      <AccountCircle className={classes.icon} />
                      Usuários
                    </Typography>
                  </NavLink>
                )}

                {user.admin && (
                  <NavLink
                    to="/groups"
                    className={classes.link}
                    activeClassName={classes.activeLink}
                  >
                    <Typography className={classes.menuItemlabel}>
                      <GroupIcon className={classes.icon} />
                      Grupos
                    </Typography>
                  </NavLink>
                )}

                {user.admin && (
                  <NavLink
                    to="/status"
                    className={classes.link}
                    activeClassName={classes.activeLink}
                  >
                    <Typography className={classes.menuItemlabel}>
                      <AssignmentTurnedInIcon className={classes.icon} />
                      Status
                    </Typography>
                  </NavLink>
                )}
                {user.admin && (
                  <NavLink
                    to="/template"
                    className={classes.link}
                    activeClassName={classes.activeLink}
                  >
                    <Typography className={classes.menuItemlabel}>
                      <DeveloperModeIcon className={classes.icon} />
                      Template
                    </Typography>
                  </NavLink>
                )}
              </Box>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {user && renderMobileMenu}
    </div>
  );
}
