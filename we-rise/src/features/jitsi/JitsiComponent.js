import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

        
        const JedaiVideoConfig = () => {
            const handleAPI = JitsiMeetAPI => {
              JitsiMeetAPI.executeCommand("toggleVideo");
            };
          
            return (
              <>
                <h2>WeRise Workshops</h2>
                <Jitsi
                  domain="meet.jit.si"
                  onAPILoad={handleAPI}
                  roomName={"jitseexx123"}
                  displayName={"demo"}
                  interfaceConfig={interfaceConfig}
                  config={config}
                />
              </>
            );
          };
          
          const interfaceConfig = {
            LANG_DETECTION: false,
            lang: "es",
            APP_NAME: "QoriMed",
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
              "mute-everyone"
              // 'security'
            ]
          };
          
          const config = {
            defaultLanguage: "es",
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