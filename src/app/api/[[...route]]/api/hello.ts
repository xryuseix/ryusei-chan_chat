import hono from "../hono";

const helloGet = hono.get("/hello", async (c) => {
  return c.json({ name: "John Doe", method: "GET" });
});

const helloPost = hono.post("/hello", async (c) => {
  return c.json({ name: "John Doe", method: "POST" });
});

export { helloGet, helloPost };
