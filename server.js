// SECTION External Modules
const express = require('express');
//bring method override express session and connect mongo
const methodOverride = require("method-override");
const session = require("express-session");
//require path
const path = require('path');
const MongoStore = require("connect-mongo")(session);



// SECTION Internal modules 
//require db and controllers index 
const db = require('./models')
const controllers = require('./controllers')

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
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "beans",
    store: new MongoStore({
        url: process.env.MONGODB_URI || "mongodb://localhost:27017/noob-sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}))


app.use(async (req, res, next) => {
    if(req.session.currentUser){
    res.locals.user = await db.User.findById(req.session.currentUser.id);
    }else{
        user = undefined;
    }
    next();
    //hello
})


//Routes
//base route that will take user to the home page 
app.get("/", async (req,res) => {
    if(req.session.currentUser){
        res.redirect("/games");
    }else{
        res.redirect("/login");
    }
})

//game routes
app.use("/games", controllers.game);
//auth routes
app.use('/', controllers.auth);
//dev routes
app.use("/devs", controllers.dev); 

//Server Listener
app.listen(PORT, () => {
    console.log(`Listening at port http://localhost:${PORT}`);
})