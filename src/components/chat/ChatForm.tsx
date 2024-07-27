"use client";

import { Microphone, PaperPlaneTilt, StopCircle } from "@phosphor-icons/react";
import { InputGroup } from "@rewind-ui/core";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export default function ChatForm({
  message,
  setMsg,
  isGenerating,
  handleSubmit,
}: {
  message: string;
  setMsg: Dispatch<SetStateAction<string>>;
  isGenerating: boolean;
  handleSubmit: () => Promise<void>;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  // FIXME:
  // @ts-ignore
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // FIXME:
      // @ts-ignore
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;
    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isRecording, recognition]);

  useEffect(() => {
    if (!recognition) return;
    // @ts-ignore
    recognition.onresult = (event) => {
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          setTranscript("");
          setMsg((message) => message + results[i][0].transcript);
        } else {
          setTranscript(results[i][0].transcript);
        }
      }
    };
  }, [recognition, setMsg]);

  return (
    <div className="m-2">
      <InputGroup>
        <InputGroup.Input
          size="lg"
          placeholder="Type your message..."
          type="search"
          withRing={false}
          value={`${message}${transcript}`}
          disabled={isGenerating}
          onChange={(e) => setMsg(e.target.value)}
          className="text-md"
        />
        {recognition && (
          <InputGroup.Button
            withRing={false}
            disabled={isGenerating}
            onClick={() => setIsRecording((prev) => !prev)}
            className=""
          >
            {isRecording ? (
              <span className="relative flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400/70 opacity-75" />
                <StopCircle size={18} />
              </span>
            ) : (
              <Microphone size={18} />
            )}
          </InputGroup.Button>
        )}
        <InputGroup.Button
          withRing={false}
          disabled={isGenerating}
          onClick={() => {
            if (isRecording) {
              setIsRecording(false);
            }
            handleSubmit();
          }}
          className="border-0 border-l border-gray-400/30"
          style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
        >
          <PaperPlaneTilt size={18} />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
