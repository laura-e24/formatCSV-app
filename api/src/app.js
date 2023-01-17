const express = require('express')
const filesRoutes = require('./routes/filesRoutes')

const path = require('path')
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FormatCSV API",
      version: "1.0"
    },
    servers: [
      { url: "http://localhost:3001" }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`]
} 

const server = express()

const corsConfig = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type']
};

server.use(cors(corsConfig))

server.use('/files/data', filesRoutes);
server.use('/api/files/data', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

module.exports = server;