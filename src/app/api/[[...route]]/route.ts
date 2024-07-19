import { Hono } from "hono";
import { handle } from "hono/vercel";

import hello from "./hello";

const api = new Hono().basePath("/api")
export const runtime = "edge";
export const GET = handle(api);
export const POST = handle(api);

export const route = {
  hello: api.route("hello", hello)
}
