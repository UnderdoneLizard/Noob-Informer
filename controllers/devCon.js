const express = require("express");
const router = express.Router();
const db = require("../models");


//index / devs
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
router.get("/new" , async (req, res) => {
    try {
        res.render("dev/new")
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error" });
    }
})

// create / dev
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
router.get("/:id", async (req,res) => {
    try {
        const dev = await db.Dev.findById(req.params.id).populate("games")
        console.log(dev.games)
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