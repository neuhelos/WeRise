import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

import '../../styling/jitsi.css'

        
        const JedaiVideoConfig = () => {
            const handleAPI = JitsiMeetAPI => {
              JitsiMeetAPI.executeCommand("toggleVideo");
            };
            let workshopTitle = sessionStorage.getItem("workshopTitle");
            return (
              <>
                <h2>{workshopTitle}</h2>
                <Jitsi classname ="videoComponent"
                  domain="meet.jit.si"
                  onAPILoad={handleAPI}
                  roomName={"jitseexx123"}
                  displayName={workshopTitle}
                  interfaceConfig={interfaceConfig}
                  config={config}
                />
              </>
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
          


        // const [room, setRoom] = useState('')
        // const [name, setName] = useState('')
        // const [call, setCall] = useState(false)
      
        // const handleClick = event => {
        //   event.preventDefault()
        //   if (room && name) setCall(true)
        // }
      
        // return call ? (
        //         <Jitsi
        //     roomName={room}
        //     userName={name}
            
        //     domain='meet.jit.si/heya'
        //     containerStyles={{ width: '1200px', height: '800px' }}
        //     />
        // ) : (
        //     <form>
        //     <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
        //     <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        //     <button onClick={handleClick} type='submit'>
        //       Start / Join
        //     </button>
        //   </form>
        // )
        
    
        

//}

export default JedaiVideoConfig