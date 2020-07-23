import React from "react";
import "./style.css";
import Jitsi from "react-jitsi";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <JedaiVideoConfig />
    </div>
  );
}

const JedaiVideoConfig = () => {
  const handleAPI = JitsiMeetAPI => {
    JitsiMeetAPI.executeCommand("toggleVideo");
  };

  return (
    <>
      <h2>My First Meeting!</h2>
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