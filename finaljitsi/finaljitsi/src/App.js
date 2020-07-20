import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
 
const roomName = 'We-Rise-Room1'
const userFullName = 'Deja Flynn'
 
const App = () => (
  <>
    <h2>My First Meeting!</h2>
    <Jitsi roomName={roomName} displayName={userFullName} />
    {/* <Jitsi containerStyle={{ width: '1200px', height: '800px' }}></Jitsi> */}
  </>
)
export default App
// import React, { useState } from 'react'
// import Jitsi from 'react-jitsi'
// import Loader from './Components/Loader'
 
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
//         // loadingComponent={Loader}
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
// export default App;