import { Hono } from "hono"
import { handle } from "hono/vercel"

import api from "./api"

export const runtime = "edge"

const app = new Hono().route("/api", api)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)