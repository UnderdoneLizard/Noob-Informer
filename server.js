// SECTION External Modules
const express = require('express');
//bring method override express session and connect mongo
const methodOverride = require("method-override");
const session = require("express-session");
//require path
const path = require('path');

// const MongoStore = require("connect-mongo")('session');



// SECTION Internal modules 
//require db and controllers index 
const db = require('./models')
const controller = require('./controllers')

//Instanced modules
const app = express();

// Config
const PORT = 3000;


// TODO pass user info to all files with locals 

//set engine to ejs
app.set('view engine', 'ejs');


// SECTION Middleware
app.use(express.static(path.join(__dirname, 'public')));
// use url encoded
app.use(express.urlencoded({extended: true}));
// method override
app.use(methodOverride("_method"));
// TODO set up session (look at express blog)



//Routes
//base route that will take user to the home page 
//auth routes
// app.use('/', controller.auth)
//game routes
app.use('/', controller.game);
//dev routes
app.use('/', controller.dev);

//Server Listener
app.listen(PORT, () => {
    console.log(`Listening at port http://localhost:${PORT}`);
})