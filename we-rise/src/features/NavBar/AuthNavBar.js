import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { firestore } from '../../Utilities/firebase'
import { chatsStore } from '../Messaging/ChatSlice'
import { toggleLoading } from '../BaseComponents/loadingSlice'

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
  spacer: {
    height: '6rem',
    width: '100%',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
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
  },
}));

const NavBar = () => {

  const currentUser = useSelector( state => state.currentUserSession )
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const dispatch = useDispatch()
  const history = useHistory()
  
  const navMessaging = () => {
    handleMobileMenuClose()
    if(window.location.pathname === `/Messaging`){
      history.push(`/Messaging`)
      history.goBack()
    }  
    history.push(`/Messaging`)
  }
  const navProfile = () => {
    handleMobileMenuClose()
    if(window.location.pathname === `/Profile/${currentUser.uid}`){
      history.push(`/Profile/${currentUser.uid}`)
      history.goBack()
    }
    history.push(`/Profile/${currentUser.uid}`)
  }
  const navDashboard = () => {
    handleMobileMenuClose()
    if(window.location.pathname === `/CommunityDashboard`){
      history.push(`/CommunityDashboard`)
      history.goBack()
    }
    history.push(`/CommunityDashboard`)
  }

  const slowcode = async() => {
    return new Promise(function(resolve, reject){
      setTimeout(resolve, 2000)
    })
  }

  const signout = async() => {
    dispatch(toggleLoading());
    await slowcode();
    signOut();
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

  const fetchChats = async () => {
    await firestore
    .collection('chats')
    .where('usersEmail', 'array-contains', currentUser.email)
    .onSnapshot( async (res) => {
        const chats = res.docs.map(doc => doc.data())
        await dispatch(chatsStore(chats))
    })

  }

  useEffect( () => {
    fetchChats()
  }, []);

  const chats = useSelector (state => state.chats)
  let unreadCount = chats.filter( (chat) => chat.receiverHasRead === false && chat.messages[chat.messages.length-1].sender !== currentUser.uid).length


  return (
      <>
      <div className={classes.spacer}>
      <div className={classes.spacer}></div>
      <AppBar position={'fixed'} className={classes.root}>
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
              <IconButton className={classes.iconButton}  aria-label="unread messages" color="inherit" onClick={navMessaging} >
                <Badge badgeContent={unreadCount} classes={{ badge: classes.badge }} overlap='circle' showZero>
                  <MailIcon style={{ fontSize: 50 }} />
                </Badge>
              </IconButton>
            </Tooltip>
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
              <IconButton className={classes.iconButton}  edge="end" aria-label="Sign Out" color="inherit" onClick={signout}>
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

    </div>
    </>
  );
}

export default NavBar