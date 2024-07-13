import { hc } from "hono/client";

import type { AppType } from "@/app/api/[[...route]]/route";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!APP_URL) {
  throw new Error("APP_URL is not defined");
}

export const client = hc<AppType>(APP_URL);
