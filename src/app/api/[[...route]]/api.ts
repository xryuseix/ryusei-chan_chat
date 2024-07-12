import { Hono } from "hono"
import { z } from "zod"

export const schema = z.object({
  text: z.string().min(1, "Please write something."),
})

const app = new Hono()

app.get("/", async (c) => {
    const posts = "test"
    return c.json({ posts })
  })

app.post("/", async (c) => {
    const { text } = schema.parse(c.body)

    const post = {
      id: Math.random().toString(36).slice(2),
      text,
    }

    return c.json(post)
  })

export default app
