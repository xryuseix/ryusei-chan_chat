"use client";

import { useEffect, useState } from "react";

export default function Live2d({ className }: { className: string }) {
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
    <iframe
      id="live2d"
      title="live2d"
      src="/live2d.html"
      className={className}
    />
  );
}
