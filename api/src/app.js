const express = require('express')
const filesRoutes = require('./routes/filesRoutes')

const server = express()
server.use('/files/data', filesRoutes);

module.exports = server;