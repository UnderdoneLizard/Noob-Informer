const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
 
//make them all async try catch

// base path /

//register form
    // auth/register render form
    router.get("/register", (req, res) => {
        res.render('auth/register');
    })


// register post 
    // search db to see if user already exits (using email/username)
    // if user exists send back error (already exists)
    // if no user is found send hash+salt password
    // redirect to login


// login form (/login)
    // render login form 


// login post 
    // db findOne username/email
        // if email does not matches 
        // return error email || password incorrect
        
        // if email exists check password
        // if password correct add user to session
        // redirect homepage
        
        // if password incorrect 
        // return error email || password incorrect

// logout aka destroy session
    // use req.sessions.destroy();
    // ten redirect to home page

module.exports = router;
