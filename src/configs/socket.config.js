import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server)

io.on('connection', () => {})

export { app, server, io }
