const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(favicon(path.join(__dirname + 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes'));

module.exports = app;
