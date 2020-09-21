const express = require("express");
const router = express.Router();
const db = require("../models");

//make them all async try catch 

//index / games
    //find all the games and render the games index page with the context set as the found games
router.get("/", async (req,res) =>{
    try {
        const data = await db.Game.find({});
        
        const context = {
            games: data
        }
        res.render("game/index", context)
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})


// games /new
    // render form page to add games company
    // database search for all games(context)
    router.get('/new', async (req, res) =>{
        try {
            const devs = await db.Dev.find({});
            const context = {devs: devs};
            
            res.render('game/new', context);
        } catch (error) {
            console.log(error);
            res.send({message: "Internal server error"});
        }
    })

    // create / games
    // db.Dev.create 
    // loop though games in req.body and database search for i.d.'s
    // add to games array in db save array
    // redirect to index (/games)
    router.post('/', async (req, res)=>{
        try {
            await db.Game.create(req.body);
            res.redirect('/games')
        } catch (error) {
            console.log(error);
            res.send({message: "Internal server error"});
        }
    })



// show route games/:id
    // db search with games i.d. and render page with context
    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const foundGames = await db.Game.findById(id).populate('dev');
            const context = {game: foundGames};
            res.render('game/show', context);
        } catch (error) {
            console.log(error);
            return res.send({message: "Internal server error"})
        }
    })

// edit /:id/edit 
    // render edit form
    // search for games's i.d. and redirect the edit form with context 


// update  games/:id/update
    //findByIdAndUpdate  redirect  to games page.

// delete games/:id
    // findByIdAndDelete loop through each of the games devs id and remove games. redirect to games page.

module.exports = router;