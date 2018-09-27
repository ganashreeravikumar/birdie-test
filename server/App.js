const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const connection = require('./db');
const { SERVER } = require('./config');

const DAO = require('./controller/censusDao')(connection);
const getStats = require('./controller/getStats')(DAO);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

connection.connect(err => {
  if (err) {
    console.log('Error connecting to DB:', err);
    throw err;
  } else {
    console.log('Connected to DB!');

    app.get('/getdataForSelctedCol', getStats);
  }
});

app.listen(SERVER.port, () => {
  console.log(`Your app is listening on port: ${SERVER.port}`);
});