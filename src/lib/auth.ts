import { handler } from "@/auth.config";

export const { signIn, signOut } = handler;

export const auth = handler.auth;
