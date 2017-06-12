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


//------------------------------------
//Method override for DELETE
//------------------------------------
// Put this AFTER your body-parser set up

app.use((req, res, next) => {
  var method;

  // Allow method overriding in
  // the query string and POST data
  // and remove the key after found
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
  } else if (typeof req.body === 'object' && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  // Upcase the method name
  // and set the request method
  // to override it from GET to
  // the desired method
  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});



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

app.use('/api/boards', wagner.invoke(require("./routes/boards")));
app.use('/api/lists', wagner.invoke(require("./routes/lists")));
app.use('/api/cards', wagner.invoke(require("./routes/cards")));
app.use('/api/users', wagner.invoke(require("./routes/users")));


app.get('/', (req, res, next) => {
    res.end("Yay server running!");
});


let port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production') {
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

