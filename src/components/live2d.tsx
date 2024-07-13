"use client";

import { useEffect, useState } from "react";

export default function Live2d() {
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const channel = new MessageChannel();
  const port = channel.port1;

  useEffect(() => {
    const iframe = document.getElementById("live2d");
    if (iframe && iframe instanceof HTMLIFrameElement) {
      setIframe(iframe);
    }
  }, []);

  useEffect(() => {
    if (!iframe) return;
    const SendMsgToDomainB = () => {
      var sendData = { message: "Hello from parent" };
      console.log(iframe, iframe?.contentWindow);
      if (iframe && iframe.contentWindow) {
        console.log("Sending message to iframe", channel.port1);
        iframe.contentWindow.postMessage("init", "*", [channel.port2]);
        port.postMessage(sendData);
        port.onmessage = (e) => {
          console.log("Message received from Iframe:", e.data);
        }
      }
    };
    SendMsgToDomainB();
  }, [iframe]);

  return (
    <>
      <iframe id="live2d" src="/live2d.html" style={styles}></iframe>
    </>
  );
}

const styles = {
  position: "fixed" as "fixed",
  bottom: "-25%",
  left: 0,
  zIndex: 1000,
  maxWidth: "300px",
  width: "40%",
  height: "70%",
  overflow: "hidden",
  border: "none",
  backgroundColor: "transparent",
};
