import { hc } from "hono/client";
import type { route } from "./api";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
if (!APP_URL) {
  throw new Error("APP_URL is not defined");
}

export type HcType = (typeof route)[keyof typeof route];
export const client = hc<HcType>(APP_URL);
