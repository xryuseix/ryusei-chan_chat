"use client";

import { X, Gear, Microphone, PencilSimple } from "@phosphor-icons/react";
import {
  Modal,
  Button,
  Card,
  FormControl,
  Selector,
  Select,
} from "@rewind-ui/core";
import { useEffect, useState } from "react";

const input = ["text", "mic"] as const;
export type Input = (typeof input)[number];

export type Voice = {
  id: number;
  name: string;
  content: SpeechSynthesisVoice;
};
type VoiceId = Pick<Voice, "id">;

const voices: { [key: string]: VoiceId } = {
  "Google US English": { id: 0 },
  Junior: { id: 1 },
};

export const validVoices = (getVoiceResult: SpeechSynthesisVoice[]) => {
  const voiceNames = Object.keys(voices);
  const validVoices: Voice[] = getVoiceResult
    .filter((v) => voiceNames.includes(v.name))
    .map((v) => ({
      id: voices[v.name].id,
      name: v.name,
      content: v,
    }))
    .sort((a, b) => a.id - b.id);
  return validVoices;
};

function ChatSettings({
  inputType,
  setInputType,
  selectedVoice,
  setSelectedVoice,
}: {
  inputType: Input;
  setInputType: (value: Input) => void;
  selectedVoice: Voice | null;
  setSelectedVoice: (value: Voice) => void;
}) {
  const [open, setOpen] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([]);

  useEffect(() => {
    setVoices(validVoices(window.speechSynthesis.getVoices()));
  }, []);

  useEffect(() => {
    if (selectedVoice) {
      return;
    }
    if (voices.length > 0) {
      setSelectedVoice(voices[0]);
    }
  }, [voices, selectedVoice, setSelectedVoice]);

  return (
    <>
      <Modal
        open={open}
        size="sm"
        onClose={() => setOpen(false)}
        className="w-1/2 max-w-[400px]"
      >
        <Card size="sm" className="w-full">
          <Card.Header
            className="font-medium text-base text-black"
            actions={
              <Button
                onClick={() => setOpen(false)}
                size="xs"
                icon={true}
                className="bg-gray-800 hover:bg-gray-600"
              >
                <X />
              </Button>
            }
          >
            Settings
          </Card.Header>
          <Card.Body className="space-y-3">
            <FormControl size="sm">
              <FormControl.Label required className="flex gap-1">
                <PencilSimple />
                Input
              </FormControl.Label>
              <Selector
                value={inputType}
                radius="md"
                size="sm"
                className="ml-auto"
                onChange={(value) => {
                  if (value) {
                    const inputVal = input.find((v) => v === value);
                    inputVal && setInputType(inputVal);
                  }
                }}
              >
                <Selector.Tab anchor="text" label="Text" />
                <Selector.Tab anchor="mic" label="Mic." />
              </Selector>
            </FormControl>

            <FormControl size="sm">
              <FormControl.Label required className="flex gap-1">
                <Microphone />
                Voice
              </FormControl.Label>
              <Select
                value={selectedVoice?.name}
                className="w-2/3 ml-auto"
                onChange={(e) => {
                  const selected = voices.find(
                    (v) => v.name === e.target.value,
                  );
                  selected && setSelectedVoice(selected);
                }}
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
                {voices.length === 0 && (
                  <option value="none">No voice available</option>
                )}
              </Select>
            </FormControl>
          </Card.Body>

          <Card.Footer className="bg-gray-50/50 justify-end space-x-2 p-2">
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              color="gray"
              tone="light"
              className="font-semibold"
            >
              Close
            </Button>
          </Card.Footer>
        </Card>
      </Modal>

      <div className="fixed z-10 top-0 right-0 m-2 w-8 h-8">
        <Gear className="w-full h-full" onClick={() => setOpen(true)} />
      </div>
    </>
  );
}

export default ChatSettings;
