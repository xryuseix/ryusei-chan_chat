import { Hono } from "hono";
import { handle } from "hono/vercel";

import user from "./api/user";
import { helloGet, helloPost } from "./api/hello";
import chat from "./api/chat";

const api = new Hono().basePath("/api");
export const runtime = "edge";
export const GET = handle(api);
export const POST = handle(api);

export const route = {
  user: api.route("", user),
  helloGet: api.route("", helloGet),
  helloPost: api.route("", helloPost),
  chat: api.route("", chat),
};
