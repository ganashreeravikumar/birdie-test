const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const connection = require('./db');
const { SERVER } = require('./config');
const { getColoumn, getDataFromDB } = require('./controller/census');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


connection.connect(err => {
  if (err) {
    console.log('Error connecting to DB:', err);
    throw err;
  } else {
    console.log('Connected to DB!');

    app.get('/getdataForSelctedCol', (req, res) => getDataFromDB(connection, req, res));
    app.get('/getColumnNames', (req, res) => getColoumn(connection, req, res));
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }
});

app.listen(SERVER.port, () => {
  console.log(`Your app is listening on port: ${SERVER.port}`);
});