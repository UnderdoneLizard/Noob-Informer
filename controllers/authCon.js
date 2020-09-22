const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const { render } = require("ejs");
 
//make them all async try catch

// base path /

//register form
    // auth/register render form
    router.get("/register", (req, res) => {
        res.render('auth/register', {message: ''});
    })


// register post 
    // search db to see if user already exits (using email/username)
    // if user exists send back error (already exists)
    // if no user is found send hash+salt password
    // redirect to login
router.post("/register", async (req, res) => {
    try {
        const foundEmail = await db.User.findOne({email: req.body.email})
        const foundUsername = await db.User.findOne({username: req.body.username})
        if(foundEmail || foundUsername) res.render("auth/register",{message: "username or email taken"})

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        await db.User.create(req.body);
        console.log(req.body)
        res.redirect("/login")
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

// login form (/login)
    // render login form 
router.get('/login', (req,res) =>{
    res.render("auth/login", {message:''})
})


// login post 
    // db findOne username/email
        // if email does not matches 
        // return error email || password incorrect
        
        // if email exists check password
        // if password correct add user to session
        // redirect homepage
        
        // if password incorrect 
        // return error email || password incorrect
router.post("/login", async(req,res) => {
    try {
        const foundUser = await db.User.findOne({email: req.body.email});
        if(!foundUser){
            return res.render('auth/login',{message: "Username or password incorrect"});
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match){
            return res.render('auth/login', {message: "Username or password incorrect"});
        }

        
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
            // favGames: foundUsers.favGames,
            // favDevs: foundUser.favDevs,
        }

        res.redirect('/');
    }catch(error){
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

//logout
router.delete('/logout', async (req, res) => {
    await req.session.destroy();
    res.redirect('/');
})
// logout aka destroy session
    // use req.sessions.destroy();
    // ten redirect to home page
// router.post("/logout", async ())

module.exports = router;
