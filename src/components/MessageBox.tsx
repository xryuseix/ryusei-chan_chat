"use client";

import { InputGroup } from "@rewind-ui/core";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import ChatWithRyuseiChan from "../lib/Chat";
import React from "react";

type Props = {
  boxStyle: React.CSSProperties;
};

export const MessageBox = ({ boxStyle }: Props) => {
  const [text, setText] = React.useState("こんにちは");
  const ryuseiChan = React.useRef<ChatWithRyuseiChan | null>(null);
  try {
    const _ryuseiChan = new ChatWithRyuseiChan();
    ryuseiChan.current = _ryuseiChan;
  } catch (e) {
    console.error(e);
  }

  return (
    <div style={Object.assign({}, boxStyle, styles.messageBox)}>
      <InputGroup>
        <InputGroup.Input
          placeholder={ryuseiChan.current?.placeholder}
          type="search"
          withRing={false}
          value={text}
          disabled={!ryuseiChan.current?.available}
          onChange={(e) => setText(e.target.value)}
        />
        <InputGroup.Button
          withRing={false}
          disabled={!ryuseiChan.current?.available}
          onClick={async () => {
            if (!ryuseiChan.current) return;
            const result = await ryuseiChan.current.chat(text);
            console.log(result);
          }}
        >
          <PaperPlaneTilt weight="duotone" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

const styles = {
  messageBox: {
    bottom: 0,
    left: 0,
    zIndex: 101,
    margin: 4,
  },
};
