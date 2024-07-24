"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@api/api/chat";

export type MessageWithId = Message & { id: number };

export default function ChatLog({
  lastMsg,
  history,
}: {
  lastMsg: string;
  history: MessageWithId[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current && lastMsg) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lastMsg]);

  return (
    <div className="m-2 relative px-4 py-2 bg-gray-800/80 rounded-lg backdrop-blur-sm">
      {/* 吹き出しの三角 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-[16px] border-transparent border-b-gray-800/80" />
      {/* テキスト */}
      <div
        className="h-48 text-xl overflow-y-scroll hidden-scrollbar text-gray-200"
        ref={scrollRef}
      >
        {history.slice(1).map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="text-gray-400 mr-2">
              [{msg.role === "assistant" ? "Ryusei-Chan" : "You"}]:
            </span>
            <span>{msg.content}</span>
          </div>
        ))}
        {
          lastMsg && (
            <div>
              <span className="text-gray-400 mr-2">[Ryusei-Chan]:</span>
              <span>{lastMsg}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export const getChunks = (value: Uint8Array) => {
  const decoder = new TextDecoder();
  const lines = decoder.decode(value);
  const chunks = lines
    .split("data: ")
    .map((line) => line.replace(/\n\n$/, ""))
    .filter((s) => s.length);
  return chunks;
};
