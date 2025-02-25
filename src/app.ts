import { Hono } from 'hono'
import type { BunnyEnv } from 'bunny-hono'
import cmsRoute from "./cms/index.js"
import gamesRoute from "./games/index.js"

const app = new Hono<BunnyEnv>()

app.route('/cms', cmsRoute);
app.route('/games', gamesRoute);

export default app 
