"use strict";

const express = require('express');
const app = express();
const wagner = require('wagner-core');


//Add models and sequelize to wagner
require('./dependencies/sequelize')(wagner);
//Add passport
require('./dependencies/passport')(wagner);


//-----------------------
//Set Environment Variables if Necessary
//-----------------------
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//---------------------------------------
//Set response headers for CORS
//---------------------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//----------------------
//Logger
//------------------------
app.use(require('morgan')('dev'));



// ----------------------------------------
// Services
// ----------------------------------------
wagner.invoke(require('./services/auth'), {
    app: app
});

//----------------------------
//Routers
//----------------------------

app.use('/api', wagner.invoke(require("./routes/api")));


app.get('/', (req, res, next) => {
    res.end("Yay server running!");
});


let port = process.env.PORT || 8080;
if (process.env.PORT !== 'production') {
    port = 8081;
}

// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen(port, () => {
    console.log("listening on port:", port);
    });
}



// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use('/api', (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).json({
        error: err
    });
});


app.use('/auth', (err, req, res, next) => {
    console.error("err stack", err.stack);
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).json({
        error: err.message
    });
});

app.use((err, req, res, next) => {
    console.error("err stack", err.stack);
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    //send to internal logs
    res.status(500).json({
        error: err.message
    });
});



module.exports = app;

