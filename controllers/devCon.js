const express = require("express");
const router = express.Router();

const db = require("../models");

//make them all async try catch 

//index / devs
    //find all the devs and render the dev index page with the context set as the found devs
router.get("/", async (req,res) => {
    try {
        const devs = await db.Dev.find({});
        context = {
            devs:devs
        }
        res.render("dev/index",context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
    }
)

//favs index
router.get('/favs', async (req,res) => {
    try {
      const user = await db.User.findById(req.session.currentUser.id).populate("favDevs")

      const data = user.favDevs
      
      const context = {
        devs: data,
      };
      res.render("dev/index", context);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error" })
    }
  })

// devs /new
    // render form page to add dev company
    // database search for all games(context)
router.get("/new" , async (req, res) => {
    try {
        res.render("dev/new")
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})


    // create / dev
    // db.Dev.create 
    // loop though games in req.body and database search for i.d.'s
    // add to games array in db save array
    // redirect to index (/dev)

router.post("/", async (req, res) => {
    try {
        
        await db.Dev.create(req.body);
        res.redirect("/devs");

    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})


// show route devs/:id
    // db search with dev i.d. and render page with context
router.get("/:id", async (req,res) => {
    try {
        const dev = await db.Dev.findById(req.params.id).populate("games")
        context = {
            dev: dev,
        }
        res.render("dev/show", context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})


// edit /:id/edit 
    // render edit form
    // search for dev's i.d. and redirect the edit form with context 

router.get("/:id/edit", async (req,res) => {
    try {
        const dev = await db.Dev.findById(req.params.id)
        const context = {
            dev: dev
        }
        res.render("dev/edit", context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})


// update  dev/:id/update
    //findByIdAndUpdate  redirect  to dev page.

router.put("/:id", async (req,res) => {
    console.log('hit')
    try {
        await db.Dev.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.redirect(`/devs/${req.params.id}`)
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})

// delete dev/:id
    // findByIdAndDelete loop through each of the devs games id and remove dev. redirect to devs page.

router.delete("/:id", async(req,res) => {
    try {
        const delDev = await db.Dev.findByIdAndDelete(req.params.id);
        
        delDev.games.forEach(async (game) =>{
            const temp = await db.Game.findById(game);
            temp.dev.remove(delDev);
            temp.save();
        })
        res.redirect("/devs");

    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})

module.exports = router;