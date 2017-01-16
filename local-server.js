'use strict';

const express = require('express');
const fs = require('fs');
const chalk = require('chalk');
// const request = require('request');
const http = require('http');

let getReqs = [
  {
    proxyPath: '/data',
    jsonData: '/test-data/main-data/data.json'
  }
];

const app = express();
app.set('port', 2000);
app.all('/*', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get('/', (req, res) => {
  res.send('😘   Welcome to the local server.');
});

getReqs.forEach(getReq => {
  app.get(getReq.proxyPath, (req, res) => {
    try {
      fs.readFile(`${__dirname}${getReq.jsonData}`, (err, data) => {
        if (err) {
          console.log('⚡️  err', err);
          res.status(500);
          res.render('error', { error: err });
          return;
        }
        // let json = JSON.parse(data);
        console.log(chalk.green(`👍   got data for ${getReq.proxyPath}`));
        res.send(data);
      });
    }
    catch (error) {
      res.status(500);
      res.render('error', { error: err });
    }
  });
});

// app.listen(2000, () => {
//   console.log('Local server listening on port 2000!');
// });

http.createServer(app).listen(app.get('port'), () => {
  console.log(chalk.blue(`Local server listening on port ${app.get('port')}!`));
});
