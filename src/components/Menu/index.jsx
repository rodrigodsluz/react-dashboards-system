import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, shallowEqual } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import GroupIcon from '@material-ui/icons/Group';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import useStyles from './styles';

const Menu = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.User.user, shallowEqual);

  return (
    <Paper className={classes.root} elevation={3} variant="outlined">
      {user && (
        <MenuList className={classes.menuList}>
          <Link to="/dashboard" className={classes.link}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon>
                <AssessmentIcon className={classes.icon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.linkLabel}>
                Dashboard
              </Typography>
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/reports" className={classes.link}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon>
                <EventNoteIcon className={classes.icon} />
              </ListItemIcon>

              <Typography variant="inherit" className={classes.linkLabel}>
                Processos
              </Typography>
            </MenuItem>
          </Link>
          <Divider />
          {user.admin && (
            <Link to="/users" className={classes.link}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <AccountCircleIcon className={classes.icon} />
                </ListItemIcon>
                <Typography variant="inherit" className={classes.linkLabel}>
                  Usuários
                </Typography>
              </MenuItem>
            </Link>
          )}
          {user.admin && <Divider />}
          {user.admin && (
            <Link to="/groups" className={classes.link}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <GroupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography variant="inherit" className={classes.linkLabel}>
                  Grupos
                </Typography>
              </MenuItem>
            </Link>
          )}
          {user.admin && <Divider />}
          {user.admin && (
            <Link to="/status" className={classes.link}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon className={classes.icon} />
                </ListItemIcon>
                <Typography variant="inherit" className={classes.linkLabel}>
                  Status
                </Typography>
              </MenuItem>
            </Link>
          )}
          {user.admin && <Divider />}

          {user.admin && (
            <Link to="/template" className={classes.link}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <DeveloperModeIcon className={classes.icon} />
                </ListItemIcon>
                <Typography variant="inherit" className={classes.linkLabel}>
                  Template
                </Typography>
              </MenuItem>
            </Link>
          )}
          {user.admin && <Divider />}
        </MenuList>
      )}
    </Paper>
  );
};

export default Menu;
