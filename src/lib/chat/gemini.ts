"use client";

import { initialPrompt } from "./ryuseiChan";

type Session = {
  prompt: (text: string) => Promise<string>;
};

type AI = {
  ai: {
    canCreateTextSession: () => Promise<string>;
    createTextSession: () => Promise<Session>;
  };
} & Window &
  typeof globalThis;

const placeholders: { text: string; weight: number }[] = [
  { text: "何か話しかけてみよう！", weight: 10 },
  { text: "あなたは誰？", weight: 5 },
  { text: "りゅうせいちゃんとお話ししよう！", weight: 5 },
  { text: "お前を消す方法", weight: 5 },
];

class ChatWithRyuseiChan {
  initialPrompt: string = initialPrompt;
  available = false;
  session: Session | null = null;
  defaultText = "こんにちは";
  public placeholder = placeholders?.[0].text ?? "";

  constructor() {
    this.isAvailable()
      .then(() => {
        this.available = true;
        this.placeholder = this.getRandomPlaceholder();
        this.initChat();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  isAvailable = async () => {
    const status = await (window as AI).ai.canCreateTextSession();
    if (status === "readily") {
      return;
    }
    // read: https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?usp=sharing
    throw new Error(`Gemini Nano is not available. status: ${status}`);
  };

  initChat = async () => {
    this.session = await (window as AI).ai.createTextSession();
    if (!this.session) {
      throw new Error("Failed to create text session");
    }
    const res = await this.chat("こんにちは"); //this.initialPrompt);
    console.debug(res);
  };

  getRandomPlaceholder = () => {
    const totalWeight = placeholders.reduce((acc, cur) => acc + cur.weight, 0);
    const random = Math.random() * totalWeight;
    let sum = 0;
    for (const placeholder of placeholders) {
      sum += placeholder.weight;
      if (random < sum) {
        return placeholder.text;
      }
    }
    return placeholders?.[0].text ?? "";
  };

  chat = async (text?: string) => {
    const inputText = text ?? this.defaultText;
    if (!this.available || !this.session) {
      throw new Error(
        `Gemini Nano is not available. available: ${this.available}, session: ${this.session}`,
      );
    }
    return await this.session.prompt(inputText);
  };
}

export default ChatWithRyuseiChan;
