import hono from "../hono";

const hello2 = hono.post("/hello2", async (c) => {
  return c.json({ name: "John Doe2" });
});

export default hello2;
