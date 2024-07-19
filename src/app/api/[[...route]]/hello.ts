import hono from "./hono";

const hello = hono.get("/", async (c) => {
  return c.json({ name: "John Doe" });
});

export default hello;
