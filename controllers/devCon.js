// const express = require("express");
// const router = express.Router();
// // const router = require("express").Router()
// const db = require("../models");

//make them all async try catch 

//index / devs
    //find all the devs and render the dev index page with the context set as the found devs


// devs /new
    // render form page to add dev company
    // database search for all games(context)

    // create / dev
    // db.Dev.create 
    // loop though games in req.body and database search for i.d.'s
    // add to games array in db save array
    // redirect to index (/dev)


// show route devs/:id
    // db search with dev i.d. and render page with context


// edit /:id/edit 
    // render edit form
    // search for dev's i.d. and redirect the edit form with context 


// update  dev/:id/update
    //findByIdAndUpdate  redirect  to dev page.

// delete dev/:id
    // findByIdAndDelete loop through each of the devs games id and remove dev. redirect to devs page.

// module.export = router;