import hono from "../hono";
import OpenAI from "openai";
import { streamSSE } from "hono/streaming";
import authCheck from "../auth";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_KEY = process.env.CHATGPT_API_KEY;
if (!API_KEY) {
  throw new Error("CHATGPT_API_KEY is required");
}

const openai = new OpenAI({ apiKey: API_KEY });

const chat = hono.post("/chat", async (c) => {
  const authRes = await authCheck(c);
  if ("error" in authRes) {
    return c.json({ error: authRes.error }, authRes.status);
  }

  const body = await c.req.json<{ message: string; messages?: Message[] }>();

  return streamSSE(c, async (stream) => {
    const chatStream = openai.beta.chat.completions.stream({
      model: "gpt-3.5-turbo",
      messages: [
        ...(body.messages ?? []),
        { role: "user", content: body.message },
      ],
      stream: true,
    });

    for await (const message of chatStream) {
      await stream.writeSSE({ data: message.choices[0].delta.content ?? "" });
    }
    stream.close();
  });
});

export default chat;
