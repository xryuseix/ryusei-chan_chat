import hono from "../hono";
import authCheck from "../auth";

const user = hono.get("/user", async (c) => {
  const authRes = await authCheck(c);
  if ("error" in authRes) {
    return c.json({ error: authRes.error }, authRes.status);
  }
  return c.json({ name: authRes.name, role: authRes.role });
});

export default user;
