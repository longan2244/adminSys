const express = require('express');
const compression = require('compression');
const history = require('connect-history-api-fallback')
const path = require('path');
const app = express()
const https = require('https');
const fs = require('fs');
const options = { //https
  cret: fs.readFileSync('./SSL/cret.txt'),
  key: fs.readFileSync('./SSL/key.txt')
}
app.use(history()) //history模式
app.use(compression()) //gzip压缩
app.use('/', express.static(path.join(__dirname, 'dist')))

https.createServer(options, app).listen(443) 