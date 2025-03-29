"use client";

import Live2d from "./Live2d";
import { MessageBox } from "./MessageBox";

export default function Live2dAssistant() {
  return (
    <div>
      <Live2d
        className={"h-[70%] bottom-[-25%] left-0 z-100 overflow-hidden border-none bg-transparent" +
          " fixed max-w-[300px] w-[40%]"}
      />
      <MessageBox boxStyle={styles.live2dBox} />
    </div>
  );
}

const styles = {
  live2dBox: {
    position: "fixed" as const,
    maxWidth: "300px",
    width: "40%",
  },
};
