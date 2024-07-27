import type { Context } from "hono";
import { auth } from "@/lib/auth";

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
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }

  const userId = session?.user?.id;
  if (userId && userId !== process.env.XRYUSEIX_USER_ID) {
    return { error: "Forbidden", status: 403 };
  }
  return { name: session.user?.name ?? "", role: "admin" };
}

export default authCheck;
