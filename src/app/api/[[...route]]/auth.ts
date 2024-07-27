import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { decode } from "next-auth/jwt";

type AuthRes =
  | {
      error: string;
      status: 401 | 403;
    }
  | {
      name: string;
      role: "admin" | "user";
    };

async function authCheck(c: Context): Promise<AuthRes> {
  const sessionToken = getCookie(c, "next-auth.session-token");
  if (!sessionToken) {
    return { error: "Unauthorized", status: 401 };
  }

  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
  if (!NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  const salt = process.env.NEXTAUTH_SECRET_SALT;
  if (!salt) {
    throw new Error("NEXTAUTH_SECRET_SALT is not defined");
  }

  const decoded = await decode({
    token: sessionToken,
    secret: NEXTAUTH_SECRET,
    salt: salt,
  });

  if (!decoded) {
    return { error: "Unauthorized", status: 401 };
  }
  if (decoded.role !== "admin") {
    return { error: "Forbidden", status: 403 };
  }
  return { name: decoded.name ?? "", role: decoded.role };
}

export default authCheck;
