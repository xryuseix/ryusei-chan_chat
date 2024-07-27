import { handler } from "@/auth.config";

export const runtime = "edge";

export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;
