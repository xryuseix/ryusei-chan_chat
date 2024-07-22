import hono from "../hono";

const hello = hono.get("/hello", async (c) => {
  return c.json({ name: "John Doe1" });
});

export default hello;
