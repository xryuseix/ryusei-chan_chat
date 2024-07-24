"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@api/api/chat";

export type MessageWithId = Message & { id: number };

export default function ChatLog({ lastMsg }: { lastMsg: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current && lastMsg) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lastMsg]);

  return (
    <div className="m-2 relative px-4 py-2 bg-gray-800/80 rounded-lg backdrop-blur-sm">
      {/* 吹き出しの三角 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-gray-800" /> 
      {/* テキスト */}
      <div
        className="h-48 text-xl overflow-y-scroll hidden-scrollbar text-gray-200"
        ref={scrollRef}
      >
        <span>{lastMsg}</span>
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