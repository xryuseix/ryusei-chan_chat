"use client";

import { useRef, useState } from "react";
import { client } from "@api/client";
import ChatLog, { type MessageWithId } from "@/components/chat/ChatLog";
import ChatForm from "@/components/chat/ChatForm";

const getChunks = (value: Uint8Array) => {
  const decoder = new TextDecoder();
  const lines = decoder.decode(value);
  const chunks = lines
    .split("data: ")
    .map((line) => line.trim())
    .filter((s) => s);
  return chunks;
};

export default function AdminPage() {
  const [message, setMsg] = useState("300字ほどの文章を作ってください");
  const [lastMsg, setLastMsg] = useState("");
  const [history, setHistory] = useState<MessageWithId[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

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
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsGenerating(false);
        console.log({ history, tmpMsg });
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
      }
    }
  };

  return (
    <div className="fixed z-10 m-2 bottom-4 left-4 right-4">
      <ChatLog lastMsg={lastMsg} />
      <ChatForm
        message={message}
        setMsg={setMsg}
        isGenerating={isGenerating}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
