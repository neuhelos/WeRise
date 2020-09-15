import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Jitsi from 'react-jitsi'

import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}))

const JitsiVideoConfig = ({workshop}) => {
    
    const classes = useStyles()
    const weRiseRoom = `${workshop.user_id}${workshop.workshop_id}`
    const params = useParams();
    const currentUser = useSelector( state =>  `${state.currentUserSession.firstn}`);
    
    const handleAPI = JitsiMeetAPI => {
      JitsiMeetAPI.executeCommand("toggleVideo");
    };
    
    return (
      <Grid className={classes.root} container display='flex' direction='column' justify='center' alignItems='center'>
        
        <Jitsi
          containerStyle={{padding: '8px', border: '3px solid #FF0F7B', borderRadius: '4px', backgroundColor: '#282828'}} 
          domain="meet.jit.si"
          onAPILoad={handleAPI}
          roomName= {`WeRiseWorkshop${params.workshopid}`}  
          displayName={currentUser}
          interfaceConfig={interfaceConfig}
          config={config}
        />

      </Grid >
    );
  };
  
  const interfaceConfig = {
    LANG_DETECTION: false,
    lang: "en",
    APP_NAME: "WeRise",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
      "microphone",
      "camera",
      "fullscreen",
      "fodeviceselection",
      "hangup",
      "profile",
      "chat",
      "settings",
      "videoquality",
      "tileview",
      "download",
      "help",
      "mute-everyone",
      "desktop"
      // 'security'
    ]
  };
  
  const config = {
    defaultLanguage: "en",
    prejoinPageEnabled: false
  };


export default JitsiVideoConfig