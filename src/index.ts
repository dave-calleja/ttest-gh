import type { BunnyEnv } from 'bunny-hono'
import { Hono } from 'hono'

import cmsRoute from "./cms/index.js"

const app = new Hono<BunnyEnv>()

app.route('/cms', cmsRoute);

export default app 
