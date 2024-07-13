"use client";

import { useEffect, useState } from "react";
import { MessageBox } from "./MessageBox";

export default function Live2d() {
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const channel = new MessageChannel();
  const sendPort = channel.port1;
  const recvPort = channel.port2;

  useEffect(() => {
    const iframe = document.getElementById("live2d");
    if (iframe && iframe instanceof HTMLIFrameElement) {
      setIframe(iframe);
    }
  }, []);

  useEffect(() => {
    if (!iframe) return;
    const SendMsgToDomainB = () => {
      const sendData = { message: "Hello from parent" };
      console.log(iframe, iframe?.contentWindow);
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
    <div style={styles.live2d}>
      <MessageBox />
      <iframe
        id="live2d"
        title="live2d"
        src="/live2d.html"
        style={styles.iframe}
      />
    </div>
  );
}

const styles = {
  live2d: {
    position: "fixed" as const,
    bottom: "-25%",
    left: 0,
    zIndex: 1000,
    maxWidth: "300px",
    width: "40%",
    height: "70%",
  },
  iframe: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: "none",
    backgroundColor: "transparent",
  },
};
