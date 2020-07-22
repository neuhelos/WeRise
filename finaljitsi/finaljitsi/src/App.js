
import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';
// import JitsiMeetExternalAPI from 'jitsi'

function App() {
  const [loading, setLoading] = useState(true);
  const containerStyle = {
    width: '800px',
    height: '400px',
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  }

 function startConference() {
  try {
   const domain = 'meet.jit.si';
   const options = {
    roomName: 'roomName',
    height: 400,
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
    },
   };

   const api = new JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    setLoading(false);
    api.executeCommand('displayName', 'MyName');
   });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }

 useEffect(() => {
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if (window.JitsiMeetExternalAPI) startConference();
  else alert('Jitsi Meet API script not loaded');
 }, []);

 return (
  <div
   style={containerStyle}
  >
   {loading && <ProgressComponent />}
   <div
    id="jitsi-container"
    style={jitsiContainerStyle}
   />
  </div>
 );
}

// import React, { useState } from 'react'
// import Jitsi from 'react-jitsi'
 
// const roomName = 'We-Rise-Room1'
// const userFullName = 'Deja Flynn'
 
// const App = () => (
//   <>
//     <h2>My First Meeting!</h2>
//     <Jitsi roomName={roomName} displayName={userFullName} />
   
//   </>
// )
// export default App
// import React, { useState } from 'react'
// import Jitsi from 'react-jitsi'
// import Loader from './Components/loader'
 
// const App = () => {
 
//   const [displayName, setDisplayName] = useState('')
//   const [roomName, setRoomName] = useState('')
//   const [password, setPassword] = useState('')
//   const [onCall, setOnCall] = useState(false)
 
//   return onCall
//     ? (
//       <Jitsi
//         roomName={roomName}
//         displayName={displayName}
//         password={password}
//         loadingComponent={Loader}
//         onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
//       />)
//     : (
//       <>
//         <h1>Start a Meeting</h1>
//         <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
//         <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
//         <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
//       </>
//     )
 
// }
export default App;