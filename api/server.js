const express = require('express');
const server = express();
const projectsRoute = require('./projects/projects-router');
const actionsRoute = require('./actions/actions-router')

server.use(express.json());
server.use("/api/projects", projectsRoute);
server.use("/api/actions",actionsRoute);

module.exports = server;
