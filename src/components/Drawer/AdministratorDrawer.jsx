import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PetsIcon from '@material-ui/icons/Pets';
import { useUser } from 'contexts/UserContext';
import { logout } from 'utils/auth.service';
import { PROFILE, DASHBOARD, CATEGORY } from 'constants/routes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}));

const AdministratorDrawer = ({ children }) => {
  const { user, handleUser } = useUser();
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const DrawerItems = [
    {
      icon: <DashboardIcon />,
      text: 'Dashboard',
      to: DASHBOARD
    },
    {
      icon: <AccountCircleIcon />,
      text: 'Profile',
      to: PROFILE
    },
    {
      icon: <PetsIcon />,
      text: 'Pet Categories',
      to: CATEGORY
    }
  ];

  const onLogout = () => {
    logout();
    handleUser({ ...user, email: '', role: '', isAuth: false });
  };
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.list}
    >
      <List>
        {DrawerItems.map(item => (
          <MenuItem
            key={item.text}
            component={Link}
            to={item.to}
            style={{ textDecoration: 'none' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={'Logout'} onClick={() => onLogout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  const anchor = 'left';
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CareYourPets: Administrator
          </Typography>
          <Button color="inherit" onClick={() => onLogout()}>
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
        {list(anchor)}
      </Drawer>
      {children}
    </div>
  );
};

export default AdministratorDrawer;
