"use client";

import { useRef, useState } from "react";
import { client } from "@api/client";
import ChatLog, {
  type MessageWithId,
  getChunks,
} from "@/components/chat/ChatLog";
import ChatForm from "@/components/chat/ChatForm";
import Live2d from "@/components/Live2d";
import { ToastContainer, useToast } from "@rewind-ui/core";
import ChatSettings, {
  validVoices,
  type Input,
  type Voice,
} from "@/components/chat/ChatSettings";

function createErrrorToast(toast: ReturnType<typeof useToast>) {
  toast.add({
    id: "unique-id",
    closeOnClick: false,
    color: "dark",
    description: "window.speechSynthesis is not supported in this browser.",
    duration: 3000,
    iconType: "warning",
    pauseOnHover: true,
    radius: "lg",
    shadow: "base",
    shadowColor: "gray",
    showProgress: true,
    title: "Speech Functionality Not Supported",
    tone: "solid",
  });
}

export default function AdminPage() {
  const [message, setMsg] = useState("Please tell me about you.");
  const [lastMsg, setLastMsg] = useState("");
  const [history, setHistory] = useState<MessageWithId[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "You should use a pretty girl tone of voice in your conversation.",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [inputType, setInputType] = useState<Input>("text");
  const abortControllerRef = useRef<AbortController | null>(null);
  const toast = useToast();

  const handleSubmit = async () => {
    if (message === "") return;
    setIsGenerating(true);
    setHistory((history) => [
      ...history,
      { id: history.length, role: "user", content: message },
    ]);
    setMsg("");
    setLastMsg("");

    abortControllerRef.current = new AbortController();

    const response = await client.api.chat.$post(
      {
        json: { message, messages: history },
      },
      {
        init: {
          signal: abortControllerRef.current.signal,
        },
      },
    );
    const reader = response?.body?.getReader();
    if (!reader) return;

    let tmpMsg = "";
    let tmpSentence = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsGenerating(false);
        setHistory((history) => [
          ...history,
          { id: history.length, role: "assistant", content: tmpMsg },
        ]);
        return;
      }
      if (!value) continue;

      const chunks = getChunks(value);
      for (const chunk of chunks) {
        tmpMsg += chunk;
        setLastMsg(tmpMsg);
        tmpSentence += chunk;
        if (chunk.endsWith(".") || chunk.endsWith("!") || chunk.endsWith("?")) {
          speakText(tmpSentence);
          tmpSentence = "";
        }
      }
    }
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) {
      createErrrorToast(toast);
      return;
    }
    const voice = selectedVoice?.content;
    if (!voice) {
      createErrrorToast(toast);
      return;
    }
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.voice = voice;
    window.speechSynthesis.speak(uttr);
  };

  return (
    <div className="h-screen overflow-hidden">
      <ToastContainer />
      <ChatSettings
        inputType={inputType}
        setInputType={setInputType}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
      />
      <Live2d className="h-[150%] w-full mt-16" />
      <div className="fixed z-10 m-2 bottom-4 left-4 right-4">
        <ChatLog lastMsg={lastMsg} />
        <ChatForm
          message={message}
          setMsg={setMsg}
          isGenerating={isGenerating}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
