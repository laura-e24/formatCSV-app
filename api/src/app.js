const express = require('express')
const filesRoutes = require('./routes/filesRoutes')
// const swaggerUI = require('swagger-ui-express')
// const swaggerJsDoc = require('swagger-jsdoc')
// const swaggerSpec = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "",
//       version: "1.0"
//     }
//   }
// } 

const server = express()

server.use('/files/data', filesRoutes);
// server.use('/api/files/data', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc()));

module.exports = server;