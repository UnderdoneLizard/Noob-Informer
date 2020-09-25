const express = require("express");
const router = express.Router();
const db = require("../models");
const { findById } = require("../models/Dev");

//index / games
router.get("/", async (req, res) => {
  try {
    const data = await db.Game.find({});

    const context = {
      games: data,
    };
    res.render("game/index", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
});

//show favorites
router.get('/favs', async (req,res) => {
  try {
    const user = await db.User.findById(req.session.currentUser.id).populate("favGames")
    const data = user.favGames
    const context = {
      games: data
    };
    res.render("game/index", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" })
  }
})

// games /new
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
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundGames = await db.Game.findById(id).populate("dev");
    const context = { 
        game: foundGames
    };
    res.render("game/show", context);
  } catch (error) {
    console.log(error);
    return res.send({ message: "Internal server error" });
  }
});

// edit /:id/edit
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
          temp.save();
        })
        res.redirect(`/games/`);
  } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" })
  }
})


router.get('/:id/addDev', async(req,res) => {
    try {
        const devs = await db.Dev.find({});
        const game = await db.Game.findById(req.params.id)
        const context = {
            devs: devs,
            game: game
        }
        res.render("game/addDev", context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" })
    }
})


router.put('/:id/addDev', async(req,res) => {
    try {
        
        const dev = await db.Dev.findById(req.body.dev);
        const game = await db.Game.findById(req.params.id);
        if(game.dev){
        game.dev.push(req.body.dev);
        }else{
            game.dev = [dev]
        }
        if(dev.games){
        dev.games.push(req.params.id);
        }else {
            dev.games = [game]
        }
        await game.save();
        await dev.save();
        res.redirect(`/games/${game.id}`);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" })
    }
})

module.exports = router;
