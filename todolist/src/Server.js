const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const router = jsonServer.router('./src/db.json');
const middlewares = jsonServer.defaults();

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(middlewares);
app.use('/', router);
