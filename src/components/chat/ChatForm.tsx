import { PaperPlaneTilt } from "@phosphor-icons/react";
import { FormControl, Button, InputGroup } from "@rewind-ui/core";
import type { Dispatch, SetStateAction } from "react";

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
  return (
    <div className="m-2">
      <InputGroup>
        <InputGroup.Input
          size="lg"
          placeholder="Type your message..."
          type="search"
          withRing={false}
          value={message}
          disabled={isGenerating}
          onChange={(e) => setMsg(e.target.value)}
        />
        <InputGroup.Button
          withRing={false}
          disabled={isGenerating}
          onClick={handleSubmit}
        >
          <PaperPlaneTilt weight="duotone" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
