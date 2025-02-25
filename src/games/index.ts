import type { BunnyEnv } from 'bunny-hono'
import { Hono } from 'hono'

const app = new Hono<BunnyEnv>()

app.get('/all', async (c) => {
    return c.text("all games");
});

export default app 
