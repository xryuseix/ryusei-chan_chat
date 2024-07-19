import NextAuth from "next-auth";
import { handler } from "@/auth.config";

export const { signIn, signOut } = NextAuth(handler);
