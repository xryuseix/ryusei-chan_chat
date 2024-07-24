import { Hono } from "hono";
import { handle } from "hono/vercel";

import user from "./api/user";
import chat from "./api/chat";
import { helloGet, helloPost } from "./api/hello";

export const api = new Hono().basePath("/api");

export const route = {
  user: api.route("", user),
  helloGet: api.route("", helloGet),
  helloPost: api.route("", helloPost),
  chat: api.route("", chat),
};

const GET = handle(api);
const POST = handle(api);

export { GET, POST };
