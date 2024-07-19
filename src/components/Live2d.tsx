"use client";

import React from "react";
import { MessageBox } from "./MessageBox";

export default function Live2d() {
  const [iframe, setIframe] = React.useState<HTMLIFrameElement | null>(null);
  const channel = new MessageChannel();
  const sendPort = channel.port1;
  const recvPort = channel.port2;

  React.useEffect(() => {
    const iframe = document.getElementById("live2d");
    if (iframe && iframe instanceof HTMLIFrameElement) {
      setIframe(iframe);
    }
  }, []);

  React.useEffect(() => {
    if (!iframe) return;
    const SendMsgToDomainB = () => {
      const sendData = { message: "Hello from parent" };
      if (iframe?.contentWindow) {
        console.log("Sending message to iframe");
        iframe.contentWindow.postMessage("init", "*", [recvPort]);
        sendPort.postMessage(sendData);
        sendPort.onmessage = (e) => {
          console.log("Message received from Iframe:", e.data);
        };
      }
    };
    SendMsgToDomainB();
  }, [iframe, sendPort, recvPort]);

  return (
    <div>
      <iframe
        id="live2d"
        title="live2d"
        src="/live2d.html"
        style={Object.assign({}, styles.live2d, styles.live2dBox)}
      />
      <MessageBox boxStyle={styles.live2dBox} />
    </div>
  );
}

const styles = {
  live2dBox: {
    position: "fixed" as const,
    maxWidth: "300px",
    width: "40%",
  },
  live2d: {
    height: "70%",
    bottom: "-25%",
    left: 0,
    zIndex: 100,
    overflow: "hidden",
    border: "none",
    backgroundColor: "transparent",
  },
};
