import { Hono } from "hono";
import { handle } from "hono/vercel";

import hello from "./api/hello";
import hello2 from "./api/hello2";
import chat from "./api/chat";

const api = new Hono().basePath("/api");
export const runtime = "edge";
export const GET = handle(api);
export const POST = handle(api);

export const route = {
  hello: api.route("", hello),
  hello2: api.route("", hello2),
  chat: api.route("", chat),
};
