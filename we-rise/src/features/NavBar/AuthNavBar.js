import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from '../../Utilities/firebaseFunctions'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dashboard from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip'

import Modal from '../BaseComponents/Modal'
import AddWorkshop from './AddWorkshop'
import MobileNavMenu from './MobileNavMenu'

const useStyles = makeStyles((theme) => ({
  root: {
        background: 'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
    },
  grow: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'audiowide'
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  iconButton: {
    margin: theme.spacing(1)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  badges: {
      height: '2rem',
      minWidth: '2rem',
      fontSize: '1.5rem'
  }
}));

const NavBar = () => {

  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const mobileMenuId = 'primary-menu-mobile';
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  

  const history = useHistory()
  const navMessaging = () => {
        history.push("/Messaging")
      }
      const navProfile = () => {
        history.push("/Profile")
      }
    const navDashboard = () => {
      history.push("/CommunityDashboard")
    }
    const signout = () => {
      signOut()
      history.push("/")
    }

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    return (
      <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography className={classes.title} variant="h2" noWrap>
            WeRise
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Dashboard">
              <IconButton className={classes.iconButton} edge="start" color="inherit" onClick={navDashboard}>
                  <Dashboard style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Instant Messaging">
              <IconButton className={classes.iconButton}  aria-label="show 4 new mails" color="inherit" onClick={navMessaging} >
                <Badge badgeContent={4} color="secondary" classes={{ badge: classes.badges }}>
                  <MailIcon style={{ fontSize: 50 }} />
                </Badge>
              </IconButton>
            </Tooltip> */}
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon style={{ fontSize: 60 }} />
              </Badge>
            </IconButton> */}
            <Tooltip title="Profile">
              <IconButton className={classes.iconButton}  aria-label="account of current user" onClick={navProfile} color="inherit" >
                <AccountCircle style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Workshop">
              <IconButton className={classes.iconButton}  edge="end" aria-label="Add Workshop" onClick={toggleModal} color="inherit" >
                <AddBoxIcon style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign Out">
              <IconButton className={classes.iconButton}  edge="end" aria-label="Sign Out" onClick={""} color="inherit" onClick={signout}>
                <ExitToAppIcon style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ fontSize: 60 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MobileNavMenu  mobileMenuId={mobileMenuId} mobileMoreAnchorEl={mobileMoreAnchorEl} handleMobileMenuClose={handleMobileMenuClose}/>
    
      <Modal open={open} toggleModal={toggleModal}>
        <AddWorkshop handleCloseModal={toggleModal} />
      </Modal>

    </>
  );
}

export default NavBar