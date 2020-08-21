import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dashboard from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const MobileNavMenu = ({mobileMoreAnchorEl, handleMobileMenuClose, nav, toggleModal}) => {
  
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='mobileHamburgerMenu'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={nav.navDashboard}>
        <IconButton 
          aria-label="Community Dashboard"
          aria-haspopup="true"
          color="inherit"
        >
            <Dashboard />
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>
      <MenuItem onClick={nav.navMessaging}>
        <IconButton aria-label="Insant Messaging" color="inherit">
          {/* <Badge badgeContent={4} color="secondary"> */}
            <MailIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Instant Chat</p>
      </MenuItem>
      <MenuItem onClick={nav.navProfile}>
        <IconButton
          aria-label="User Profile"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={toggleModal}>
        <IconButton
          aria-label="Add Workshop"
          aria-haspopup="true"
          color="inherit"
        >
          <AddBoxIcon />
        </IconButton>
        <p>Add Workshop</p>
      </MenuItem>
      <MenuItem onClick={nav.signout}>
        <IconButton 
          aria-label="Sign Out of Session"
          color="inherit">
            <ExitToAppIcon />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );
}

export default MobileNavMenu