import type { BunnyEnv } from 'bunny-hono'
import { Hono } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { getDirectusUrl, getWordpressUrl } from '../utils.js';
import { createClient } from "@libsql/client";

const app = new Hono<BunnyEnv>()

app.get('/testing/:path{.+}', async (c) => {
    console.log(c.req.query());
    const newURL = new URL(c.req.url);
    return c.text(newURL.search);
});

app.get('/wp/:path{.+}', async (c) => {
    const path = c.req.param('path');
    const url = getWordpressUrl(c.req.url, path);
    const wpResponse = await fetch(url);
    
    if (wpResponse.status !== 200) {
        return c.text('Internal Server Error', wpResponse.status as ContentfulStatusCode);
    }

    const wpResponseJson = await wpResponse.json();
        
    if(!wpResponseJson) {
        return c.text('Internal Server Error', 500);
    }
    
    return c.json(wpResponseJson)
})

app.get('/wp-test/:path{.+}', async (c) => {
    const path = c.req.param('path');
    const url = getWordpressUrl(c.req.url, path, true);
    const wpResponse = await fetch(url);
    
    if (wpResponse.status !== 200) {
        return c.text('Internal Server Error', wpResponse.status as ContentfulStatusCode);
    }

    const wpResponseJson = await wpResponse.json();
        
    if(!wpResponseJson) {
        return c.text('Internal Server Error', 500);
    }
    
    return c.json(wpResponseJson)
})

app.post('/d/graphql', async (c) => {
    const turso = createClient({
        url: "libsql://croppers-nevawhere.aws-us-east-1.turso.io",
        authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3MzgwNzU1MTksImlhdCI6MTczNzQ3MDcxOSwiaWQiOiIxNmYwYWI5Yi05OGQyLTQzNDYtODkwYS1hNDI0ZWNjM2I3Y2EiLCJyaWQiOiI4MGQ5NzgyYy00MmFiLTRiM2ItODNmZi1hZTA3ODk1ODdjMTYifQ.Nbbg3inKd_Rp7BH3VJM-FJFHrF3ATsL0_QJUushUfJBEbIsEiscjzcspc3NJHwfHHvzd0HeYyLbWNUbMRLlRCA",
    });
});

app.get('/d/:path{.+}', async (c) => {
    const path = c.req.param('path');
    const url = getDirectusUrl(path);
    const directusResponse = await fetch(url).then(res => res.json());

    if (directusResponse.errors && !directusResponse.data) {
        return c.text('Internal Server Error', 500);
    }

    return c.json(directusResponse)
})

app.get('/d-test/:path{.+}', async (c) => {
    const path = c.req.param('path');
    const url = getDirectusUrl(path, true);
    const directusResponse = await fetch(url).then(res => res.json());

    if (directusResponse.errors && !directusResponse.data) {
        return c.text('Internal Server Error', 500);
    }

    return c.json(directusResponse)
})

export default app 
