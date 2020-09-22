const express = require("express");
const router = express.Router();
const db = require("../models");
const { findById } = require("../models/Dev");

//make them all async try catch

//index / games
//find all the games and render the games index page with the context set as the found games
router.get("/", async (req, res) => {
  try {
    const data = await db.Game.find({});

    const context = {
      games: data,
      user: req.session.currentUser
    };
    res.render("game/index", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
});

// games /new
// render form page to add games company
// database search for all games(context)
router.get("/new", async (req, res) => {
  try {
    const devs = await db.Dev.find({});
    const context = { devs: devs };

    res.render("game/new", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
});

// create / games
// db.Dev.create
// loop though games in req.body and database search for i.d.'s
// add to games array in db save array
// redirect to index (/games)
router.post("/", async (req, res) => {
  try {
    await db.Game.create(req.body);
    res.redirect("/games");
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
});

// show route games/:id
// db search with games i.d. and render page with context
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundGames = await db.Game.findById(id).populate("dev");
    const context = { game: foundGames };
    res.render("game/show", context);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Internal server error" });
  }
});

// edit /:id/edit
// render edit form
// search for games's i.d. and redirect the edit form with context
router.get("/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const foundGames = await db.Game.findById(id);
    const devs = await db.Dev.find({})
    const context = {
        game: foundGames, 
        devs: devs
    };
    res.render("game/edit", context);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Internal server error" });
  }
});

// update  games/:id/update
//findByIdAndUpdate  redirect  to games page.
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.Game.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.redirect(`/games/${id}`);
  } catch (error) {

    console.log(error);
    return res.send({ message: "Internal server error" });
  }
});

//add dev
router.put("/:id/add", async (req,res) => {
    try {
        


    } catch (error) {
        console.log(error);
        return res.send({ message: "Internal server error" });
    }
})

//delete route
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
      const delGame = await db.Game.findByIdAndDelete(id);

      
        delGame.dev.forEach(async (dev) => {
          const temp = await db.Dev.findById(dev);
          temp.games.remove(delGame);
        })
        res.redirect(`/games/`);
  } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" })
  }
})
// delete games/:id
// findByIdAndDelete loop through each of the games devs id and remove games. redirect to games page.

module.exports = router;
