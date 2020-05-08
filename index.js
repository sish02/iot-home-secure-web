global.__base = __dirname + '/';

const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./api/routes');

//Using Morgan MWare for logging api requests
app.use(logger('dev'));

//Using Body-Parser MWare for parsing body of incoming requests
app.use(bodyParser.urlencoded({ extended: false })); //Can parse basic url encoded data
app.use(bodyParser.json()); //Can parse body with json

//Routes MWare
app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error('url not found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        Error: {
            message: error.message
        }
    });
});

module.exports = app;