// External Modules
const express = require('express');
const methodOverride = require("method-override");
const session = require("express-session");
const path = require('path');

require('dotenv').config();
const MongoStore = require("connect-mongo")(session);



// SECTION Internal modules 

const db = require('./models')
const controllers = require('./controllers')

//Instanced modules
const app = express();

// Config
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
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
})


//Routes
app.get("/", async (req,res) => {
    if(req.session.currentUser){
        res.redirect("/games");
    }else{
        res.redirect("/login");
    }
})

app.use("/games", controllers.game);
app.use('/', controllers.auth);
app.use("/devs", controllers.dev); 


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})