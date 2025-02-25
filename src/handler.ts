import { standaloneHandler } from 'bunny-hono'

import app from './index.js'

standaloneHandler(app) 