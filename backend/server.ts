import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fileSystem from 'fs'
import * as https from 'https'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

const options = {
  cert: fileSystem.readFileSync('./backend/keys/cert.pem'),
  key: fileSystem.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001')
})

//no terminal
//sudo npm install nodemon -g
//sudo npm i -g ts-node
//nodemon --watch backend --exec "ts-node" backend/server.ts