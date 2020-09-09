import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Jitsi from 'react-jitsi'

import Grid from '@material-ui/core/Grid'
import '../../styling/jitsi.css'

        
        const JitsiVideoConfig = (workshop) => {
            const params = useParams();
            const currentUser = useSelector( state =>  `${state.currentUserSession.firstn} ${state.currentUserSession.lastn}`);
            
            const handleAPI = JitsiMeetAPI => {
              JitsiMeetAPI.executeCommand("toggleVideo");
            };
            
            return (
              <Grid container display='flex' direction='column' justify='center' className='videoComponent' alignItems='center'>
                
                <Jitsi className ="videoComponent"
                  domain="meet.jit.si"
                  onAPILoad={handleAPI}
                  roomName={`WeRiseWorkshop${workshop.workshop.user_id}${workshop.workshop.workshop_id}`}
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
            SHOW_JITSI_WATERMARK: false,
            JITSI_WATERMARK_LINK: 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRise_Logo.png?alt=media&token=8c93514c-69b8-4dea-973e-159f66720dff',
            BRAND_WATERMARK_LINK: 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRise_Logo.png?alt=media&token=8c93514c-69b8-4dea-973e-159f66720dff',
            DEFAULT_LOGO_URL: 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRise_Logo.png?alt=media&token=8c93514c-69b8-4dea-973e-159f66720dff',
            DEFAULT_REMOTE_DISPLAY_NAME: 'Workshop Participant',
            DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/appImages%2FWeRise_Logo.png?alt=media&token=8c93514c-69b8-4dea-973e-159f66720dff',
            SHOW_BRAND_WATERMARK: true,
            SHOW_WATERMARK_FOR_GUESTS: false,
            HIDE_DEEP_LINKING_LOGO: true,
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