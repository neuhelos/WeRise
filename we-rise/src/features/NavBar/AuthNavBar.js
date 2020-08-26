import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from '../../Utilities/firebaseFunctions'

import { useSelector } from 'react-redux'

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
    fontFamily: 'audiowide',
    '&:hover': {
      cursor: 'pointer',
      color: '#F89B29',
      filter: `drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.25))`,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
    }
  },
  iconButton: {
    margin: theme.spacing(1),
    //filter: 'drop-shadow(1px 2px 3px #36386D)'
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
  badge: {
      height: '2rem',
      minWidth: '2rem',
      fontSize: '1.5rem',
      background: '#36386D',
      border: 'solid 2px #FFFFFF'
  }
}));

const NavBar = () => {

  const currentUser = useSelector( state => state.currentUserSession.uid )
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  

  const history = useHistory()
  
  const navMessaging = () => {
    handleMobileMenuClose()  
    history.push("/Messaging")
  }
  const navProfile = () => {
    handleMobileMenuClose()
    history.push(`/Profile/${currentUser}`)
  }
  const navDashboard = () => {
    handleMobileMenuClose()
    history.push("/CommunityDashboard")
  }
  const signout = () => {
    signOut()
    history.push("/")
  }

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        handleMobileMenuClose()
        setOpen(!open)
    }

    const handleScrollToTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});     
    }

  const chats = useSelector (state => state.chats)
  let unreadCount = chats.filter( (chat, index) => !chat.receiverHasRead && chat.messages[chats[index].messages.length-1].sender !== currentUser).length


  return (
      <>
      <AppBar position={'sticky'} className={classes.root}>
        <Toolbar>
          <Typography className={classes.title} variant="h2" noWrap onClick={handleScrollToTop}>
            WeRise
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Dashboard">
              <IconButton className={classes.iconButton} edge="start" color="inherit" onClick={navDashboard}>
                  <Dashboard style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
              <Tooltip title="Instant Messaging">
              <IconButton className={classes.iconButton}  aria-label="show 4 new mails" color="inherit" onClick={navMessaging} >
                <Badge badgeContent={unreadCount} classes={{ badge: classes.badge }} overlap='circle' showZero>
                  <MailIcon style={{ fontSize: 50 }} />
                </Badge>
              </IconButton>
            </Tooltip>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon style={{ fontSize: 60 }} />
              </Badge>
            </IconButton> */}
            <Tooltip title="Add Workshop">
              <IconButton className={classes.iconButton}  edge="end" aria-label="Add Workshop" onClick={toggleModal} color="inherit" >
                <AddBoxIcon style={{ fontSize: 50 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton className={classes.iconButton}  aria-label="account of current user" onClick={navProfile} color="inherit" >
                <AccountCircle style={{ fontSize: 50 }} />
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
              aria-controls='mobileHamburgerMenu'
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ fontSize: 60 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MobileNavMenu mobileMoreAnchorEl={mobileMoreAnchorEl} handleMobileMenuClose={handleMobileMenuClose} nav={{navProfile, navDashboard, navMessaging, signout}} toggleModal={toggleModal} unreadCount={unreadCount}/>
    
      <Modal open={open} toggleModal={toggleModal}>
        <AddWorkshop handleCloseModal={toggleModal} />
      </Modal>

    </>
  );
}

export default NavBar